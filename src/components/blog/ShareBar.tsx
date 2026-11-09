'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import {
  Check,
  Copy,
  InstagramLogo,
  LinkedinLogo,
  ShareNetwork,
  WhatsappLogo,
  XLogo,
} from '@phosphor-icons/react/dist/ssr';
import { usePathname } from '@/i18n/navigation';
import { trackEvent } from '@/lib/analytics';
import { INSTAGRAM_APP_ID, SITE_URL } from '@/lib/constants';

interface ShareBarProps {
  title: string;
  description?: string;
  /** Cover image path under /public (1200×630), if the post has one. */
  image?: string;
}

const BASE_URL = SITE_URL;

function blobToJpegFile(blob: Blob): Promise<File> {
  return new Promise((resolve, reject) => {
    const objectUrl = URL.createObjectURL(blob);
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext('2d');
      URL.revokeObjectURL(objectUrl);
      if (!ctx) {
        reject(new Error('2D canvas context unavailable'));
        return;
      }
      ctx.drawImage(img, 0, 0);
      canvas.toBlob(
        (jpegBlob) => {
          if (!jpegBlob) {
            reject(new Error('JPEG conversion failed'));
            return;
          }
          resolve(new File([jpegBlob], 'story.jpg', { type: 'image/jpeg' }));
        },
        'image/jpeg',
        0.92
      );
    };
    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error('Failed to load story image for JPEG conversion'));
    };
    img.src = objectUrl;
  });
}

