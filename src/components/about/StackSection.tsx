'use client';

import { useTranslations } from 'next-intl';
import { Container } from '@/components/layout/Container';

export function StackSection() {
  const t = useTranslations('about.stack');

  const columns = [
    {
      key: 'frontend',
      label: t('frontend.label'),
      items: t.raw('frontend.items') as string[],
    },
    {
      key: 'mobile',
      label: t('mobile.label'),
      items: t.raw('mobile.items') as string[],
    },
    {
      key: 'tools',
      label: t('tools.label'),
      items: t.raw('tools.items') as string[],
    },
  ];

  return (
    <section
      className="section-enter"
      aria-labelledby="stack-heading"
      style={{
        paddingTop: 'clamp(2rem, 5vw, var(--space-18))',
        paddingBottom: 'clamp(2rem, 5vw, var(--space-18))',
        borderTop: '1px solid var(--border)',
        '--enter-delay': '0.15s',
      } as React.CSSProperties}
    >
      <Container>
        <h2
          id="stack-heading"
          style={{
            fontFamily: 'var(--font-serif)',
            fontStyle: 'italic',
            fontSize: 'clamp(1.75rem, 4vw, var(--text-section))',
            fontWeight: 400,
            lineHeight: 'var(--leading-heading)',
            color: 'var(--fg)',
            margin: '0 0 var(--space-16)',
            letterSpacing: '-0.02em',
          }}
        >
          {t('title')}
        </h2>

        <div className="stack-grid">
          {columns.map(({ key, label, items }) => (
            <div
              key={key}
              style={{
                background: 'var(--bg-s)',
                border: '1px solid var(--border)',
                borderRadius: '12px',
                padding: 'var(--space-15)',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'var(--text-eyebrow)',
                  color: 'var(--accent)',
                  letterSpacing: '0.10em',
                  textTransform: 'uppercase',
                  marginBottom: 'var(--space-13)',
                }}
              >
                {label}
              </div>
              <ul
                style={{
                  listStyle: 'none',
                  margin: 0,
                  padding: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'var(--space-9)',
                }}
              >
                {items.map((item) => (
                  <li
                    key={item}
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: 'var(--text-body)',
                      color: 'var(--fg)',
                      lineHeight: 'var(--leading-card)',
                    }}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>

      <style>{`
        .stack-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: var(--space-13);
        }
        @media (min-width: 640px) {
          .stack-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }
      `}</style>
    </section>
  );
}
