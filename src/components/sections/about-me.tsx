import AnimationContainer from "../animated/animated-container";

const AboutMe = () => {
  return (
    <AnimationContainer className="w-full py-12 lg:py-16">
      <h2 className="mb-8 text-2xl font-bold tracking-tight text-center md:text-left text-white lg:text-start">
        About me
      </h2>

      <div className="w-full space-y-4 text-base font-normal leading-7 text-neutral-200">
        <p>
          I&apos;ve spent the past 5+ years as a software engineer at
          tech companies in Malaysia, building enterprise HR and POS
          systems — from React and Vue frontends to Node.js and Laravel
          backends. At my last role, I led a major frontend migration to a
          Nuxt.js monorepo, built complex features like shift management
          systems, and mentored junior developers.
        </p>
        <p>
          I recently moved to Cambodia and have been building independently
          — a dual-currency POS system for the local restaurant market and
          a community cat welfare platform with KHQR donations and bilingual
          support. I work primarily with TypeScript, React, and Next.js.
        </p>
      </div>
    </AnimationContainer>
  );
};
export default AboutMe;
