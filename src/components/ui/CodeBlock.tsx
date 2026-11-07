import React from 'react';
import { codeToHtml } from 'shiki';

interface CodeBlockProps {
  code: string;
  lang?: string;
  className?: string;
}

export async function CodeBlock({ code, lang = 'text', className = '' }: CodeBlockProps) {
  const html = await codeToHtml(code, {
    lang,
    theme: 'vitesse-dark',
  });

  return (
    <figure
      aria-label={`Bloco de código em ${lang}`}
      style={{
        position: 'relative',
        borderRadius: 'var(--radius-md)',
        overflow: 'hidden',
        border: '1px solid var(--border)',
        background: 'var(--bg-s)',
      }}
      className={className}
    >
      <figcaption
        style={{
          padding: 'var(--space-5) var(--space-10)',
          fontFamily: 'var(--font-mono)',
          fontSize: 'var(--text-meta)',
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
          borderBottom: '1px solid var(--border)',
          color: 'var(--fg-2)',
        }}
      >
        {lang}
      </figcaption>
      <div
        style={{ padding: 'var(--space-10)', overflowX: 'auto', fontSize: 'var(--text-sm)' }}
        // biome-ignore lint: trusted Shiki output
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </figure>
  );
}
