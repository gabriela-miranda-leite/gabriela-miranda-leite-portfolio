import type { GithubRepo } from '@/types/project';

export async function getRepos(): Promise<GithubRepo[]> {
  const username = process.env.GITHUB_USERNAME ?? 'gabriela-miranda-leite';

  const res = await fetch(
    `https://api.github.com/users/${username}/repos?sort=pushed&per_page=100&type=owner`,
    {
      headers: process.env.GITHUB_TOKEN
        ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
        : {},
      next: { revalidate: 3600 },
    }
  );

  if (!res.ok) return [];
  const repos: GithubRepo[] = await res.json();
  return repos.filter((r) => !r.fork && !r.archived);
}
