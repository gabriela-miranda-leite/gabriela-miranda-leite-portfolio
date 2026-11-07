'use client';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { LangSwitch } from './LangSwitch';
import { ThemeToggle } from './ThemeToggle';

const NAV_LINKS = [
  { href: '/blog', key: 'blog' },
  { href: '/projects', key: 'projects' },
  { href: '/about', key: 'about' },
] as const;

const PILL: React.CSSProperties = {
  background: 'var(--bg-s)',
  border: '1px solid var(--border)',
  color: 'var(--fg-2)',
  padding: '7px 15px',
  borderRadius: '100px',
  fontSize: '12px',
  fontFamily: 'var(--font-mono)',
  whiteSpace: 'nowrap',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  gap: '5px',
};

export { PILL };

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
          padding: '18px 0',
          gap: '24px',
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          aria-label="Gabi Miranda — início"
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '18px',
            fontWeight: 500,
            fontStyle: 'italic',
            color: 'var(--fg)',
            textDecoration: 'none',
            whiteSpace: 'nowrap',
          }}
        >
          Gabi Miranda
        </Link>

        {/* Nav links — desktop */}
        <nav aria-label={t('ariaLabel')} className="nav-desktop-links">
          <div style={{ display: 'flex', gap: '4px' }}>
            {NAV_LINKS.map(({ href, key }) => {
              const isActive = pathname === href || pathname.startsWith(href + '/');
              return (
                <Link
                  key={key}
                  href={href}
                  aria-current={isActive ? 'page' : undefined}
                  style={{
                    display: 'block',
                    padding: '7px 13px',
                    color: isActive ? 'var(--fg)' : 'var(--fg-2)',
                    fontSize: '14px',
                    fontWeight: isActive ? 600 : 500,
                    borderRadius: '7px',
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
        <div
          className="nav-desktop-controls"
          style={{ display: 'none', alignItems: 'center', gap: '8px' }}
        >
          <ThemeToggle />
          <LangSwitch />
        </div>

        {/* Mobile hamburger */}
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
          <nav aria-label={t('ariaLabel')}>
            <ul style={{ listStyle: 'none', margin: 0, padding: '0.75rem 0', display: 'flex', flexDirection: 'column', gap: '2px' }}>
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
                        padding: '7px 13px',
                        color: isActive ? 'var(--fg)' : 'var(--fg-2)',
                        fontSize: '14px',
                        fontWeight: isActive ? 600 : 500,
                        textDecoration: 'none',
                        borderRadius: '7px',
                        background: isActive ? 'var(--bg-s)' : 'transparent',
                      }}
                    >
                      {t(key)}
                    </Link>
                  </li>
                );
              })}
              <li style={{ display: 'flex', gap: '8px', paddingTop: '0.75rem', paddingLeft: '13px' }}>
                <ThemeToggle />
                <LangSwitch />
              </li>
            </ul>
          </nav>
        </div>
      )}

      <style>{`
        @media (min-width: 640px) {
          .nav-desktop-links { display: block !important; }
          .nav-desktop-controls { display: flex !important; }
          .nav-mobile-btn { display: none !important; }
          .nav-mobile-menu { display: none !important; }
        }
        @media (max-width: 639px) {
          .nav-desktop-links { display: none !important; }
          .nav-desktop-controls { display: none !important; }
        }
      `}</style>
    </header>
  );
}
