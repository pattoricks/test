// app/lib/auth.ts
import { User } from './types';

// Mock user data
const adminUser: User = {
  id: '1',
  email: 'admin@montela.com',
  name: 'Admin Montela',
  role: 'admin',
};

const ADMIN_PASSWORD = 'admin123';

export async function login(email: string, password: string): Promise<{ user: User; token: string } | null> {
  if (email === adminUser.email && password === ADMIN_PASSWORD) {
    const token = Buffer.from(JSON.stringify({
      ...adminUser,
      exp: Date.now() + 24 * 60 * 60 * 1000 // 1 hari
    })).toString('base64');
    return { user: adminUser, token };
  }
  return null;
}

export async function verifyToken(token: string): Promise<User | null> {
  try {
    const userData = JSON.parse(Buffer.from(token, 'base64').toString());
    
    // Check expiration
    if (userData.exp && Date.now() > userData.exp) {
      return null;
    }
    
    return userData;
  } catch (error) {
    return null;
  }
}

export async function logout(): Promise<void> {
  // In production, invalidate token on server
}