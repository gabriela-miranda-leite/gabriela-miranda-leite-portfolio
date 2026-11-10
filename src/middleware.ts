import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { locales } from './i18n/navigation';

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale: 'pt',
  localePrefix: 'as-needed',
});

export default function middleware(req: NextRequest) {
  // /og and its subroutes (e.g. /og/story) are unlocalized Edge routes (OG images);
  // skip locale routing for all of them, not just the exact /og path.
  if (req.nextUrl.pathname === '/og' || req.nextUrl.pathname.startsWith('/og/')) {
    return NextResponse.next();
  }
  return intlMiddleware(req);
}

export const config = {
  matcher: ['/((?!_next|_vercel|.*\\..*).*)'],
};
