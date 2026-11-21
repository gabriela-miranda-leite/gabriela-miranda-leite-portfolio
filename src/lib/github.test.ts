import { getFeaturedRepos, getPinnedRepos, getRepo } from './github';

const originalFetch = global.fetch;

afterEach(() => {
  global.fetch = originalFetch;
  delete process.env.GITHUB_TOKEN;
  delete process.env.GITHUB_USERNAME;
});

describe('getRepo', () => {
  it('requests the repo of the configured user with ISR revalidation', async () => {
    process.env.GITHUB_USERNAME = 'someone';
    const fetchMock = jest.fn().mockResolvedValue({ ok: true, json: async () => ({ name: 'bugsy' }) });
    global.fetch = fetchMock;

    await expect(getRepo('bugsy')).resolves.toEqual({ name: 'bugsy' });
    expect(fetchMock).toHaveBeenCalledWith(
      'https://api.github.com/repos/someone/bugsy',
      expect.objectContaining({ next: { revalidate: 3600 } }),
    );
  });

  it('sends the token only when it is configured', async () => {
    process.env.GITHUB_TOKEN = 'secret';
    const fetchMock = jest.fn().mockResolvedValue({ ok: true, json: async () => ({}) });
    global.fetch = fetchMock;

    await getRepo('bugsy');
    expect(fetchMock.mock.calls[0][1].headers).toEqual({ Authorization: 'Bearer secret' });
  });

  it('returns null on a non-ok response', async () => {
    global.fetch = jest.fn().mockResolvedValue({ ok: false });
    await expect(getRepo('missing')).resolves.toBeNull();
  });

  it('returns null when the request throws', async () => {
    global.fetch = jest.fn().mockRejectedValue(new Error('offline'));
    await expect(getRepo('bugsy')).resolves.toBeNull();
  });

  it('encodes the repo name in the URL', async () => {
    const fetchMock = jest.fn().mockResolvedValue({ ok: true, json: async () => ({}) });
    global.fetch = fetchMock;

    await getRepo('a/b');
    expect(fetchMock.mock.calls[0][0]).toContain('/a%2Fb');
  });
});

describe('getPinnedRepos / getFeaturedRepos', () => {
  const node = {
    databaseId: 7,
    name: 'bugsy',
    nameWithOwner: 'someone/bugsy',
    description: 'desc',
    url: 'https://github.com/someone/bugsy',
    stargazerCount: 2,
    forkCount: 1,
    pushedAt: '2026-11-20T00:00:00Z',
    isFork: false,
    isArchived: false,
    primaryLanguage: { name: 'Kotlin' },
    repositoryTopics: { nodes: [{ topic: { name: 'kmp' } }] },
  };
  const gql = (nodes: unknown[]) => ({ ok: true, json: async () => ({ data: { user: { pinnedItems: { nodes } } } }) });

  it('returns nothing without a token, without calling the API', async () => {
    const fetchMock = jest.fn();
    global.fetch = fetchMock;

    await expect(getPinnedRepos()).resolves.toEqual([]);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('maps pinned repos and drops forks and archived ones', async () => {
    process.env.GITHUB_TOKEN = 'secret';
    global.fetch = jest.fn().mockResolvedValue(
      gql([node, { ...node, name: 'forked', isFork: true }, { ...node, name: 'old', isArchived: true }, null]),
    );

    await expect(getPinnedRepos()).resolves.toEqual([
      {
        id: 7,
        name: 'bugsy',
        full_name: 'someone/bugsy',
        description: 'desc',
        html_url: 'https://github.com/someone/bugsy',
        language: 'Kotlin',
        stargazers_count: 2,
        forks_count: 1,
        pushed_at: '2026-11-20T00:00:00Z',
        topics: ['kmp'],
      },
    ]);
  });

  it('returns nothing when the request fails', async () => {
    process.env.GITHUB_TOKEN = 'secret';
    global.fetch = jest.fn().mockRejectedValue(new Error('offline'));
    await expect(getPinnedRepos()).resolves.toEqual([]);
  });

  it('features pinned repos when there are any', async () => {
    process.env.GITHUB_TOKEN = 'secret';
    global.fetch = jest.fn().mockResolvedValue(gql([node]));

    const repos = await getFeaturedRepos(3);
    expect(repos.map((r) => r.name)).toEqual(['bugsy']);
  });

  it('falls back to the most recently pushed repos when nothing is pinned', async () => {
    process.env.GITHUB_TOKEN = 'secret';
    const rest = [1, 2, 3, 4].map((id) => ({ id, name: `r${id}`, fork: false, archived: false }));
    global.fetch = jest
      .fn()
      .mockResolvedValueOnce(gql([]))
      .mockResolvedValueOnce({ ok: true, json: async () => rest });

    const repos = await getFeaturedRepos(3);
    expect(repos.map((r) => r.name)).toEqual(['r1', 'r2', 'r3']);
  });
});
