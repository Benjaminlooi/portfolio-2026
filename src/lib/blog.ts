import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Fuse from "fuse.js";
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
      { name: 'title', weight: 0.5 },
      { name: 'description', weight: 0.3 },
      { name: 'summary', weight: 0.3 },
      { name: 'tags', weight: 0.2 },
      { name: 'keywords', weight: 0.2 },
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
  options?: { limit?: number }
): BlogMetadata[] {
  const posts = fs
    .readdirSync(rootDirectory)
    .filter((file) => file.endsWith('.mdx'))
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
  limit: number = 3
): BlogMetadata[] {
  const allPosts = fs
    .readdirSync(rootDirectory)
    .filter((file) => file.endsWith('.mdx'))
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

/**
 * Validate blog post frontmatter with Zod schema
 * @param frontmatter - Frontmatter data to validate
 * @returns Validation result
 */
export function validateFrontmatter(frontmatter: unknown): {
  success: boolean;
  data?: any;
  error?: any;
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
