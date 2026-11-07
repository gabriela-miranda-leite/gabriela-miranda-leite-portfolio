import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import type { Post } from '@/types/post';

interface RecentPostsProps {
  posts: Post[];
}

export function RecentPosts({ posts }: RecentPostsProps) {
  const t = useTranslations('home');

  return (
    <section
      aria-labelledby="recent-posts-heading"
      style={{
        paddingTop: '4rem',
        paddingBottom: '4rem',
        paddingLeft: '1rem',
        paddingRight: '1rem',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'baseline',
          justifyContent: 'space-between',
          gap: '1rem',
          flexWrap: 'wrap',
          marginBottom: '2rem',
        }}
      >
        <h2
          id="recent-posts-heading"
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'var(--text-section)',
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
            fontSize: 'var(--text-sm)',
            color: 'var(--accent)',
            textDecoration: 'none',
          }}
        >
          {t('see_all')}
        </Link>
      </div>

      {posts.length === 0 ? null : (
        <ul
          style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
        >
          {posts.map((post) => (
            <li
              key={post.slug}
              style={{
                borderTop: '1px solid var(--border)',
                paddingTop: '1.5rem',
              }}
            >
              <Link
                href={`/blog/${post.slug}`}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <p
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'var(--text-meta)',
                    color: 'var(--fg-2)',
                    marginBottom: '0.5rem',
                  }}
                >
                  {post.date}
                </p>
                <h3
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: 'var(--text-card)',
                    fontWeight: 600,
                    color: 'var(--fg)',
                    marginBottom: '0.5rem',
                  }}
                >
                  {post.title}
                </h3>
                <p
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: 'var(--text-sm)',
                    lineHeight: 'var(--leading-sm)',
                    color: 'var(--fg-2)',
                  }}
                >
                  {post.excerpt}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
