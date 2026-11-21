import {
  excludeHiddenPosts,
  getHiddenPostSlugs,
  getVisiblePosts,
  isPostVisible,
} from './post-visibility';
import { portfolioShowBugsy } from '@/flags';
import type { Post } from '@/types/post';

jest.mock('@/flags', () => ({ portfolioShowBugsy: jest.fn() }));

const makePost = (slug: string): Post => ({
  title: slug,
  description: '',
  date: '2026-01-01',
  tags: [],
  slug,
  locale: 'pt',
});

jest.mock('@/lib/posts', () => ({
  getAllPosts: jest.fn(() =>
    ['bugsy', 'other'].map((slug) => ({
      title: slug,
      description: '',
      date: '2026-01-01',
      tags: [],
      slug,
      locale: 'pt',
    }))
  ),
}));

const showBugsy = portfolioShowBugsy as unknown as jest.Mock<Promise<boolean>>;

describe('post visibility', () => {
  afterEach(() => showBugsy.mockReset());

  describe('when portfolio_show_bugsy is off', () => {
    beforeEach(() => showBugsy.mockResolvedValue(false));

    it('hides the bugsy post', async () => {
      expect(await getHiddenPostSlugs()).toEqual(['bugsy']);
      expect(await isPostVisible('bugsy')).toBe(false);
      expect((await getVisiblePosts('pt')).map((p) => p.slug)).toEqual(['other']);
    });

    it('keeps other posts visible', async () => {
      expect(await isPostVisible('other')).toBe(true);
    });
  });

  describe('when portfolio_show_bugsy is on', () => {
    beforeEach(() => showBugsy.mockResolvedValue(true));

    it('shows every post', async () => {
      expect(await getHiddenPostSlugs()).toEqual([]);
      expect(await isPostVisible('bugsy')).toBe(true);
      expect((await getVisiblePosts('pt')).map((p) => p.slug)).toEqual(['bugsy', 'other']);
    });
  });

  it('excludeHiddenPosts drops only the given slugs', () => {
    const posts = [makePost('a'), makePost('b'), makePost('c')];
    expect(excludeHiddenPosts(posts, ['b']).map((p) => p.slug)).toEqual(['a', 'c']);
    expect(excludeHiddenPosts(posts, [])).toHaveLength(3);
  });
});
