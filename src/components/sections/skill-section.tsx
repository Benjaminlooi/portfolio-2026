"use client";

import { SKILLS } from "@/lib/constants";
import AnimationContainer from "../animated/animated-container";
import {
  Code2,
  Layout,
  Layers,
  Component,
  Palette,
  Smartphone,
  Server,
  Database,
  Cloud,
  Wrench,
  Shield,
  LucideIcon,
} from "lucide-react";

// Icon mapping
const iconMap: Record<string, LucideIcon> = {
  Code2,
  Layout,
  Layers,
  Component,
  Palette,
  Smartphone,
  Server,
  Database,
  Cloud,
  Wrench,
  Shield,
};

const SkillsSection = () => {
  return (
    <AnimationContainer className="w-full py-12">
      <div className="mb-10">
        <h2 className="text-3xl font-bold tracking-tight text-white lg:text-4xl">
          Skills & Technologies
        </h2>
        <p className="mt-3 text-base text-neutral-400 max-w-2xl">
          Technologies I&apos;ve used professionally — in enterprise products,
          independent projects, and everything in between.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {SKILLS?.map(({ title, icon, stacks }, index) => {
          const IconComponent = iconMap[icon];
          return (
            <AnimationContainer
              key={title}
              customDelay={0.1 + index * 0.05}
              className="group"
            >
              <div className="h-full p-5 rounded-xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-sm hover:bg-white/[0.06] hover:border-primary/30 transition-all duration-300">
                {/* Category Header */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors duration-300">
                    {IconComponent && <IconComponent size={20} />}
                  </div>
                  <h3 className="text-lg font-semibold text-white">{title}</h3>
                </div>

                {/* Skills */}
                <div className="flex flex-wrap gap-2">
                  {stacks.map((stack) => (
                    <span
                      key={stack}
                      className="px-2.5 py-1 text-xs font-medium rounded-full bg-white/[0.06] text-neutral-300 border border-white/[0.08] hover:bg-primary/10 hover:text-primary hover:border-primary/30 transition-all duration-200 cursor-default"
                    >
                      {stack}
                    </span>
                  ))}
                </div>
              </div>
            </AnimationContainer>
          );
        })}
      </div>
    </AnimationContainer>
  );
};

export default SkillsSection;
