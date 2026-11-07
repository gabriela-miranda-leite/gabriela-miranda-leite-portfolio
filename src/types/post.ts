export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  tags: string[];
  readingTime?: number;
  locale: 'pt' | 'en';
}
