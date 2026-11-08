import { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/posts';
import { SITE_URL as BASE_URL } from '@/lib/constants';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      alternates: { languages: { 'pt-BR': BASE_URL, en: `${BASE_URL}/en` } },
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${BASE_URL}/blog`,
      alternates: { languages: { 'pt-BR': `${BASE_URL}/blog`, en: `${BASE_URL}/en/blog` } },
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/projects`,
      alternates: { languages: { 'pt-BR': `${BASE_URL}/projects`, en: `${BASE_URL}/en/projects` } },
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];

  const ptPosts = getAllPosts('pt');
  const postRoutes: MetadataRoute.Sitemap = ptPosts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    alternates: {
      languages: {
        'pt-BR': `${BASE_URL}/blog/${post.slug}`,
        en: `${BASE_URL}/en/blog/${post.slug}`,
      },
    },
    lastModified: new Date(post.date),
    changeFrequency: 'yearly',
    priority: 0.7,
  }));

  return [...staticRoutes, ...postRoutes];
}
