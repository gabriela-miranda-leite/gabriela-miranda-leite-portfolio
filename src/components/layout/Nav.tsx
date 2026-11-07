'use client';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { LangSwitch } from './LangSwitch';
import { ThemeToggle } from './ThemeToggle';
import { Container } from './Container';

const NAV_LINKS = [
  { href: '/blog', key: 'blog' },
  { href: '/projects', key: 'projects' },
  { href: '/about', key: 'about' },
] as const;

export function Nav() {
  const t = useTranslations('nav');
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        background: 'var(--bg)',
        borderBottom: '1px solid var(--border)',
      }}
    >
      <Container>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '56px',
          }}
        >
          {/* Logo */}
          <Link
            href="/"
            aria-label="Gabi Miranda — início"
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'var(--text-logo)',
              color: 'var(--fg)',
              textDecoration: 'none',
              letterSpacing: '-0.01em',
            }}
          >
            gabi<span style={{ color: 'var(--accent)' }}>.</span>
          </Link>

          {/* Desktop nav */}
          <nav aria-label={t('ariaLabel')}>
            <ul
              style={{
                display: 'flex',
                gap: '2rem',
                listStyle: 'none',
                margin: 0,
                padding: 0,
                alignItems: 'center',
              }}
            >
              {NAV_LINKS.map(({ href, key }) => {
                const isActive = pathname === href || pathname.startsWith(href + '/');
                return (
                  <li key={key} style={{ display: 'none' }} className="nav-desktop-item">
                    <Link
                      href={href}
                      aria-current={isActive ? 'page' : undefined}
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: 'var(--text-meta)',
                        fontWeight: isActive ? 600 : 400,
                        color: isActive ? 'var(--fg)' : 'var(--fg-2)',
                        textDecoration: 'none',
                        letterSpacing: '0.04em',
                        textTransform: 'uppercase',
                      }}
                    >
                      {t(key)}
                    </Link>
                  </li>
                );
              })}
              <li className="nav-desktop-item" style={{ display: 'none' }}>
                <ThemeToggle />
              </li>
              <li className="nav-desktop-item" style={{ display: 'none' }}>
                <LangSwitch />
              </li>
            </ul>
          </nav>

          {/* Mobile menu button */}
          <button
            aria-label={menuOpen ? t('closeMenu') : t('openMenu')}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((v) => !v)}
            className="nav-mobile-btn"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--fg)',
              padding: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {menuOpen ? (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true" focusable="false">
                <path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true" focusable="false">
                <path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            )}
          </button>
        </div>
      </Container>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          id="mobile-menu"
          className="nav-mobile-menu"
          style={{
            background: 'var(--bg-s)',
            borderTop: '1px solid var(--border)',
          }}
        >
          <Container>
            <nav aria-label={t('ariaLabel')}>
              <ul
                style={{
                  listStyle: 'none',
                  margin: 0,
                  padding: '1rem 0',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.5rem',
                }}
              >
                {NAV_LINKS.map(({ href, key }) => {
                  const isActive = pathname === href || pathname.startsWith(href + '/');
                  return (
                    <li key={key}>
                      <Link
                        href={href}
                        aria-current={isActive ? 'page' : undefined}
                        onClick={() => setMenuOpen(false)}
                        style={{
                          display: 'block',
                          fontFamily: 'var(--font-sans)',
                          fontSize: 'var(--text-sm)',
                          fontWeight: isActive ? 600 : 400,
                          color: isActive ? 'var(--fg)' : 'var(--fg-2)',
                          textDecoration: 'none',
                          padding: '0.5rem 0',
                        }}
                      >
                        {t(key)}
                      </Link>
                    </li>
                  );
                })}
                <li style={{ paddingTop: '0.5rem', display: 'flex', gap: '0.5rem' }}>
                  <ThemeToggle />
                  <LangSwitch />
                </li>
              </ul>
            </nav>
          </Container>
        </div>
      )}

      <style>{`
        @media (min-width: 640px) {
          .nav-desktop-item { display: list-item !important; }
          .nav-mobile-btn { display: none !important; }
          .nav-mobile-menu { display: none !important; }
        }
        @media (max-width: 639px) {
          .nav-desktop-item { display: none !important; }
        }
      `}</style>
    </header>
  );
}
