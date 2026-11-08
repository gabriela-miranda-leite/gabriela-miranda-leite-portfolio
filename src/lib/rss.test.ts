import { buildRssFeed, escapeXml } from './rss';

jest.mock('./posts', () => ({
  getAllPosts: jest.fn((locale: string) => [
    {
      title: `Tom & Jerry <${locale}>`,
      description: 'Desc "quoted"',
      date: '2026-01-01',
      tags: ['a', 'b'],
      slug: 'hello',
      locale,
    },
  ]),
}));

describe('rss', () => {
  it('escapes XML special characters', () => {
    expect(escapeXml(`<a href="x">&'</a>`)).toBe(
      '&lt;a href=&quot;x&quot;&gt;&amp;&apos;&lt;/a&gt;'
    );
  });

  it('builds the pt feed without locale prefix', () => {
    const xml = buildRssFeed('pt');
    expect(xml).toContain('<language>pt-BR</language>');
    expect(xml).toContain('Tom &amp; Jerry &lt;pt&gt;');
    expect(xml).toMatch(/<link>https?:\/\/[^/]+\/blog\/hello<\/link>/);
    expect(xml).toContain('<category>a</category>');
  });

  it('builds the en feed under /en', () => {
    const xml = buildRssFeed('en');
    expect(xml).toContain('<language>en</language>');
    expect(xml).toMatch(/<link>https?:\/\/[^/]+\/en\/blog\/hello<\/link>/);
    expect(xml).toMatch(/href="https?:\/\/[^/]+\/en\/feed\.xml"/);
  });
});
