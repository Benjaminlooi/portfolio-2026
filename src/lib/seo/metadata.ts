import type { Metadata } from 'next';
import type { PageMetadata, BlogPostFrontmatter } from '@/types/seo';

const SITE_URL = 'https://www.benjaminlooi.dev';
const SITE_NAME = 'Benjamin Looi Portfolio';
const AUTHOR_NAME = 'Benjamin Looi';
const DEFAULT_OG_IMAGE = '/images/og-default.png';

/**
 * Generate Next.js Metadata from page data
 * @param pageData - Page title and description
 * @param path - Page path (e.g., '/about')
 * @returns Next.js Metadata object
 */
export function generatePageMetadata(
  pageData: { title: string; description: string },
  path: string
): Metadata {
  const canonicalUrl = `${SITE_URL}${path}`;

  return {
    title: pageData.title,
    description: pageData.description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: pageData.title,
      description: pageData.description,
      url: canonicalUrl,
      siteName: SITE_NAME,
      type: 'website',
      images: [
        {
          url: `${SITE_URL}${DEFAULT_OG_IMAGE}`,
          width: 1200,
          height: 630,
          alt: pageData.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: pageData.title,
      description: pageData.description,
      images: [`${SITE_URL}${DEFAULT_OG_IMAGE}`],
    },
  };
}

/**
 * Generate blog-specific metadata from frontmatter
 * @param frontmatter - MDX frontmatter
 * @param path - Blog post path
 * @returns Next.js Metadata object
 */
export function generateBlogMetadata(
  frontmatter: BlogPostFrontmatter,
  path: string
): Metadata {
  const canonicalUrl = frontmatter.canonical || `${SITE_URL}${path}`;
  const description = frontmatter.metaDescription || frontmatter.description;
  const ogImage = frontmatter.ogImage || `${SITE_URL}${DEFAULT_OG_IMAGE}`;

  const metadata: Metadata = {
    title: frontmatter.title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    authors: [{ name: AUTHOR_NAME }],
    openGraph: {
      title: frontmatter.title,
      description,
      url: canonicalUrl,
      siteName: SITE_NAME,
      type: 'article',
      publishedTime: frontmatter.date,
      modifiedTime: frontmatter.lastModified,
      authors: [AUTHOR_NAME],
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: frontmatter.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: frontmatter.title,
      description,
      images: [ogImage],
    },
  };

  // Handle noindex/nofollow
  if (frontmatter.noindex || frontmatter.nofollow) {
    const robotsDirectives: string[] = [];
    if (frontmatter.noindex) robotsDirectives.push('noindex');
    if (frontmatter.nofollow) robotsDirectives.push('nofollow');

    metadata.robots = {
      index: !frontmatter.noindex,
      follow: !frontmatter.nofollow,
    };
  }

  // Add keywords from tags
  if (frontmatter.tags && frontmatter.tags.length > 0) {
    metadata.keywords = frontmatter.tags;
  }

  return metadata;
}

/**
 * Generic metadata generator with full control
 * @param frontmatter - Frontmatter or page data
 * @param path - Page path
 * @returns PageMetadata object
 */
export function generateMetadata(
  frontmatter: Partial<BlogPostFrontmatter> & { title: string },
  path: string
): PageMetadata {
  const canonicalUrl = frontmatter.canonical || `${SITE_URL}${path}`;
  const description =
    (frontmatter as any).metaDescription ||
    frontmatter.description ||
    'Portfolio and blog by Benjamin Looi';
  const ogImage = frontmatter.ogImage || `${SITE_URL}${DEFAULT_OG_IMAGE}`;

  const metadata: PageMetadata = {
    title: frontmatter.title,
    description,
    canonicalUrl,
    ogImage,
    ogType: (frontmatter as any).date ? 'article' : 'website',
    twitterCard: 'summary_large_image',
    author: AUTHOR_NAME,
  };

  // Add publication/modification times for articles
  if ((frontmatter as any).date) {
    metadata.publishedTime = (frontmatter as any).date;
    if (frontmatter.lastModified) {
      metadata.modifiedTime = frontmatter.lastModified;
    }
  }

  // Add keywords from tags
  if (frontmatter.tags && frontmatter.tags.length > 0) {
    metadata.keywords = frontmatter.tags;
  }

  // Handle robots directives
  if (frontmatter.noindex || frontmatter.nofollow) {
    metadata.noindex = frontmatter.noindex;
    metadata.nofollow = frontmatter.nofollow;

    const robotsDirectives: string[] = [];
    if (frontmatter.noindex) robotsDirectives.push('noindex');
    if (frontmatter.nofollow) robotsDirectives.push('nofollow');
    metadata.robots = robotsDirectives.join(', ');
  }

  return metadata;
}
