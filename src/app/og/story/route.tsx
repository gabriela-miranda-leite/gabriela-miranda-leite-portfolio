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
  const subtitle = searchParams.get('subtitle') ?? '';
  const image = searchParams.get('image');

  const [frauncesBold, jakartaRegular, jakartaMedium] = await Promise.all([
    loadGoogleFont('Fraunces', 600, title),
    loadGoogleFont('Plus Jakarta Sans', 400, subtitle || ' '),
    loadGoogleFont('Plus Jakarta Sans', 600, `${SITE_HOST}Gabi MirandaBLOG`),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: '1080px',
          height: '1920px',
          background: BG,
          display: 'flex',
          flexDirection: 'column',
          fontFamily: 'Plus Jakarta Sans',
        }}
      >
        {/* Photo — cropped to a fixed-height band at the top only. Text never sits on
            top of it, so a white-background screenshot cover reads exactly as well as
            a moody photo: legibility never depends on what's in the image. */}
        {image ? (
          <div style={{ display: 'flex', position: 'relative', width: '1080px', height: '1100px' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={image}
              alt=""
              width={1080}
              height={1100}
              style={{ position: 'absolute', inset: 0, objectFit: 'cover' }}
            />

            {/* Site badge overlay — solid pill behind it so it stays legible over any photo. */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                position: 'absolute',
                top: '64px',
                left: '64px',
                background: 'rgba(12,12,10,0.75)',
                padding: '14px 24px',
                borderRadius: '100px',
              }}
            >
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: ACCENT }} />
              <span
                style={{
                  fontFamily: 'Plus Jakarta Sans',
                  fontWeight: 600,
                  color: ACCENT,
                  fontSize: '24px',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                }}
              >
                {SITE_HOST}
              </span>
            </div>
          </div>
        ) : null}

        {/* Solid-color block — guaranteed contrast for the title/subtitle/footer,
            independent of the cover photo above it. */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            flex: 1,
            borderTop: image ? `3px solid ${ACCENT}` : 'none',
            padding: '64px 72px 72px',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {!image ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                <div style={{ width: '14px', height: '14px', borderRadius: '50%', background: ACCENT }} />
                <span
                  style={{
                    fontFamily: 'Plus Jakarta Sans',
                    fontWeight: 600,
                    color: ACCENT,
                    fontSize: '26px',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                  }}
                >
                  {SITE_HOST}
                </span>
              </div>
            ) : null}
            <h1
              style={{
                fontFamily: 'Fraunces',
                fontWeight: 600,
                color: FG,
                fontSize: title.length > 60 ? '54px' : '64px',
                margin: 0,
                lineHeight: 1.15,
              }}
            >
              {title}
            </h1>
            {subtitle ? (
              <p
                style={{
                  fontFamily: 'Plus Jakarta Sans',
                  color: FG2,
                  fontSize: '30px',
                  margin: 0,
                  lineHeight: 1.5,
                }}
              >
                {subtitle}
              </p>
            ) : null}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 600, color: FG, fontSize: '28px' }}>
              Gabi Miranda
            </span>
            <div
              style={{
                fontFamily: 'Plus Jakarta Sans',
                background: ACCENT,
                color: BG,
                fontSize: '20px',
                fontWeight: 600,
                letterSpacing: '0.08em',
                padding: '12px 28px',
                borderRadius: '100px',
                textTransform: 'uppercase',
              }}
            >
              Blog
            </div>
          </div>
        </div>
      </div>
    ),
    {
      width: 1080,
      height: 1920,
      fonts: [
        { name: 'Fraunces', data: frauncesBold, weight: 600, style: 'normal' },
        { name: 'Plus Jakarta Sans', data: jakartaRegular, weight: 400, style: 'normal' },
        { name: 'Plus Jakarta Sans', data: jakartaMedium, weight: 600, style: 'normal' },
      ],
    }
  );
}
