import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { RepoEmbed } from './RepoEmbed';
import { getRepo } from '@/lib/github';
import type { GithubRepo } from '@/types/project';

jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));
jest.mock('next-intl/server', () => ({
  getLocale: async () => 'pt',
  getTranslations: async () => (key: string, values?: Record<string, unknown>) =>
    values ? `${key}:${JSON.stringify(values)}` : key,
}));
jest.mock('@/lib/github', () => ({
  getGithubUsername: () => 'gabriela-miranda-leite',
  getRepo: jest.fn(),
}));
jest.mock('@/lib/analytics', () => ({ trackEvent: jest.fn() }));

expect.extend(toHaveNoViolations);

const getRepoMock = getRepo as jest.MockedFunction<typeof getRepo>;

const repo: GithubRepo = {
  id: 1,
  name: 'bugsy',
  full_name: 'gabriela-miranda-leite/bugsy',
  description: 'Debug overlay',
  html_url: 'https://github.com/gabriela-miranda-leite/bugsy',
  language: 'Kotlin',
  stargazers_count: 5,
  forks_count: 1,
  pushed_at: '2026-11-20T00:00:00Z',
  topics: [],
};

describe('RepoEmbed', () => {
  afterEach(() => jest.resetAllMocks());

  it('renders the repo card with translated labels', async () => {
    getRepoMock.mockResolvedValue(repo);
    render(await RepoEmbed({ repo: 'bugsy' }));

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', repo.html_url);
    expect(screen.getByText('cta')).toBeInTheDocument();
    expect(screen.getByText('stars:{"count":5}')).toBeInTheDocument();
  });

  it('ignores an html_url that does not point to GitHub', async () => {
    getRepoMock.mockResolvedValue({ ...repo, html_url: 'javascript:alert(1)' });
    render(await RepoEmbed({ repo: 'bugsy' }));

    expect(screen.getByRole('link')).toHaveAttribute(
      'href',
      'https://github.com/gabriela-miranda-leite/bugsy',
    );
  });

  it('falls back to a plain link when the API is unavailable', async () => {
    getRepoMock.mockResolvedValue(null);
    render(await RepoEmbed({ repo: 'bugsy' }));

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', 'https://github.com/gabriela-miranda-leite/bugsy');
    expect(link).toHaveTextContent('gabriela-miranda-leite/bugsy');
  });

  it('labels a repo that was pushed this week', async () => {
    jest.spyOn(Date, 'now').mockReturnValue(Date.parse('2026-11-21T12:00:00Z'));
    getRepoMock.mockResolvedValue({ ...repo, created_at: '2026-01-01T00:00:00Z', pushed_at: '2026-11-20T00:00:00Z' });
    render(await RepoEmbed({ repo: 'bugsy' }));

    expect(screen.getByText('updated')).toBeInTheDocument();
    jest.restoreAllMocks();
  });

  it('has no accessibility violations', async () => {
    getRepoMock.mockResolvedValue(repo);
    const { container } = render(await RepoEmbed({ repo: 'bugsy' }));
    expect(await axe(container)).toHaveNoViolations();
  });
});
