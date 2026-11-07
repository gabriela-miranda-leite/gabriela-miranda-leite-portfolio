import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import type { Post } from '@/types/post';

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
      return { slug, locale, ...data } as Post;
    })
    .sort((a, b) => (a.date > b.date ? -1 : 1));
}

export function getPost(slug: string, locale: 'pt' | 'en' = 'pt') {
  const filePath = path.join(POSTS_DIR, `${slug}.${locale}.mdx`);
  const fallbackPath = path.join(POSTS_DIR, `${slug}.pt.mdx`);

  const usedPath = fs.existsSync(filePath) ? filePath : fallbackPath;
  if (!fs.existsSync(usedPath)) return null;

  const raw = fs.readFileSync(usedPath, 'utf-8');
  const { data, content } = matter(raw);
  return {
    slug,
    locale,
    isFallback: !fs.existsSync(filePath),
    content,
    ...data,
  } as Post & { content: string; isFallback: boolean };
}
