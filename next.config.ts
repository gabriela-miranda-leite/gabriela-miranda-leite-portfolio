import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

// VERCEL_URL is provided by Vercel on every deploy (no NEXT_PUBLIC_ prefix, so not
// available in the client bundle by default). We re-expose it here so ShareBar and
// SEO helpers always have the correct origin — preview deploys included.
// NEXT_PUBLIC_BASE_URL in .env.local / Vercel env vars takes precedence when set.
const vercelUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined;

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_BASE_URL:
      process.env.NEXT_PUBLIC_BASE_URL ?? vercelUrl ?? 'https://gabrielaleite.dev',
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'avatars.githubusercontent.com' },
    ],
  },
};

export default withNextIntl(nextConfig);