export function ShareBar({ title, description = '', image }: ShareBarProps) {
  const t = useTranslations('blog.share');
  const pathname = usePathname();
  const url = `${BASE_URL}${pathname}`;
  const encoded = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const [copied, setCopied] = useState(false);
  // Browsers can't tell which apps are installed. When the Web Share API exists
  // (most phones, Safari, Chrome on Windows) we hand off to the OS share sheet, which
  // lists the apps the person really has. Otherwise we fall back to per-network links.
  const [canNativeShare, setCanNativeShare] = useState(false);
  // Built from window.location.origin (not SITE_URL) so the /og/story endpoint it
  // points at always matches the deployment actually serving the page — SITE_URL is
  // the production domain and would 404 on preview deploys.
  const [storyImageUrl, setStoryImageUrl] = useState<string>();
  // Pre-fetched so the click handler can call navigator.share() synchronously — iOS/
  // Android revoke the "user gesture" that file sharing requires as soon as an await
  // happens inside the click handler, which turns navigator.share into a silent/thrown
  // rejection if we fetch the image after the click instead of before it.
  const [storyFile, setStoryFile] = useState<File>();

  useEffect(() => {
    setCanNativeShare(typeof navigator !== 'undefined' && typeof navigator.share === 'function');

    const origin = window.location.origin;
    const params = new URLSearchParams({ title, subtitle: description });
    if (image) params.set('image', `${origin}${image}`);
    const imageUrl = `${origin}/og/story?${params.toString()}`;
    setStoryImageUrl(imageUrl);

    let cancelled = false;
    fetch(imageUrl)
      .then((res) => res.blob())
      // Instagram's Stories pasteboard sharing only reliably reads JPEG backgrounds —
      // the PNG the /og/story route renders often shows up blank, so convert it here.
      .then(blobToJpegFile)
      .then((file) => {
        if (!cancelled) setStoryFile(file);
      })
      .catch(() => {
        // Native share falls back to opening storyImageUrl directly when storyFile is unset.
      });
    return () => {
      cancelled = true;
    };
  }, [title, description, image]);

  async function handleCopy() {
    await navigator.clipboard.writeText(url);
    trackEvent({ screen: 'blog', action: 'button_clicked', reference: 'Copiou o link do post' });
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  async function handleNativeShare() {
    trackEvent({ screen: 'blog', action: 'button_clicked', reference: 'Abriu o menu nativo de compartilhar' });
    try {
      await navigator.share({ title, url });
    } catch {
      // Dismissing the share sheet rejects with AbortError — nothing to do.
    }
  }

  // Generic file sharing (navigator.share with files) hands Instagram a plain image,
  // which its share extension frequently rejects with an in-app error. Instagram's own
  // integration instead expects the image on the system clipboard plus a deep link
  // (used by Spotify, Shazam, etc.): copy the image, then open instagram-stories://,
  // which reads it straight into the Stories editor as the background.
  function openInstagramStoriesWithClipboardImage() {
    if (!storyFile) return false;
    if (typeof ClipboardItem === 'undefined' || typeof navigator.clipboard?.write !== 'function') return false;

    navigator.clipboard
      .write([new ClipboardItem({ [storyFile.type]: storyFile })])
      .then(() => {
        // iOS needs a beat after the write resolves for the system pasteboard to
        // actually sync — opening the deep link immediately can land Instagram on an
        // empty background because it reads the pasteboard before the image is there.
        setTimeout(() => {
          // If Instagram isn't installed, this deep link is a silent no-op — fall back
          // to the OS share sheet unless the tab lost focus (a sign the app opened).
          const fallbackTimer = setTimeout(fallbackToFileShare, 1500);
          window.addEventListener('blur', () => clearTimeout(fallbackTimer), { once: true });
          window.location.href = `instagram-stories://share?source_application=${INSTAGRAM_APP_ID}`;
        }, 300);
      })
      .catch(fallbackToFileShare);
    return true;
  }

  function fallbackToFileShare() {
    if (storyFile && typeof navigator.canShare === 'function' && navigator.canShare({ files: [storyFile] })) {
      navigator.share({ files: [storyFile], title }).catch(() => {
        // Dismissing the share sheet, or the OS refusing the file, rejects the promise — nothing to do.
      });
      return;
    }
    if (storyImageUrl) window.open(storyImageUrl, '_blank', 'noopener,noreferrer');
  }

  // navigator.clipboard.write()/navigator.share() are called synchronously here (no
  // await before them) — see the storyFile effect above for why.
  function handleInstagramShare() {
    if (!storyImageUrl) return;
    trackEvent({ screen: 'blog', action: 'button_clicked', reference: 'Compartilhou no Instagram Stories' });

    if (!openInstagramStoriesWithClipboardImage()) fallbackToFileShare();
  }

  return (
    <div
      className="share-bar"
      style={{
        borderTop: '1px solid var(--border)',
        paddingTop: 'var(--space-16)',
        marginTop: 'var(--space-16)',
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--space-7)',
        flexWrap: 'wrap',
      }}
    >
      <span
        className="share-bar-label"
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 'var(--text-meta)',
          color: 'var(--fg-3)',
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
        }}
      >
        {t('label')}
      </span>

      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encoded}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t('linkedin_aria')}
        onClick={() => trackEvent({ screen: 'blog', action: 'button_clicked', reference: 'Compartilhou no LinkedIn' })}
        className="share-pill"
      >
        <LinkedinLogo size={14} weight="fill" aria-hidden="true" />
        LinkedIn
      </a>

      <a
        href={`https://x.com/intent/tweet?text=${encodedTitle}&url=${encoded}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t('x_aria')}
        onClick={() => trackEvent({ screen: 'blog', action: 'button_clicked', reference: 'Compartilhou no X' })}
        className="share-pill"
      >
        <XLogo size={14} weight="fill" aria-hidden="true" />
        X
      </a>

      {storyImageUrl ? (
        <button
          type="button"
          onClick={handleInstagramShare}
          aria-label={t('instagram_aria')}
          className="share-pill share-pill-instagram"
        >
          <InstagramLogo size={14} weight="fill" aria-hidden="true" />
          {t('instagram')}
        </button>
      ) : null}

      {canNativeShare ? (
        <button
          type="button"
          onClick={handleNativeShare}
          aria-label={t('native_aria')}
          className="share-pill"
        >
          <ShareNetwork size={14} aria-hidden="true" />
          {t('native')}
        </button>
      ) : (
        <a
          href={`https://wa.me/?text=${encodedTitle}%20${encoded}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={t('whatsapp_aria')}
          onClick={() => trackEvent({ screen: 'blog', action: 'button_clicked', reference: 'Compartilhou no WhatsApp' })}
          className="share-pill"
        >
          <WhatsappLogo size={14} weight="fill" aria-hidden="true" />
          WhatsApp
        </a>
      )}

      <button
        type="button"
        onClick={handleCopy}
        aria-label={copied ? t('copied_aria') : t('copy_aria')}
        className={`share-pill${copied ? ' share-pill-copy-done' : ''}`}
      >
        {copied ? <Check size={14} weight="bold" aria-hidden="true" /> : <Copy size={14} aria-hidden="true" />}
        <span aria-live="polite">{copied ? t('copied') : t('copy')}</span>
      </button>
    </div>
  );
}
