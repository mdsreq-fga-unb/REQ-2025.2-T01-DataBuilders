import { Request, Response } from 'express';
import * as githubService from '../services/github.service';

export async function search(req: Request, res: Response) {
  const { q, language, page, per_page, sort } = req.query;
  if (!q) return res.status(400).json({ message: 'q is required' });
  const items = await githubService.searchRepos(String(q), String(language || ''), Number(page || 1), Number(per_page || 20), String(sort || 'best-match'));
  res.json({ items });
}