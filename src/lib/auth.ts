import { SignJWT, jwtVerify } from 'jose';
import bcrypt from 'bcryptjs';

export const COOKIE_NAME = 'admin_session';

const getSecretKey = () => {
  const secret = process.env.JWT_SECRET || 'super_secret_admin_jwt_key_change_in_production_32bytes_min';
  return new TextEncoder().encode(secret);
};

export interface UserPayload {
  id: string;
  email: string;
  name?: string | null;
  role: string;
}

export async function signSessionToken(payload: UserPayload): Promise<string> {
  return await new SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(getSecretKey());
}

export async function verifySessionToken(token: string): Promise<UserPayload | null> {
  try {
    const { payload } = await jwtVerify(token, getSecretKey());
    return {
      id: payload.id as string,
      email: payload.email as string,
      name: (payload.name as string) || null,
      role: (payload.role as string) || 'admin',
    };
  } catch (err) {
    return null;
  }
}

export async function comparePassword(plainText: string, hash: string): Promise<boolean> {
  return bcrypt.compare(plainText, hash);
}

export async function hashPassword(plainText: string): Promise<string> {
  return bcrypt.hash(plainText, 10);
}
