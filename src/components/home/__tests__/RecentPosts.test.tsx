import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import type { Post } from '@/types/post';

jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

jest.mock('@/i18n/navigation', () => ({
  Link: ({ href, children, ...props }: { href: string; children: React.ReactNode; [k: string]: unknown }) => (
    <a href={href} {...(props as object)}>{children}</a>
  ),
}));

jest.mock('@/components/layout/Container', () => ({
  Container: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

import { RecentPosts } from '../RecentPosts';

expect.extend(toHaveNoViolations);

const POSTS: Post[] = [
  { slug: 'post-1', title: 'Post 1', excerpt: 'Excerpt 1', date: '2026-10-01', tags: [], locale: 'pt' },
  { slug: 'post-2', title: 'Post 2', excerpt: 'Excerpt 2', date: '2026-09-01', tags: [], locale: 'pt' },
];

describe('RecentPosts', () => {
  it('renderiza lista de posts', () => {
    const { getAllByRole } = render(<RecentPosts posts={POSTS} />);
    expect(getAllByRole('listitem')).toHaveLength(2);
  });

  it('link de cada post aponta para /blog/:slug', () => {
    const { getAllByRole } = render(<RecentPosts posts={POSTS} />);
    const links = getAllByRole('link').filter((l) =>
      l.getAttribute('href')?.startsWith('/blog/')
    );
    expect(links).toHaveLength(2);
  });

  it('renderiza sem posts sem erros', () => {
    const { queryAllByRole } = render(<RecentPosts posts={[]} />);
    expect(queryAllByRole('listitem')).toHaveLength(0);
  });

  it('sem violações de acessibilidade', async () => {
    const { container } = render(<RecentPosts posts={POSTS} />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
