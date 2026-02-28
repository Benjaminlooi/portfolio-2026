import AboutMe from "@/components/sections/about-me";
// import BlogSection from "@/components/sections/blog-section";
import Hero from "@/components/sections/hero-section";
import ProjectsSection from "@/components/sections/project-sections";
import SkillsSection from "@/components/sections/skill-section";
import { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo/metadata";
import { buildPersonSchema, buildWebSiteSchema } from "@/lib/seo/structured-data";
import { StructuredData } from "@/components/seo/StructuredData";

export const metadata: Metadata = generatePageMetadata(
  {
    title: "Benjamin Looi - Software Engineer & UX Enthusiast",
    description: "Full-stack developer from Kuala Lumpur, Malaysia. Passionate about building user-centric web applications with React, TypeScript, Next.js, and modern web technologies.",
  },
  "/"
);

const Home = () => {
  // Build Person and WebSite schemas for home page
  const personSchema = buildPersonSchema({
    name: "Benjamin Looi",
    url: "https://benjaminlooi.dev",
    jobTitle: "Software Engineer",
    description: "Full-stack developer passionate about building user-centric web applications",
    image: "https://benjaminlooi.dev/images/benjamin-looi.jpg",
    sameAs: [
      "https://github.com/BenjaminLooi",
      "https://linkedin.com/in/benjaminlooi",
      "https://twitter.com/benjaminlooi",
    ],
  });

  const websiteSchema = buildWebSiteSchema({
    name: "Benjamin Looi Portfolio",
    description: "Portfolio and blog by Benjamin Looi, a software engineer specializing in web development",
    url: "https://benjaminlooi.dev",
  });

  return (
    <div>
      {/* Structured Data */}
      <StructuredData schema={[personSchema, websiteSchema]} />
      
      <Hero />
      <AboutMe />
      <SkillsSection />
      <ProjectsSection />
      {/* <BlogSection /> */}
    </div>
  );
};
export default Home;
