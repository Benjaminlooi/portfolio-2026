import type {
  Person,
  BlogPosting,
  WebSite,
  BreadcrumbList,
  WithContext,
} from 'schema-dts';

/**
 * Page metadata for SEO optimization
 * Used to generate meta tags, Open Graph tags, and Twitter Cards
 */
export interface PageMetadata {
  /** Page title (50-70 characters recommended) */
  title: string;
  /** Page description (150-160 characters recommended) */
  description: string;
  /** Canonical URL for the page */
  canonicalUrl: string;
  /** Open Graph image URL (1200x630 recommended) */
  ogImage?: string;
  /** Open Graph type (article, website, profile, etc.) */
  ogType?: 'website' | 'article' | 'profile';
  /** Twitter Card type (summary, summary_large_image, etc.) */
  twitterCard?: 'summary' | 'summary_large_image' | 'app' | 'player';
  /** Content author name */
  author?: string;
  /** Article published time (ISO 8601 format) */
  publishedTime?: string;
  /** Article modified time (ISO 8601 format) */
  modifiedTime?: string;
  /** Page keywords for meta tag */
  keywords?: string[];
  /** Prevent indexing this page */
  noindex?: boolean;
  /** Prevent following links on this page */
  nofollow?: boolean;
  /** Custom robots meta directives */
  robots?: string;
  /** JSON-LD structured data to include */
  structuredData?: StructuredDataSchema[];
}

/**
 * Supported structured data schema types
 */
export type StructuredDataSchema =
  | WithContext<Person>
  | WithContext<BlogPosting>
  | WithContext<WebSite>
  | WithContext<BreadcrumbList>;

/**
 * XML Sitemap entry
 */
export interface SitemapEntry {
  /** Full URL of the page */
  url: string;
  /** Last modification date (ISO 8601 format) */
  lastModified?: string;
  /** How frequently the page changes */
  changeFrequency?:
    | 'always'
    | 'hourly'
    | 'daily'
    | 'weekly'
    | 'monthly'
    | 'yearly'
    | 'never';
  /** Priority relative to other pages (0.0 - 1.0) */
  priority?: number;
}

/**
 * RSS feed entry
 */
export interface RSSFeedEntry {
  /** Entry title */
  title: string;
  /** Full URL to the entry */
  link: string;
  /** Short description or excerpt */
  description: string;
  /** Full HTML content */
  content?: string;
  /** Author name */
  author?: string;
  /** Category tags */
  categories?: string[];
  /** Globally unique identifier */
  guid: string;
  /** Publication date */
  pubDate: Date;
  /** Media enclosure (for podcasts, videos) */
  enclosure?: {
    url: string;
    type: string;
    length?: number;
  };
  /** Source attribution */
  source?: {
    url: string;
    title: string;
  };
}

/**
 * Enhanced blog post frontmatter with SEO fields
 */
export interface BlogPostFrontmatter {
  /** Post title */
  title: string;
  /** Post description/excerpt */
  description: string;
  /** Publication date */
  date: string;
  /** SEO meta description (150-160 chars, overrides description if provided) */
  metaDescription?: string;
  /** Custom Open Graph image URL */
  ogImage?: string;
  /** Tags for categorization and search */
  tags?: string[];
  /** Last modified timestamp */
  lastModified?: string;
  /** Canonical URL (if different from default) */
  canonical?: string;
  /** Prevent search engine indexing */
  noindex?: boolean;
  /** Prevent following links */
  nofollow?: boolean;
  /** Mark as featured post */
  featured?: boolean;
  /** Estimated reading time in minutes */
  readingTime?: number;
}
