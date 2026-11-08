import { render, fireEvent } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';

jest.mock('next-intl', () => ({
  useLocale: () => 'pt',
  useTranslations: () => (key: string) => {
    const map: Record<string, string> = {
      ariaLabel: 'Mudar idioma para inglês',
      announce: 'Idioma alterado para inglês',
      switch: 'EN',
    };
    return map[key] ?? key;
  },
}));

const mockReplace = jest.fn();
jest.mock('@/i18n/navigation', () => ({
  usePathname: () => '/sobre',
  useRouter: () => ({ replace: mockReplace }),
}));

import { LangSwitch } from '../LangSwitch';

expect.extend(toHaveNoViolations);

beforeEach(() => mockReplace.mockClear());

describe('LangSwitch — rendering', () => {
  it('renders a pill button with PT and EN', () => {
    const { getByRole } = render(<LangSwitch />);
    const btn = getByRole('button');
    expect(btn).toBeInTheDocument();
    expect(btn.textContent).toContain('PT');
    expect(btn.textContent).toContain('EN');
  });

  it('active locale (PT) has accent color via style', () => {
    const { getByRole } = render(<LangSwitch />);
    const btn = getByRole('button');
    const ptSpan = Array.from(btn.querySelectorAll('span')).find(
      (s) => s.textContent === 'PT'
    );
    expect(ptSpan).toBeDefined();
    expect(ptSpan!.style.color).toBe('var(--accent)');
  });

  it('active locale (PT) has underline decoration', () => {
    const { getByRole } = render(<LangSwitch />);
    const btn = getByRole('button');
    const ptSpan = Array.from(btn.querySelectorAll('span')).find(
      (s) => s.textContent === 'PT'
    );
    expect(ptSpan!.style.textDecoration).toBe('underline');
  });
});

describe('LangSwitch — actions', () => {
  it('calls router.replace with EN on click (current locale: PT)', () => {
    const { getByRole } = render(<LangSwitch />);
    fireEvent.click(getByRole('button'));
    expect(mockReplace).toHaveBeenCalledTimes(1);
    expect(mockReplace).toHaveBeenCalledWith('/sobre', { locale: 'en' });
  });
});

describe('LangSwitch — accessibility', () => {
  it('button has a descriptive aria-label', () => {
    const { getByRole } = render(<LangSwitch />);
    expect(getByRole('button')).toHaveAttribute(
      'aria-label',
      'Mudar idioma para inglês'
    );
  });

  it('has a visually hidden aria-live="polite" region', () => {
    const { getByRole } = render(<LangSwitch />);
    const status = getByRole('status');
    expect(status).toHaveAttribute('aria-live', 'polite');
    expect(status).toHaveAttribute('aria-atomic', 'true');
  });

  it('announces language change after click', () => {
    const { getByRole } = render(<LangSwitch />);
    fireEvent.click(getByRole('button'));
    expect(getByRole('status').textContent).toBe('Idioma alterado para inglês');
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<LangSwitch />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
