declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

// --- Schema ---

type Screen = 'home' | 'blog' | 'projects' | 'about';

type Action = 'page-viewed' | 'button-clicked' | 'link-clicked' | 'copy-clicked';

interface AnalyticsEvent {
  screen: Screen;
  action: Action;
  reference?: string;
}

// --- Core ---

export function trackEvent({ screen, action, reference }: AnalyticsEvent): void {
  if (typeof window === 'undefined') return;
  window.gtag?.('event', action, {
    screen,
    ...(reference ? { reference } : {}),
  });
}
