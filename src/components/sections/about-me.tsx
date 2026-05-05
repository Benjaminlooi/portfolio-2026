import AnimationContainer from "../animated/animated-container";

const AboutMe = () => {
  return (
    <AnimationContainer className="w-full py-12 lg:py-16">
      <h2 className="mb-8 text-2xl font-bold tracking-tight text-center md:text-left text-white lg:text-start">
        About me
      </h2>

      <div className="w-full space-y-4 text-base font-normal leading-7 text-neutral-200">
        <p>
          I&apos;m a software engineer with 5+ years of experience building enterprise HR and POS systems. I spent my early career in Malaysia working across React, Vue, Node.js, and Laravel, where I recently led a major frontend migration to a Nuxt.js monorepo and built out complex shift management engines.
        </p>
        <p>
          I recently relocated to Cambodia and have been building independently to solve local problems. I'm currently developing a dual-currency POS system for the local restaurant market, alongside a bilingual community cat welfare platform integrated with KHQR donations.
        </p>

        <p>
          My current day-to-day stack is primarily TypeScript, React, and Next.js.
        </p>
      </div>
    </AnimationContainer>
  );
};
export default AboutMe;
