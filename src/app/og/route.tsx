import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

const BG = '#0C0C0A';
const FG = '#F5F5F0';
const FG2 = '#A0A09A';
const ACCENT = '#CCFF00';

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const title = searchParams.get('title') ?? 'Gabi Miranda';
  const subtitle = searchParams.get('subtitle') ?? 'Frontend & Mobile Developer';

  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          background: BG,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '64px 80px',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Top bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <div
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: ACCENT,
            }}
          />
          <span style={{ color: ACCENT, fontSize: '14px', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
            gabrielaleite.dev
          </span>
        </div>

        {/* Main content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <p
            style={{
              color: FG2,
              fontSize: '18px',
              margin: 0,
              letterSpacing: '0.04em',
            }}
          >
            {subtitle}
          </p>
          <h1
            style={{
              color: FG,
              fontSize: title.length > 50 ? '52px' : '68px',
              fontWeight: 700,
              margin: 0,
              lineHeight: 1.1,
              maxWidth: '900px',
            }}
          >
            {title}
          </h1>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <span style={{ color: FG2, fontSize: '16px' }}>Gabi Miranda</span>
          <div
            style={{
              background: ACCENT,
              color: BG,
              fontSize: '13px',
              fontWeight: 700,
              letterSpacing: '0.08em',
              padding: '6px 16px',
              borderRadius: '100px',
              textTransform: 'uppercase',
            }}
          >
            Frontend & Mobile
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
