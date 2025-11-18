
import { prisma } from '../prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config';

export async function registerUser(
  name: string, 
  email: string, 
  password: string, 
  role: 'MONITOR' | 'PROFESSOR' | 'ADMIN' = 'MONITOR'
) {
  // Hash da senha
  const hashed = await bcrypt.hash(password, 10);
  
  // Criar usuário
  return prisma.user.create({ 
    data: { 
      name, 
      email, 
      password: hashed, 
      role 
    } 
  });
}

export async function authenticate(email: string, password: string) {
  // Buscar usuário
  const user = await prisma.user.findUnique({ where: { email } });
  
  if (!user) {
    return null;
  }

  // Verificar se usuário tem senha (pode ser usuário do GitHub sem senha)
  if (!user.password) {
    return null; // Usuário deve usar login do GitHub
  }

  // Verificar senha
  const isPasswordValid = await bcrypt.compare(password, user.password);
  
  if (!isPasswordValid) {
    return null;
  }

  // Gerar token JWT
  const token = jwt.sign(
    { 
      sub: user.id, 
      role: user.role, 
      email: user.email,
      githubUsername: user.githubUsername 
    }, 
    JWT_SECRET, 
    { expiresIn: '8h' }
  );

  return { 
    token, 
    user: { 
      id: user.id, 
      name: user.name, 
      email: user.email, 
      role: user.role,
      githubUsername: user.githubUsername,
      avatarUrl: user.avatarUrl
    } 
  };
}