'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useTranslations } from 'next-intl';
import { ArrowCounterClockwise, MagnifyingGlassMinus, MagnifyingGlassPlus, X } from '@phosphor-icons/react/dist/ssr';

type ImgProps = React.ComponentPropsWithoutRef<'img'>;

interface View {
  s: number;
  x: number;
  y: number;
}

const MIN_SCALE = 1;
const MAX_SCALE = 5;
const BUTTON_STEP = 1.5;
const DOUBLE_CLICK_SCALE = 2;
const KEY_PAN_STEP = 40;
const DRAG_THRESHOLD = 4;
const INITIAL: View = { s: MIN_SCALE, x: 0, y: 0 };

const clampScale = (s: number) => Math.min(MAX_SCALE, Math.max(MIN_SCALE, s));

function Lightbox({ src, alt, onClose }: { src: string; alt: string; onClose: () => void }) {
  const t = useTranslations('blog.image_zoom');
  const dialogRef = useRef<HTMLDialogElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [view, setView] = useState<View>(INITIAL);
  const viewRef = useRef<View>(INITIAL);
  const pointers = useRef(new Map<number, { x: number; y: number }>());
  const pinch = useRef<{ dist: number; mid: { x: number; y: number } } | null>(null);
  const moved = useRef(0);
  const suppressClose = useRef(false);

  const commit = useCallback((next: View) => {
    const img = imgRef.current;
    const s = clampScale(next.s);
    // Panning is bounded by how far the zoomed image overflows its fitted size
    const limitX = img ? (img.offsetWidth * (s - 1)) / 2 : 0;
    const limitY = img ? (img.offsetHeight * (s - 1)) / 2 : 0;
    const clamped = {
      s,
      x: Math.min(limitX, Math.max(-limitX, next.x)),
      y: Math.min(limitY, Math.max(-limitY, next.y)),
    };
    viewRef.current = clamped;
    setView(clamped);
  }, []);

  // Zoom keeping the point under (px, py), measured from the stage centre, fixed on screen
  const zoomAt = useCallback(
    (factor: number, px: number, py: number) => {
      const { s, x, y } = viewRef.current;
      const nextS = clampScale(s * factor);
      const ratio = nextS / s;
      commit({ s: nextS, x: px - ratio * (px - x), y: py - ratio * (py - y) });
    },
    [commit],
  );

  const fromCenter = useCallback((clientX: number, clientY: number) => {
    const rect = stageRef.current?.getBoundingClientRect();
    if (!rect) return { x: 0, y: 0 };
    return { x: clientX - (rect.left + rect.width / 2), y: clientY - (rect.top + rect.height / 2) };
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (!dialog.open) dialog.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    // No dialog.close() here: its async `close` event would fire onClose after StrictMode's
    // simulated remount and shut the lightbox right after opening. Unmounting already
    // removes the dialog from the top layer.
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  // Non-passive so a wheel/trackpad pinch zooms the image instead of scrolling the page
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const { x, y } = fromCenter(e.clientX, e.clientY);
      zoomAt(Math.exp(-e.deltaY * (e.ctrlKey ? 0.01 : 0.002)), x, y);
    };
    stage.addEventListener('wheel', onWheel, { passive: false });
    return () => stage.removeEventListener('wheel', onWheel);
  }, [fromCenter, zoomAt]);

  function onPointerDown(e: React.PointerEvent) {
    moved.current = 0;
    suppressClose.current = false;
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    e.currentTarget.setPointerCapture?.(e.pointerId);
    if (pointers.current.size === 2) {
      const [a, b] = [...pointers.current.values()];
      pinch.current = { dist: Math.hypot(a.x - b.x, a.y - b.y), mid: { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 } };
    }
  }

  function onPointerMove(e: React.PointerEvent) {
    const last = pointers.current.get(e.pointerId);
    if (!last) return;
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });

    if (pointers.current.size === 2 && pinch.current) {
      const [a, b] = [...pointers.current.values()];
      const dist = Math.hypot(a.x - b.x, a.y - b.y);
      const mid = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
      const c = fromCenter(mid.x, mid.y);
      zoomAt(dist / pinch.current.dist, c.x, c.y);
      const { s, x, y } = viewRef.current;
      commit({ s, x: x + (mid.x - pinch.current.mid.x), y: y + (mid.y - pinch.current.mid.y) });
      pinch.current = { dist, mid };
      suppressClose.current = true;
      return;
    }

    const dx = e.clientX - last.x;
    const dy = e.clientY - last.y;
    moved.current += Math.abs(dx) + Math.abs(dy);
    if (moved.current > DRAG_THRESHOLD) suppressClose.current = true;
    if (viewRef.current.s > MIN_SCALE) {
      const { s, x, y } = viewRef.current;
      commit({ s, x: x + dx, y: y + dy });
    }
  }

  function onPointerUp(e: React.PointerEvent) {
    pointers.current.delete(e.pointerId);
    if (pointers.current.size < 2) pinch.current = null;
  }

  function onDoubleClick(e: React.MouseEvent) {
    if (viewRef.current.s > MIN_SCALE) return commit(INITIAL);
    const { x, y } = fromCenter(e.clientX, e.clientY);
    zoomAt(DOUBLE_CLICK_SCALE, x, y);
  }

  function onStageClick(e: React.MouseEvent) {
    if (suppressClose.current) {
      suppressClose.current = false;
      return;
    }
    if (e.target === e.currentTarget) onClose();
  }

  function onKeyDown(e: React.KeyboardEvent) {
    const { s, x, y } = viewRef.current;
    const pan: Record<string, [number, number]> = {
      ArrowLeft: [KEY_PAN_STEP, 0],
      ArrowRight: [-KEY_PAN_STEP, 0],
      ArrowUp: [0, KEY_PAN_STEP],
      ArrowDown: [0, -KEY_PAN_STEP],
    };
    if (e.key === '+' || e.key === '=') zoomAt(BUTTON_STEP, 0, 0);
    else if (e.key === '-') zoomAt(1 / BUTTON_STEP, 0, 0);
    else if (e.key === '0') commit(INITIAL);
    else if (pan[e.key] && s > MIN_SCALE) commit({ s, x: x + pan[e.key][0], y: y + pan[e.key][1] });
    else return;
    e.preventDefault();
  }

  const zoomed = view.s > MIN_SCALE;

  return (
    <dialog
      ref={dialogRef}
      className="lightbox"
      aria-label={alt || t('dialog')}
      onClose={onClose}
      onKeyDown={onKeyDown}
    >
      <div ref={stageRef} className="lightbox-stage" onClick={onStageClick}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          className="lightbox-img"
          draggable={false}
          data-zoomed={zoomed}
          style={{ transform: `translate(${view.x}px, ${view.y}px) scale(${view.s})` }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          onDoubleClick={onDoubleClick}
        />
      </div>

      <div className="lightbox-toolbar">
        <span className="lightbox-zoom-level" aria-live="polite">
          {Math.round(view.s * 100)}%
        </span>
        <button
          type="button"
          className="lightbox-btn"
          aria-label={t('zoom_out')}
          disabled={view.s <= MIN_SCALE}
          onClick={() => zoomAt(1 / BUTTON_STEP, 0, 0)}
        >
          <MagnifyingGlassMinus size={20} aria-hidden="true" />
        </button>
        <button
          type="button"
          className="lightbox-btn"
          aria-label={t('zoom_in')}
          disabled={view.s >= MAX_SCALE}
          onClick={() => zoomAt(BUTTON_STEP, 0, 0)}
        >
          <MagnifyingGlassPlus size={20} aria-hidden="true" />
        </button>
        <button
          type="button"
          className="lightbox-btn"
          aria-label={t('reset')}
          disabled={!zoomed}
          onClick={() => commit(INITIAL)}
        >
          <ArrowCounterClockwise size={20} aria-hidden="true" />
        </button>
        <button type="button" className="lightbox-btn" aria-label={t('close')} onClick={onClose}>
          <X size={20} aria-hidden="true" />
        </button>
      </div>
    </dialog>
  );
}

export function ZoomableImage({ src, alt = '', width, style, ...rest }: ImgProps) {
  const t = useTranslations('blog.image_zoom');
  const [open, setOpen] = useState(false);

  if (typeof src !== 'string') return null;

  const constrainedWidth = width ? Number(width) : undefined;
  const imgStyle: React.CSSProperties = {
    ...style,
    ...(constrainedWidth ? { display: 'block', width: '100%' } : undefined),
  };

  return (
    <>
      <button
        type="button"
        className="zoomable-trigger"
        style={constrainedWidth ? { maxWidth: constrainedWidth } : undefined}
        aria-label={alt ? t('open_alt', { alt }) : t('open')}
        onClick={() => setOpen(true)}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} style={imgStyle} {...rest} />
      </button>
      {/* Portaled because markdown wraps images in <p>, which can't contain a <dialog>/<div> */}
      {open && createPortal(<Lightbox src={src} alt={alt} onClose={() => setOpen(false)} />, document.body)}
    </>
  );
}
