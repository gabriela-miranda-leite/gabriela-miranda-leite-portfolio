'use client';

import { useEffect, useId, useRef, useState, useSyncExternalStore } from 'react';
import { useTranslations } from 'next-intl';
import { ArrowsIn, ArrowsOut, CaretDown, Pause, Play } from '@phosphor-icons/react/dist/ssr';

interface VideoEmbedProps {
  src: string;
  caption: string;
  poster?: string;
  landscape?: boolean;
}

interface WebkitVideo extends HTMLVideoElement {
  webkitEnterFullscreen?: () => void;
}

const SPEEDS = [0.5, 1, 1.5, 2];

// False on the server and during hydration, true afterwards: the HTML ships with the
// browser's own controls (works without JS) and the custom ones replace them once hydrated.
const subscribe = () => () => {};
const useIsClient = () =>
  useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) return '0:00';
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${String(s).padStart(2, '0')}`;
}

export function VideoEmbed({ src, caption, poster, landscape = false }: VideoEmbedProps) {
  const t = useTranslations('blog.video');
  const enhanced = useIsClient();
  const captionId = useId();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [rate, setRate] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const type = src.endsWith('.webm') ? 'video/webm' : 'video/mp4';
  const canFullscreen =
    enhanced && (document.fullscreenEnabled || 'webkitEnterFullscreen' in HTMLVideoElement.prototype);

  useEffect(() => {
    const onChange = () => setIsFullscreen(document.fullscreenElement === videoRef.current);
    document.addEventListener('fullscreenchange', onChange);
    return () => document.removeEventListener('fullscreenchange', onChange);
  }, []);

  function togglePlay() {
    const video = videoRef.current;
    if (!video) return;
    if (playing) video.pause();
    else void video.play();
  }

  function seek(value: number) {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = value;
    setTime(value);
  }

  function changeRate(value: number) {
    const video = videoRef.current;
    if (video) video.playbackRate = value;
    setRate(value);
  }

  // Fullscreen goes on the <video> itself, so phones can rotate a landscape video and the
  // browser's own (accessible) controls take over while it is fullscreen.
  function toggleFullscreen() {
    const video = videoRef.current as WebkitVideo | null;
    if (!video) return;
    if (document.fullscreenElement) void document.exitFullscreen();
    else if (video.requestFullscreen) void video.requestFullscreen();
    else video.webkitEnterFullscreen?.();
  }

  function syncDuration(video: HTMLVideoElement) {
    setDuration(Number.isFinite(video.duration) ? video.duration : 0);
  }

  return (
    <figure
      className={landscape ? 'video-embed video-embed--landscape' : 'video-embed'}
      aria-labelledby={captionId}
    >
      <div className="video-embed-player">
        <div className="video-embed-screen">
          <video
            ref={videoRef}
            controls={!enhanced || isFullscreen}
            preload="metadata"
            playsInline
            poster={poster}
            onClick={enhanced && !isFullscreen ? togglePlay : undefined}
            onLoadedMetadata={(e) => syncDuration(e.currentTarget)}
            onDurationChange={(e) => syncDuration(e.currentTarget)}
            onTimeUpdate={(e) => setTime(e.currentTarget.currentTime)}
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            onEnded={() => setPlaying(false)}
          >
            <source src={src} type={type} />
          </video>
          {enhanced && !playing && (
            <span className="video-embed-badge" aria-hidden="true">
              <Play size={28} weight="fill" />
            </span>
          )}
        </div>

        {enhanced && (
          <div className="video-embed-controls" role="group" aria-label={t('controls')}>
            <input
              type="range"
              className="video-embed-seek"
              min={0}
              max={duration}
              step={0.1}
              value={Math.min(time, duration)}
              disabled={!duration}
              aria-label={t('seek')}
              aria-valuetext={t('seek_value', { current: formatTime(time), total: formatTime(duration) })}
              onChange={(e) => seek(Number(e.target.value))}
            />
            <div className="video-embed-row">
              <button
                type="button"
                className="video-embed-btn"
                aria-label={playing ? t('pause') : t('play')}
                onClick={togglePlay}
              >
                {playing ? <Pause size={20} weight="fill" aria-hidden="true" /> : <Play size={20} weight="fill" aria-hidden="true" />}
              </button>
              <span className="video-embed-time" aria-hidden="true">
                {formatTime(time)} / {formatTime(duration)}
              </span>
              <span className="video-embed-speed-wrap">
                <select
                  className="video-embed-speed"
                  aria-label={t('speed')}
                  value={rate}
                  onChange={(e) => changeRate(Number(e.target.value))}
                >
                  {SPEEDS.map((speed) => (
                    <option key={speed} value={speed}>
                      {speed}x
                    </option>
                  ))}
                </select>
                <CaretDown size={12} className="video-embed-speed-caret" aria-hidden="true" />
              </span>
              {canFullscreen && (
                <button
                  type="button"
                  className="video-embed-btn"
                  aria-label={isFullscreen ? t('exit_fullscreen') : t('fullscreen')}
                  onClick={toggleFullscreen}
                >
                  {isFullscreen ? <ArrowsIn size={20} aria-hidden="true" /> : <ArrowsOut size={20} aria-hidden="true" />}
                </button>
              )}
            </div>
          </div>
        )}
      </div>
      <figcaption id={captionId}>{caption}</figcaption>
    </figure>
  );
}
