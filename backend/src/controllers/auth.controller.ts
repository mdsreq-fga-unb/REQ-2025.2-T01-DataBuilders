import { Request, Response } from 'express';
import * as authService from '../services/auth.service';

export async function register(req: Request, res: Response) {
  const { name, email, password, role } = req.body;
  const user = await authService.registerUser(name, email, password, role);
  res.status(201).json({ id: user.id, email: user.email, name: user.name });
}

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;
  const auth = await authService.authenticate(email, password);
  if (!auth) return res.status(401).json({ message: 'Invalid credentials' });
  res.json(auth);
}