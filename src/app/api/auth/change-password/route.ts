import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { db, users } from '@/db';
import { eq } from 'drizzle-orm';
import { verifySessionToken, comparePassword, hashPassword, COOKIE_NAME } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;

    if (!token) {
      return NextResponse.json({ error: 'Unauthenticated' }, { status: 401 });
    }

    const sessionUser = await verifySessionToken(token);
    if (!sessionUser) {
      return NextResponse.json({ error: 'Invalid or expired session' }, { status: 401 });
    }

    const body = await request.json();
    const { currentPassword, newPassword } = body;

    if (!currentPassword || !newPassword) {
      return NextResponse.json(
        { error: 'Current password and new password are required' },
        { status: 400 }
      );
    }

    if (newPassword.length < 6) {
      return NextResponse.json(
        { error: 'New password must be at least 6 characters long' },
        { status: 400 }
      );
    }

    // Fetch full user record to verify current password hash
    const [dbUser] = await db
      .select()
      .from(users)
      .where(eq(users.id, sessionUser.id));

    if (!dbUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const isCurrentValid = await comparePassword(currentPassword, dbUser.passwordHash);
    if (!isCurrentValid) {
      return NextResponse.json(
        { error: 'Current password is incorrect' },
        { status: 400 }
      );
    }

    // Hash the new password
    const newPasswordHash = await hashPassword(newPassword);

    // Update database record
    await db
      .update(users)
      .set({
        passwordHash: newPasswordHash,
        updatedAt: new Date(),
      })
      .where(eq(users.id, sessionUser.id));

    return NextResponse.json({
      success: true,
      message: 'Password updated successfully',
    });
  } catch (error) {
    console.error('Change password error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
