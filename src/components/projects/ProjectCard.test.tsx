import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';

import { ProjectCard } from './ProjectCard';
import { trackEvent } from '@/lib/analytics';
import { fireEvent } from '@testing-library/react';
import type { GithubRepo } from '@/types/project';

jest.mock('next-intl', () => ({
  useLocale: () => 'pt',
  useTranslations: () => (key: string, values?: Record<string, unknown>) =>
    values ? `${key}:${Object.values(values).join('/')}` : key,
}));
jest.mock('@/lib/analytics', () => ({ trackEvent: jest.fn() }));

expect.extend(toHaveNoViolations);

const mockRepo: GithubRepo = {
  id: 1,
  name: 'my-project',
  full_name: 'gabrielaleite/my-project',
  description: 'A sample project description.',
  html_url: 'https://github.com/gabrielaleite/my-project',
  language: 'TypeScript',
  stargazers_count: 12,
  forks_count: 2,
  pushed_at: '2024-06-01T00:00:00Z',
  topics: ['react', 'nextjs'],
};

describe('ProjectCard', () => {
  beforeEach(() => jest.clearAllMocks());

  it('renders owner/name, name and description', () => {
    render(<ProjectCard repo={mockRepo} />);

    expect(screen.getByText('gabrielaleite/my-project')).toBeInTheDocument();
    expect(screen.getByText('my-project')).toBeInTheDocument();
    expect(screen.getByText('A sample project description.')).toBeInTheDocument();
  });

  it('renders the language and topics as chips', () => {
    render(<ProjectCard repo={mockRepo} />);

    ['TypeScript', 'react', 'nextjs'].forEach((chip) => expect(screen.getByText(chip)).toBeInTheDocument());
  });

  it('does not repeat the language as a topic', () => {
    render(<ProjectCard repo={{ ...mockRepo, topics: ['typescript', 'react'] }} />);
    expect(screen.getAllByText(/^typescript$/i)).toHaveLength(1);
  });

  it('shows stars, forks and the translated call to action', () => {
    render(<ProjectCard repo={mockRepo} />);

    expect(screen.getByText('stars:12')).toBeInTheDocument();
    expect(screen.getByText('forks:2')).toBeInTheDocument();
    expect(screen.getByText('cta')).toBeInTheDocument();
  });

  it('links to the GitHub URL in a new tab with an accessible name', () => {
    render(<ProjectCard repo={mockRepo} />);
    const link = screen.getByRole('link', { name: 'aria:my-project' });

    expect(link).toHaveAttribute('href', 'https://github.com/gabrielaleite/my-project');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('renders without description or stars gracefully', () => {
    render(<ProjectCard repo={{ ...mockRepo, description: null, stargazers_count: 0, forks_count: 0 }} />);

    expect(screen.getByText('my-project')).toBeInTheDocument();
    expect(screen.queryByText(/^stars:/)).not.toBeInTheDocument();
    expect(screen.queryByText(/^forks:/)).not.toBeInTheDocument();
  });

  it('is flush in the grid and tracks the projects page by default', () => {
    render(<ProjectCard repo={mockRepo} />);
    const link = screen.getByRole('link');
    expect(link).toHaveClass('repo-card--fill');

    fireEvent.click(link);
    expect(trackEvent).toHaveBeenCalledWith({
      screen: 'projects',
      action: 'button_clicked',
      reference: 'Abriu o projeto my-project',
    });
  });

  it('tracks the home screen when rendered there', () => {
    render(<ProjectCard repo={mockRepo} screen="home" />);
    fireEvent.click(screen.getByRole('link'));

    expect(trackEvent).toHaveBeenCalledWith(expect.objectContaining({ screen: 'home' }));
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<ProjectCard repo={mockRepo} />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
