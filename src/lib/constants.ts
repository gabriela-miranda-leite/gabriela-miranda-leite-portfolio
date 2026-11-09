// Trailing slashes are stripped so a value like "https://site.dev/" never yields "//path".
export const SITE_URL = (
  process.env.NEXT_PUBLIC_BASE_URL ?? 'https://www.gabrielamiranda.dev.br'
).replace(/\/+$/, '');

export const GITHUB_USERNAME =
  process.env.NEXT_PUBLIC_GITHUB_USERNAME ?? 'gabriela-miranda-leite';

export const SOCIAL_LINKS = {
  github: `https://github.com/${GITHUB_USERNAME}`,
  linkedin: 'https://www.linkedin.com/in/gabriela-msl/',
} as const;

export const CONTACT_EMAIL =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? 'gabrielamiranda11.10@gmail.com';

export const SPOTIFY_PLAYLIST_ID =
  process.env.NEXT_PUBLIC_SPOTIFY_PLAYLIST_ID ?? '37i9dQZF1DXcBWIGoYBM5M';
