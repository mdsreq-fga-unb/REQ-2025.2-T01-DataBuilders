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

  // 1) plural simple: +s (cobertura -> coberturas)
  if (!token.endsWith('s')) variants.add(token + 's');

  // 2) if ends with 'ão' -> 'ões' and 'ãos' (common variants)
  if (token.endsWith('ao')) {
    variants.add(token.replace(/ao$/, 'oes')); // ordenacao -> ordenacoes
    variants.add(token.replace(/ao$/, 'aos')); // raro, mas cobre casos
  }

  // 3) if ends with 'm' -> replace with 'ns' (item -> itens)
  if (token.endsWith('m')) {
    variants.add(token.replace(/m$/, 'ns'));
  }

  // 4) if ends with 'l' -> replace with 'is' (papel -> papeis)
  if (token.endsWith('l')) {
    variants.add(token.replace(/l$/, 'is'));
    // also try replacing 'il' -> 'is' (fácil -> faciles) — but careful: 'bil'->'bis'
    if (token.endsWith('il')) {
      variants.add(token.replace(/il$/, 'is'));
    }
  }

  // 5) if ends with 'r', 'z', 'n' -> +es (valor -> valores)
  if (/[rzn]$/.test(token)) {
    variants.add(token + 'es');
  }

  // 6) handle English-ish endings common in CS: 'y' -> 'ies' (array -> arrays; but many false positives)
  // We'll add a conservative rule: if ends with 'y' and not vowel+y, add +s
  if (token.endsWith('y')) {
    variants.add(token + 's');
  }

  // 7) acronyms/abbrev: keep original uppercase form normalized already; also add lowercase (already)
  // 8) fallback: the singular form without trailing 's' if user typed plural
  if (token.endsWith('s')) {
    const sing = token.replace(/s$/, '');
    if (sing) variants.add(sing);
  }

  // 9) small domain-driven extra (algoritmo -> algoritmos etc.) covered by +s; add some manual technical variants
  const domainExtras = ['avl', 'red', 'black', 'bst', 'heap', 'merge', 'quick', 'insertion', 'bubble'];
  if (domainExtras.includes(token)) {
    variants.add(token); // already
    variants.add(token + 's');
  }

  // dedupe and return array
  return Array.from(variants);
}

/** get README text (base64 -> utf8) */
async function getReadmeText(owner: string, repo: string): Promise<string | null> {
  try {
    const res = await octokit.repos.getReadme({ owner, repo });
    const b64 = (res.data.content as unknown as string) || '';
    // decode base64 (handle typings)
    const buff = Buffer.from(b64, 'base64');
    return buff.toString('utf8');
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

type SortOpt = 'stars' | 'forks' | 'help-wanted-issues' | 'updated';

type RepoResult = {
  id: number;
  name: string;
  full_name: string;
  owner: string | null;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number | null;
};

/**
 * searchReposAdvancedWithPlurals
 * - q: search terms
 * - languageFilter: contains-language (any language present)
 * - deep: when true, performs README + languages checks
 * - exactWordMatchInReadme: when true, require whole-word match in README (regex \b)
 */
export async function searchRepos(
  q: string,
  languageFilter?: string,
  page = 1,
  per_page = 20,
  sort?: SortOpt,
  deep = true,
  exactWordMatchInReadme = false
): Promise<RepoResult[]> {
  if (!q || !q.trim()) return [];

  // tokens raw
  const rawTokens = q.trim().split(/\s+/);

  // build tokenQueries using generated variants but LIMIT number of variants per token to avoid very large queries
  const tokenQueriesParts: string[] = [];
  for (const tok of rawTokens) {
    const variants = generateVariants(tok);
    // limit to max 6 variants to avoid query explosion
    const limited = variants.slice(0, 6);
    // escape and wrap multi-word variants in quotes
    const escaped = limited.map(v => (/\s/.test(v) ? `"${v}"` : v));
    tokenQueriesParts.push(`(${escaped.join(' OR ')})`);
  }

  let query = `${tokenQueriesParts.join(' ')} in:name,readme,description`;
  if (Array.isArray(ALLOWED_ORGS) && ALLOWED_ORGS.length) {
    const orgClause = '(' + ALLOWED_ORGS.map(o => `org:${o}`).join(' OR ') + ')';
    query = `${query} ${orgClause}`;
  }
  const params: any = { q: query, page, per_page };
  if (sort) params.sort = sort;

  const searchRes = await octokit.search.repos(params);
  const items = searchRes.data.items || [];
  const DEEP_LIMIT = 30;
  const itemsToProcess = deep ? items.slice(0, DEEP_LIMIT) : items;

  if (!deep) {
    const mapped = items
      .filter(i => {
        if (!languageFilter) return true;
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
        stargazers_count: i.stargazers_count ?? null
      }));
    return mapped;
  }

  const results: RepoResult[] = [];

  for (const repo of itemsToProcess) {
    const ownerLogin = repo.owner?.login;
    if (!ownerLogin) continue;

    // NAME matching: split identifier into tokens and compare against variants/stems
    const nameTokens = splitIdentifier(repo.name); // normalized tokens
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

    // DESCRIPTION check
    const desc = repo.description ? normalize(repo.description) : '';
    const descMatch = rawTokens.some(rt => {
      const vars = generateVariants(rt);
      return vars.some(v => desc.includes(v));
    });

    // README check
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
    } catch (err) {
      readmeMatch = false;
    }

    const candidateMatch = nameMatch || descMatch || readmeMatch;
    if (!candidateMatch) continue;

    // language containment check
    if (languageFilter && languageFilter.trim()) {
      const hasLang = await repoContainsLanguage(ownerLogin, repo.name, languageFilter);
      if (!hasLang) continue;
    }

    results.push({
      id: repo.id,
      name: repo.name,
      full_name: repo.full_name,
      owner: ownerLogin,
      html_url: repo.html_url,
      description: repo.description ?? null,
      language: repo.language ?? null,
      stargazers_count: repo.stargazers_count ?? null
    });
  }

  return results;
}
