"use client";

import Link from "next/link";
// import { AiOutlineCopyrightCircle as CopyIcon } from "react-icons/ai";

import { SOCIAL_LINKS } from "@/lib/constants";
import Logo from "./logo";
import AnimationContainer from "./animated/animated-container";
import { trackSocialClick } from "@/lib/posthog-analytics";

const Footer = () => {
  // const date = new Date();
  return (
    <AnimationContainer>
      <footer className="w-full bg-background border-t border-white/10">
        <div className="max-w-5xl xl:max-w-5xl mx-auto space-y-2 py-10 flex flex-col gap-4 md:flex-row justify-between items-center">
          <div className="md:w-[337px]">
            <Link href="/" className="flex items-center gap-2">
              <Logo />
              <p className="text-2xl font-bold text-white">Benjamin Looi</p>
            </Link>
          </div>
          <div className="flex gap-6 items-center text-xl">
            {SOCIAL_LINKS?.slice(1)?.map((social, index) => (
              <a
                key={index}
                href={social?.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white md:h-12  md:w-12  h-10 w-10 text-sm md:text-base aspect-square flex items-center justify-center hover:border-sky-500 rounded-full border md:border-2 transition-all hover:text-sky-500 hover:scale-110"
                title={`Follow me on ${social?.title}`}
                onClick={() => trackSocialClick(social?.title, social?.href)}
              >
                <social.icon />
              </a>
            ))}
          </div>
          <div className="md:text-sm text-xs w-full md:w-auto text-center">
            Made with ❤️ by{" "}
            <a
              href="https://www.linkedin.com/in/benjaminlooi/"
              rel="noreferrer"
              target="_blank"
              className="font-semibold text-sky-500"
              onClick={() =>
                trackSocialClick("LinkedIn", "https://www.linkedin.com/in/benjaminlooi/")
              }
            >
              Benjamin Looi
            </a>
            .
          </div>
        </div>
      </footer>
    </AnimationContainer>
  );
};

export default Footer;

