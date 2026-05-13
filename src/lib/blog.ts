import fs from "fs";
import Fuse from "fuse.js";
import matter from "gray-matter";
import path from "path";
import type { z } from "zod";
import { getProjectMetadata, type ProjectMetadata } from "./project";
import { BlogPostFrontmatterSchema } from "./seo/validation";

const rootDirectory = path.join(process.cwd(), "src/content/blogs");

export type Blog = {
	metadata: BlogMetadata;
	content: string;
};

export type BlogMetadata = {
	title?: string;
	summary?: string;
	description?: string;
	metaDescription?: string;
	image?: string;
	author?: string;
	publishedAt?: string;
	slug: string;
	keywords?: string[];
	tags?: string[];
	featured?: boolean;
	image_credit?: {
		name: string;
		url: string;
	};
};

export async function getBlogBySlug(slug: string): Promise<Blog | null> {
	try {
		const filePath = path.join(rootDirectory, `${slug}.mdx`);
		const fileContent = fs.readFileSync(filePath, { encoding: "utf8" });
		const { data, content } = matter(fileContent);
		return { metadata: { ...data, slug }, content };
	} catch (error) {
		console.log(error);
		return null;
	}
}

export async function getBlogs(limit?: number): Promise<BlogMetadata[]> {
	const files = fs.readdirSync(rootDirectory);

	const blogs = files
		.map((file) => getBlogMetadata(file))
		.sort((a, b) => {
			if (new Date(a.publishedAt ?? "") < new Date(b.publishedAt ?? "")) {
				return 1;
			} else {
				return -1;
			}
		});

	if (limit) {
		return blogs.slice(0, limit);
	}

	return blogs;
}

export function getBlogMetadata(filepath: string): BlogMetadata {
	const slug = filepath.replace(/\.mdx$/, "");
	const filePath = path.join(rootDirectory, filepath);
	const fileContent = fs.readFileSync(filePath, { encoding: "utf8" });
	const { data } = matter(fileContent);
	return { ...data, slug };
}

/**
 * Create Fuse.js search index for blog posts
 * @param posts - Array of blog posts
 * @returns Fuse.js search instance
 */
export function createSearchIndex(posts: BlogMetadata[]): Fuse<BlogMetadata> {
	const options = {
		keys: [
			{ name: "title", weight: 0.5 },
			{ name: "description", weight: 0.3 },
			{ name: "summary", weight: 0.3 },
			{ name: "tags", weight: 0.2 },
			{ name: "keywords", weight: 0.2 },
		],
		threshold: 0.3, // Lower = more strict matching
		includeScore: true,
	};

	return new Fuse(posts, options);
}

/**
 * Search blog posts using fuzzy matching
 * @param query - Search query string
 * @param options - Search options
 * @returns Array of matching blog posts
 */
export function searchPosts(
	query: string,
	options?: { limit?: number },
): BlogMetadata[] {
	const posts = fs
		.readdirSync(rootDirectory)
		.filter((file) => file.endsWith(".mdx"))
		.map((file) => getBlogMetadata(file));

	const searchIndex = createSearchIndex(posts);
	const results = searchIndex.search(query);

	const matches = results.map((result) => result.item);

	if (options?.limit) {
		return matches.slice(0, options.limit);
	}

	return matches;
}

/**
 * Get related posts based on tag similarity
 * @param currentSlug - Slug of current post
 * @param limit - Maximum number of related posts
 * @returns Array of related blog posts
 */
export function getRelatedPosts(
	currentSlug: string,
	limit: number = 3,
): BlogMetadata[] {
	const allPosts = fs
		.readdirSync(rootDirectory)
		.filter((file) => file.endsWith(".mdx"))
		.map((file) => getBlogMetadata(file));

	const currentPost = allPosts.find((post) => post.slug === currentSlug);
	if (!currentPost) return [];

	const currentTags = currentPost.tags || currentPost.keywords || [];
	if (currentTags.length === 0) return [];

	// Calculate tag similarity for each post
	const postsWithScore = allPosts
		.filter((post) => post.slug !== currentSlug)
		.map((post) => {
			const postTags = post.tags || post.keywords || [];
			const commonTags = postTags.filter((tag) => currentTags.includes(tag));
			const score = commonTags.length;
			return { post, score };
		})
		.filter((item) => item.score > 0)
		.sort((a, b) => b.score - a.score);

	return postsWithScore.slice(0, limit).map((item) => item.post);
}

