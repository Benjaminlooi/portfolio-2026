import { NextRequest, NextResponse } from 'next/server';
import { searchPosts } from '@/lib/blog';

/**
 * GET handler for blog search API
 * 
 * Accepts a query parameter and returns matching blog posts using Fuse.js fuzzy search.
 * Supports pagination with page and limit parameters.
 * 
 * @param {NextRequest} request - Next.js request object
 * @returns {Promise<NextResponse>} JSON response with search results
 * 
 * @example
 * ```
 * GET /api/search?query=react&page=1&limit=10
 * Response: { results: BlogMetadata[], total: number, page: number, limit: number }
 * ```
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query');
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '10', 10);

    if (!query || query.trim() === '') {
      return NextResponse.json(
        { error: 'Query parameter is required' },
        { status: 400 }
      );
    }

    // Validate pagination parameters
    if (page < 1 || limit < 1 || limit > 100) {
      return NextResponse.json(
        { error: 'Invalid pagination parameters (page >= 1, 1 <= limit <= 100)' },
        { status: 400 }
      );
    }

    // Perform search
    const allResults = searchPosts(query.trim());

    // Apply pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedResults = allResults.slice(startIndex, endIndex);

    return NextResponse.json(
      {
        results: paginatedResults,
        total: allResults.length,
        page,
        limit,
        hasMore: endIndex < allResults.length,
      },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120',
        },
      }
    );
  } catch (error) {
    console.error('Blog search API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
