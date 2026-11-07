export interface PostFrontmatter {
  title: string;
  description: string;
  date: string;
  tags: string[];
  slug: string;
  readingTime?: number;
}

export interface Post extends PostFrontmatter {
  locale: 'pt' | 'en';
}