function normalizeTerm(term: string): string {
	return term.toLowerCase().replace(/[^a-z0-9]/g, "");
}

function termsOverlap(a: string, b: string): boolean {
	const normalizedA = normalizeTerm(a);
	const normalizedB = normalizeTerm(b);

	if (!normalizedA || !normalizedB) return false;
	if (normalizedA === normalizedB) return true;
	if (normalizedA.length < 3 || normalizedB.length < 3) return false;

	return normalizedA.includes(normalizedB) || normalizedB.includes(normalizedA);
}

export function getRelatedProjectsForBlog(
	currentSlug: string,
	limit: number = 3,
): ProjectMetadata[] {
	const allPosts = fs
		.readdirSync(rootDirectory)
		.filter((file) => file.endsWith(".mdx"))
		.map((file) => getBlogMetadata(file));

	const currentPost = allPosts.find((post) => post.slug === currentSlug);
	if (!currentPost) return [];

	const projectDirectory = path.join(process.cwd(), "src/content/projects");
	const postTerms = [
		currentPost.slug,
		currentPost.title ?? "",
		...(currentPost.tags ?? []),
		...(currentPost.keywords ?? []),
	];

	return fs
		.readdirSync(projectDirectory)
		.filter((file) => file.endsWith(".mdx"))
		.map((file) => getProjectMetadata(file))
		.map((project) => {
			const projectTerms = [
				project.slug,
				project.title,
				project.type,
				project.description,
				...project.stack,
			];
			const score = postTerms.filter((postTerm) =>
				projectTerms.some((projectTerm) => termsOverlap(postTerm, projectTerm)),
			).length;

			return { project, score };
		})
		.filter((item) => item.score > 0)
		.sort((a, b) => {
			if (b.score !== a.score) return b.score - a.score;
			return (
				new Date(b.project.date).getTime() - new Date(a.project.date).getTime()
			);
		})
		.slice(0, limit)
		.map((item) => item.project);
}

export function getRelatedBlogsForProject(
	project: ProjectMetadata,
	limit: number = 3,
): BlogMetadata[] {
	const projectTerms = [
		project.slug,
		project.title,
		project.type,
		project.description,
		...project.stack,
	];

	return fs
		.readdirSync(rootDirectory)
		.filter((file) => file.endsWith(".mdx"))
		.map((file) => getBlogMetadata(file))
		.map((blog) => {
			const blogTerms = [
				blog.slug,
				blog.title ?? "",
				blog.summary ?? "",
				...(blog.tags ?? []),
				...(blog.keywords ?? []),
			];
			const score = blogTerms.filter((blogTerm) =>
				projectTerms.some((projectTerm) => termsOverlap(blogTerm, projectTerm)),
			).length;

			return { blog, score };
		})
		.filter((item) => item.score > 0)
		.sort((a, b) => {
			if (b.score !== a.score) return b.score - a.score;
			return (
				new Date(b.blog.publishedAt ?? "").getTime() -
				new Date(a.blog.publishedAt ?? "").getTime()
			);
		})
		.slice(0, limit)
		.map((item) => item.blog);
}

/**
 * Validate blog post frontmatter with Zod schema
 * @param frontmatter - Frontmatter data to validate
 * @returns Validation result
 */
export function validateFrontmatter(frontmatter: unknown): {
	success: boolean;
	data?: z.infer<typeof BlogPostFrontmatterSchema>;
	error?: z.ZodError | unknown;
} {
	try {
		const result = BlogPostFrontmatterSchema.safeParse(frontmatter);
		return {
			success: result.success,
			data: result.success ? result.data : undefined,
			error: result.success ? undefined : result.error,
		};
	} catch (error) {
		return {
			success: false,
			error,
		};
	}
}
