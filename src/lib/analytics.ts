declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

// --- Schema ---

type Screen = 'home' | 'blog' | 'projects' | 'about';

type Action = 'page_viewed' | 'button_clicked';

interface AnalyticsEvent {
  screen: Screen;
  action: Action;
  reference?: string;
}

export function screenFromPathname(pathname: string): Screen {
  if (pathname.startsWith('/blog')) return 'blog';
  if (pathname.startsWith('/projects')) return 'projects';
  if (pathname.startsWith('/about')) return 'about';
  return 'home';
}

// --- Core ---

export function trackEvent({ screen, action, reference }: AnalyticsEvent): void {
  if (typeof window === 'undefined') return;
  window.gtag?.('event', action, {
    screen,
    ...(reference ? { reference } : {}),
  });
}
