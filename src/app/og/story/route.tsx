import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';
import { SITE_URL } from '@/lib/constants';

export const runtime = 'edge';

const BG = '#0C0C0A';
const FG = '#F5F5F0';
const FG2 = '#A0A09A';
const ACCENT = '#CCFF00';
const SITE_HOST = new URL(SITE_URL).host.replace(/^www\./, '');

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const title = searchParams.get('title') ?? 'Gabi Miranda';
  const subtitle = searchParams.get('subtitle') ?? '';
  const image = searchParams.get('image');

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
          fontFamily: 'sans-serif',
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

        {/* Dark gradient so text stays legible over any cover photo */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            background: image
              ? 'linear-gradient(180deg, rgba(12,12,10,0.55) 0%, rgba(12,12,10,0.35) 40%, rgba(12,12,10,0.92) 100%)'
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
            <span style={{ color: ACCENT, fontSize: '26px', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
              {SITE_HOST}
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <h1
              style={{
                color: FG,
                fontSize: title.length > 60 ? '58px' : '72px',
                fontWeight: 700,
                margin: 0,
                lineHeight: 1.15,
              }}
            >
              {title}
            </h1>
            {subtitle ? (
              <p
                style={{
                  color: FG2,
                  fontSize: '34px',
                  margin: 0,
                  lineHeight: 1.5,
                  maxWidth: '880px',
                }}
              >
                {subtitle}
              </p>
            ) : null}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ color: FG, fontSize: '30px', fontWeight: 600 }}>Gabi Miranda</span>
            <div
              style={{
                background: ACCENT,
                color: BG,
                fontSize: '22px',
                fontWeight: 700,
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
    { width: 1080, height: 1920 }
  );
}
