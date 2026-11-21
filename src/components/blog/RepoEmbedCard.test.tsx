import { fireEvent, render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { RepoEmbedCard } from './RepoEmbedCard';
import { trackEvent } from '@/lib/analytics';
import type { GithubRepo } from '@/types/project';

jest.mock('@/lib/analytics', () => ({ trackEvent: jest.fn() }));

expect.extend(toHaveNoViolations);

const repo: GithubRepo = {
  id: 1,
  name: 'bugsy',
  full_name: 'gabriela-miranda-leite/bugsy',
  description: 'Debug overlay for Android and iOS.',
  html_url: 'https://github.com/gabriela-miranda-leite/bugsy',
  language: 'Kotlin',
  stargazers_count: 12,
  forks_count: 3,
  pushed_at: '2026-11-20T00:00:00Z',
  topics: ['kotlin', 'debug', 'android'],
};

const labels = {
  cta: 'Ver no GitHub',
  aria: 'bugsy no GitHub (abre em nova aba)',
  stars: '12 estrelas',
  forks: '3 forks',
  updated: 'Atualizado em 20 de nov. de 2026',
};

const href = repo.html_url;

describe('RepoEmbedCard', () => {
  it('links to the repo in a new tab with an accessible name', () => {
    render(<RepoEmbedCard repo={repo} href={href} labels={labels} />);
    const link = screen.getByRole('link', { name: labels.aria });

    expect(link).toHaveAttribute('href', href);
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', expect.stringContaining('noopener'));
  });

  it('shows name, description, stats and call to action', () => {
    render(<RepoEmbedCard repo={repo} href={href} labels={labels} />);

    expect(screen.getByText('gabriela-miranda-leite/bugsy')).toBeInTheDocument();
    expect(screen.getByText(repo.description as string)).toBeInTheDocument();
    expect(screen.getByText(labels.stars)).toBeInTheDocument();
    expect(screen.getByText(labels.forks)).toBeInTheDocument();
    expect(screen.getByText(labels.updated)).toBeInTheDocument();
    expect(screen.getByText(labels.cta)).toBeInTheDocument();
  });

  it('shows the language chip once, even when it is also a topic', () => {
    render(<RepoEmbedCard repo={repo} href={href} labels={labels} />);

    expect(screen.getAllByText('Kotlin')).toHaveLength(1);
    expect(screen.getByText('debug')).toBeInTheDocument();
  });

  it('caps the number of topic chips', () => {
    const topics = Array.from({ length: 12 }, (_, i) => `topic-${i}`);
    render(<RepoEmbedCard repo={{ ...repo, topics }} href={href} labels={labels} />);

    expect(screen.getByText('topic-4')).toBeInTheDocument();
    expect(screen.queryByText('topic-5')).not.toBeInTheDocument();
  });

  it('hides stars and forks when they are zero', () => {
    render(
      <RepoEmbedCard
        repo={{ ...repo, stargazers_count: 0, forks_count: 0 }}
        href={href}
        labels={labels}
      />,
    );

    expect(screen.queryByText(labels.stars)).not.toBeInTheDocument();
    expect(screen.queryByText(labels.forks)).not.toBeInTheDocument();
  });

  it('tracks the click', () => {
    render(<RepoEmbedCard repo={repo} href={href} labels={labels} />);
    fireEvent.click(screen.getByRole('link'));

    expect(trackEvent).toHaveBeenCalledWith(
      expect.objectContaining({ screen: 'blog', action: 'button_clicked' }),
    );
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<RepoEmbedCard repo={repo} href={href} labels={labels} />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
