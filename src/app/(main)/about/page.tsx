import MyPhoto from "@/components/my-photo";
import AboutMe from "@/components/sections/about-me";
import SkillsSection from "@/components/sections/skill-section";
import { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo/metadata";
import { buildPersonSchema } from "@/lib/seo/structured-data";
import { StructuredData } from "@/components/seo/StructuredData";

export const metadata: Metadata = generatePageMetadata(
  {
    title: "About Me - Benjamin Looi",
    description: "Learn about Benjamin Looi's journey as a Software Engineer and 10x Vibe Engineer. Passionate about building user-centric web applications with modern technologies.",
  },
  "/about"
);

const About = () => {
  // Build Person schema for about page
  const personSchema = buildPersonSchema({
    name: "Benjamin Looi",
    url: "https://benjaminlooi.dev",
    jobTitle: "Software Engineer",
    description: "Software Engineer and 10x Vibe Engineer passionate about building user-centric web applications",
    image: "https://benjaminlooi.dev/images/benjamin-looi.jpg",
    sameAs: [
      "https://github.com/BenjaminLooi",
      "https://linkedin.com/in/benjaminlooi",
      "https://twitter.com/benjaminlooi",
    ],
  });

  return (
    <div className="space-y-6 lg:space-y-12">
      {/* Structured Data */}
      <StructuredData schema={personSchema} />
      
      <div className="flex gap-6 flex-col md:flex-row items-center">
        <MyPhoto />
        <AboutMe />
      </div>
      <SkillsSection />
    </div>
  );
};

export default About;
