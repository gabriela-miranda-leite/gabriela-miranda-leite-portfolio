import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost';
  children: React.ReactNode;
}

export function Button({ variant = 'primary', children, className = '', ...props }: ButtonProps) {
  const base =
    'inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded text-sm font-semibold font-sans cursor-pointer transition-opacity focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-40 disabled:cursor-not-allowed';

  const variants = {
    primary: 'bg-[var(--accent)] text-[var(--bg)] hover:opacity-85 focus-visible:outline-[var(--accent)]',
    ghost:
      'bg-transparent text-[var(--fg)] border border-[var(--border)] hover:border-[var(--fg-2)] focus-visible:outline-[var(--accent)]',
  };

  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}
