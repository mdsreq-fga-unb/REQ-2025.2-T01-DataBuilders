import { Octokit } from '@octokit/rest';
import { GITHUB_TOKEN } from '../config';

const octokit = new Octokit({
  auth: GITHUB_TOKEN || undefined
});

export async function searchRepos(q: string, language?: string, page = 1, per_page = 20, sort?: string) {
  let query = q;
  if (language) query += ` language:${language}`;
  const res = await octokit.search.repos({
    q: query,
    page,
    per_page,
    sort: sort || 'best-match'
  });
  return res.data.items.map(i => ({
    id: i.id,
    name: i.name,
    full_name: i.full_name,
    owner: i.owner.login,
    html_url: i.html_url,
    description: i.description,
    language: i.language,
    stargazers_count: i.stargazers_count
  }));
}