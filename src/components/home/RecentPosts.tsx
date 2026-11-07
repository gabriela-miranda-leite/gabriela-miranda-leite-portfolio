import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Container } from '@/components/layout/Container';
import type { Post } from '@/types/post';

interface RecentPostsProps {
  posts: Post[];
}

export function RecentPosts({ posts }: RecentPostsProps) {
  const t = useTranslations('home');

  return (
    <section
      aria-labelledby="recent-posts-heading"
      style={{ paddingTop: '80px' }}
    >
      <Container>
        <div
          style={{
            display: 'flex',
            alignItems: 'baseline',
            justifyContent: 'space-between',
            gap: '16px',
            flexWrap: 'wrap',
            marginBottom: '40px',
          }}
        >
          <h2
            id="recent-posts-heading"
            style={{
              fontFamily: 'var(--font-serif)',
              fontStyle: 'italic',
              fontSize: 'var(--text-section)',
              fontWeight: 400,
              lineHeight: 'var(--leading-heading)',
              color: 'var(--fg)',
              margin: 0,
            }}
          >
            {t('recent_posts')}
          </h2>
          <Link
            href="/blog"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--text-meta)',
              color: 'var(--accent)',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              whiteSpace: 'nowrap',
            }}
          >
            {t('see_all')}
          </Link>
        </div>

        {posts.map((post, i) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            style={{
              display: 'grid',
              gridTemplateColumns: '40px 1fr auto',
              alignItems: 'start',
              gap: '20px 24px',
              padding: '24px 0',
              borderTop: '1px solid var(--border)',
              textDecoration: 'none',
              color: 'inherit',
            }}
          >
            <span
              aria-hidden="true"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-meta)',
                color: 'var(--fg-3)',
                paddingTop: '4px',
                textAlign: 'right',
                letterSpacing: '0.02em',
              }}
            >
              {String(i + 1).padStart(2, '0')}
            </span>
            <div>
              <p
                style={{
                  fontWeight: 600,
                  fontSize: 'var(--text-card)',
                  color: 'var(--fg)',
                  lineHeight: 'var(--leading-card)',
                  marginBottom: '7px',
                  margin: '0 0 7px',
                }}
              >
                {post.title}
              </p>
              <p
                style={{
                  fontSize: 'var(--text-sm)',
                  color: 'var(--fg-2)',
                  lineHeight: 'var(--leading-sm)',
                  margin: 0,
                }}
              >
                {post.excerpt}
              </p>
            </div>
            {post.tags[0] && (
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'var(--text-chip)',
                  letterSpacing: '0.04em',
                  background: 'var(--acc-a)',
                  color: 'var(--accent)',
                  padding: '4px 10px',
                  borderRadius: '100px',
                  whiteSpace: 'nowrap',
                  marginTop: '3px',
                }}
              >
                {post.tags[0]}
              </span>
            )}
          </Link>
        ))}
      </Container>
    </section>
  );
}
