'use client';

import { useTranslations } from 'next-intl';
import { Container } from '@/components/layout/Container';

interface ExperienceItem {
  year: string;
  role: string;
  company: string;
  description: string;
}

export function ExperienceSection() {
  const t = useTranslations('about.experience');
  const items = t.raw('items') as ExperienceItem[];

  return (
    <section
      aria-labelledby="experience-heading"
      style={{
        paddingTop: 'clamp(2rem, 5vw, var(--space-18))',
        paddingBottom: 'clamp(2rem, 5vw, var(--space-18))',
        borderTop: '1px solid var(--border)',
      }}
    >
      <Container>
        <h2
          id="experience-heading"
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

        <ol
          style={{
            listStyle: 'none',
            margin: 0,
            padding: 0,
          }}
        >
          {items.map((item, index) => (
            <li
              key={index}
              style={{
                borderBottom: index < items.length - 1 ? '1px solid var(--border)' : undefined,
                padding: 'var(--space-16) 0',
              }}
            >
              <div className="experience-row">
                {/* Year */}
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'var(--text-sm)',
                    color: 'var(--accent)',
                    letterSpacing: '0.04em',
                    flexShrink: 0,
                  }}
                >
                  {item.year}
                </div>

                {/* Content */}
                <div>
                  <div
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: 'var(--text-card)',
                      fontWeight: 600,
                      color: 'var(--fg)',
                      marginBottom: 'var(--space-3)',
                    }}
                  >
                    {item.role}
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: 'var(--text-sm)',
                      color: 'var(--accent)',
                      marginBottom: 'var(--space-7)',
                      fontWeight: 500,
                    }}
                  >
                    {item.company}
                  </div>
                  <p
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: 'var(--text-body)',
                      lineHeight: 'var(--leading-body)',
                      color: 'var(--fg-2)',
                      margin: 0,
                    }}
                  >
                    {item.description}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </Container>

      <style>{`
        .experience-row {
          display: grid;
          grid-template-columns: 1fr;
          gap: var(--space-7);
        }
        @media (min-width: 640px) {
          .experience-row {
            grid-template-columns: 160px 1fr;
            gap: var(--space-13);
          }
        }
      `}</style>
    </section>
  );
}
