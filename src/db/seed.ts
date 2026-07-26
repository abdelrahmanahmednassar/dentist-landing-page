import { config } from 'dotenv';
config({ path: '.env.local', quiet: true });
config({ path: '.env', quiet: true });
import bcrypt from 'bcryptjs';
import { db, users } from './index';
import { eq } from 'drizzle-orm';

async function seed() {
  console.log('Seeding initial admin user...');

  const defaultAdmin = {
    email: process.env.SEED_ADMIN_EMAIL || 'admin@example.com',
    password: process.env.SEED_ADMIN_PASSWORD || 'Admin123456!',
    name: 'Main Admin',
  };

  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.email, defaultAdmin.email.toLowerCase()));

  if (existingUser.length > 0) {
    console.log(`Admin user with email "${defaultAdmin.email}" already exists.`);
    process.exit(0);
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(defaultAdmin.password, saltRounds);

  const [newUser] = await db
    .insert(users)
    .values({
      email: defaultAdmin.email.toLowerCase(),
      passwordHash,
      name: defaultAdmin.name,
      role: 'admin',
    })
    .returning();

  console.log('✅ Admin user created successfully!');
  console.log(`Email: ${newUser.email}`);
  console.log(`Password: ${defaultAdmin.password}`);
  process.exit(0);
}

seed().catch((err) => {
  console.error('❌ Seeding failed:', err);
  process.exit(1);
});
