import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost' | 'pill';
  children: React.ReactNode;
}

const variantStyles: Record<string, React.CSSProperties> = {
  primary: {
    padding: 'var(--space-7) var(--space-13)',
    borderRadius: 'var(--radius-pill)',
    fontSize: 'var(--text-sm)',
    fontWeight: 600,
    fontFamily: 'var(--font-sans)',
    background: 'var(--accent)',
    color: 'var(--bg)',
    border: 'none',
  },
  ghost: {
    padding: 'var(--space-7) var(--space-13)',
    borderRadius: 'var(--radius-pill)',
    fontSize: 'var(--text-sm)',
    fontWeight: 600,
    fontFamily: 'var(--font-sans)',
    background: 'transparent',
    color: 'var(--fg)',
    border: '1px solid var(--border)',
  },
  pill: {
    padding: 'var(--space-5) var(--space-10)',
    borderRadius: 'var(--radius-pill)',
    fontSize: 'var(--text-chip)',
    fontFamily: 'var(--font-mono)',
    background: 'var(--bg-s)',
    color: 'var(--fg-2)',
    border: '1px solid var(--border)',
  },
};

export function Button({ variant = 'primary', children, className = '', style, ...props }: ButtonProps & { style?: React.CSSProperties }) {
  return (
    <button
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 'var(--space-5)',
        cursor: 'pointer',
        ...variantStyles[variant],
        ...style,
      }}
      {...props}
    >
      {children}
    </button>
  );
}
