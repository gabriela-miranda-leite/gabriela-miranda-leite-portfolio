interface AboutArtProps {
  className?: string;
}

export function AboutArt({ className }: AboutArtProps) {
  return (
    <svg
      viewBox="0 0 400 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      role="presentation"
      className={className}
      style={{ width: '100%', maxWidth: '400px', height: 'auto' }}
    >
      {/* Dot grid */}
      {Array.from({ length: 8 }, (_, row) =>
        Array.from({ length: 8 }, (_, col) => (
          <circle
            key={`dot-${row}-${col}`}
            cx={40 + col * 46}
            cy={40 + row * 46}
            r={1.5}
            style={{ fill: 'var(--border)' }}
          />
        ))
      )}

      {/* Concentric rings */}
      <circle cx="200" cy="200" r="140" style={{ stroke: 'var(--border)', strokeWidth: 1 }} />
      <circle cx="200" cy="200" r="110" style={{ stroke: 'var(--border)', strokeWidth: 1 }} />
      <circle cx="200" cy="200" r="80" style={{ stroke: 'var(--fg-2)', strokeWidth: 0.5, opacity: 0.4 }} />
      <circle cx="200" cy="200" r="50" style={{ stroke: 'var(--accent)', strokeWidth: 1.5, opacity: 0.6 }} />
      <circle cx="200" cy="200" r="22" style={{ fill: 'var(--accent)', opacity: 0.12 }} />
      <circle cx="200" cy="200" r="6" style={{ fill: 'var(--accent)', opacity: 0.8 }} />

      {/* Arc highlights */}
      <path
        d="M 200 60 A 140 140 0 0 1 340 200"
        style={{ stroke: 'var(--accent)', strokeWidth: 2, opacity: 0.5 }}
        strokeLinecap="round"
      />
      <path
        d="M 200 90 A 110 110 0 0 1 310 200"
        style={{ stroke: 'var(--fg-2)', strokeWidth: 1, opacity: 0.3 }}
        strokeLinecap="round"
      />

      {/* Code brackets — left */}
      <path
        d="M 68 160 L 52 180 L 68 200"
        style={{ stroke: 'var(--accent)', strokeWidth: 2, opacity: 0.9 }}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Code brackets — right */}
      <path
        d="M 332 160 L 348 180 L 332 200"
        style={{ stroke: 'var(--accent)', strokeWidth: 2, opacity: 0.9 }}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Small accent squares at corners */}
      <rect x="34" y="34" width="6" height="6" style={{ fill: 'var(--accent)', opacity: 0.4 }} />
      <rect x="360" y="34" width="6" height="6" style={{ fill: 'var(--accent)', opacity: 0.4 }} />
      <rect x="34" y="360" width="6" height="6" style={{ fill: 'var(--accent)', opacity: 0.4 }} />
      <rect x="360" y="360" width="6" height="6" style={{ fill: 'var(--accent)', opacity: 0.4 }} />

      {/* Horizontal tick marks on outer ring */}
      {[0, 60, 120, 180, 240, 300].map((deg) => {
        const rad = (deg * Math.PI) / 180;
        const x1 = 200 + 136 * Math.cos(rad);
        const y1 = 200 + 136 * Math.sin(rad);
        const x2 = 200 + 144 * Math.cos(rad);
        const y2 = 200 + 144 * Math.sin(rad);
        return (
          <line
            key={`tick-${deg}`}
            x1={x1} y1={y1} x2={x2} y2={y2}
            style={{ stroke: 'var(--accent)', strokeWidth: 1.5, opacity: 0.5 }}
          />
        );
      })}
    </svg>
  );
}
