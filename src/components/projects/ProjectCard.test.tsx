import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';

import { ProjectCard } from './ProjectCard';
import type { GithubRepo } from '@/types/project';

expect.extend(toHaveNoViolations);

const mockRepo: GithubRepo = {
  id: 1,
  name: 'my-project',
  full_name: 'gabrielaleite/my-project',
  description: 'A sample project description.',
  html_url: 'https://github.com/gabrielaleite/my-project',
  language: 'TypeScript',
  stargazers_count: 12,
  pushed_at: '2024-06-01T00:00:00Z',
  topics: ['react', 'nextjs'],
};

describe('ProjectCard', () => {
  it('renders repo name', () => {
    render(<ProjectCard repo={mockRepo} />);
    expect(screen.getByText('my-project')).toBeInTheDocument();
  });

  it('renders repo description', () => {
    render(<ProjectCard repo={mockRepo} />);
    expect(screen.getByText('A sample project description.')).toBeInTheDocument();
  });

  it('renders language chip', () => {
    render(<ProjectCard repo={mockRepo} />);
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
  });

  it('renders topics', () => {
    render(<ProjectCard repo={mockRepo} />);
    expect(screen.getByText('react')).toBeInTheDocument();
    expect(screen.getByText('nextjs')).toBeInTheDocument();
  });

  it('renders all topics, without repeating the language', () => {
    const many: GithubRepo = {
      ...mockRepo,
      topics: ['react', 'nextjs', 'jest', 'typescript', 'storybook'],
    };
    render(<ProjectCard repo={many} />);
    ['react', 'nextjs', 'jest', 'storybook'].forEach((t) =>
      expect(screen.getByText(t)).toBeInTheDocument()
    );
    expect(screen.getAllByText(/^typescript$/i)).toHaveLength(1);
  });

  it('renders star count', () => {
    render(<ProjectCard repo={mockRepo} />);
    expect(screen.getByText('12')).toBeInTheDocument();
  });

  it('links to the correct GitHub URL', () => {
    render(<ProjectCard repo={mockRepo} />);
    expect(screen.getByRole('link')).toHaveAttribute(
      'href',
      'https://github.com/gabrielaleite/my-project'
    );
  });

  it('opens in a new tab', () => {
    render(<ProjectCard repo={mockRepo} />);
    expect(screen.getByRole('link')).toHaveAttribute('target', '_blank');
    expect(screen.getByRole('link')).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('renders without description gracefully', () => {
    const noDesc: GithubRepo = { ...mockRepo, description: null };
    render(<ProjectCard repo={noDesc} />);
    expect(screen.getByText('my-project')).toBeInTheDocument();
  });

  it('renders without stars when count is 0', () => {
    const noStars: GithubRepo = { ...mockRepo, stargazers_count: 0 };
    render(<ProjectCard repo={noStars} />);
    expect(screen.queryByText('0')).not.toBeInTheDocument();
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<ProjectCard repo={mockRepo} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
