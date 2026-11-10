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
          position: 'relative',
          fontFamily: 'Plus Jakarta Sans',
        }}
      >
        {image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={image}
            alt=""
            width={1080}
            height={1920}
            style={{ position: 'absolute', inset: 0, objectFit: 'cover' }}
          />
        ) : null}

        {/* Strong gradient anchored at the bottom, where the text sits, so it stays
            legible regardless of what the cover photo looks like there. */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            background: image
              ? 'linear-gradient(180deg, rgba(12,12,10,0.15) 0%, rgba(12,12,10,0.1) 30%, rgba(12,12,10,0.75) 62%, rgba(12,12,10,0.97) 100%)'
              : BG,
          }}
        />

        {/* Content */}
        <div
          style={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            width: '100%',
            height: '100%',
            padding: '96px 72px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
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

          {/* Spacer pushes title/subtitle down to the strongest part of the gradient */}
          <div style={{ display: 'flex', flex: 1 }} />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
            <h1
              style={{
                fontFamily: 'Fraunces',
                fontWeight: 600,
                color: FG,
                fontSize: title.length > 60 ? '58px' : '72px',
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
                  fontSize: '32px',
                  margin: 0,
                  lineHeight: 1.5,
                  maxWidth: '880px',
                }}
              >
                {subtitle}
              </p>
            ) : null}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '56px' }}>
            <span style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 600, color: FG, fontSize: '30px' }}>
              Gabi Miranda
            </span>
            <div
              style={{
                fontFamily: 'Plus Jakarta Sans',
                background: ACCENT,
                color: BG,
                fontSize: '22px',
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
