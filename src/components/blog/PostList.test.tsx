import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';

jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

jest.mock('@/i18n/navigation', () => ({
  Link: ({ href, children, ...props }: { href: string; children: React.ReactNode; [k: string]: unknown }) => (
    <a href={href} {...(props as object)}>{children}</a>
  ),
}));

import { PostList } from './PostList';
import type { Post } from '@/types/post';

expect.extend(toHaveNoViolations);

const posts: Post[] = [
  {
    slug: 'post-a',
    title: 'Post A',
    description: 'Excerpt A',
    date: '2024-03-01',
    tags: ['design-systems'],
    locale: 'pt',
  },
  {
    slug: 'post-b',
    title: 'Post B',
    description: 'Excerpt B',
    date: '2024-02-01',
    tags: ['accessibility'],
    locale: 'pt',
  },
  {
    slug: 'post-c',
    title: 'Post C',
    description: 'Excerpt C',
    date: '2024-01-01',
    tags: ['design-systems', 'accessibility'],
    locale: 'pt',
  },
];

const allTags = ['accessibility', 'design-systems'];

describe('PostList', () => {
  it('renders all posts when no tag is selected', () => {
    render(<PostList posts={posts} allTags={allTags} />);
    expect(screen.getByText('Post A')).toBeInTheDocument();
    expect(screen.getByText('Post B')).toBeInTheDocument();
    expect(screen.getByText('Post C')).toBeInTheDocument();
  });

  it('filters posts when a tag chip is clicked', () => {
    render(<PostList posts={posts} allTags={allTags} />);
    fireEvent.click(screen.getByRole('button', { name: 'design-systems' }));
    expect(screen.getByText('Post A')).toBeInTheDocument();
    expect(screen.queryByText('Post B')).not.toBeInTheDocument();
    expect(screen.getByText('Post C')).toBeInTheDocument();
  });

  it('shows no-results message when filter returns empty', () => {
    render(<PostList posts={[]} allTags={[]} />);
    expect(screen.getByText('no_results')).toBeInTheDocument();
  });

  it('resets filter when "all" chip is clicked', () => {
    render(<PostList posts={posts} allTags={allTags} />);
    fireEvent.click(screen.getByRole('button', { name: 'design-systems' }));
    fireEvent.click(screen.getByRole('button', { name: 'all' }));
    expect(screen.getByText('Post A')).toBeInTheDocument();
    expect(screen.getByText('Post B')).toBeInTheDocument();
    expect(screen.getByText('Post C')).toBeInTheDocument();
  });

  it('renders without tag filter when allTags is empty', () => {
    render(<PostList posts={posts} allTags={[]} />);
    expect(screen.queryByRole('button', { name: 'all' })).not.toBeInTheDocument();
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<PostList posts={posts} allTags={allTags} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
