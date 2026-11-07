import React from 'react';

interface ChipProps {
  label: string;
  selected?: boolean;
  onClick?: () => void;
  className?: string;
}

export function Chip({ label, selected = false, onClick, className = '' }: ChipProps) {
  const interactive = Boolean(onClick);

  const base =
    'inline-flex items-center px-3 py-1 rounded-full font-mono uppercase tracking-widest transition-colors';

  const style = selected
    ? 'bg-[var(--acc-a)] text-[var(--accent)] border border-[var(--accent)]'
    : 'bg-transparent text-[var(--fg-2)] border border-[var(--border)] hover:border-[var(--fg-2)]';

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
    <span
      className={`${base} ${style} ${className}`}
      style={{ fontSize: 'var(--text-chip)' }}
    >
      {label}
    </span>
  );
}
