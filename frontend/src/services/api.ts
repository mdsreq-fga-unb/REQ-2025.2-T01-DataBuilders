const API_BASE_URL = (import.meta.env.VITE_API_URL || 'http://localhost:3000') as string;

type RequestInitEx = RequestInit & { json?: unknown };

type HeadersRecord = Record<string, string>;

function authHeader(): HeadersRecord {
  const token = localStorage.getItem('authToken');
  if (!token) return {};
  return { Authorization: `Bearer ${token}` };
}

function normalizeHeaders(initHeaders?: HeadersInit, auth?: HeadersRecord): HeadersRecord {
  const headers: HeadersRecord = {
    'Content-Type': 'application/json',
  };

  if (!initHeaders) {
    if (auth && auth.Authorization) headers.Authorization = auth.Authorization;
    return headers;
  }

  if (initHeaders instanceof Headers) {
    initHeaders.forEach((value, key) => {
      headers[key] = value;
    });
  } else if (Array.isArray(initHeaders)) {
    for (const [k, v] of initHeaders) {
      headers[k] = v;
    }
  } else {
    Object.assign(headers, initHeaders as Record<string, string>);
  }

  if (auth && auth.Authorization) headers.Authorization = auth.Authorization;
  return headers;
}

async function request(path: string, init: RequestInitEx = {}) {
  const auth = authHeader();
  const headers = normalizeHeaders(init.headers, auth);

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
  delete: (path: string) => request(path, { method: 'DELETE' }),
};

export type ApiListResponse<T> = { items: T[] } | T[];