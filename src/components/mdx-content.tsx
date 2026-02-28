import dynamic from "next/dynamic";
import { JSX } from "react";
import { MDXRemote, MDXRemoteProps } from "next-mdx-remote/rsc";
import rehypeSlug from "rehype-slug";
import { HeadingWithAnchor } from "./blog/heading-anchor";

// Dynamic imports using `next/dynamic`
const components = {
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <HeadingWithAnchor as="h1" {...props} />
  ),
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <HeadingWithAnchor as="h2" {...props} />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <HeadingWithAnchor as="h3" {...props} />
  ),
  img: dynamic(() => import("./blog/image")),
  // code: dynamic(() => import("./blog/new-code-block")),
  code: dynamic(() => import("./blog/code-block")),
  Youtube: dynamic(() => import("./blog/youtube")),
  CallOut: dynamic(() => import("./blog/call-out")),
  SimpleFadeInAnimation: dynamic(
    () => import("./blog/motion-crash-course/simple-fade-in-animation")
  ),
  AnimationVariants: dynamic(
    () => import("./blog/motion-crash-course/animation-variants")
  ),
  HoverAnimation: dynamic(
    () => import("./blog/motion-crash-course/hover-animation")
  ),
  OverViewAnimation: dynamic(
    () => import("./blog/motion-crash-course/overview-animation")
  ),
  DraggableBox: dynamic(
    () => import("./blog/motion-crash-course/draggable-box")
  ),
  LayoutAnimation: dynamic(
    () => import("./blog/motion-crash-course/layout-animation")
  ),
  StaggeredAnimation: dynamic(
    () => import("./blog/motion-crash-course/staggered-animation")
  ),
  ExitAnimation: dynamic(
    () => import("./blog/motion-crash-course/exit-animation")
  ),
  LayoutIdAnimation: dynamic(
    () => import("./blog/motion-crash-course/layoutid-animation")
  ),
  MotionValueAnimation: dynamic(
    () => import("./blog/motion-crash-course/motion-value")
  ),
};

export default function MDXContent(
  props: JSX.IntrinsicAttributes & MDXRemoteProps
) {
  return (
    <MDXRemote
      {...props}
      components={components}
      options={{
        mdxOptions: {
          rehypePlugins: [rehypeSlug],
        },
      }}
    />
  );
}
