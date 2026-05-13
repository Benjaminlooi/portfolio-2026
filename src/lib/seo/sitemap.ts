import fs from "fs";
import matter from "gray-matter";
import type { MetadataRoute } from "next";
import path from "path";

const SITE_URL = "https://www.benjaminlooi.dev";
const BLOG_DIR = path.join(process.cwd(), "src/content/blogs");
const PROJECT_DIR = path.join(process.cwd(), "src/content/projects");

const STATIC_PAGES = [
	{
		path: "/",
		priority: 1.0,
		changeFrequency: "weekly" as const,
		lastModified: "2026-03-05",
	},
	{
		path: "/about",
		priority: 0.9,
		changeFrequency: "monthly" as const,
		lastModified: "2026-03-05",
	},
	{
		path: "/projects",
		priority: 0.9,
		changeFrequency: "weekly" as const,
		lastModified: "2026-03-05",
	},
	{
		path: "/blog",
		priority: 0.9,
		changeFrequency: "weekly" as const,
		lastModified: "2026-05-05",
	},
	{
		path: "/contact",
		priority: 0.9,
		changeFrequency: "monthly" as const,
		lastModified: "2026-03-05",
	},
];

/**
 * Calculate priority for a URL based on its type and properties
 * @param pathname - URL pathname
 * @param metadata - Optional metadata for priority calculation
 * @returns Priority value between 0.0 and 1.0
 */
export function calculatePriority(
	pathname: string,
	metadata?: { featured?: boolean; date?: Date },
): number {
	// Homepage gets highest priority
	if (pathname === "/") {
		return 1.0;
	}

	// Main pages get high priority
	if (["/about", "/projects", "/blog", "/contact"].includes(pathname)) {
		return 0.9;
	}

	// Blog posts base priority
	if (pathname.startsWith("/blog/")) {
		let priority = 0.6;

		if (metadata?.featured) {
			priority += 0.1;
		}

		if (metadata?.date) {
			const daysSincePublished =
				(Date.now() - metadata.date.getTime()) / (1000 * 60 * 60 * 24);
			if (daysSincePublished < 30) {
				priority += 0.1;
			} else if (daysSincePublished < 90) {
				priority += 0.05;
			}
		}

		return Math.min(priority, 0.8);
	}

	// Projects base priority
	if (pathname.startsWith("/projects/")) {
		let priority = 0.7;
		if (metadata?.date) {
			const daysSincePublished =
				(Date.now() - metadata.date.getTime()) / (1000 * 60 * 60 * 24);
			if (daysSincePublished < 90) {
				priority += 0.1;
			}
		}
		return Math.min(priority, 0.9);
	}

	return 0.5;
}

/**
 * Get appropriate change frequency for a URL
 * @param pathname - URL pathname
 * @param metadata - Optional metadata for frequency calculation
 * @returns Change frequency string
 */
export function getChangeFrequency(
	pathname: string,
	metadata?: { date?: Date },
): "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never" {
	if (pathname === "/" || pathname === "/blog" || pathname === "/projects") {
		return "weekly";
	}

	if (pathname.startsWith("/blog/")) {
		if (metadata?.date) {
			const yearsSincePublished =
				(Date.now() - metadata.date.getTime()) / (1000 * 60 * 60 * 24 * 365);
			if (yearsSincePublished > 2) {
				return "yearly";
			}
		}
		return "monthly";
	}

	if (pathname.startsWith("/projects/")) {
		return "monthly";
	}

	return "monthly";
}

/**
 * Generate complete sitemap for the website
 * @returns Array of sitemap entries
 */
export async function generateSitemap(): Promise<MetadataRoute.Sitemap> {
	const sitemap: MetadataRoute.Sitemap = [];

	STATIC_PAGES.forEach((page) => {
		sitemap.push({
			url: `${SITE_URL}${page.path}`,
			lastModified: new Date(page.lastModified),
			changeFrequency: page.changeFrequency,
			priority: page.priority,
		});
	});

	// Add blog posts
	try {
		if (fs.existsSync(BLOG_DIR)) {
			const files = fs.readdirSync(BLOG_DIR);
			const mdxFiles = files.filter((file) => file.endsWith(".mdx"));

			mdxFiles.forEach((file) => {
				try {
					const filePath = path.join(BLOG_DIR, file);
					const fileContent = fs.readFileSync(filePath, "utf8");
					const { data } = matter(fileContent);

					const slug = file.replace(/\.mdx$/, "");
					const pathname = `/blog/${slug}`;

					const publishDate = data.publishedAt
						? new Date(data.publishedAt)
						: data.date
							? new Date(data.date)
							: undefined;
					const lastModified = data.lastModified
						? new Date(data.lastModified)
						: publishDate || new Date();

					sitemap.push({
						url: `${SITE_URL}${pathname}`,
						lastModified,
						changeFrequency: getChangeFrequency(pathname, {
							date: publishDate,
						}),
						priority: calculatePriority(pathname, {
							featured: data.featured,
							date: publishDate,
						}),
					});
				} catch (error) {
					console.error(`Error processing ${file}:`, error);
				}
			});
		}
	} catch (error) {
		console.error("Error reading blog directory:", error);
	}

	// Add projects
	try {
		if (fs.existsSync(PROJECT_DIR)) {
			const files = fs.readdirSync(PROJECT_DIR);
			const mdxFiles = files.filter((file) => file.endsWith(".mdx"));

			mdxFiles.forEach((file) => {
				try {
					const filePath = path.join(PROJECT_DIR, file);
					const fileContent = fs.readFileSync(filePath, "utf8");
					const { data } = matter(fileContent);

					const slug = file.replace(/\.mdx$/, "");
					const pathname = `/projects/${slug}`;

					const publishDate = data.date ? new Date(data.date) : undefined;
					const lastModified = data.lastModified
						? new Date(data.lastModified)
						: publishDate || new Date();

					sitemap.push({
						url: `${SITE_URL}${pathname}`,
						lastModified,
						changeFrequency: getChangeFrequency(pathname, {
							date: publishDate,
						}),
						priority: calculatePriority(pathname, { date: publishDate }),
					});
				} catch (error) {
					console.error(`Error processing project ${file}:`, error);
				}
			});
		}
	} catch (error) {
		console.error("Error reading projects directory:", error);
	}

	return sitemap;
}
