'use client';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { PostCard } from './PostCard';
import { TagFilter } from './TagFilter';
import type { Post } from '@/types/post';

interface PostListProps {
  posts: Post[];
  allTags: string[];
}

export function PostList({ posts, allTags }: PostListProps) {
  const t = useTranslations('blog.listing');
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const filtered = activeTag ? posts.filter((p) => p.tags.includes(activeTag)) : posts;

  return (
    <div>
      {allTags.length > 0 && (
        <div style={{ marginBottom: 'var(--space-16)' }}>
          <TagFilter tags={allTags} selected={activeTag} onChange={setActiveTag} />
        </div>
      )}

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
