interface VideoEmbedProps {
  src: string;
  caption: string;
  poster?: string;
  landscape?: boolean;
}

export function VideoEmbed({ src, caption, poster, landscape = false }: VideoEmbedProps) {
  const type = src.endsWith('.webm') ? 'video/webm' : 'video/mp4';
  return (
    <>
      <style>{`
        .video-embed {
          margin: var(--space-10) 0;
        }

        .video-embed video {
          display: block;
          width: 100%;
          max-width: 320px;
          height: auto;
          margin: 0 auto;
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          background: var(--bg-s);
          accent-color: var(--accent);
          color-scheme: dark;
        }

        .video-embed video:focus-visible {
          outline: 2px solid var(--accent);
          outline-offset: 2px;
        }

        .video-embed figcaption {
          max-width: 320px;
          margin: var(--space-3) auto 0;
          font-size: var(--text-sm);
          line-height: var(--leading-sm);
          color: var(--fg-2);
        }

        .video-embed--landscape video,
        .video-embed--landscape figcaption {
          max-width: 100%;
        }
      `}</style>
      <figure className={landscape ? 'video-embed video-embed--landscape' : 'video-embed'}>
        <video controls preload="metadata" playsInline poster={poster} aria-label={caption}>
          <source src={src} type={type} />
        </video>
        <figcaption>{caption}</figcaption>
      </figure>
    </>
  );
}
