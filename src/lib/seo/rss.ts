import { Feed } from 'feed';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const SITE_URL = 'https://benjaminlooi.dev';
const SITE_NAME = 'Benjamin Looi';
const AUTHOR_NAME = 'Benjamin Looi';
const AUTHOR_EMAIL = 'benjamin@benjaminlooi.dev';
const BLOG_DIR = path.join(process.cwd(), 'src/content/blogs');

/**
 * Sanitize HTML content for RSS feed
 * Removes potentially harmful scripts and attributes
 * @param html - HTML content to sanitize
 * @returns Sanitized HTML
 */
export function sanitizeContent(html: string | null | undefined): string {
  if (!html) return '';

  // Remove script tags
  let sanitized = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');

  // Remove dangerous event handlers
  sanitized = sanitized.replace(/on\w+="[^"]*"/gi, '');
  sanitized = sanitized.replace(/on\w+='[^']*'/gi, '');

  // Remove javascript: URLs
  sanitized = sanitized.replace(/href\s*=\s*["']javascript:[^"']*["']/gi, '');

  return sanitized;
}

/**
 * Generate RSS feed for blog posts
 * @returns RSS feed XML string
 */
export async function generateRSSFeed(): Promise<string> {
  const feed = new Feed({
    title: `${SITE_NAME} - Blog`,
    description: 'Articles about web development, design, and technology',
    id: SITE_URL,
    link: SITE_URL,
    language: 'en',
    image: `${SITE_URL}/images/og-default.png`,
    favicon: `${SITE_URL}/favicon.ico`,
    copyright: `Copyright ${new Date().getFullYear()} ${AUTHOR_NAME}`,
    updated: new Date(),
    feedLinks: {
      rss: `${SITE_URL}/feed.xml`,
      atom: `${SITE_URL}/atom.xml`,
    },
    author: {
      name: AUTHOR_NAME,
      email: AUTHOR_EMAIL,
      link: SITE_URL,
    },
  });

  // Read all blog posts
  try {
    if (fs.existsSync(BLOG_DIR)) {
      const files = fs.readdirSync(BLOG_DIR);
      const mdxFiles = files.filter((file) => file.endsWith('.mdx'));

      // Parse all posts
      const posts = mdxFiles
        .map((file) => {
          try {
            const filePath = path.join(BLOG_DIR, file);
            const fileContent = fs.readFileSync(filePath, 'utf8');
            const { data, content } = matter(fileContent);

            const slug = file.replace(/\.mdx$/, '');

            return {
              slug,
              title: data.title || slug,
              description: data.description || data.summary || '',
              content: content,
              date: data.date ? new Date(data.date) : new Date(),
              tags: data.tags || data.keywords || [],
              image: data.image,
            };
          } catch (error) {
            console.error(`Error processing ${file}:`, error);
            return null;
          }
        })
        .filter(Boolean) as Array<{
        slug: string;
        title: string;
        description: string;
        content: string;
        date: Date;
        tags: string[];
        image?: string;
      }>;

      // Sort by date (newest first)
      posts.sort((a, b) => b.date.getTime() - a.date.getTime());

      // Add posts to feed (limit to 20 most recent)
      posts.slice(0, 20).forEach((post) => {
        const postUrl = `${SITE_URL}/blog/${post.slug}`;
        const contentHtml = sanitizeContent(post.content);

        feed.addItem({
          title: post.title,
          id: postUrl,
          link: postUrl,
          description: post.description,
          content: contentHtml,
          author: [
            {
              name: AUTHOR_NAME,
              email: AUTHOR_EMAIL,
              link: SITE_URL,
            },
          ],
          date: post.date,
          category: post.tags.map((tag) => ({ name: tag })),
          image: post.image ? `${SITE_URL}${post.image}` : undefined,
        });
      });
    }
  } catch (error) {
    console.error('Error generating RSS feed:', error);
  }

  return feed.rss2();
}
