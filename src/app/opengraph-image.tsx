import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Muhammed Emir Aydın - AI & Full-Stack Engineer';
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
          backgroundColor: '#0A0C0F',
          fontFamily: 'sans-serif',
          color: '#F0F0EE',
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
            border: '2px solid #1C2028',
            borderRadius: '16px',
            padding: '60px',
            backgroundColor: '#0F1116',
          }}
        >
          <div
            style={{
              fontSize: 64,
              fontWeight: 800,
              marginBottom: 16,
              color: '#F0F0EE',
            }}
          >
            Muhammed Emir Aydın
          </div>
          <div
            style={{
              fontSize: 48,
              fontWeight: 600,
              marginBottom: 32,
              color: '#3B82F6',
            }}
          >
            AI & Full-Stack Engineer
          </div>
          <div
            style={{
              fontSize: 32,
              color: '#8A9AB0',
            }}
          >
            AI · Web · Mobile · Systems
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
