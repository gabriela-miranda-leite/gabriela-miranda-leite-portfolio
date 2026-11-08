'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { trackEvent } from '@/lib/analytics';

const GITHUB_USERNAME = process.env.GITHUB_USERNAME ?? 'gabriela-miranda-leite';

import type { Post } from '@/types/post';

interface PostHeaderProps {
  post: Post;
}

export function PostHeader({ post }: PostHeaderProps) {
  const t = useTranslations('blog');

  return (
    <header style={{ marginBottom: 'var(--space-16)' }}>
      {/* Breadcrumb: Blog / tag */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--space-5)',
          fontFamily: 'var(--font-mono)',
          fontSize: 'var(--text-meta)',
          letterSpacing: '0.03em',
          marginBottom: 'var(--space-14)',
        }}
      >
        <Link
          href="/blog"
          onClick={() => trackEvent({ screen: 'blog', action: 'button_clicked', reference: 'Voltou para o blog pelo breadcrumb' })}
          style={{ color: 'var(--fg-2)', textDecoration: 'none' }}
        >
          Blog
        </Link>
        {post.tags[0] && (
          <>
            <span aria-hidden="true" style={{ color: 'var(--fg-3)' }}>/</span>
            <span style={{ color: 'var(--fg-3)' }}>{post.tags[0]}</span>
          </>
        )}
      </div>

      {/* Tag chip */}
      {post.tags.length > 0 && (
        <div style={{ marginBottom: 'var(--space-12)' }}>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--text-chip)',
              color: 'var(--accent)',
              background: 'var(--acc-a)',
              padding: 'var(--space-2) var(--space-6)',
              borderRadius: 'var(--radius-pill)',
              letterSpacing: '0.05em',
            }}
          >
            {post.tags[0]}
          </span>
        </div>
      )}

      {/* Title — weight 700, sem italic (fiel ao design) */}
      <h1
        style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(2rem, 6vw, var(--text-title))',
          fontWeight: 700,
          lineHeight: 'var(--leading-heading)',
          color: 'var(--fg)',
          margin: '0 0 var(--space-13)',
          letterSpacing: '-0.02em',
          fontOpticalSizing: 'auto',
          textWrap: 'balance',
        } as React.CSSProperties}
      >
        {post.title}
      </h1>

      {/* Meta row: avatar + author + divider + date + divider + reading time */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--space-12)',
          paddingBottom: 'var(--space-14)',
          borderBottom: '1px solid var(--border)',
          flexWrap: 'wrap',
        }}
      >
        {/* Author */}
        <div className="meta-author" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-6)' }}>
          <Image
            src={`https://avatars.githubusercontent.com/${GITHUB_USERNAME}`}
            alt=""
            role="presentation"
            width={36}
            height={36}
            style={{ borderRadius: '50%', border: '1px solid var(--border)', flexShrink: 0 }}
          />
          <span
            style={{
              fontSize: 'var(--text-sm)',
              fontWeight: 500,
              color: 'var(--fg)',
              fontFamily: 'var(--font-sans)',
            }}
          >
            Gabi Miranda
          </span>
        </div>

        <span aria-hidden="true" className="divider-inline" />

        <time
          dateTime={post.date}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--text-meta)',
            color: 'var(--fg-2)',
            letterSpacing: '0.02em',
          }}
        >
          {new Date(post.date).toLocaleDateString(post.locale === 'pt' ? 'pt-BR' : 'en-US', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          })}
        </time>

        {post.readingTime && (
          <>
            <span aria-hidden="true" className="divider-inline" />
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-meta)',
                color: 'var(--fg-2)',
                letterSpacing: '0.02em',
              }}
            >
              {t('reading_time', { minutes: post.readingTime })}
            </span>
          </>
        )}
      </div>
    </header>
  );
}
