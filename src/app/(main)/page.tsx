import AboutMe from "@/components/sections/about-me";
// import BlogSection from "@/components/sections/blog-section";
import Hero from "@/components/sections/hero-section";
import ProjectsSection from "@/components/sections/project-sections";
import SkillsSection from "@/components/sections/skill-section";
import { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo/metadata";
import { buildPersonSchema } from "@/lib/seo/structured-data";
import { StructuredData } from "@/components/seo/StructuredData";

export const metadata: Metadata = generatePageMetadata(
  {
    title: "Benjamin Looi - Software Engineer",
    description: "Software engineer with 5+ years building enterprise SaaS products across the full stack. Deep expertise in React, TypeScript, and Next.js, with hands-on backend and DevOps experience. Currently based in Cambodia, open to remote opportunities.",
  },
  "/"
);

const Home = () => {
  // Build Person and WebSite schemas for home page
  const personSchema = buildPersonSchema({
    name: "Benjamin Looi",
    url: "https://www.benjaminlooi.dev",
    jobTitle: "Software Engineer",
    description: "Software engineer with 5+ years building enterprise SaaS products across the full stack",
    image: "https://www.benjaminlooi.dev/images/benjamin-looi.jpg",
    sameAs: [
      "https://github.com/BenjaminLooi",
      "https://linkedin.com/in/benjaminlooi",
      "https://twitter.com/benjaminlooi",
    ],
  });

  return (
    <div>
      {/* Structured Data */}
      <StructuredData schema={personSchema} />
      
      <Hero />
      <AboutMe />
      <SkillsSection />
      <ProjectsSection />
      {/* <BlogSection /> */}
    </div>
  );
};
export default Home;
