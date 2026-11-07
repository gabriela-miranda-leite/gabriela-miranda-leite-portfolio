export function SkipToContent() {
  return (
    <a
      href="#main-content"
      style={{
        position: 'fixed',
        top: '-100%',
        left: '1rem',
        zIndex: 9999,
        background: 'var(--color-accent)',
        color: 'var(--color-bg)',
        padding: '8px 16px',
        borderRadius: '0 0 8px 8px',
        fontWeight: 600,
        fontSize: '14px',
        textDecoration: 'none',
        transition: 'top 0.1s',
      }}
      onFocus={(e) => ((e.target as HTMLElement).style.top = '0')}
      onBlur={(e) => ((e.target as HTMLElement).style.top = '-100%')}
    >
      Ir para o conteúdo
    </a>
  );
}
