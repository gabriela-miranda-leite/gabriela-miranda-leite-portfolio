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

const PINNED_QUERY = `
  query ($login: String!) {
    user(login: $login) {
      pinnedItems(first: 6, types: REPOSITORY) {
        nodes {
          ... on Repository {
            databaseId
            name
            nameWithOwner
            description
            url
            stargazerCount
            forkCount
            pushedAt
            isFork
            isArchived
            primaryLanguage { name }
            repositoryTopics(first: 10) { nodes { topic { name } } }
          }
        }
      }
    }
  }
`;

interface PinnedNode {
  databaseId: number;
  name: string;
  nameWithOwner: string;
  description: string | null;
  url: string;
  stargazerCount: number;
  forkCount: number;
  pushedAt: string;
  isFork: boolean;
  isArchived: boolean;
  primaryLanguage: { name: string } | null;
  repositoryTopics: { nodes: { topic: { name: string } }[] };
}

interface PinnedResponse {
  data?: { user?: { pinnedItems?: { nodes?: (PinnedNode | null)[] } } };
}

// GitHub only exposes pinned repos through GraphQL, which requires a token.
export async function getPinnedRepos(): Promise<GithubRepo[]> {
  const token = process.env.GITHUB_TOKEN;
  if (!token) return [];

  try {
    const res = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: PINNED_QUERY, variables: { login: getGithubUsername() } }),
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];

    const json = (await res.json()) as PinnedResponse;
    const nodes = json.data?.user?.pinnedItems?.nodes ?? [];

    return nodes
      .filter((n): n is PinnedNode => n !== null && !n.isFork && !n.isArchived)
      .map((n) => ({
        id: n.databaseId,
        name: n.name,
        full_name: n.nameWithOwner,
        description: n.description,
        html_url: n.url,
        language: n.primaryLanguage?.name ?? null,
        stargazers_count: n.stargazerCount,
        forks_count: n.forkCount,
        pushed_at: n.pushedAt,
        topics: n.repositoryTopics.nodes.map((t) => t.topic.name),
      }));
  } catch {
    return [];
  }
}

export async function getFeaturedRepos(limit = 3): Promise<GithubRepo[]> {
  const pinned = await getPinnedRepos();
  if (pinned.length > 0) return pinned.slice(0, limit);
  return (await getRepos()).slice(0, limit);
}
