import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

/**
 * Generates dynamic Open Graph images with custom title and description.
 * 
 * @param {NextRequest} request - Next.js request with searchParams
 * @returns {Promise<ImageResponse>} OG image (1200x630 PNG)
 * 
 * @example
 * ```tsx
 * // Usage in metadata
 * openGraph: {
 *   images: [{
 *     url: `/og-image?title=${encodeURIComponent(title)}&description=${encodeURIComponent(desc)}`,
 *     width: 1200,
 *     height: 630,
 *   }],
 * }
 * ```
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const title = searchParams.get('title') || 'Benjamin Looi';
    const description = searchParams.get('description') || 'Software Engineer & 10x Vibe Engineer';

    return new ImageResponse(
      (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
            padding: '80px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            fontFamily: 'system-ui, sans-serif',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
            }}
          >
            <h1
              style={{
                fontSize: '72px',
                fontWeight: 'bold',
                color: 'white',
                margin: 0,
                lineHeight: 1.2,
                maxWidth: '1000px',
              }}
            >
              {title}
            </h1>
            <p
              style={{
                fontSize: '36px',
                color: 'rgba(255, 255, 255, 0.9)',
                margin: 0,
                lineHeight: 1.4,
                maxWidth: '900px',
              }}
            >
              {description}
            </p>
          </div>
          <div
            style={{
              position: 'absolute',
              bottom: '60px',
              left: '80px',
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
            }}
          >
            <div
              style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                background: 'white',
              }}
            />
            <span
              style={{
                fontSize: '28px',
                color: 'white',
                fontWeight: 600,
              }}
            >
              benjaminlooi.dev
            </span>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (error) {
    console.error('OG Image generation failed:', error);
    return new Response('Failed to generate OG image', { status: 500 });
  }
}
