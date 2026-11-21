import type { GithubRepo } from '@/types/project';

export function getGithubUsername(): string {
  return process.env.GITHUB_USERNAME ?? 'gabriela-miranda-leite';
}

export async function getRepo(name: string): Promise<GithubRepo | null> {
  try {
    const res = await fetch(
      `https://api.github.com/repos/${getGithubUsername()}/${encodeURIComponent(name)}`,
      {
        headers: process.env.GITHUB_TOKEN
          ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
          : {},
        next: { revalidate: 3600 },
      }
    );
    if (!res.ok) return null;
    return (await res.json()) as GithubRepo;
  } catch {
    return null;
  }
}

export async function getRepos(): Promise<GithubRepo[]> {
  const username = getGithubUsername();

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
