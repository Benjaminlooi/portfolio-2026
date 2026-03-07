import AnimationContainer from "../animated/animated-container";

const AboutMe = () => {
  return (
    <AnimationContainer className="w-full py-12 lg:py-16">
      <h2 className="mb-8 text-2xl font-bold tracking-tight text-center md:text-left text-white lg:text-start">
        About me
      </h2>

      <div className="w-full space-y-4 text-base font-normal leading-7 text-neutral-200">
        <p>
          I&apos;m a full-stack developer based in Southeast Asia with over 5
          years of experience building web and mobile products. Most recently, I
          designed and shipped a point-of-sale system for restaurants in
          Cambodia — solving real problems like dual-currency payments and
          offline-first ordering. I also built a bilingual tech consultancy
          platform with full English/Khmer support.
        </p>
        <p>
          I work primarily with TypeScript, React/Next.js, and Node.js. I care
          most about building things that actually get used by real people — not
          just demo projects.
        </p>
      </div>
    </AnimationContainer>
  );
};
export default AboutMe;
