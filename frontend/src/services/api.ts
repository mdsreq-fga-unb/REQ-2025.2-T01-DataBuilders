import { supabase } from '../lib/supabase';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

type RequestInitEx = RequestInit & { json?: unknown };

async function authHeader(): Promise<Record<string, string>> {
  const { data } = await supabase.auth.getSession();
  if (data.session?.access_token) {
    return { Authorization: `Bearer ${data.session.access_token}` };
  }
  return {};
}

async function request(path: string, init: RequestInitEx = {}) {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(init.headers || {}),
    ...(await authHeader()),
  };
  const body = init.json !== undefined ? JSON.stringify(init.json) : init.body;
  const res = await fetch(`${API_BASE_URL}${path}`, { ...init, headers, body });
  const contentType = res.headers.get('content-type') || '';
  const isJson = contentType.includes('application/json');
  const data: unknown = isJson ? (await res.json() as unknown) : (await res.text() as unknown);
  if (!res.ok) {
    let message = res.statusText;
    if (isJson && typeof data === 'object' && data !== null) {
      const d = data as Record<string, unknown>;
      const m = (d.message ?? d.error);
      if (typeof m === 'string') message = m;
    }
    throw new Error(message || 'Erro na requisição');
  }
  return data;
}

export const api = {
  get: (path: string) => request(path, { method: 'GET' }),
  post: (path: string, json?: unknown) => request(path, { method: 'POST', json }),
  put: (path: string, json?: unknown) => request(path, { method: 'PUT', json }),
  patch: (path: string, json?: unknown) => request(path, { method: 'PATCH', json }),
  delete: (path: string) => request(path, { method: 'DELETE' }),
};

export type ApiListResponse<T> = { items: T[] } | T[];
