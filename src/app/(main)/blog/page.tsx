import AnimatedTitle from "@/components/animated/animated-title";
import { getBlogs } from "@/lib/blog";
import { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo/metadata";
import { BlogSearch } from "@/components/blog/BlogSearch";

export const metadata: Metadata = generatePageMetadata(
  {
    title: "Blog - Benjamin Looi",
    description: "Articles about web development, UX design, React, TypeScript, and modern web technologies. Sharing insights from real-world projects.",
  },
  "/blog"
);

const Blog = async () => {
  const blogs = await getBlogs();
  
  return (
    <div>
      <AnimatedTitle title="Blogs" />
      <p className="w-full text-base font-normal leading-7 text-justify text-neutral-200 mb-8">
        Welcome to my blog, a place where creativity and technology come to
        life. Here, I share my journey through coding, problem-solving, and the
        stories behind the projects I create.
      </p>
      
      {/* Blog Search Integration */}
      <BlogSearch posts={blogs} trackAnalytics={true} />
    </div>
  );
};
export default Blog;
