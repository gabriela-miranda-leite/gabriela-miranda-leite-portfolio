import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';

jest.mock('next-intl', () => ({
  useTranslations: () => (key: string, params?: Record<string, unknown>) => {
    if (params) return `${key}:${JSON.stringify(params)}`;
    return key;
  },
}));

jest.mock('@/i18n/navigation', () => ({
  Link: ({ href, children, ...props }: { href: string; children: React.ReactNode; [k: string]: unknown }) => (
    <a href={href} {...(props as object)}>{children}</a>
  ),
}));

import { PostCard } from './PostCard';
import type { Post } from '@/types/post';

expect.extend(toHaveNoViolations);

const mockPost: Post = {
  slug: 'test-post',
  title: 'Test Post Title',
  description: 'A short excerpt for the test post.',
  date: '2024-01-15',
  tags: ['design-systems', 'accessibility'],
  readingTime: 5,
  locale: 'pt',
};

describe('PostCard', () => {
  it('renders post title', () => {
    render(<PostCard post={mockPost} />);
    expect(screen.getByText('Test Post Title')).toBeInTheDocument();
  });

  it('renders post excerpt', () => {
    render(<PostCard post={mockPost} />);
    expect(screen.getByText('A short excerpt for the test post.')).toBeInTheDocument();
  });

  it('renders tags', () => {
    render(<PostCard post={mockPost} />);
    expect(screen.getByText('design-systems')).toBeInTheDocument();
    expect(screen.getByText('accessibility')).toBeInTheDocument();
  });

  it('links to the correct post URL', () => {
    render(<PostCard post={mockPost} />);
    expect(screen.getByRole('link')).toHaveAttribute('href', '/blog/test-post');
  });

  it('renders without tags gracefully', () => {
    const noTags: Post = { ...mockPost, tags: [] };
    render(<PostCard post={noTags} />);
    expect(screen.getByText('Test Post Title')).toBeInTheDocument();
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<PostCard post={mockPost} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  describe('freshness label', () => {
    const NOW = Date.parse('2026-11-21T12:00:00Z');

    beforeEach(() => jest.spyOn(Date, 'now').mockReturnValue(NOW));
    afterEach(() => jest.restoreAllMocks());

    it('marks a post published this week as new and ties it to the link', () => {
      render(<PostCard post={{ ...mockPost, date: '2026-11-18' }} />);
      const badge = screen.getByText('new');

      expect(screen.getByRole('link')).toHaveAttribute('aria-describedby', badge.id);
    });

    it('shows the label even when the post has no tags', () => {
      render(<PostCard post={{ ...mockPost, tags: [], date: '2026-11-18' }} />);
      expect(screen.getByText('new')).toBeInTheDocument();
    });

    it('drops the label after a week', () => {
      render(<PostCard post={{ ...mockPost, date: '2026-11-10' }} />);

      expect(screen.queryByText('new')).not.toBeInTheDocument();
      expect(screen.getByRole('link')).not.toHaveAttribute('aria-describedby');
    });

    it('has no accessibility violations with a label', async () => {
      const { container } = render(<PostCard post={{ ...mockPost, date: '2026-11-18' }} />);
      expect(await axe(container)).toHaveNoViolations();
    });
  });
});
