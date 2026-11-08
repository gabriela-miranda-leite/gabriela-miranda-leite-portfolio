'use client';
import { useTranslations } from 'next-intl';
import { Chip } from '@/components/ui/Chip';
import { trackEvent } from '@/lib/analytics';

interface TagFilterProps {
  tags: string[];
  selected: string | null;
  onChange: (tag: string | null) => void;
}

export function TagFilter({ tags, selected, onChange }: TagFilterProps) {
  const t = useTranslations('blog.listing');

  return (
    <div
      role="group"
      aria-label={t('filter_label')}
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 'var(--space-3)',
      }}
    >
      <Chip
        label={t('all')}
        selected={selected === null}
        onClick={() => {
          trackEvent({ screen: 'blog', action: 'button_clicked', reference: 'Filtrou por todos' });
          onChange(null);
        }}
      />
      {tags.map((tag) => (
        <Chip
          key={tag}
          label={tag}
          selected={selected === tag}
          onClick={() => {
            trackEvent({ screen: 'blog', action: 'button_clicked', reference: `Filtrou pela tag ${tag}` });
            onChange(selected === tag ? null : tag);
          }}
        />
      ))}
    </div>
  );
}
