import { portfolioShowBugsy } from '@/flags';
import { getAllPosts } from '@/lib/posts';
import type { Post } from '@/types/post';

const BUGSY_SLUG = 'bugsy';

/** Slugs of posts that feature flags currently hide. */
export async function getHiddenPostSlugs(): Promise<string[]> {
  const showBugsy = await portfolioShowBugsy();
  return showBugsy ? [] : [BUGSY_SLUG];
}

export function excludeHiddenPosts(posts: Post[], hiddenSlugs: string[]): Post[] {
  return posts.filter((post) => !hiddenSlugs.includes(post.slug));
}

/** Like getAllPosts, minus posts hidden by feature flags. */
export async function getVisiblePosts(locale: 'pt' | 'en' = 'pt'): Promise<Post[]> {
  const hiddenSlugs = await getHiddenPostSlugs();
  return excludeHiddenPosts(getAllPosts(locale), hiddenSlugs);
}

export async function isPostVisible(slug: string): Promise<boolean> {
  const hiddenSlugs = await getHiddenPostSlugs();
  return !hiddenSlugs.includes(slug);
}
