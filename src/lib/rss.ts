import { SITE_URL } from './constants';
import { getAllPosts } from './posts';

type Locale = 'pt' | 'en';

const CHANNEL = {
  pt: {
    title: 'Gabi Miranda — Blog',
    description: 'Escrita sobre engenharia de software, mobile e o dia a dia de times de produto.',
    language: 'pt-BR',
  },
  en: {
    title: 'Gabi Miranda — Blog',
    description: 'Writing about software engineering, mobile and the day-to-day of product teams.',
    language: 'en',
  },
} as const;

export function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export function buildRssFeed(locale: Locale): string {
  const prefix = locale === 'pt' ? '' : '/en';
  const siteUrl = `${SITE_URL}${prefix}`;
  const feedUrl = `${siteUrl}/feed.xml`;
  const channel = CHANNEL[locale];
  const posts = getAllPosts(locale);

  const lastBuild = posts.length ? new Date(posts[0].date) : new Date();

  const items = posts
    .map((post) => {
      const link = `${siteUrl}/blog/${post.slug}`;
      const categories = (post.tags ?? [])
        .map((tag) => `      <category>${escapeXml(tag)}</category>`)
        .join('\n');
      return [
        '    <item>',
        `      <title>${escapeXml(post.title)}</title>`,
        `      <link>${escapeXml(link)}</link>`,
        `      <guid isPermaLink="true">${escapeXml(link)}</guid>`,
        `      <pubDate>${new Date(post.date).toUTCString()}</pubDate>`,
        `      <description>${escapeXml(post.description)}</description>`,
        categories,
        '    </item>',
      ]
        .filter(Boolean)
        .join('\n');
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(channel.title)}</title>
    <link>${escapeXml(`${siteUrl}/blog`)}</link>
    <description>${escapeXml(channel.description)}</description>
    <language>${channel.language}</language>
    <lastBuildDate>${lastBuild.toUTCString()}</lastBuildDate>
    <atom:link href="${escapeXml(feedUrl)}" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`;
}

export function rssResponse(locale: Locale): Response {
  return new Response(buildRssFeed(locale), {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
