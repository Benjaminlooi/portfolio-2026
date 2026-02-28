import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/constants';

/**
 * Next.js robots.txt route
 * Generates robots.txt for search engine crawlers
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/_next/'],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
