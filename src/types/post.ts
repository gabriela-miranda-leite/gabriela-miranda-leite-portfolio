export interface PostFrontmatter {
  title: string;
  description: string;
  date: string;
  tags: string[];
  slug: string;
  readingTime?: number;
  /** Cover image path under /public (1200×630). Falls back to the generated /og image. */
  image?: string;
}

export interface Post extends PostFrontmatter {
  locale: 'pt' | 'en';
}
