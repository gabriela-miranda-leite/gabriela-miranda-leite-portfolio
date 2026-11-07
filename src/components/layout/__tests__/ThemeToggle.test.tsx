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

describe('ThemeToggle — rendering', () => {
  it('renders a button', () => {
    const { getByRole } = render(<ThemeToggle />);
    expect(getByRole('button')).toBeInTheDocument();
  });

  it('button has a descriptive aria-label', () => {
    const { getByRole } = render(<ThemeToggle />);
    expect(getByRole('button')).toHaveAttribute('aria-label');
    expect(getByRole('button').getAttribute('aria-label')).not.toBe('');
  });
});

describe('ThemeToggle — actions', () => {
  beforeEach(() => {
    document.documentElement.removeAttribute('data-theme');
    localStorage.clear();
  });

  it('sets data-theme="light" on click (default dark)', () => {
    const { getByRole } = render(<ThemeToggle />);
    fireEvent.click(getByRole('button'));
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
  });

  it('returns to dark after clicking twice', () => {
    const { getByRole } = render(<ThemeToggle />);
    const btn = getByRole('button');
    fireEvent.click(btn);
    fireEvent.click(btn);
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
  });

  it('persists preference in localStorage', () => {
    const { getByRole } = render(<ThemeToggle />);
    fireEvent.click(getByRole('button'));
    expect(localStorage.getItem('theme')).toBe('light');
  });
});

describe('ThemeToggle — accessibility', () => {
  it('has no accessibility violations', async () => {
    const { container } = render(<ThemeToggle />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
