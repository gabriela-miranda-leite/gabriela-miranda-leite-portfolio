import { useTranslations } from 'next-intl';
import { Container } from '@/components/layout/Container';

const STAT_VALUES = [
  { key: 'years', value: '5+' },
  { key: 'dau', value: '500K+' },
  { key: 'observability', value: '3' },
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
        <dl
          style={{
            display: 'flex',
            margin: 0,
          }}
        >
          {STAT_VALUES.map(({ key, value }, i) => (
            <div
              key={key}
              style={{
                flex: 1,
                minWidth: 0,
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
                  overflowWrap: 'break-word',
                  wordBreak: 'break-word',
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
