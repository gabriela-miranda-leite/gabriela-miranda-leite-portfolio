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
  { slug: 'post-1', title: 'Post 1', description: 'Excerpt 1', date: '2026-10-01', tags: ['design'], locale: 'pt' },
  { slug: 'post-2', title: 'Post 2', description: 'Excerpt 2', date: '2026-09-01', tags: ['a11y'], locale: 'pt' },
];

describe('RecentPosts', () => {
  it('renders a link for each post', () => {
    const { getAllByRole } = render(<RecentPosts posts={POSTS} />);
    const postLinks = getAllByRole('link').filter((l) =>
      l.getAttribute('href')?.startsWith('/blog/')
    );
    expect(postLinks).toHaveLength(2);
  });

  it('shows index numbers 01 and 02', () => {
    const { getByText } = render(<RecentPosts posts={POSTS} />);
    expect(getByText('01')).toBeInTheDocument();
    expect(getByText('02')).toBeInTheDocument();
  });

  it('shows tag chip with the first post tag', () => {
    const { getByText } = render(<RecentPosts posts={POSTS} />);
    expect(getByText('design')).toBeInTheDocument();
    expect(getByText('a11y')).toBeInTheDocument();
  });

  it('renders without errors when posts list is empty', () => {
    const { queryAllByRole } = render(<RecentPosts posts={[]} />);
    expect(queryAllByRole('link')).toHaveLength(1); // só o "ver todos"
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<RecentPosts posts={POSTS} />);
    expect(await axe(container)).toHaveNoViolations();
  });

  describe('freshness label', () => {
    const NOW = Date.parse('2026-11-21T12:00:00Z');

    beforeEach(() => jest.spyOn(Date, 'now').mockReturnValue(NOW));
    afterEach(() => jest.restoreAllMocks());

    it('marks only posts published within the last week as new', () => {
      const posts: Post[] = [
        { ...POSTS[0], date: '2026-11-18' },
        { ...POSTS[1], date: '2026-10-01' },
      ];
      const { getAllByText } = render(<RecentPosts posts={posts} />);

      expect(getAllByText('new')).toHaveLength(1);
    });

    it('has no accessibility violations with a label', async () => {
      const { container } = render(<RecentPosts posts={[{ ...POSTS[0], date: '2026-11-18' }]} />);
      expect(await axe(container)).toHaveNoViolations();
    });
  });
});
