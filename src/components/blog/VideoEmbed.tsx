interface VideoEmbedProps {
  src: string;
  caption: string;
  poster?: string;
}

export function VideoEmbed({ src, caption, poster }: VideoEmbedProps) {
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
          max-width: 100%;
          height: auto;
          border-radius: var(--radius-lg);
          background: var(--bg-s);
        }

        .video-embed video:focus-visible {
          outline: 2px solid var(--accent);
          outline-offset: 2px;
        }

        .video-embed figcaption {
          margin-top: var(--space-3);
          font-size: var(--text-sm);
          line-height: var(--leading-sm);
          color: var(--fg-2);
        }
      `}</style>
      <figure className="video-embed">
        <video controls preload="metadata" playsInline poster={poster} aria-label={caption}>
          <source src={src} type={type} />
        </video>
        <figcaption>{caption}</figcaption>
      </figure>
    </>
  );
}
