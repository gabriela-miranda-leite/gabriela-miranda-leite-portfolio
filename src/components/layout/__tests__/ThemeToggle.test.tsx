import { render, fireEvent } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';

jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
  })),
});

import { ThemeToggle } from '../ThemeToggle';

expect.extend(toHaveNoViolations);

describe('ThemeToggle — renderização', () => {
  it('renderiza um botão', () => {
    const { getByRole } = render(<ThemeToggle />);
    expect(getByRole('button')).toBeInTheDocument();
  });

  it('botão tem aria-label descritivo', () => {
    const { getByRole } = render(<ThemeToggle />);
    expect(getByRole('button')).toHaveAttribute('aria-label');
    expect(getByRole('button').getAttribute('aria-label')).not.toBe('');
  });
});

describe('ThemeToggle — ações', () => {
  beforeEach(() => {
    document.documentElement.removeAttribute('data-theme');
    localStorage.clear();
  });

  it('aplica data-theme="light" ao clicar (padrão dark)', () => {
    const { getByRole } = render(<ThemeToggle />);
    fireEvent.click(getByRole('button'));
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
  });

  it('volta para dark ao clicar duas vezes', () => {
    const { getByRole } = render(<ThemeToggle />);
    const btn = getByRole('button');
    fireEvent.click(btn);
    fireEvent.click(btn);
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
  });

  it('persiste a preferência no localStorage', () => {
    const { getByRole } = render(<ThemeToggle />);
    fireEvent.click(getByRole('button'));
    expect(localStorage.getItem('theme')).toBe('light');
  });
});

describe('ThemeToggle — acessibilidade', () => {
  it('sem violações de acessibilidade', async () => {
    const { container } = render(<ThemeToggle />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
