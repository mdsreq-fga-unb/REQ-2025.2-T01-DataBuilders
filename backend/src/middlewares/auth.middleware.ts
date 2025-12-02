// backend/src/middlewares/auth.middleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
// import { supabase } from '../lib/supabaseServer'; // ajuste se o seu import for diferente

// Se seu projeto usa outro nome para a chave, ajuste aqui:
const SUPABASE_JWT_SECRET = process.env.SUPABASE_JWT_SECRET || ''; // pode estar vazio em dev

export async function ensureAuth(req: Request, res: Response, next: NextFunction) {
  try {
    const authHeader = (req.headers.authorization || '') as string;
    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;

    if (!token) {
      // Ambiente de desenvolvimento: atribui usuário dev para testes locais
      if (process.env.NODE_ENV !== 'production') {
        // usuário DEV criado manualmente no banco
        // @ts-ignore
        req.user = { sub: 'DEV-ANON' };
        return next();
      }
      return res.status(401).json({ message: 'No token provided' });
    }

    // validação do token real (exemplo usando jwt)
    // se você usa supabase/jwt, ajuste conforme sua validação atual
    if (SUPABASE_JWT_SECRET) {
      try {
        const payload = jwt.verify(token, SUPABASE_JWT_SECRET);
        // @ts-ignore
        req.user = payload;
        return next();
      } catch (err) {
        return res.status(401).json({ message: 'Invalid token' });
      }
    }

    // Se não tem secret configurado (dev), tenta decodificar sem verificacao
    try {
      const decoded = jwt.decode(token);
      // @ts-ignore
      req.user = decoded || { sub: 'DEV-ANON' };
      return next();
    } catch (err) {
      if (process.env.NODE_ENV !== 'production') {
        // fallback para ambiente dev
        // @ts-ignore
        req.user = { sub: 'DEV-ANON' };
        return next();
      }
      return res.status(401).json({ message: 'Invalid token' });
    }
  } catch (error) {
    console.error('ensureAuth error:', error);
    return res.status(500).json({ message: 'Auth error' });
  }
}
