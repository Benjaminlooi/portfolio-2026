import { Feed } from "feed";
import fs from "fs";
import matter from "gray-matter";
import path from "path";

const SITE_URL = "https://www.benjaminlooi.dev";
const SITE_NAME = "Benjamin Looi";
const AUTHOR_NAME = "Benjamin Looi";
const AUTHOR_EMAIL = "benjamin@benjaminlooi.dev";
const BLOG_DIR = path.join(process.cwd(), "src/content/blogs");

function imageEnclosure(image: string) {
	const url = new URL(image, SITE_URL);
	const format = (
		url.searchParams.get("fm") || path.extname(url.pathname).slice(1)
	).toLowerCase();
	const imageTypes: Record<string, string> = {
		jpg: "image/jpeg",
		jpeg: "image/jpeg",
		png: "image/png",
		gif: "image/gif",
		webp: "image/webp",
		avif: "image/avif",
		svg: "image/svg+xml",
	};
	const type =
		imageTypes[format] ||
		(url.hostname === "images.unsplash.com"
			? "image/jpeg"
			: "application/octet-stream");

	// feed writes enclosure attributes verbatim, so escape XML metacharacters.
	const escapedUrl = url.href
		.replace(/&/g, "&amp;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&apos;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;");

	return { url: escapedUrl, type, length: 0 };
}

/**
 * Sanitize HTML content for RSS feed
 * Removes potentially harmful scripts and attributes
 * @param html - HTML content to sanitize
 * @returns Sanitized HTML
 */
export function sanitizeContent(html: string | null | undefined): string {
	if (!html) return "";

	// Remove script tags
	let sanitized = html.replace(
		/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
		"",
	);

	// Remove dangerous event handlers
	sanitized = sanitized.replace(/on\w+="[^"]*"/gi, "");
	sanitized = sanitized.replace(/on\w+='[^']*'/gi, "");

	// Remove javascript: URLs
	sanitized = sanitized.replace(/href\s*=\s*["']javascript:[^"']*["']/gi, "");

	return sanitized;
}

/**
 * Generate RSS feed for blog posts
 * @returns RSS feed XML string
 */
export async function generateRSSFeed(): Promise<string> {
	const feed = new Feed({
		title: `${SITE_NAME} - Blog`,
		description: "Articles about web development, design, and technology",
		id: SITE_URL,
		link: SITE_URL,
		language: "en",
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
			const mdxFiles = files.filter((file) => file.endsWith(".mdx"));

			// Parse all posts
			const posts = mdxFiles
				.map((file) => {
					try {
						const filePath = path.join(BLOG_DIR, file);
						const fileContent = fs.readFileSync(filePath, "utf8");
						const { data, content } = matter(fileContent);

						const slug = file.replace(/\.mdx$/, "");
						const date = new Date(data.publishedAt ?? data.date ?? "");
						if (Number.isNaN(date.getTime())) {
							throw new Error(
								`Missing or invalid publication date for ${slug}`,
							);
						}

						return {
							slug,
							title: data.title || slug,
							description: data.description || data.summary || "",
							content: content,
							date,
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
					image: post.image ? imageEnclosure(post.image) : undefined,
				});
			});
		}
	} catch (error) {
		console.error("Error generating RSS feed:", error);
	}

	return feed.rss2();
}
