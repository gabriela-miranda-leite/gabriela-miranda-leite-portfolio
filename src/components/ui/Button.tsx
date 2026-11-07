import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost' | 'pill';
  children: React.ReactNode;
}

export function Button({ variant = 'primary', children, className = '', ...props }: ButtonProps) {
  const base =
    'inline-flex items-center justify-center gap-2 cursor-pointer transition-opacity focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-40 disabled:cursor-not-allowed';

  const variants = {
    primary:
      'px-6 py-3 rounded-full text-sm font-semibold font-sans bg-[var(--accent)] text-[var(--bg)] hover:opacity-85 focus-visible:outline-[var(--accent)]',
    ghost:
      'px-6 py-3 rounded-full text-sm font-semibold font-sans bg-transparent text-[var(--fg)] border border-[var(--border)] hover:border-[var(--fg-2)] focus-visible:outline-[var(--accent)]',
    pill:
      'px-4 py-2 rounded-full text-xs font-mono bg-[var(--bg-s)] text-[var(--fg-2)] border border-[var(--border)] hover:border-[var(--fg-2)] focus-visible:outline-[var(--accent)]',
  };

  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}
