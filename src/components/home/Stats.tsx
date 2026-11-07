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
        padding: '36px 0',
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
                display: 'flex',
                flexDirection: 'column',
                gap: '6px',
                paddingLeft: i > 0 ? '40px' : undefined,
                paddingRight: i < STAT_VALUES.length - 1 ? '40px' : undefined,
                borderLeft: i > 0 ? '1px solid var(--border)' : undefined,
              }}
            >
              <dd
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '44px',
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
                  fontSize: '11px',
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
