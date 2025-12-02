import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { prisma } from '../prisma/client';

export async function getMe(req: Request, res: Response) {
  const userId = (req as any).user?.sub as string | undefined;
  if (!userId) return res.status(401).json({ message: 'Unauthorized' });
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) return res.status(404).json({ message: 'Not found' });
  return res.json({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    githubUsername: user.githubUsername ?? undefined,
    avatarUrl: user.avatarUrl ?? undefined,
  });
}

export async function updateMe(req: Request, res: Response) {
  const userId = (req as any).user?.sub as string | undefined;
  if (!userId) return res.status(401).json({ message: 'Unauthorized' });
  const { name, email, avatarUrl } = req.body as { name?: string; email?: string; avatarUrl?: string };
  try {
    const updated = await prisma.user.update({
      where: { id: userId },
      data: {
        ...(name !== undefined ? { name } : {}),
        ...(email !== undefined ? { email } : {}),
        ...(avatarUrl !== undefined ? { avatarUrl } : {}),
      },
    });
    return res.json({
      id: updated.id,
      name: updated.name,
      email: updated.email,
      role: updated.role,
      githubUsername: updated.githubUsername ?? undefined,
      avatarUrl: updated.avatarUrl ?? undefined,
    });
  } catch (err: any) {
    if (String(err.message).includes('Unique constraint')) {
      return res.status(409).json({ message: 'Email already registered' });
    }
    return res.status(500).json({ message: 'Update failed' });
  }
}

export async function changePassword(req: Request, res: Response) {
  const userId = (req as any).user?.sub as string | undefined;
  if (!userId) return res.status(401).json({ message: 'Unauthorized' });
  const { currentPassword, newPassword } = req.body as { currentPassword?: string; newPassword?: string };
  if (!currentPassword || !newPassword) return res.status(400).json({ message: 'Current and new password are required' });
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) return res.status(404).json({ message: 'Not found' });
  if (!user.password) return res.status(400).json({ message: 'Password change not available for this account' });
  const ok = await bcrypt.compare(currentPassword, user.password);
  if (!ok) return res.status(401).json({ message: 'Invalid current password' });
  const hashed = await bcrypt.hash(newPassword, 10);
  await prisma.user.update({ where: { id: userId }, data: { password: hashed } });
  return res.status(204).send();
}
