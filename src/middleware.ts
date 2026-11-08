import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { locales } from './i18n/navigation';

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale: 'pt',
  localePrefix: 'as-needed',
});

export default function middleware(req: NextRequest) {
  // /og is an unlocalized Edge route (OG images); skip locale routing for it.
  if (req.nextUrl.pathname === '/og') return NextResponse.next();
  return intlMiddleware(req);
}

export const config = {
  matcher: ['/((?!_next|_vercel|.*\\..*).*)'],
};
