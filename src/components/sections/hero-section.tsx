"use client";

import AnimationContainer from "../animated/animated-container";
import { buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

// import { RiSpeakLine as SpeakIcon } from "react-icons/ri";
import MyPhoto from "../my-photo";
import { SparklesIcon } from "lucide-react";
import { trackCTAClick } from "@/lib/posthog-analytics";

const Hero = () => {
  const handleContactClick = () => {
    trackCTAClick("contact_me", "hero_section");
  };

  const handleResumeClick = () => {
    trackCTAClick("download_resume", "hero_section");
  };

  return (
    <div className="relative flex flex-col-reverse items-center justify-between w-full py-12 lg:py-16 lg:flex-row">
      <AnimationContainer className="flex flex-col items-center justify-between max-w-lg lg:items-start p-0 lg:pr-8 space-y-2">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium">
          <SparklesIcon size={16} />
          Available for new remote opportunities
        </div>

        <div className="py-2 lg:py-3">
          <h1 className=" text-xl font-bold text-white sm:text-5xl lg:text-6xl">
            Benjamin Looi
          </h1>

          <p className="text-sm text-white/80">雷廷铮</p>
        </div>
        <h3 className="text-base text-center lg:text-start lg:text-lg text-white/80">
          <span className="font-medium text-white">Fullstack developer </span>
          from Malaysia 🇲🇾
        </h3>
        <div className="flex items-center gap-2 py-4">
          <Link
            href="/contact"
            className={cn(buttonVariants(), "rounded-full")}
            onClick={handleContactClick}
          >
            Contact Me
          </Link>
          <a
            href="resume_2025.1.pdf"
            download
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              buttonVariants({ variant: "outline" }),
              "rounded-full"
            )}
            onClick={handleResumeClick}
          >
            Download Resume
          </a>
        </div>
      </AnimationContainer>

      <div className="mb-8 relative lg:mb-0">
        <MyPhoto />
        <div className="absolute block w-44 h-44 rounded-full md:hidden top-0 left-0 right-1/2 -z-10 bg-violet-500/40 blur-[5rem]"></div>
      </div>
    </div>
  );
};

export default Hero;

