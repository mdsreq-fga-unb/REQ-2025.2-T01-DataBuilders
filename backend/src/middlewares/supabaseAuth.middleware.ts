import { Request, Response, NextFunction } from 'express';
import { supabaseServer } from '../lib/supabaseServer';
import { prisma } from '../prisma/client';

export interface AuthRequest extends Request {
  user?: {
    sub: string;          // local Prisma user id
    supabaseId?: string;  // supabase user id (optional)
    email?: string;
    role?: string;
  }
}

export async function ensureSupabaseAuth(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: 'No token provided' });

    const token = authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Invalid Authorization header' });

    const { data, error } = await supabaseServer.auth.getUser(token);
    if (error || !data?.user) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    const supUser = data.user;
    const email = supUser.email ?? undefined;
    const name = (supUser.user_metadata as any)?.name ?? (supUser.user_metadata as any)?.full_name ?? undefined;
    const avatar = (supUser.user_metadata as any)?.avatar_url ?? (supUser.user_metadata as any)?.avatar ?? undefined;
    const supabaseId = supUser.id;

    let localUser;
    if (email) {
      localUser = await prisma.user.upsert({
        where: { email },
        update: {
          name: name ?? undefined,
          avatarUrl: avatar ?? undefined,
          githubId: supabaseId
        },
        create: {
          email,
          name: name ?? 'Usuário',
          password: null,
          avatarUrl: avatar ?? null,
          githubId: supabaseId,
          role: 'MONITOR'
        }
      });
    } else {
      localUser = await prisma.user.findFirst({
        where: { githubId: supabaseId }
      });
      if (!localUser) {
        return res.status(401).json({ message: 'No email in supabase user; cannot create local user' });
      }
    }

    req.user = {
      sub: localUser.id,
      supabaseId,
      email: localUser.email,
      role: localUser.role
    };

    next();
  } catch (err) {
    console.error('Auth middleware error', err);
    return res.status(500).json({ message: 'Auth error' });
  }
}
