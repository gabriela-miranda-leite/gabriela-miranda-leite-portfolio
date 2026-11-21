import { rssResponse } from '@/lib/rss';

// Not force-static: the feed reads feature flags (e.g. portfolio_show_bugsy) per request.
export function GET() {
  return rssResponse('en');
}
