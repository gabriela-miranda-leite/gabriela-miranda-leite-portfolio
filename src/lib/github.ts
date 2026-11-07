import { readFileSync } from 'fs';
import { join } from 'path';
import type { GithubRepo } from '@/types/project';

export async function getRepos(): Promise<GithubRepo[]> {
  const username = process.env.GITHUB_USERNAME ?? 'gabrielaleite';

  const res = await fetch(
    `https://api.github.com/users/${username}/repos?sort=pushed&per_page=100`,
    {
      headers: process.env.GITHUB_TOKEN
        ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
        : {},
      next: { revalidate: 3600 },
    }
  );

  if (!res.ok) return [];
  return res.json();
}

export async function getPinnedRepos(): Promise<GithubRepo[]> {
  let pinned: string[] = [];
  try {
    const raw = readFileSync(join(process.cwd(), 'src/content/pinned.json'), 'utf-8');
    pinned = JSON.parse(raw);
  } catch {
    return [];
  }

  if (pinned.length === 0) return [];

  const all = await getRepos();
  const pinnedSet = new Set(pinned);
  const filtered = all.filter((r) => pinnedSet.has(r.name));

  // Preserve the order defined in pinned.json
  return pinned
    .map((name) => filtered.find((r) => r.name === name))
    .filter((r): r is GithubRepo => r !== undefined);
}
