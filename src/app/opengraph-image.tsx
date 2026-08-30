import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Muhammed Emir Aydın - AI-Assisted Web Products';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#080B12',
          fontFamily: 'sans-serif',
          color: '#FAFAFA',
          padding: '40px',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            border: '2px solid #1E293B',
            borderRadius: '16px',
            padding: '60px',
            backgroundColor: '#0B1020',
          }}
        >
          <div
            style={{
              fontSize: 64,
              fontWeight: 800,
              marginBottom: 16,
              color: '#FAFAFA',
            }}
          >
            Muhammed Emir Aydın
          </div>
          <div
            style={{
              fontSize: 48,
              fontWeight: 600,
              marginBottom: 32,
              color: '#4F8CFF',
            }}
          >
            AI-Assisted Web Products
          </div>
          <div
            style={{
              fontSize: 32,
              color: '#94A3B8',
            }}
          >
            Ideas → Working, Deployed Tools
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
