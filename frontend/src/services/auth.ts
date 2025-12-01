import { api } from './api';

type LoginResponse = { token: string; user: { id: string; name: string; email: string; role: string; githubUsername?: string; avatarUrl?: string } };

export async function login(email: string, password: string): Promise<LoginResponse> {
  const data = await api.post('/auth/login', { email, password });
  if (data?.token) localStorage.setItem('authToken', data.token);
  return data as LoginResponse;
}

export async function register(name: string, email: string, password: string, role?: string) {
  return api.post('/auth/register', { name, email, password, role });
}

type GitHubInitResponse = { authUrl: string };

export async function getGitHubAuthUrl(): Promise<string> {
  const res = await api.get('/auth/github');
  return (res as GitHubInitResponse).authUrl;
}

export async function githubCallback(code: string) {
  const params = new URLSearchParams({ code });
  const res = await api.get(`/auth/github/callback?${params.toString()}`) as unknown as LoginResponse;
  if (res?.token) localStorage.setItem('authToken', res.token);
  return res;
}

export function logout() {
  localStorage.removeItem('authToken');
}
