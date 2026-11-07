import type { GithubRepo } from '@/types/project';

const PINNED_FILE = 'src/content/pinned.json';

export async function getRepos(): Promise<GithubRepo[]> {
  const username = process.env.GITHUB_USERNAME ?? 'gabrielaleite';

  const res = await fetch(
    `https://api.github.com/users/${username}/repos?sort=pushed&per_page=20`,
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
