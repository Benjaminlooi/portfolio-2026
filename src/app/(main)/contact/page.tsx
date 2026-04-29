"use client";
import { motion } from "motion/react";

import MyPhoto from "@/components/my-photo";
import { SOCIAL_LINKS } from "@/lib/constants";
import ContactForm from "@/components/forms/contact-form";

import AnimationContainer from "@/components/animated/animated-container";
import { buildBreadcrumbListSchema } from "@/lib/seo/structured-data";
import { StructuredData } from "@/components/seo/StructuredData";

const Contact = () => {
  const breadcrumbSchema = buildBreadcrumbListSchema([
    { name: "Home", url: "https://www.benjaminlooi.dev" },
    { name: "Contact", url: "https://www.benjaminlooi.dev/contact" }
  ]);

  return (
    <>
      <StructuredData schema={breadcrumbSchema} />
      <div className="flex flex-col md:mt-20 items-center justify-center md:flex-row gap-8 mg:gap-6">
      <div className="space-y-4 text-center md:text-left">
        <MyPhoto className="w-32 lg:w-52 mx-auto md:mx-0" />

        <div className="max-w-2xl mx-auto md:py-3 space-y-2 md:space-y-4">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
            Contact Me
          </h1>

          <p className="text-sm text-gray-600 dark:text-gray-300">
            I&apos;m open to freelance, contract, or full-time remote roles.
            I&apos;m also open to
            relocation if the opportunity is right.{" "}
            <a
              href="mailto:hello@benjaminlooi.dev"
              className="font-medium text-blue-500 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 hover:underline decoration-2 underline-offset-2 transition-colors duration-200"
            >
              Email me directly
            </a>
            {" "}or{" "}
            <a
              href="https://cal.com/benjaminlooi"
              target="_blank"
              className="font-medium text-blue-500 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 hover:underline decoration-2 underline-offset-2 transition-colors duration-200"
            >
              book a call
            </a>
            .
          </p>

          <ul className="flex items-center justify-center md:justify-normal gap-2 md:gap-4">
            {SOCIAL_LINKS.map((link, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  type: "spring",
                  bounce: 0.3,
                  duration: 0.5,
                  delay: 0.1 + index * 0.1,
                }}
              >
                <a
                  href={link.href}
                  target="_blank"
                  className="block text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transform hover:scale-110 transition-all duration-200"
                  aria-label={`Connect on ${link.title}`}
                >
                  <link.icon className="w-5 h-5 object-contain aspect-square" />
                </a>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
      <AnimationContainer className="w-full">
        <ContactForm />
      </AnimationContainer>
    </div>
    </>
  );
};
export default Contact;
