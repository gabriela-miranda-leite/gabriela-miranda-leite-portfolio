'use client';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { PostCard } from './PostCard';
import { TagFilter } from './TagFilter';
import { SearchBar } from './SearchBar';
import type { Post } from '@/types/post';

interface PostListProps {
  posts: Post[];
  allTags: string[];
}

export function PostList({ posts, allTags }: PostListProps) {
  const t = useTranslations('blog.listing');
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [query, setQuery] = useState('');

  const q = query.trim().toLowerCase();

  const filtered = posts.filter((p) => {
    const matchTag = !activeTag || p.tags.includes(activeTag);
    const matchSearch =
      !q ||
      p.title.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.tags.some((tag) => tag.toLowerCase().includes(q));
    return matchTag && matchSearch;
  });

  return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-10)', marginBottom: 'var(--space-16)' }}>
        <SearchBar value={query} onChange={setQuery} />
        {allTags.length > 0 && (
          <TagFilter tags={allTags} selected={activeTag} onChange={setActiveTag} />
        )}
      </div>

      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {q || activeTag ? t('results_count', { count: filtered.length }) : ''}
      </div>

      {filtered.length === 0 ? (
        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'var(--text-body)',
            color: 'var(--fg-2)',
            textAlign: 'center',
            padding: 'var(--space-18) 0',
          }}
        >
          {t('no_results')}
        </p>
      ) : (
        <div className="grid-cards">
          {filtered.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
