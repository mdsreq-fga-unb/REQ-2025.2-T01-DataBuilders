import { api } from './api';

export type UserProfile = {
  id: string;
  name: string;
  email: string;
  role: string;
  githubUsername?: string;
  avatarUrl?: string;
};

export async function getMe(): Promise<UserProfile> {
  const res = await api.get('/users/me');
  return res as UserProfile;
}

export async function updateMe(payload: { name?: string; email?: string; avatarUrl?: string }): Promise<UserProfile> {
  const res = await api.put('/users/me', payload);
  return res as UserProfile;
}

export async function changePassword(currentPassword: string, newPassword: string): Promise<void> {
  await api.put('/users/me/password', { currentPassword, newPassword });
}
