import { Octokit } from '@octokit/rest';
import { GITHUB_TOKEN, ALLOWED_ORGS } from '../config';

const octokit = new Octokit({ auth: GITHUB_TOKEN || undefined });

/** normalize: remove diacríticos + lowercase */
function normalize(s: string) {
  return s.normalize('NFD').replace(/[\p{Diacritic}]/gu, '').toLowerCase();
}

/** splitIdentifier: CamelCase / snake_case / kebab-case -> tokens normalizados */
function splitIdentifier(name: string): string[] {
  if (!name) return [];
  const step1 = name.replace(/[-_]+/g, ' ');
  const step2 = step1.replace(/([a-z0-9])([A-Z])/g, '$1 $2');
  const rawTokens = step2.split(/[^A-Za-z0-9]+/).filter(Boolean);
  return rawTokens.map(normalize);
}

/** escape for regex */
function escapeRegex(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/** Basic heuristic plural/variants generator (no external libs) */
function generateVariants(tokenRaw: string): string[] {
  const token = normalize(tokenRaw);
  const variants = new Set<string>();
  if (!token) return [];

  variants.add(token); // original normalized

  // 1) plural simple: +s
  if (!token.endsWith('s')) variants.add(token + 's');

  // 2) if ends with 'ao' -> 'oes' and 'aos'
  if (token.endsWith('ao')) {
    variants.add(token.replace(/ao$/, 'oes'));
    variants.add(token.replace(/ao$/, 'aos'));
  }

  // 3) m -> ns
  if (token.endsWith('m')) {
    variants.add(token.replace(/m$/, 'ns'));
  }

  // 4) l -> is (papel -> papeis)
  if (token.endsWith('l')) {
    variants.add(token.replace(/l$/, 'is'));
    if (token.endsWith('il')) {
      variants.add(token.replace(/il$/, 'is'));
    }
  }

  // 5) r/z/n -> +es
  if (/[rzn]$/.test(token)) {
    variants.add(token + 'es');
  }

  // 6) y -> +s (conservador)
  if (token.endsWith('y')) {
    variants.add(token + 's');
  }

  // 8) if token ends with 's', add singular candidate
  if (token.endsWith('s')) {
    const sing = token.replace(/s$/, '');
    if (sing) variants.add(sing);
  }

  // 9) domain extras (common algorithm names)
  const domainExtras = ['avl', 'red', 'black', 'bst', 'heap', 'merge', 'quick', 'insertion', 'bubble', 'dijkstra'];
  if (domainExtras.includes(token)) {
    variants.add(token);
    variants.add(token + 's');
  }

  return Array.from(variants);
}

/** get README text (base64 -> utf8) */
async function getReadmeText(owner: string, repo: string): Promise<string | null> {
  try {
    const res = await octokit.repos.getReadme({ owner, repo });
    // octokit may provide content base64-encoded in res.data.content
    // When using octokit.repos.getReadme the response has data.content (base64) OR data as a blob depending on accept headers.
    // We'll try to decode content if present, otherwise attempt to get the raw content.
    // @ts-ignore
    const b64 = (res.data && (res.data.content as string)) || null;
    if (b64) {
      const buff = Buffer.from(b64, 'base64');
      return buff.toString('utf8');
    }
    // fallback: sometimes res.data has `.content` undefined; try to fetch README as raw text
    try {
      const raw = await octokit.request('GET /repos/{owner}/{repo}/readme', {
        owner,
        repo,
        headers: { accept: 'application/vnd.github.v3.raw' }
      });
      if (typeof raw.data === 'string') return raw.data;
    } catch {
      // ignore fallback error
    }
    return null;
  } catch (err: any) {
    return null;
  }
}

/** check if repo contains language (listLanguages) */
async function repoContainsLanguage(owner: string, repo: string, language: string): Promise<boolean> {
  try {
    const res = await octokit.repos.listLanguages({ owner, repo });
    const langs = Object.keys(res.data).map(normalize);
    return langs.includes(normalize(language));
  } catch (err) {
    return false;
  }
}

/** helper to check README existence without loading large content (tries getReadmeText but returns boolean) */
async function checkReadmeExists(owner: string, repo: string): Promise<boolean> {
  try {
    const res = await octokit.repos.getReadme({ owner, repo });
    return !!res.data;
  } catch {
    return false;
  }
}

type SortOpt = 'stars' | 'forks' | 'help-wanted-issues' | 'updated';

type ApiRepoItem = {
  id: number;
  name: string;
  full_name: string;
  owner: string | null;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number | null;
  readmeExists: boolean;
  updated_at: string | null;
};

/**
 * searchRepos
 *
 * q: search terms
 * languageFilter: optional string (used for contains-language check when deep=true)
 * page, per_page: pagination for GitHub Search
 * sort: GitHub allowed sort or undefined (omitted -> best-match)
 * deep: when true, performs per-repo checks (README, languages) for top results
 * exactWordMatchInReadme: when true, use word-boundary regex for README matching
 * readmeOnly: when true, only return repos that have README (readmeExists === true)
 */
export async function searchRepos(
  q: string,
  languageFilter?: string,
  page = 1,
  per_page = 20,
  sort?: SortOpt,
  deep = true,
  exactWordMatchInReadme = false,
  readmeOnly?: boolean
): Promise<ApiRepoItem[]> {
  if (!q || !q.trim()) return [];

  const rawTokens = q.trim().split(/\s+/);

  // build tokenQueries using generated variants but limit number of variants per token
  const tokenQueriesParts: string[] = [];
  for (const tok of rawTokens) {
    const variants = generateVariants(tok);
    const limited = variants.slice(0, 6);
    const escaped = limited.map(v => (/\s/.test(v) ? `"${v}"` : v));
    tokenQueriesParts.push(`(${escaped.join(' OR ')})`);
  }

  // base query: force searching in name,readme,description
  let queryStr = `${tokenQueriesParts.join(' ')} in:name,readme,description`;

  // If ALLOWED_ORGS is set and non-empty, restrict to these organizations
  if (Array.isArray(ALLOWED_ORGS) && ALLOWED_ORGS.length) {
    const orgClause = '(' + ALLOWED_ORGS.map(o => `org:${o}`).join(' OR ') + ')';
    queryStr = `${queryStr} ${orgClause}`;
  }

  const params: any = { q: queryStr, page, per_page };
  if (sort) params.sort = sort;

  const searchRes = await octokit.search.repos(params);
  const items = searchRes.data.items || [];

  // limit number of repos to deepen checks (prevent many per-repo requests)
  const DEEP_LIMIT = 30;
  const itemsToProcess = deep ? items.slice(0, DEEP_LIMIT) : items;

  // if not deep, we do a cheap mapping and light language filter (primary language only)
  if (!deep) {
    const mapped = items
      .filter(i => {
        if (!languageFilter) return true;
        // cheap check: compare primary language (may not represent "contains")
        return (i.language && normalize(i.language) === normalize(languageFilter));
      })
      .map(i => ({
        id: i.id,
        name: i.name,
        full_name: i.full_name,
        owner: i.owner?.login ?? null,
        html_url: i.html_url,
        description: i.description ?? null,
        language: i.language ?? null,
        stargazers_count: i.stargazers_count ?? null,
        readmeExists: false, // not checked in shallow mode
        updated_at: (i.updated_at ?? i.pushed_at ?? null) as string | null
      }));
    // if readmeOnly is requested but we didn't check README in shallow mode, we must filter them out (conservative)
    if (readmeOnly) {
      // do a synchronous loop to check README existence (but shallow mode wasn't intended for readmeOnly)
      const resultsWithReadme: ApiRepoItem[] = [];
      for (const r of mapped) {
        if (!r.owner) continue;
        const has = await checkReadmeExists(r.owner, r.name);
        if (has) {
          resultsWithReadme.push({ ...r, readmeExists: true });
        }
      }
      return resultsWithReadme;
    }
    return mapped;
  }

  // deep mode -> perform per-repo checks
  const results: ApiRepoItem[] = [];

  // Note: sequential processing to avoid burst rate-limit. Consider adding concurrency limiter (p-limit) and caching in production.
  for (const repo of itemsToProcess) {
    const ownerLogin = repo.owner?.login;
    if (!ownerLogin) continue;

    // NAME check
    const nameTokens = splitIdentifier(repo.name);
    const fullNameTokens = splitIdentifier(repo.full_name);
    let nameMatch = false;
    for (const rawTok of rawTokens) {
      const variants = generateVariants(rawTok);
      for (const v of variants) {
        if (nameTokens.includes(v) || fullNameTokens.includes(v)) {
          nameMatch = true;
          break;
        }
      }
      if (nameMatch) break;
    }

    // DESCRIPTION (About) check
    const desc = repo.description ? normalize(repo.description) : '';
    const descMatch = rawTokens.some(rt => {
      const vars = generateVariants(rt);
      return vars.some(v => desc.includes(v));
    });

    // README check (download and inspect)
    let readmeText: string | null = null;
    let readmeMatch = false;
    try {
      readmeText = await getReadmeText(ownerLogin, repo.name);
      if (readmeText) {
        const normalizedReadme = normalize(readmeText);
        if (exactWordMatchInReadme) {
          readmeMatch = rawTokens.some(rt => {
            const vars = generateVariants(rt);
            return vars.some(v => {
              const rx = new RegExp(`\\b${escapeRegex(v)}\\b`, 'iu');
              return rx.test(readmeText as string);
            });
          });
        } else {
          readmeMatch = rawTokens.some(rt => {
            const vars = generateVariants(rt);
            return vars.some(v => normalizedReadme.includes(v));
          });
        }
      }
    } catch {
      readmeMatch = false;
    }

    const candidateMatch = nameMatch || descMatch || readmeMatch;
    if (!candidateMatch) continue;

    // If readmeOnly was requested, require README match/existence
    const hasAnyReadme = !!readmeText || await checkReadmeExists(ownerLogin, repo.name);
    if (readmeOnly && !hasAnyReadme) continue;

    // language containment check
    if (languageFilter && languageFilter.trim()) {
      const hasLang = await repoContainsLanguage(ownerLogin, repo.name, languageFilter);
      if (!hasLang) continue;
    }

    // If we got here, repo is accepted: build ApiRepoItem
    results.push({
      id: repo.id,
      name: repo.name,
      full_name: repo.full_name,
      owner: ownerLogin,
      html_url: repo.html_url,
      description: repo.description ?? null,
      language: repo.language ?? null,
      stargazers_count: repo.stargazers_count ?? null,
      readmeExists: !!readmeMatch || !!readmeText,
      updated_at: (repo.updated_at ?? repo.pushed_at ?? null) as string | null
    });
  }

  return results;
}