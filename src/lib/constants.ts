export const SITE_URL =
  process.env.NEXT_PUBLIC_BASE_URL ?? 'https://www.gabrielamiranda.dev.br';

export const GITHUB_USERNAME =
  process.env.NEXT_PUBLIC_GITHUB_USERNAME ?? 'gabriela-miranda-leite';

export const SOCIAL_LINKS = {
  github: `https://github.com/${GITHUB_USERNAME}`,
  linkedin: 'https://www.linkedin.com/in/gabriela-msl/',
} as const;

export const CONTACT_EMAIL =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? 'gabrielamiranda11.10@gmail.com';
