interface AboutArtProps {
  className?: string;
}

export function AboutArt({ className }: AboutArtProps) {
  return (
    <svg
      width="340"
      height="380"
      viewBox="0 0 340 380"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      role="presentation"
      className={className}
      style={{ display: 'block', width: '100%', height: 'auto' }}
    >
      {/* Background */}
      <rect width="340" height="380" style={{ fill: 'var(--bg-e)' }} />

      {/* Line grid */}
      <defs>
        <pattern id="about-grid" width="34" height="34" patternUnits="userSpaceOnUse">
          <path d="M 34 0 L 0 0 0 34" fill="none" style={{ stroke: 'var(--border)' }} strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="340" height="380" fill="url(#about-grid)" />

      {/* Concentric rings */}
      <circle cx="170" cy="185" r="148" style={{ stroke: 'var(--accent)' }} strokeWidth="0.5" strokeOpacity="0.07" />
      <circle cx="170" cy="185" r="118" style={{ stroke: 'var(--accent)' }} strokeWidth="0.5" strokeOpacity="0.1" />
      <circle cx="170" cy="185" r="88"  style={{ stroke: 'var(--accent)' }} strokeWidth="0.5" strokeOpacity="0.14" />
      <circle cx="170" cy="185" r="56"  style={{ stroke: 'var(--accent)' }} strokeWidth="0.5" strokeOpacity="0.2" />

      {/* Offset dashed circle */}
      <circle cx="220" cy="130" r="64" style={{ stroke: 'var(--accent)' }} strokeWidth="1" strokeOpacity="0.12" strokeDasharray="4 6" />

      {/* Inner filled accent circle */}
      <circle cx="170" cy="185" r="22" style={{ fill: 'var(--acc-a)', stroke: 'var(--accent)' }} strokeWidth="1" strokeOpacity="0.35" />

      {/* Code brackets — left [ */}
      <path d="M 72 108 L 52 108 L 52 262 L 72 262" style={{ stroke: 'var(--accent)' }} strokeWidth="1.5" strokeOpacity="0.45" strokeLinecap="round" strokeLinejoin="round" />
      {/* Code brackets — right ] */}
      <path d="M 268 108 L 288 108 L 288 262 L 268 262" style={{ stroke: 'var(--accent)' }} strokeWidth="1.5" strokeOpacity="0.45" strokeLinecap="round" strokeLinejoin="round" />

      {/* Code text */}
      <text x="88" y="150" fontFamily="'JetBrains Mono',monospace" fontSize="11" style={{ fill: 'var(--accent)' }} fillOpacity="0.4">const gabi = {'{'}</text>
      <text x="96" y="168" fontFamily="'JetBrains Mono',monospace" fontSize="10" style={{ fill: 'var(--fg-2)' }} fillOpacity="0.55">{'  '}role: &apos;dev&apos;,</text>
      <text x="96" y="184" fontFamily="'JetBrains Mono',monospace" fontSize="10" style={{ fill: 'var(--fg-2)' }} fillOpacity="0.55">{'  '}focus: &apos;ui&apos;,</text>
      <text x="96" y="200" fontFamily="'JetBrains Mono',monospace" fontSize="10" style={{ fill: 'var(--fg-2)' }} fillOpacity="0.55">{'  '}loves: a11y,</text>
      <text x="88" y="218" fontFamily="'JetBrains Mono',monospace" fontSize="11" style={{ fill: 'var(--accent)' }} fillOpacity="0.4">{'}'}</text>

      {/* Diagonal corner lines */}
      <line x1="20"  y1="50"  x2="85"  y2="108" style={{ stroke: 'var(--accent)' }} strokeWidth="0.5" strokeOpacity="0.12" />
      <line x1="320" y1="50"  x2="255" y2="108" style={{ stroke: 'var(--accent)' }} strokeWidth="0.5" strokeOpacity="0.12" />
      <line x1="20"  y1="330" x2="85"  y2="262" style={{ stroke: 'var(--accent)' }} strokeWidth="0.5" strokeOpacity="0.12" />
      <line x1="320" y1="330" x2="255" y2="262" style={{ stroke: 'var(--accent)' }} strokeWidth="0.5" strokeOpacity="0.12" />

      {/* Accent dot cluster — top right */}
      <circle cx="296" cy="54" r="3"   style={{ fill: 'var(--accent)' }} fillOpacity="0.55" />
      <circle cx="308" cy="54" r="2"   style={{ fill: 'var(--accent)' }} fillOpacity="0.35" />
      <circle cx="302" cy="45" r="1.5" style={{ fill: 'var(--accent)' }} fillOpacity="0.25" />

      {/* Accent dot cluster — bottom left */}
      <circle cx="44" cy="326" r="2.5" style={{ fill: 'var(--accent)' }} fillOpacity="0.45" />
      <circle cx="54" cy="334" r="1.5" style={{ fill: 'var(--accent)' }} fillOpacity="0.3" />

      {/* Small hollow squares */}
      <rect x="44"  y="56"  width="18" height="18" style={{ stroke: 'var(--fg-3)' }} strokeWidth="1" rx="3" />
      <rect x="278" y="298" width="14" height="14" style={{ stroke: 'var(--fg-3)' }} strokeWidth="1" rx="2" />

      {/* Corner L-tags — bottom */}
      <path d="M 18 358 L 18 374 L 34 374"  style={{ stroke: 'var(--accent)' }} strokeWidth="1" strokeOpacity="0.4" strokeLinecap="round" />
      <path d="M 322 358 L 322 374 L 306 374" style={{ stroke: 'var(--accent)' }} strokeWidth="1" strokeOpacity="0.4" strokeLinecap="round" />

      {/* Accent bar — bottom */}
      <rect x="0" y="377" width="340" height="3" style={{ fill: 'var(--accent)' }} />
    </svg>
  );
}
