import { getBlogBySlug, getBlogs, getRelatedPosts } from "@/lib/blog";
import { notFound } from "next/navigation";
import MDXContent from "@/components/mdx-content";
import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";

import { formatDate } from "@/lib/utils";
import { generateBlogMetadata } from "@/lib/seo/metadata";
import { buildBlogPostingSchema } from "@/lib/seo/structured-data";
import { StructuredData } from "@/components/seo/StructuredData";

import AnimatedImage from "@/components/animated/animated-image";
import AnimatedSignature from "@/components/animated/animated-signature";
import AnimationContainer from "@/components/animated/animated-container";
import BlogCard from "@/components/blog-card";
import { TableOfContents } from "@/components/blog/table-of-content";
import GiscusComments from "@/components/blog/GiscusComments";

interface Props {
  params: Promise<{ slug: string }>;
}

export const generateMetadata = async ({ params }: Props) => {
  const { slug } = await params;
  const post = await getBlogBySlug(slug);

  if (!post) {
    return {
      title: "Blog",
    };
  }

  const { metadata } = post;
  
  // Use enhanced SEO metadata generator
  return generateBlogMetadata(
    {
      title: metadata.title || '',
      description: metadata.summary || metadata.description || '',
      metaDescription: metadata.metaDescription,
      date: metadata.publishedAt || '',
      tags: metadata.tags || metadata.keywords || [],
      ogImage: metadata.image,
    },
    `/blog/${slug}`
  );
};

export async function generateStaticParams() {
  const blogs = await getBlogs();
  const slugs = blogs.map((blog) => ({ slug: blog.slug }));

  return slugs;
}

const Blog = async ({ params }: Props) => {
  const { slug } = await params;

  const post = await getBlogBySlug(slug);

  if (!post) {
    notFound();
  }

  const { metadata, content } = post;

  // Get related posts
  const relatedPosts = getRelatedPosts(slug, 3);

  // Build structured data for blog post
  const blogPostSchema = buildBlogPostingSchema({
    headline: metadata.title || '',
    description: metadata.summary || metadata.description || '',
    author: metadata.author || 'Benjamin Looi',
    datePublished: metadata.publishedAt || new Date().toISOString(),
    url: `https://benjaminlooi.dev/blog/${slug}`,
    image: metadata.image,
  });

  return (
    <>
    <TableOfContents />
    <div className="w-full max-w-2xl mx-auto">
      {/* Structured Data for SEO */}
      <StructuredData schema={blogPostSchema} />
      
      <AnimationContainer invert>
        <Link
          href="/blog"
          className="mb-8 inline-flex items-center gap-2 text-sm font-light text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeftIcon className="h-5 w-5" />
          <span>Back to blogs</span>
        </Link>
      </AnimationContainer>

      {metadata.image && (
        <div className="relative">
          <AnimatedImage
            className="relative mb-6 h-96 w-full overflow-hidden rounded-lg"
            src={metadata.image}
            alt={metadata.title as string}
            layout
            layoutId={`blog-image-${slug}`}
            width={1000}
            height={680}
            loading="lazy"
            decoding="async"
          />
          {metadata.image_credit && (
            <div className="text-xs italic mb-4 flex items-center">
              <span>Image Credit:</span>
              <a
                href={metadata.image_credit.url}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-1 text-blue-500 hover:underline"
              >
                {metadata.image_credit.name}
              </a>
            </div>
          )}
        </div>
      )}

      <div>
        <h1 className="text-3xl font-bold">{metadata.title}</h1>
        <p className="mt-3 text-xs text-muted-foreground">
          {metadata.author} / {formatDate(metadata.publishedAt ?? "")}
        </p>
      </div>

      <div className="prose w-full max-w-full my-6 md:mb-10 prose-invert">
        <MDXContent source={content} />
        Thanks for reading! 😁
        <AnimatedSignature />
      </div>

      <GiscusComments />

      {/* Related Posts Section */}
      {relatedPosts.length > 0 && (
        <div className="mt-12 pt-8 border-t">
          <h2 className="text-2xl font-bold mb-6">Related Posts</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {relatedPosts.map((relatedPost) => (
              <BlogCard key={relatedPost.slug} blog={relatedPost} />
            ))}
          </div>
        </div>
      )}
    </div>
    </>
  );
};
export default Blog;
