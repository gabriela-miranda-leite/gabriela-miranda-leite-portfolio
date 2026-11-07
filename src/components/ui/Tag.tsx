import React from 'react';

interface TagProps {
  label: string;
  /** 'tech' = square corners (project cards); 'pill' = rounded-full (post tag pages) */
  variant?: 'tech' | 'pill';
  selected?: boolean;
  onClick?: () => void;
  className?: string;
}

const tagStyle = (variant: 'tech' | 'pill', selected: boolean): React.CSSProperties => ({
  display: 'inline-flex',
  alignItems: 'center',
  padding: variant === 'pill' ? 'var(--space-2) var(--space-7)' : 'var(--space-1) var(--space-5)',
  borderRadius: variant === 'pill' ? 'var(--radius-pill)' : 'var(--radius-sm)',
  fontFamily: 'var(--font-mono)',
  fontSize: 'var(--text-chip)',
  textTransform: 'uppercase',
  letterSpacing: '0.06em',
  background: selected ? 'var(--acc-a)' : 'var(--bg)',
  color: selected ? 'var(--accent)' : 'var(--fg-2)',
  border: selected ? 'none' : '1px solid var(--border)',
});

export function Tag({ label, variant = 'tech', selected = false, onClick, className = '' }: TagProps) {
  const interactive = Boolean(onClick);

  if (interactive) {
    return (
      <button
        type="button"
        aria-pressed={selected}
        onClick={onClick}
        className={className}
        style={{ ...tagStyle(variant, selected), cursor: 'pointer' }}
      >
        {label}
      </button>
    );
  }

  return (
    <span className={className} style={tagStyle(variant, selected)}>
      {label}
    </span>
  );
}
