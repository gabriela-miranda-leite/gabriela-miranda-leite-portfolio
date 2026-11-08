import createMiddleware from 'next-intl/middleware';
import { locales } from './i18n/navigation';

export default createMiddleware({
  locales,
  defaultLocale: 'pt',
  localePrefix: 'as-needed',
});

export const config = {
  matcher: ['/((?!_next|_vercel|.*\\..*).*)'],
};
