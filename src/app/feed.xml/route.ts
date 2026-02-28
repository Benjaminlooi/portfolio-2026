import { generateRSSFeed } from '@/lib/seo/rss';
import { NextResponse } from 'next/server';

/**
 * RSS feed route handler
 * Generates RSS 2.0 feed for blog posts
 * @see https://nextjs.org/docs/app/building-your-application/routing/route-handlers
 */
export async function GET() {
  try {
    const feed = await generateRSSFeed();

    return new NextResponse(feed, {
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      },
    });
  } catch (error) {
    console.error('Error generating RSS feed:', error);
    return new NextResponse('Error generating RSS feed', { status: 500 });
  }
}

// Enable static generation for RSS feed
export const dynamic = 'force-static';
export const revalidate = 3600; // Revalidate every hour
