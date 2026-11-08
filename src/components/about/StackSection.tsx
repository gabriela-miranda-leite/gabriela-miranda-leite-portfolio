'use client';

import { useTranslations } from 'next-intl';
import { Container } from '@/components/layout/Container';

interface StackGroup {
  label: string;
  items: string[];
}

export function StackSection() {
  const t = useTranslations('about.stack');
  const groups = t.raw('groups') as StackGroup[];

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

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-15)' }}>
          {groups.map(({ label, items }, i) => (
            <div key={label}>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'var(--text-eyebrow)',
                  color: 'var(--accent)',
                  letterSpacing: '0.10em',
                  textTransform: 'uppercase',
                  marginBottom: 'var(--space-9)',
                }}
              >
                {label}
              </div>
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 'var(--space-6)',
                }}
              >
                {items.map((item) => (
                  <span
                    key={item}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      padding: '5px 12px',
                      borderRadius: '999px',
                      border: '1px solid var(--border)',
                      background: 'var(--bg-s)',
                      fontFamily: 'var(--font-sans)',
                      fontSize: 'var(--text-sm)',
                      fontWeight: 500,
                      color: 'var(--fg-2)',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {item}
                  </span>
                ))}
              </div>
              {i < groups.length - 1 && (
                <div
                  aria-hidden="true"
                  style={{
                    height: '1px',
                    background: 'var(--border)',
                    marginTop: 'var(--space-15)',
                  }}
                />
              )}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
