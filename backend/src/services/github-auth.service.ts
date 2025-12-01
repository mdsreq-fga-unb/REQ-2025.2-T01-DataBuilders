import { Octokit } from '@octokit/rest';
import { prisma } from '../prisma/client';
import jwt from 'jsonwebtoken';
import { JWT_SECRET, GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } from '../config';

export async function exchangeCodeForToken(code: string): Promise<string> {
  const response = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      client_id: GITHUB_CLIENT_ID,
      client_secret: GITHUB_CLIENT_SECRET,
      code
    })
  });

  const data = await response.json();

  if (!data.access_token) {
    throw new Error(data.error_description || 'Failed to exchange code for token');
  }

  return data.access_token;
}

export async function getGitHubUser(accessToken: string) {
  const octokit = new Octokit({ auth: accessToken });

  const { data: user } = await octokit.users.getAuthenticated();

  let email = user.email;
  if (!email) {
    const { data: emails } = await octokit.users.listEmailsForAuthenticatedUser();
    const primaryEmail = emails.find(e => e.primary);
    email = primaryEmail?.email || `${user.login}@users.noreply.github.com`;
  }

  return {
    id: user.id,
    login: user.login,
    name: user.name || user.login,
    email,
    avatar_url: user.avatar_url
  };
}

export async function authenticateWithGitHub(code: string) {
  const accessToken = await exchangeCodeForToken(code);
  const githubUser = await getGitHubUser(accessToken);

  let user = await prisma.user.findUnique({
    where: { githubId: String(githubUser.id) }
  });

  if (!user) {
    user = await prisma.user.findUnique({
      where: { email: githubUser.email }
    });

    if (user) {
      user = await prisma.user.update({
        where: { id: user.id },
        data: {
          githubId: String(githubUser.id),
          githubUsername: githubUser.login,
          avatarUrl: githubUser.avatar_url,
          name: githubUser.name
        }
      });
    } else {
      user = await prisma.user.create({
        data: {
          email: githubUser.email,
          name: githubUser.name,
          githubId: String(githubUser.id),
          githubUsername: githubUser.login,
          avatarUrl: githubUser.avatar_url,
          role: 'MONITOR'
        }
      });
    }
  }

  const token = jwt.sign(
    {
      sub: user.id,
      role: user.role,
      email: user.email,
      githubUsername: user.githubUsername
    },
    JWT_SECRET,
    { expiresIn: '8h' }
  );

  return {
    token,
    user
  };
}
