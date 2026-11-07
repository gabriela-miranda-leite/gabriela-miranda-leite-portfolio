import { useTranslations } from 'next-intl';
import { Container } from '@/components/layout/Container';

const STAT_VALUES = [
  { key: 'years', value: '4+' },
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
        paddingTop: '2rem',
        paddingBottom: '2rem',
      }}
    >
      <Container>
      <dl
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
          gap: '2rem',
          maxWidth: '100%',
        }}
      >
        {STAT_VALUES.map(({ key, value }) => (
          <div key={key}>
            <dt
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-eyebrow)',
                color: 'var(--fg-2)',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                marginBottom: '0.5rem',
              }}
            >
              {t(key)}
            </dt>
            <dd
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                lineHeight: 'var(--leading-tight)',
                color: 'var(--accent)',
                margin: 0,
              }}
            >
              {value}
            </dd>
          </div>
        ))}
      </dl>
      </Container>
    </section>
  );
}
