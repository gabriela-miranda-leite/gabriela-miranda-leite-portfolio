'use client';

import { MagnifyingGlass, X } from '@phosphor-icons/react';
import { useTranslations } from 'next-intl';
import { trackEvent } from '@/lib/analytics';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  const t = useTranslations('blog.listing');

  return (
    <div role="search" style={{ position: 'relative', maxWidth: '440px' }}>
      <label htmlFor="blog-search" className="sr-only">
        {t('search_label')}
      </label>
      <MagnifyingGlass
        size={15}
        weight="regular"
        aria-hidden="true"
        style={{
          position: 'absolute',
          left: '16px',
          top: '50%',
          transform: 'translateY(-50%)',
          color: 'var(--fg-2)',
          pointerEvents: 'none',
          flexShrink: 0,
        }}
      />
      <input
        id="blog-search"
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={t('search_placeholder')}
        autoComplete="off"
        style={{
          width: '100%',
          boxSizing: 'border-box',
          background: 'var(--bg-s)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-pill)',
          color: 'var(--fg)',
          fontFamily: 'var(--font-sans)',
          fontSize: 'var(--text-sm)',
          padding: '11px 40px 11px 42px',
          outline: 'none',
        }}
      />
      {value && (
        <button
          type="button"
          aria-label={t('search_clear')}
          onClick={() => {
            trackEvent({ screen: 'blog', action: 'button_clicked', reference: 'Limpou a busca' });
            onChange('');
          }}
          style={{
            position: 'absolute',
            right: '12px',
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'none',
            border: 'none',
            color: 'var(--fg-2)',
            cursor: 'pointer',
            display: 'flex',
            padding: '4px',
          }}
        >
          <X size={13} weight="bold" aria-hidden="true" />
        </button>
      )}
    </div>
  );
}
