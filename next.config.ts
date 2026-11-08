import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

// Canonical production origin. Single fallback for the whole app (see src/lib/constants.ts).
const CANONICAL_URL = 'https://www.gabrielamiranda.dev.br';

// VERCEL_URL is the per-deploy URL (no NEXT_PUBLIC_ prefix, so not in the client bundle).
// Only preview deploys use it, so ShareBar and SEO helpers point at the preview itself.
// Production never uses it: it would be the *.vercel.app URL, not the real domain.
// NEXT_PUBLIC_BASE_URL in .env.local / Vercel env vars always takes precedence when set.
const previewUrl =
  process.env.VERCEL_ENV === 'preview' && process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : undefined;

const baseUrl = (process.env.NEXT_PUBLIC_BASE_URL ?? previewUrl ?? CANONICAL_URL).replace(/\/+$/, '');

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_BASE_URL: baseUrl,
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'avatars.githubusercontent.com' },
    ],
  },
};

export default withNextIntl(nextConfig);
