import { render, fireEvent } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';

jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) =>
    key === 'ariaLabel' ? 'principal' : key,
  useLocale: () => 'pt',
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

const mockReplace = jest.fn();
jest.mock('@/i18n/navigation', () => ({
  Link: ({ href, children, ...props }: { href: string; children: React.ReactNode; [k: string]: unknown }) => (
    <a href={href} {...(props as object)}>{children}</a>
  ),
  usePathname: () => '/',
  useRouter: () => ({ replace: mockReplace }),
}));

import { Nav } from '../Nav';

expect.extend(toHaveNoViolations);

describe('Nav — renderização', () => {
  it('renderiza nav com aria-label="principal"', () => {
    const { getAllByRole } = render(<Nav />);
    const navs = getAllByRole('navigation');
    expect(navs.some((n) => n.getAttribute('aria-label') === 'principal')).toBe(true);
  });

  it('renderiza link do logo apontando para /', () => {
    const { getByRole } = render(<Nav />);
    expect(getByRole('link', { name: /gabi miranda/i })).toHaveAttribute('href', '/');
  });

  it('nenhum link tem aria-current="page" na rota /', () => {
    const { getAllByRole } = render(<Nav />);
    getAllByRole('link').forEach((l) => {
      expect(l).not.toHaveAttribute('aria-current', 'page');
    });
  });
});

// Mock returns the i18n key as-is: t('openMenu') === 'openMenu', t('closeMenu') === 'closeMenu'
describe('Nav — menu mobile', () => {
  it('botão hamburger tem aria-expanded=false inicialmente', () => {
    const { getByRole } = render(<Nav />);
    const btn = getByRole('button', { name: 'openMenu' });
    expect(btn).toHaveAttribute('aria-expanded', 'false');
  });

  it('abre o menu ao clicar no hamburger', () => {
    const { getByRole } = render(<Nav />);
    fireEvent.click(getByRole('button', { name: 'openMenu' }));
    expect(getByRole('button', { name: 'closeMenu' })).toHaveAttribute('aria-expanded', 'true');
  });

  it('fecha o menu ao clicar novamente', () => {
    const { getByRole } = render(<Nav />);
    fireEvent.click(getByRole('button', { name: 'openMenu' })); // abre
    fireEvent.click(getByRole('button', { name: 'closeMenu' })); // fecha
    expect(getByRole('button', { name: 'openMenu' })).toHaveAttribute('aria-expanded', 'false');
  });
});

describe('Nav — acessibilidade', () => {
  it('sem violações com menu fechado', async () => {
    const { container } = render(<Nav />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it('sem violações com menu aberto', async () => {
    const { container, getByRole } = render(<Nav />);
    fireEvent.click(getByRole('button', { name: 'openMenu' }));
    expect(await axe(container)).toHaveNoViolations();
  });
});
