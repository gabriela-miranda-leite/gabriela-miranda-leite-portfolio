export const SITE_URL =
  process.env.NEXT_PUBLIC_BASE_URL ?? 'https://gabrielaleite.dev';

export const GITHUB_USERNAME =
  process.env.NEXT_PUBLIC_GITHUB_USERNAME ?? 'gabriela-miranda-leite';

export const SOCIAL_LINKS = {
  github: `https://github.com/${GITHUB_USERNAME}`,
  linkedin: 'https://www.linkedin.com/in/gabriela-msl/',
} as const;
