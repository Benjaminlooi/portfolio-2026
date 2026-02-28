import AnimationContainer from "../animated/animated-container";

const AboutMe = () => {
  return (
    <AnimationContainer className="w-full py-12 lg:py-16">
      <h2 className="mb-8 text-2xl font-bold tracking-tight text-center md:text-left text-white lg:text-start">
        About me
      </h2>

      <p className="w-full text-base font-normal leading-7 text-justify text-neutral-200">
        Hi, I&apos;m Benjamin Looi! I&apos;m a passionate Full Stack Developer
        with over 5 years of experience in building scalable and
        high-performance web applications. Proficient in JavaScript, React,
        Vue.js, Angular, Node.js, and Laravel, with a strong foundation in both
        front-end and back-end development. Adept at designing intuitive,
        responsive user interfaces while ensuring seamless integration with
        backend systems and cloud-based infrastructure. Experienced in
        optimizing performance, managing deployments with AWS and Vercel, and
        leading development teams in agile environments. Passionate about
        problem-solving, code quality, and staying ahead of the latest industry
        trends.
      </p>
    </AnimationContainer>
  );
};
export default AboutMe;
