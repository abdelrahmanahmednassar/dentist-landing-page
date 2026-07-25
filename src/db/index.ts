import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

const connectionString = process.env.DATABASE_URL;

const sql = neon(connectionString || 'postgresql://user:password@localhost:5432/neondb');

export const db = drizzle({ client: sql, schema });

export * from './schema';
