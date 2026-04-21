import MyPhoto from "@/components/my-photo";
import SkillsSection from "@/components/sections/skill-section";
import AnimationContainer from "@/components/animated/animated-container";
import { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo/metadata";
import { buildPersonSchema, buildBreadcrumbListSchema } from "@/lib/seo/structured-data";
import { StructuredData } from "@/components/seo/StructuredData";

export const metadata: Metadata = generatePageMetadata(
  {
    title: "About Me - Benjamin Looi",
    description:
      "Full-stack developer from Malaysia with 5+ years building web and mobile products across Southeast Asia. Currently based in Cambodia.",
  },
  "/about"
);

const About = () => {
  // Build Person schema for about page
  const personSchema = buildPersonSchema({
    name: "Benjamin Looi",
    url: "https://www.benjaminlooi.dev",
    jobTitle: "Software Engineer",
    description:
      "Full-stack developer with 5+ years building web and mobile products across Southeast Asia",
    image: "https://www.benjaminlooi.dev/images/benjamin-looi.jpg",
    sameAs: [
      "https://github.com/BenjaminLooi",
      "https://linkedin.com/in/benjaminlooi",
      "https://twitter.com/benjaminlooi",
    ],
  });

  const breadcrumbSchema = buildBreadcrumbListSchema([
    { name: "Home", url: "https://www.benjaminlooi.dev" },
    { name: "About", url: "https://www.benjaminlooi.dev/about" }
  ]);

  return (
    <div className="space-y-6 lg:space-y-12">
      {/* Structured Data */}
      <StructuredData schema={[personSchema, breadcrumbSchema]} />

      <div className="flex gap-6 flex-col md:flex-row items-center">
        <MyPhoto />
        <AnimationContainer className="w-full py-12 lg:py-16">
          <h2 className="mb-8 text-2xl font-bold tracking-tight text-center md:text-left text-white lg:text-start">
            About me
          </h2>

          <div className="w-full space-y-4 text-base font-normal leading-7 text-neutral-200">
            <p>
              I&apos;m Benjamin — a full-stack developer from Malaysia,
              currently based in Cambodia. I&apos;ve spent the past 5+ years
              building web and mobile products, mostly for small and
              medium-sized businesses in Southeast Asia who need technology that
              actually works for their context.
            </p>
            <p>
              Most recently, I built{" "}
              <span className="text-white font-medium">Baguette POS</span> — a
              point-of-sale system for restaurants in Cambodia that handles
              dual-currency payments (USD and Riel), real-time table management,
              and offline-first ordering. Before that, I designed and launched{" "}
              <span className="text-white font-medium">Sokha Tech</span>, a
              bilingual consultancy platform helping Cambodian SMEs adopt digital
              tools.
            </p>
            <p>
              I work primarily with TypeScript, React/Next.js, and Node.js. I
              care about building things that get used by real people, writing
              about what I learn along the way, and continuously pushing my craft
              forward.
            </p>
            <p>
              I&apos;m currently looking for remote opportunities where I can
              bring this hands-on, full-stack experience to a team that values
              shipping real products over chasing trends.
            </p>
          </div>
        </AnimationContainer>
      </div>
      <SkillsSection />
    </div>
  );
};

export default About;

