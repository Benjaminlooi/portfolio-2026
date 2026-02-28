import { z } from 'zod';

/**
 * Zod schema for PageMetadata validation
 * Enforces SEO best practices for title and description lengths
 */
export const PageMetadataSchema = z.object({
  title: z
    .string()
    .min(50, 'Title should be at least 50 characters for SEO')
    .max(70, 'Title should not exceed 70 characters for SEO'),
  description: z
    .string()
    .min(150, 'Description should be at least 150 characters for SEO')
    .max(160, 'Description should not exceed 160 characters for SEO'),
  canonicalUrl: z.string().url('Canonical URL must be a valid URL'),
  ogImage: z.string().url('OG Image must be a valid URL').optional(),
  ogType: z.enum(['website', 'article', 'profile']).optional(),
  twitterCard: z
    .enum(['summary', 'summary_large_image', 'app', 'player'])
    .optional(),
  author: z.string().optional(),
  publishedTime: z.string().datetime().optional(),
  modifiedTime: z.string().datetime().optional(),
  keywords: z.array(z.string()).optional(),
  noindex: z.boolean().optional(),
  nofollow: z.boolean().optional(),
  robots: z.string().optional(),
  structuredData: z.array(z.any()).optional(), // schema-dts types are complex, use any
});

/**
 * Zod schema for BlogPostFrontmatter validation
 * Validates MDX frontmatter with enhanced SEO fields
 */
export const BlogPostFrontmatterSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  date: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: 'Date must be a valid date string',
  }),
  metaDescription: z
    .string()
    .min(150, 'Meta description should be at least 150 characters')
    .max(160, 'Meta description should not exceed 160 characters')
    .optional(),
  ogImage: z.string().url('OG Image must be a valid URL').optional(),
  tags: z.array(z.string()).optional(),
  lastModified: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), {
      message: 'Last modified must be a valid date string',
    })
    .optional(),
  canonical: z.string().url('Canonical URL must be a valid URL').optional(),
  noindex: z.boolean().optional(),
  featured: z.boolean().optional(),
  readingTime: z.number().positive('Reading time must be positive').optional(),
});

/**
 * Zod schema for SitemapEntry validation
 */
export const SitemapEntrySchema = z.object({
  url: z.string().url('URL must be valid'),
  lastModified: z.string().datetime().optional(),
  changeFrequency: z
    .enum(['always', 'hourly', 'daily', 'weekly', 'monthly', 'yearly', 'never'])
    .optional(),
  priority: z
    .number()
    .min(0.0, 'Priority must be between 0.0 and 1.0')
    .max(1.0, 'Priority must be between 0.0 and 1.0')
    .optional(),
});

/**
 * Zod schema for RSSFeedEntry validation
 */
export const RSSFeedEntrySchema = z.object({
  title: z.string().min(1, 'Title is required'),
  link: z.string().url('Link must be a valid URL'),
  description: z.string().min(1, 'Description is required'),
  content: z.string().optional(),
  author: z.string().optional(),
  categories: z.array(z.string()).optional(),
  guid: z.string().min(1, 'GUID is required'),
  pubDate: z.date(),
  enclosure: z
    .object({
      url: z.string().url(),
      type: z.string(),
      length: z.number().optional(),
    })
    .optional(),
  source: z
    .object({
      url: z.string().url(),
      title: z.string(),
    })
    .optional(),
});
