import React from 'react';

interface TagProps {
  label: string;
  /** 'tech' = square corners (project cards); 'pill' = rounded-full (post tag pages) */
  variant?: 'tech' | 'pill';
  selected?: boolean;
  onClick?: () => void;
  className?: string;
}

export function Tag({ label, variant = 'tech', selected = false, onClick, className = '' }: TagProps) {
  const interactive = Boolean(onClick);

  const base = 'inline-flex items-center font-mono uppercase tracking-wider transition-colors';

  const variantStyles = {
    tech: 'px-2 py-0.5 rounded',
    pill: 'px-3 py-1 rounded-full',
  };

  const colorStyles = selected
    ? 'bg-[var(--acc-a)] text-[var(--accent)]'
    : 'bg-[var(--bg)] text-[var(--fg-2)] border border-[var(--border)] hover:text-[var(--fg)]';

  const classes = `${base} ${variantStyles[variant]} ${colorStyles} ${className}`;

  if (interactive) {
    return (
      <button
        type="button"
        aria-pressed={selected}
        onClick={onClick}
        className={`${classes} cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]`}
        style={{ fontSize: 'var(--text-chip)' }}
      >
        {label}
      </button>
    );
  }

  return (
    <span className={classes} style={{ fontSize: 'var(--text-chip)' }}>
      {label}
    </span>
  );
}
