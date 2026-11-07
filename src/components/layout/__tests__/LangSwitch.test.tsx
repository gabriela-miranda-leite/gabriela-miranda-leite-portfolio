import { render, fireEvent } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';

jest.mock('next-intl', () => ({
  useLocale: () => 'pt',
}));

const mockReplace = jest.fn();
jest.mock('@/i18n/navigation', () => ({
  usePathname: () => '/sobre',
  useRouter: () => ({ replace: mockReplace }),
}));

import { LangSwitch } from '../LangSwitch';

expect.extend(toHaveNoViolations);

beforeEach(() => mockReplace.mockClear());

describe('LangSwitch — renderização', () => {
  it('renderiza um botão pill com PT e EN', () => {
    const { getByRole } = render(<LangSwitch />);
    const btn = getByRole('button');
    expect(btn).toBeInTheDocument();
    expect(btn.textContent).toContain('PT');
    expect(btn.textContent).toContain('EN');
  });

  it('locale ativa (PT) tem cor accent via style', () => {
    const { getByRole } = render(<LangSwitch />);
    const btn = getByRole('button');
    const ptSpan = Array.from(btn.querySelectorAll('span')).find(
      (s) => s.textContent === 'PT'
    );
    expect(ptSpan).toBeDefined();
    expect(ptSpan!.style.color).toBe('var(--accent)');
  });
});

describe('LangSwitch — ações', () => {
  it('chama router.replace para EN ao clicar (locale atual: PT)', () => {
    const { getByRole } = render(<LangSwitch />);
    fireEvent.click(getByRole('button'));
    expect(mockReplace).toHaveBeenCalledTimes(1);
    expect(mockReplace).toHaveBeenCalledWith('/sobre', { locale: 'en' });
  });
});

describe('LangSwitch — acessibilidade', () => {
  it('botão tem aria-label descritivo', () => {
    const { getByRole } = render(<LangSwitch />);
    expect(getByRole('button')).toHaveAttribute('aria-label');
  });

  it('tem aria-live="polite"', () => {
    const { getByRole } = render(<LangSwitch />);
    expect(getByRole('button')).toHaveAttribute('aria-live', 'polite');
  });

  it('sem violações de acessibilidade', async () => {
    const { container } = render(<LangSwitch />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
