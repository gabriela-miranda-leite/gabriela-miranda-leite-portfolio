import React from 'react';

interface ChipProps {
  label: string;
  selected?: boolean;
  onClick?: () => void;
  className?: string;
}

const chipStyle = (selected: boolean): React.CSSProperties => ({
  display: 'inline-flex',
  alignItems: 'center',
  padding: 'var(--space-2) var(--space-7)',
  borderRadius: 'var(--radius-pill)',
  fontFamily: 'var(--font-mono)',
  fontSize: 'var(--text-chip)',
  textTransform: 'uppercase',
  letterSpacing: '0.08em',
  background: selected ? 'var(--acc-a)' : 'transparent',
  color: selected ? 'var(--accent)' : 'var(--fg-2)',
  border: selected ? '1px solid var(--accent)' : '1px solid var(--border)',
});

export function Chip({ label, selected = false, onClick, className = '' }: ChipProps) {
  const interactive = Boolean(onClick);

  if (interactive) {
    return (
      <button
        type="button"
        aria-pressed={selected}
        onClick={onClick}
        className={className}
        style={{ ...chipStyle(selected), cursor: 'pointer' }}
      >
        {label}
      </button>
    );
  }

  return (
    <span className={className} style={chipStyle(selected)}>
      {label}
    </span>
  );
}
