import { getAllPosts, getPostBySlug } from './posts';

jest.mock('@/lib/mdx-components', () => ({ mdxComponents: {} }));

jest.mock('next-mdx-remote/rsc', () => ({
  compileMDX: jest.fn().mockImplementation(({ source }: { source: string }) => {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const matter = require('gray-matter');
    const { data } = matter(source);
    return Promise.resolve({ content: null, frontmatter: data });
  }),
}));

const PT_MDX = `---
title: Olá Mundo
description: Um post de teste.
date: "2026-01-01"
tags: [teste]
slug: hello-world
readingTime: 2
---

Conteúdo aqui.`;

const EN_MDX = `---
title: Hello World
description: A test post.
date: "2026-01-01"
tags: [test]
slug: hello-world
readingTime: 2
---

Content here.`;

jest.mock('fs', () => {
  const actual = jest.requireActual<typeof import('fs')>('fs');
  return {
    ...actual,
    existsSync: (p: string) => {
      if (p.endsWith('hello-world.pt.mdx')) return true;
      if (p.endsWith('hello-world.en.mdx')) return true;
      if (p.match(/src\/content\/posts$/) || p.match(/src\\content\\posts$/)) return true;
      return actual.existsSync(p);
    },
    readdirSync: (p: string) => {
      if (p.includes('src/content/posts')) return ['hello-world.pt.mdx', 'hello-world.en.mdx'];
      return actual.readdirSync(p);
    },
    readFileSync: (p: string, enc: unknown) => {
      if (p.endsWith('hello-world.pt.mdx')) return PT_MDX;
      if (p.endsWith('hello-world.en.mdx')) return EN_MDX;
      return actual.readFileSync(p, enc as BufferEncoding);
    },
  };
});

describe('getAllPosts', () => {
  it('returns posts for the pt locale', () => {
    const posts = getAllPosts('pt');
    expect(posts.length).toBeGreaterThanOrEqual(1);
    expect(posts[0].locale).toBe('pt');
  });

  it('returns posts for the en locale', () => {
    const posts = getAllPosts('en');
    expect(posts.every((p) => p.locale === 'en')).toBe(true);
  });

  it('sorts posts by date descending', () => {
    const posts = getAllPosts('pt');
    for (let i = 1; i < posts.length; i++) {
      expect(posts[i - 1].date >= posts[i].date).toBe(true);
    }
  });

  it('returns typed fields (no any)', () => {
    const posts = getAllPosts('pt');
    for (const post of posts) {
      expect(typeof post.title).toBe('string');
      expect(typeof post.description).toBe('string');
      expect(Array.isArray(post.tags)).toBe(true);
    }
  });
});

describe('getPostBySlug', () => {
  it('returns null for a missing slug', async () => {
    const result = await getPostBySlug('does-not-exist', 'pt');
    expect(result).toBeNull();
  });

  it('returns post metadata and content for pt', async () => {
    const result = await getPostBySlug('hello-world', 'pt');
    expect(result).not.toBeNull();
    expect(result!.post.title).toBe('Olá Mundo');
    expect(result!.post.locale).toBe('pt');
    expect(result!.isFallback).toBe(false);
  });

  it('returns en post when en file exists', async () => {
    const result = await getPostBySlug('hello-world', 'en');
    expect(result).not.toBeNull();
    expect(result!.post.title).toBe('Hello World');
    expect(result!.isFallback).toBe(false);
  });
});
