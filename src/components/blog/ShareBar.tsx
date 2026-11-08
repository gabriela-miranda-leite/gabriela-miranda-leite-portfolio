'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import {
  Check,
  Copy,
  LinkedinLogo,
  ShareNetwork,
  WhatsappLogo,
  XLogo,
} from '@phosphor-icons/react/dist/ssr';
import { usePathname } from '@/i18n/navigation';
import { trackEvent } from '@/lib/analytics';
import { SITE_URL } from '@/lib/constants';

interface ShareBarProps {
  title: string;
}

const BASE_URL = SITE_URL;

export function ShareBar({ title }: ShareBarProps) {
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

  useEffect(() => {
    setCanNativeShare(typeof navigator !== 'undefined' && typeof navigator.share === 'function');
  }, []);

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
        <>
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
        </>
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
