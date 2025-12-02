import { Request, Response } from 'express';
import * as githubService from '../services/github.service';

const ALLOWED_SORTS = ['stars', 'updated'] as const;

function parseSort(value: unknown): 'stars' | 'updated' | undefined {
  if (!value) return undefined;
  const s = String(value).trim();
  if (ALLOWED_SORTS.includes(s as any)) return s as 'stars' | 'updated';
  return undefined;
}

export async function search(req: Request, res: Response) {
  try {
    const { q, language, page, per_page, sort, has_readme } = req.query;
    if (!q || !String(q).trim()) return res.status(400).json({ message: 'q is required' });

    const sortValidated = parseSort(sort);
    const pageNum = page ? Number(page) : 1;
    const perPageNum = per_page ? Number(per_page) : 30;
    const languageStr = language ? String(language) : undefined;
    const readmeOnly = has_readme === 'true' || has_readme === '1';

    const items = await githubService.searchRepos(
      String(q),
      languageStr,
      pageNum,
      perPageNum,
      sortValidated,
      true,
      false,
      readmeOnly
    );

    return res.json({ items });
  } catch (err: any) {
    console.error('repo.search error', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
}