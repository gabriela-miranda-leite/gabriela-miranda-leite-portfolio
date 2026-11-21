import { getRepo } from './github';

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
