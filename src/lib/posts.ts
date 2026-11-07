import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { compileMDX } from 'next-mdx-remote/rsc';
import type { Post, PostFrontmatter } from '@/types/post';
import { mdxComponents } from '@/lib/mdx-components';

const POSTS_DIR = path.join(process.cwd(), 'src/content/posts');

export function getAllPosts(locale: 'pt' | 'en' = 'pt'): Post[] {
  if (!fs.existsSync(POSTS_DIR)) return [];

  const files = fs.readdirSync(POSTS_DIR).filter((f) =>
    f.endsWith(`.${locale}.mdx`)
  );

  return files
    .map((file) => {
      const slug = file.replace(`.${locale}.mdx`, '');
      const raw = fs.readFileSync(path.join(POSTS_DIR, file), 'utf-8');
      const { data } = matter(raw);
      const fm = data as PostFrontmatter;
      return { ...fm, slug, locale };
    })
    .sort((a, b) => (a.date > b.date ? -1 : 1));
}

export async function getPostBySlug(
  slug: string,
  locale: 'pt' | 'en' = 'pt'
): Promise<{ post: Post; content: React.ReactElement; isFallback: boolean } | null> {
  const filePath = path.join(POSTS_DIR, `${slug}.${locale}.mdx`);
  const fallbackPath = path.join(POSTS_DIR, `${slug}.pt.mdx`);

  const isFallback = !fs.existsSync(filePath);
  const usedPath = isFallback ? fallbackPath : filePath;
  if (!fs.existsSync(usedPath)) return null;

  const raw = fs.readFileSync(usedPath, 'utf-8');

  const { content, frontmatter } = await compileMDX<PostFrontmatter>({
    source: raw,
    components: mdxComponents,
    options: { parseFrontmatter: true },
  });

  const post: Post = { ...frontmatter, slug, locale };
  return { post, content, isFallback };
}
