import { render, fireEvent, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import ptMessages from '@/messages/pt.json';

let mockLocale = 'pt';
jest.mock('next-intl', () => ({
  useLocale: () => mockLocale,
  useTranslations: () => (key: string) =>
    (ptMessages.lang as Record<string, string>)[key] ?? key,
}));

jest.mock('@/i18n/navigation', () => ({
  usePathname: () => '/sobre',
  Link: ({
    href,
    locale,
    children,
    ...rest
  }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string; locale?: string }) => (
    <a href={locale === 'en' ? `/en${href}` : href} {...rest}>
      {children}
    </a>
  ),
}));

import { LangSwitch } from '../LangSwitch';

expect.extend(toHaveNoViolations);

beforeEach(() => {
  mockLocale = 'pt';
});

describe('LangSwitch — rendering', () => {
  it('renders one link per language inside a labelled group', () => {
    render(<LangSwitch />);
    const group = screen.getByRole('group', { name: 'Idioma' });
    expect(group).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Português (PT)' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'English (EN)' })).toBeInTheDocument();
  });

  it('accessible names include the visible text (PT / EN)', () => {
    render(<LangSwitch />);
    expect(screen.getByRole('link', { name: /PT/ })).toHaveTextContent('PT');
    expect(screen.getByRole('link', { name: /EN/ })).toHaveTextContent('EN');
  });

  it('marks only the current language with aria-current', () => {
    render(<LangSwitch />);
    expect(screen.getByRole('link', { name: 'Português (PT)' })).toHaveAttribute('aria-current', 'true');
    expect(screen.getByRole('link', { name: 'English (EN)' })).not.toHaveAttribute('aria-current');
  });

  it('follows the active locale', () => {
    mockLocale = 'en';
    render(<LangSwitch />);
    expect(screen.getByRole('link', { name: 'English (EN)' })).toHaveAttribute('aria-current', 'true');
    expect(screen.getByRole('link', { name: 'Português (PT)' })).not.toHaveAttribute('aria-current');
  });

  it('declares the language of each option', () => {
    render(<LangSwitch />);
    expect(screen.getByRole('link', { name: 'Português (PT)' })).toHaveAttribute('lang', 'pt-BR');
    expect(screen.getByRole('link', { name: 'English (EN)' })).toHaveAttribute('lang', 'en');
  });

  it('current language uses the accent colour and underline', () => {
    render(<LangSwitch />);
    const pt = screen.getByRole('link', { name: 'Português (PT)' });
    expect(pt.style.color).toBe('var(--accent)');
    expect(pt.style.textDecoration).toBe('underline');
  });
});

describe('LangSwitch — actions', () => {
  it('links to the other locale of the current path', () => {
    render(<LangSwitch />);
    expect(screen.getByRole('link', { name: 'English (EN)' })).toHaveAttribute('href', '/en/sobre');
  });

  it('announces the new language after clicking the other one', () => {
    render(<LangSwitch />);
    fireEvent.click(screen.getByRole('link', { name: 'English (EN)' }));
    expect(screen.getByRole('status').textContent).toBe('Language changed to English');
  });

  it('does not announce anything when clicking the current language', () => {
    render(<LangSwitch />);
    fireEvent.click(screen.getByRole('link', { name: 'Português (PT)' }));
    expect(screen.getByRole('status').textContent).toBe('');
  });
});

describe('LangSwitch — accessibility', () => {
  it('has a visually hidden aria-live="polite" region', () => {
    render(<LangSwitch />);
    const status = screen.getByRole('status');
    expect(status).toHaveAttribute('aria-live', 'polite');
    expect(status).toHaveAttribute('aria-atomic', 'true');
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<LangSwitch />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
