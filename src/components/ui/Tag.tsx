import React from 'react';

interface TagProps {
  label: string;
  selected?: boolean;
  onClick?: () => void;
  className?: string;
}

export function Tag({ label, selected = false, onClick, className = '' }: TagProps) {
  const interactive = Boolean(onClick);

  const base =
    'inline-flex items-center px-2 py-0.5 rounded font-mono uppercase tracking-wider transition-colors';

  const style = selected
    ? 'bg-[var(--acc-a)] text-[var(--accent)]'
    : 'bg-[var(--bg-e)] text-[var(--fg-2)] hover:text-[var(--fg)]';

  if (interactive) {
    return (
      <button
        type="button"
        aria-pressed={selected}
        onClick={onClick}
        className={`${base} ${style} cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] ${className}`}
        style={{ fontSize: 'var(--text-chip)' }}
      >
        {label}
      </button>
    );
  }

  return (
    <span className={`${base} ${style} ${className}`} style={{ fontSize: 'var(--text-chip)' }}>
      {label}
    </span>
  );
}
