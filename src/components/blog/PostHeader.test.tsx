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

import { PostHeader } from './PostHeader';
import type { Post } from '@/types/post';

expect.extend(toHaveNoViolations);

const post: Post = {
  slug: 'test-post',
  title: 'My Test Post',
  excerpt: 'Short excerpt here.',
  date: '2024-06-01',
  tags: ['design-systems', 'react'],
  readingTime: 5,
  locale: 'pt',
};

describe('PostHeader', () => {
  it('renders the post title', () => {
    render(<PostHeader post={post} />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('My Test Post');
  });

  it('renders the first tag chip', () => {
    render(<PostHeader post={post} />);
    expect(screen.getAllByText('design-systems').length).toBeGreaterThanOrEqual(1);
  });

  it('links back to /blog', () => {
    render(<PostHeader post={post} />);
    expect(screen.getByRole('link', { name: /blog/i })).toHaveAttribute('href', '/blog');
  });

  it('renders a time element with correct dateTime', () => {
    render(<PostHeader post={post} />);
    expect(screen.getByRole('time')).toHaveAttribute('dateTime', '2024-06-01');
  });

  it('renders without tags gracefully', () => {
    render(<PostHeader post={{ ...post, tags: [] }} />);
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<PostHeader post={post} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
