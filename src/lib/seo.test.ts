import { postShareImageUrl } from './seo';
import { SITE_URL } from './constants';

describe('postShareImageUrl', () => {
  it('uses the post cover image when set', () => {
    expect(
      postShareImageUrl({ title: 'T', description: 'D', image: '/posts/x/cover.jpg' })
    ).toBe(`${SITE_URL}/posts/x/cover.jpg`);
  });

  it('falls back to the generated /og image', () => {
    const url = postShareImageUrl({ title: 'A & B', description: 'Desc' });
    expect(url).toBe(`${SITE_URL}/og?title=A%20%26%20B&subtitle=Desc`);
  });
});
