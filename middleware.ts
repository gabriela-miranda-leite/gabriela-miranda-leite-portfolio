import createMiddleware from 'next-intl/middleware';
import { locales } from './src/i18n/navigation';

export default createMiddleware({
  locales,
  defaultLocale: 'pt',
  localePrefix: 'as-needed', // PT sem prefixo, EN com /en/
});

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
