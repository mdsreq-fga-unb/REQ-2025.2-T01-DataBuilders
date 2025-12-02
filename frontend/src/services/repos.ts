import { api } from './api';
import type { ApiListResponse } from './api';

export type RepoItem = {
  id: number;
  name: string;
  full_name: string;
  owner: string | null;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number | null;
};

type SearchParams = {
  q: string;
  language?: string;
  page?: number;
  per_page?: number;
  sort?: 'stars' | 'forks' | 'help-wanted-issues' | 'updated';
  deep?: boolean;
};

export async function searchRepos(params: SearchParams): Promise<RepoItem[]> {
  const qs = new URLSearchParams();
  qs.set('q', params.q);
  if (params.language) qs.set('language', params.language);
  if (params.page) qs.set('page', String(params.page));
  if (params.per_page) qs.set('per_page', String(params.per_page));
  if (params.sort) qs.set('sort', params.sort);
  if (params.deep !== undefined) qs.set('deep', params.deep ? 'true' : 'false');
  const res = await api.get(`/repos/search?${qs.toString()}`);
  if (Array.isArray(res)) return res as RepoItem[];
  const obj = res as ApiListResponse<RepoItem>;
  const hasItems = (o: unknown): o is { items: RepoItem[] } => (
    typeof o === 'object' && o !== null && Object.prototype.hasOwnProperty.call(o, 'items')
  );
  if (hasItems(obj)) {
    const items = obj.items;
    return Array.isArray(items) ? items : [];
  }
  return [];
}
