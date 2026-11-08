'use client';
import Image from 'next/image';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { List, X } from '@phosphor-icons/react';
import { Link, usePathname } from '@/i18n/navigation';
import { LangSwitch } from './LangSwitch';
import { ThemeToggle } from './ThemeToggle';

import { GITHUB_USERNAME } from '@/lib/constants';
import { screenFromPathname, trackEvent } from '@/lib/analytics';

const BASE_NAV_LINKS = [
  { href: '/blog', key: 'blog' },
  { href: '/projects', key: 'projects' },
] as const satisfies ReadonlyArray<{ href: string; key: string }>;

const ABOUT_LINK = { href: '/about', key: 'about' } as const;

const PILL: React.CSSProperties = {
  background: 'var(--bg-s)',
  border: '1px solid var(--border)',
  color: 'var(--fg-2)',
  padding: 'var(--space-4) var(--space-9)',
  borderRadius: 'var(--radius-pill)',
  fontSize: 'var(--text-eyebrow)',
  fontFamily: 'var(--font-mono)',
  whiteSpace: 'nowrap',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  gap: 'var(--space-3)',
};

export { PILL };

interface NavProps {
  showAbout?: boolean;
}

export function Nav({ showAbout = false }: NavProps) {
  const t = useTranslations('nav');
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const NAV_LINKS = showAbout ? [...BASE_NAV_LINKS, ABOUT_LINK] : BASE_NAV_LINKS;
  const screen = screenFromPathname(pathname);

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        background: 'var(--bg-nav)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid var(--border)',
        padding: '0 24px',
      }}
    >
      {/* Desktop row */}
      <div
        style={{
          maxWidth: '1080px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: 'var(--space-11) 0',
          gap: 'var(--space-13)',
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          aria-label="Gabi Miranda — início"
          onClick={() => trackEvent({ screen, action: 'button-clicked', reference: 'Voltou para a home pelo logo' })}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-6)',
            textDecoration: 'none',
          }}
        >
          <Image
            src={`https://avatars.githubusercontent.com/${GITHUB_USERNAME}`}
            alt=""
            role="presentation"
            width={32}
            height={32}
            style={{ borderRadius: '50%', border: '1px solid var(--border)', flexShrink: 0 }}
          />
          <span
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'var(--text-logo)',
              fontWeight: 500,
              fontStyle: 'italic',
              color: 'var(--fg)',
              whiteSpace: 'nowrap',
            }}
          >
            Gabi Miranda
          </span>
        </Link>

        {/* Nav links — desktop */}
        <nav aria-label={t('ariaLabel')} className="nav-desktop-links">
          <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
            {NAV_LINKS.map(({ href, key }) => {
              const isActive = pathname === href || pathname.startsWith(href + '/');
              return (
                <Link
                  key={key}
                  href={href}
                  aria-current={isActive ? 'page' : undefined}
                  onClick={() => trackEvent({ screen, action: 'button-clicked', reference: `Abriu ${key} pelo menu` })}
                  className={isActive ? undefined : 'nav-link'}
                  style={{
                    display: 'block',
                    padding: 'var(--space-4) var(--space-8)',
                    color: isActive ? 'var(--fg)' : 'var(--fg-2)',
                    fontSize: 'var(--text-sm)',
                    fontWeight: isActive ? 600 : 500,
                    borderRadius: 'var(--radius-md)',
                    textDecoration: 'none',
                    background: isActive ? 'var(--bg-s)' : 'transparent',
                  }}
                >
                  {t(key)}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Controls — desktop */}
        <div className="nav-desktop-controls">
          <ThemeToggle />
          <LangSwitch />
        </div>

        {/* Mobile hamburger */}
        <button
          aria-label={menuOpen ? t('closeMenu') : t('openMenu')}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => {
            trackEvent({ screen, action: 'button-clicked', reference: menuOpen ? 'Fechou o menu' : 'Abriu o menu' });
            setMenuOpen((v) => !v);
          }}
          className="nav-mobile-btn"
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: 'var(--fg)',
            padding: 'var(--space-5)',
          }}
        >
          {menuOpen ? (
            <X size={20} aria-hidden="true" focusable="false" />
          ) : (
            <List size={20} aria-hidden="true" focusable="false" />
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          id="mobile-menu"
          className="nav-mobile-menu"
          style={{
            borderTop: '1px solid var(--border)',
            padding: '0 0 1rem',
            maxWidth: '1080px',
            margin: '0 auto',
          }}
        >
          <nav aria-label={t('mobileAriaLabel')}>
            <ul style={{ listStyle: 'none', margin: 0, padding: '0.75rem 0', display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
              {NAV_LINKS.map(({ href, key }) => {
                const isActive = pathname === href || pathname.startsWith(href + '/');
                return (
                  <li key={key}>
                    <Link
                      href={href}
                      aria-current={isActive ? 'page' : undefined}
                      onClick={() => {
                        trackEvent({ screen, action: 'button-clicked', reference: `Abriu ${key} pelo menu mobile` });
                        setMenuOpen(false);
                      }}
                      className={isActive ? undefined : 'nav-link'}
                      style={{
                        display: 'block',
                        padding: 'var(--space-4) var(--space-8)',
                        color: isActive ? 'var(--fg)' : 'var(--fg-2)',
                        fontSize: 'var(--text-sm)',
                        fontWeight: isActive ? 600 : 500,
                        textDecoration: 'none',
                        borderRadius: 'var(--radius-md)',
                        background: isActive ? 'var(--bg-s)' : 'transparent',
                      }}
                    >
                      {t(key)}
                    </Link>
                  </li>
                );
              })}
              <li style={{ display: 'flex', gap: 'var(--space-5)', paddingTop: '0.75rem', paddingLeft: 'var(--space-8)' }}>
                <ThemeToggle />
                <LangSwitch />
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}
