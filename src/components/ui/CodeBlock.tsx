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
      className={`relative rounded-lg overflow-hidden border border-[var(--border)] bg-[var(--bg-s)] ${className}`}
    >
      <figcaption
        className="px-4 py-2 font-mono uppercase tracking-wider border-b border-[var(--border)] text-[var(--fg-2)]"
        style={{ fontSize: 'var(--text-meta)' }}
      >
        {lang}
      </figcaption>
      <div
        className="p-4 overflow-x-auto"
        // biome-ignore lint: trusted Shiki output
        dangerouslySetInnerHTML={{ __html: html }}
        style={{ fontSize: 'var(--text-sm)' }}
      />
    </figure>
  );
}
