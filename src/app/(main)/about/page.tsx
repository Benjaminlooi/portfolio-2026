import MyPhoto from "@/components/my-photo";
import SkillsSection from "@/components/sections/skill-section";
import AnimationContainer from "@/components/animated/animated-container";
import { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo/metadata";
import { buildPersonSchema, buildBreadcrumbListSchema, buildFAQPageSchema } from "@/lib/seo/structured-data";
import { StructuredData } from "@/components/seo/StructuredData";

export const metadata: Metadata = generatePageMetadata(
  {
    title: "About Me - Benjamin Looi",
    description:
      "Software engineer from Malaysia with 5+ years building enterprise SaaS products across the full stack. Experienced in React, Next.js, Node.js, and Laravel. Currently based in Cambodia, open to remote opportunities.",
  },
  "/about"
);

const faqData = [
  {
    question: "Can you work across different time zones?",
    answer: "Absolutely. I'm based in Cambodia (GMT+7) and have worked with teams and clients across Southeast Asia, Europe, and North America. I'm comfortable with async communication and overlap hours — most of my remote work has been with teams where we share a few hours of real-time availability and handle the rest through structured updates.",
  },
  {
    question: "Do you work with existing codebases or only greenfield projects?",
    answer: "Both. I've built projects from scratch (like Baguette POS and this portfolio) and I've also inherited and improved existing codebases. I'm comfortable diving into unfamiliar code, refactoring where it matters, and shipping incremental improvements without breaking what already works.",
  },
  {
    question: "What's your approach when starting a new project?",
    answer: "I start by understanding the actual problem — not just the feature request. That usually means talking to the people who'll use the product. From there, I scope a lean first version, ship it quickly, and iterate based on real usage. I'd rather launch something focused that works than a feature-packed app that doesn't get used.",
  },
];

const About = () => {
  // Build Person schema for about page
  const personSchema = buildPersonSchema({
    name: "Benjamin Looi",
    url: "https://www.benjaminlooi.dev",
    jobTitle: "Software Engineer",
    description:
      "Software engineer with 5+ years building enterprise SaaS products across the full stack, currently based in Cambodia",
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

  const faqSchema = buildFAQPageSchema(faqData);

  return (
    <div className="space-y-6 lg:space-y-12">
      {/* Structured Data */}
      <StructuredData schema={[personSchema, breadcrumbSchema, faqSchema]} />

      <div className="flex gap-6 flex-col md:flex-row items-center">
        <MyPhoto />
        <AnimationContainer className="w-full py-12 lg:py-16">
          <h2 className="mb-8 text-2xl font-bold tracking-tight text-center md:text-left text-white lg:text-start">
            About me
          </h2>

          <div className="w-full space-y-4 text-base font-normal leading-7 text-neutral-200">
            <p>
              I&apos;m Benjamin — a software engineer from Malaysia
              with 5+ years of professional experience building enterprise
              software. Most of my career has been spent at tech companies in
              Kuala Lumpur, where I worked across the stack on HR management
              systems and point-of-sale platforms — from React and Vue frontends
              to Laravel and Node.js backends.
            </p>
            <p>
              At my most recent role at{" "}
              <span className="text-white font-medium">TalentCloud AI</span>,
              I spent three years as a Senior Full Stack Developer — leading
              a frontend migration to a Nuxt.js monorepo, building complex
              features like Excel-like shift management systems, and mentoring
              junior developers. Before that, I was the sole frontend developer
              at{" "}
              <span className="text-white font-medium">Platinum Code</span>,
              where I architected a POS system for the F&amp;B industry from
              scratch.
            </p>
            <p>
              In 2025, I moved to Cambodia and took a deliberate sabbatical to
              upskill and build independently. I&apos;ve been designing{" "}
              <span className="text-white font-medium">Baguette POS</span> — a
              point-of-sale system built for the Cambodian market with
              dual-currency payment handling and offline-first ordering — and
              launched{" "}
              <span className="text-white font-medium">
                The Eco Garden Cat Project
              </span>
              , a community platform I initiated to help care for stray cats in
              my neighbourhood.
            </p>
            <p>
              I work primarily with TypeScript, React, and Next.js, but
              I&apos;ve shipped production code in Vue, Nuxt, Angular, and
              Astro. On the side, I tinker with network security tools like
              Nmap and Burp Suite — not as a career pivot, just because I
              like understanding how things break.
            </p>
            <p>
              I&apos;m looking for a remote role — ideally with a product team
              where I can own features end-to-end and work closely with
              users.
            </p>
          </div>
        </AnimationContainer>
      </div>

      <AnimationContainer className="w-full py-12 lg:py-16">
        <h2 className="mb-8 text-2xl font-bold tracking-tight text-center md:text-left text-white lg:text-start">
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {faqData.map((faq, index) => (
            <div key={index} className="space-y-2">
              <h3 className="text-lg font-medium text-white">{faq.question}</h3>
              <p className="text-base text-neutral-300 leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </div>
      </AnimationContainer>

      <SkillsSection />
    </div>
  );
};

export default About;

