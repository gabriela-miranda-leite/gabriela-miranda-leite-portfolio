import { useTranslations } from 'next-intl';
import { Container } from '@/components/layout/Container';

const STAT_VALUES = [
  { key: 'years', value: '5+' },
  { key: 'design_systems', value: '3' },
  { key: 'platforms', value: '2' },
] as const;

export function Stats() {
  const t = useTranslations('home.stats');

  return (
    <section
      aria-label="Stats"
      style={{
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
        padding: 'var(--space-15) 0',
      }}
    >
      <Container>
        <style>{`
          @media (max-width: 639px) {
            .stats-dl {
              overflow-x: auto;
              scrollbar-width: none;
              margin-inline: -24px;
              padding-inline: 24px;
            }
            .stats-dl::-webkit-scrollbar { display: none; }
            .stats-item { flex-shrink: 0; min-width: 90px; flex: 0 0 auto !important; }
          }
        `}</style>
        <dl
          className="stats-dl"
          style={{
            display: 'flex',
            margin: 0,
          }}
        >
          {STAT_VALUES.map(({ key, value }, i) => (
            <div
              key={key}
              className="stats-item"
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-3)',
                paddingLeft: i > 0 ? 'var(--space-16)' : undefined,
                paddingRight: i < STAT_VALUES.length - 1 ? 'var(--space-16)' : undefined,
                borderLeft: i > 0 ? '1px solid var(--border)' : undefined,
              }}
            >
              <dd
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'var(--text-stat)',
                  fontWeight: 700,
                  lineHeight: 1,
                  color: 'var(--fg)',
                  margin: 0,
                  fontOpticalSizing: 'auto',
                }}
              >
                {value}
              </dd>
              <dt
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'var(--text-meta)',
                  color: 'var(--fg-2)',
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                }}
              >
                {t(key)}
              </dt>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
