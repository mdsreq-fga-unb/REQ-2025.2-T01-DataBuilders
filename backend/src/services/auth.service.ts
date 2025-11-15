import { prisma } from '../prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config';

export async function registerUser(name: string, email: string, password: string, role = 'MONITOR') {
  const hashed = await bcrypt.hash(password, 10);
  return prisma.user.create({ data: { name, email, password: hashed, role } });
}

export async function authenticate(email: string, password: string) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return null;
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return null;
  const token = jwt.sign({ sub: user.id, role: user.role, email: user.email }, JWT_SECRET, { expiresIn: '8h' });
  return { token, user: { id: user.id, name: user.name, email: user.email, role: user.role } };
}