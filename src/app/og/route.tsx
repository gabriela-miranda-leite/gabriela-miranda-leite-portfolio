import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';
import { SITE_URL } from '@/lib/constants';

export const runtime = 'edge';

const BG = '#0C0C0A';
const FG = '#F5F5F0';
const FG2 = '#A0A09A';
const ACCENT = '#CCFF00';
const SITE_HOST = new URL(SITE_URL).host.replace(/^www\./, '');

// next/og (Satori) can't parse woff2; Google Fonts serves ttf to old user agents instead.
async function loadGoogleFont(family: string, weight: number, text: string) {
  const cssUrl = `https://fonts.googleapis.com/css2?family=${family.replace(/ /g, '+')}:wght@${weight}&text=${encodeURIComponent(text)}`;
  const css = await fetch(cssUrl, {
    headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36' },
  }).then((res) => res.text());

  const fontUrl = css.match(/src: url\(([^)]+)\)/)?.[1];
  if (!fontUrl) throw new Error(`Could not resolve a font file for ${family}`);
  return fetch(fontUrl).then((res) => res.arrayBuffer());
}

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const title = searchParams.get('title') ?? 'Gabi Miranda';
  const subtitle = searchParams.get('subtitle') ?? 'Frontend & Mobile Developer';
  const image = searchParams.get('image');

  const [frauncesBold, jakartaRegular, jakartaMedium] = await Promise.all([
    loadGoogleFont('Fraunces', 600, title),
    loadGoogleFont('Plus Jakarta Sans', 400, subtitle),
    loadGoogleFont('Plus Jakarta Sans', 600, `${SITE_HOST}Gabi MirandaBlog`),
  ]);

  const badge = (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: ACCENT }} />
      <span
        style={{
          fontFamily: 'Plus Jakarta Sans',
          fontWeight: 600,
          color: ACCENT,
          fontSize: '18px',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
        }}
      >
        {SITE_HOST}
      </span>
    </div>
  );

  const footer = (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <span style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 600, color: FG, fontSize: '18px' }}>
        Gabi Miranda
      </span>
      <div
        style={{
          fontFamily: 'Plus Jakarta Sans',
          background: ACCENT,
          color: BG,
          fontSize: '13px',
          fontWeight: 600,
          letterSpacing: '0.08em',
          padding: '7px 18px',
          borderRadius: '100px',
          textTransform: 'uppercase',
        }}
      >
        Blog
      </div>
    </div>
  );

  const titleHeading = (
    <h1
      style={{
        fontFamily: 'Fraunces',
        fontWeight: 600,
        color: FG,
        fontSize: title.length > 50 ? '46px' : '56px',
        margin: 0,
        lineHeight: 1.15,
      }}
    >
      {title}
    </h1>
  );

  const subtitleText = (
    <p style={{ fontFamily: 'Plus Jakarta Sans', color: FG2, fontSize: '22px', margin: 0, lineHeight: 1.5 }}>
      {subtitle}
    </p>
  );

  return new ImageResponse(
    image ? (
      // Cover photo on the left; a solid block on the right guarantees contrast for
      // the text no matter what the photo looks like (a white-background screenshot
      // reads exactly as well as a moody photo).
      <div style={{ width: '1200px', height: '630px', background: BG, display: 'flex', fontFamily: 'Plus Jakarta Sans' }}>
        <div style={{ display: 'flex', position: 'relative', width: '520px', height: '630px' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={image} alt="" width={520} height={630} style={{ position: 'absolute', inset: 0, objectFit: 'cover' }} />
          <div
            style={{
              display: 'flex',
              position: 'absolute',
              top: '40px',
              left: '40px',
              background: 'rgba(12,12,10,0.75)',
              padding: '10px 18px',
              borderRadius: '100px',
            }}
          >
            {badge}
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            flex: 1,
            borderLeft: `3px solid ${ACCENT}`,
            padding: '56px 56px 48px',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {titleHeading}
            {subtitleText}
          </div>
          {footer}
        </div>
      </div>
    ) : (
      <div
        style={{
          width: '1200px',
          height: '630px',
          background: BG,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '64px 80px',
          fontFamily: 'Plus Jakarta Sans',
        }}
      >
        {badge}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '920px' }}>
          {subtitleText}
          {titleHeading}
        </div>
        {footer}
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: 'Fraunces', data: frauncesBold, weight: 600, style: 'normal' },
        { name: 'Plus Jakarta Sans', data: jakartaRegular, weight: 400, style: 'normal' },
        { name: 'Plus Jakarta Sans', data: jakartaMedium, weight: 600, style: 'normal' },
      ],
    }
  );
}
