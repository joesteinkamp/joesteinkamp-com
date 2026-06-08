// Build-time GitHub fetch. Writes src/data/github.json so the site can be fully
// static. Resilient by design: on any failure it keeps the existing cache and
// exits 0, so a GitHub outage or rate-limit never breaks a deploy.
//
// Set GITHUB_TOKEN in CI to raise the rate limit (optional locally).

import { writeFileSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const USER = 'joesteinkamp';
const OUT = fileURLToPath(new URL('../src/data/github.json', import.meta.url));

const headers = {
  Accept: 'application/vnd.github+json',
  'User-Agent': USER,
  'X-GitHub-Api-Version': '2022-11-28',
};
if (process.env.GITHUB_TOKEN) {
  headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
}

try {
  const res = await fetch(
    `https://api.github.com/users/${USER}/repos?sort=updated&per_page=100`,
    { headers },
  );
  if (!res.ok) throw new Error(`GitHub API responded ${res.status}`);
  const repos = await res.json();

  const data = {
    fetchedAt: new Date().toISOString(),
    repos: repos
      .filter((r) => !r.fork && !r.archived)
      .slice(0, 12)
      .map((r) => ({
        name: r.name,
        description: r.description,
        url: r.html_url,
        stars: r.stargazers_count,
        language: r.language,
        updatedAt: r.updated_at,
        topics: r.topics ?? [],
      })),
  };

  writeFileSync(OUT, JSON.stringify(data, null, 2) + '\n');
  console.log(`✓ github: wrote ${data.repos.length} repos`);
} catch (err) {
  let kept = 0;
  try {
    kept = JSON.parse(readFileSync(OUT, 'utf8')).repos?.length ?? 0;
  } catch {}
  console.warn(`! github fetch failed (${err.message}); keeping cache (${kept} repos)`);
  process.exitCode = 0;
}
