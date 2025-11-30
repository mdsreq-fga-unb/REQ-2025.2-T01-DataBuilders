import { Request, Response } from 'express';
import * as githubService from '../services/github.service';

const ALLOWED_SORTS = ['stars', 'forks', 'help-wanted-issues', 'updated'] as const;
type SortOpt = (typeof ALLOWED_SORTS)[number];

function parseSort(value: unknown): SortOpt | undefined {
  if (!value) return undefined;
  const s = String(value).trim();
  return (ALLOWED_SORTS as readonly string[]).includes(s) ? (s as SortOpt) : undefined;
}

function parseBoolean(value: unknown): boolean {
  if (value === undefined || value === null) return false;
  const v = String(value).toLowerCase();
  return v === 'true' || v === '1' || v === 'yes' || v === 'y';
}

export async function search(req: Request, res: Response) {
  try {
    const { q, language, page, per_page, sort, deep } = req.query;
    if (!q) return res.status(400).json({ message: 'q is required' });

    const sortValidated = parseSort(sort);
    const languageStr = language ? String(language) : undefined;
    const deepMode = parseBoolean(deep);

    const DEFAULT_PER_PAGE_NON_DEEP = 50;
    const DEFAULT_PER_PAGE_DEEP = 20;
    const MAX_PER_PAGE_NON_DEEP = 100;
    const MAX_PER_PAGE_DEEP = 50;

    const requestedPerPage = per_page ? Number(per_page) : undefined;
    let perPageNum: number;

    if (deepMode) {
      perPageNum = requestedPerPage ? Math.min(requestedPerPage, MAX_PER_PAGE_DEEP) : DEFAULT_PER_PAGE_DEEP;
    } else {
      perPageNum = requestedPerPage ? Math.min(requestedPerPage, MAX_PER_PAGE_NON_DEEP) : DEFAULT_PER_PAGE_NON_DEEP;
    }

    const pageNum = page ? Math.max(1, Number(page)) : 1;

    const items = await githubService.searchRepos(
      String(q),
      languageStr,
      pageNum,
      perPageNum,
      sortValidated,
      deepMode
    );

    res.json({ items });
  } catch (err: any) {
    console.error('search controller error', err);
    res.status(500).json({ message: 'Internal error' });
  }
}