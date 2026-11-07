interface ProseProps {
  children: React.ReactNode;
}

export function Prose({ children }: ProseProps) {
  return (
    <>
      <style>{`
        .prose {
          font-family: var(--font-sans);
          font-size: var(--text-body);
          line-height: var(--leading-body);
          color: var(--fg);
          max-width: 68ch;
        }

        .prose h2 {
          font-family: var(--font-serif);
          font-size: var(--text-section);
          font-weight: 600;
          line-height: var(--leading-heading);
          color: var(--fg);
          margin: var(--space-18) 0 var(--space-12);
          letter-spacing: -0.01em;
        }

        .prose h3 {
          font-family: var(--font-sans);
          font-size: var(--text-card);
          font-weight: 700;
          line-height: var(--leading-card);
          color: var(--fg);
          margin: var(--space-14) 0 var(--space-5);
        }

        .prose p {
          margin: 0 0 var(--space-10);
        }

        .prose > p:first-child {
          font-size: var(--text-lede);
          line-height: var(--leading-lede);
          color: var(--fg-2);
          border-left: 2px solid var(--accent);
          padding-left: var(--space-12);
          margin-bottom: var(--space-14);
        }

        .prose a {
          color: var(--accent);
          text-decoration: underline;
          text-underline-offset: 3px;
        }

        .prose strong {
          font-weight: 700;
          color: var(--fg);
        }

        .prose em {
          font-style: italic;
        }

        .prose ul,
        .prose ol {
          margin: 0 0 var(--space-10);
          padding-left: var(--space-14);
        }

        .prose li {
          margin-bottom: var(--space-3);
        }

        .prose blockquote {
          border-left: 3px solid var(--accent);
          padding-left: var(--space-10);
          margin: var(--space-14) 0;
          color: var(--fg-2);
          font-style: italic;
        }

        .prose pre {
          background: var(--bg-s);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          padding: var(--space-10);
          overflow-x: auto;
          margin: var(--space-10) 0;
          font-family: var(--font-mono);
          font-size: var(--text-sm);
          line-height: var(--leading-sm);
        }

        .prose code:not(pre code) {
          font-family: var(--font-mono);
          font-size: 0.9em;
          background: var(--bg-s);
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          padding: 0.1em 0.4em;
          color: var(--accent);
        }

        .prose img {
          max-width: 100%;
          border-radius: var(--radius-lg);
          margin: var(--space-10) 0;
        }

        .prose hr {
          border: none;
          border-top: 1px solid var(--border);
          margin: var(--space-18) 0;
        }

        @media (max-width: 639px) {
          .prose pre {
            border-radius: 0;
            margin-left: calc(-1 * var(--space-13));
            margin-right: calc(-1 * var(--space-13));
            padding: var(--space-10) var(--space-13);
          }
        }
      `}</style>
      <div className="prose">{children}</div>
    </>
  );
}
