# Side Projects Directory Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a clean, scannable vertical list ("Other Projects") to the bottom of the main `/projects` page for minor side projects.

**Architecture:** We will define a `MINOR_PROJECTS` array in `src/lib/constants.ts`. A new `MinorProjectList` component will render this array as a styled vertical list. This component will be appended to the bottom of the `Projects` page layout.

**Tech Stack:** React, Next.js (App Router), Tailwind CSS, Lucide React (or react-icons).

---

### Task 1: Add Minor Projects Data Structure

**Files:**
- Modify: `src/lib/constants.ts`

- [ ] **Step 1: Write the minimal implementation**
Append the `MinorProject` interface and `MINOR_PROJECTS` array to the end of the file.

```typescript
export interface MinorProject {
  title: string;
  description: string;
  link?: string;
  github?: string;
  stack?: string[];
}

export const MINOR_PROJECTS: MinorProject[] = [
  {
    title: "Example Mini Tool",
    description: "A tiny script to do a specific thing.",
    github: "https://github.com/benjaminlooi/example",
    stack: ["TypeScript", "Node.js"]
  },
  {
    title: "Old Portfolio",
    description: "My previous personal website built in 2021.",
    link: "https://old.benjaminlooi.dev",
    stack: ["Gatsby", "React"]
  }
];
```

- [ ] **Step 2: Commit**
```bash
git add src/lib/constants.ts
git commit -m "feat(data): add minor projects data structure"
```

---

### Task 2: Create `MinorProjectList` Component

**Files:**
- Create: `src/components/minor-project-list.tsx`

- [ ] **Step 1: Write minimal implementation**
Create the component using Tailwind for styling. It will iterate over the passed array.

```tsx
import Link from "next/link";
import { BsGithub as GithubIcon } from "react-icons/bs";
import { ExternalLink } from "lucide-react";
import { MinorProject } from "@/lib/constants";

interface MinorProjectListProps {
  projects: MinorProject[];
}

export default function MinorProjectList({ projects }: MinorProjectListProps) {
  if (!projects || projects.length === 0) return null;

  return (
    <div className="flex flex-col border-t border-neutral-200 dark:border-neutral-800">
      {projects.map((project, index) => (
        <div
          key={index}
          className="group flex flex-col sm:flex-row sm:items-center justify-between py-4 border-b border-neutral-200 dark:border-neutral-800 transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-900/50 px-2 -mx-2 rounded-md"
        >
          <div className="flex flex-col sm:w-1/2 mb-2 sm:mb-0">
            <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">
              {project.title}
            </h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
              {project.description}
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between sm:w-1/2">
            <div className="flex flex-wrap gap-2 mb-3 sm:mb-0">
              {project.stack?.map((tech, techIndex) => (
                <span
                  key={techIndex}
                  className="text-xs font-medium text-neutral-500 dark:text-neutral-400 bg-neutral-100 dark:bg-neutral-800 px-2 py-1 rounded-md"
                >
                  {tech}
                </span>
              ))}
            </div>
            
            <div className="flex items-center gap-4">
              {project.github && (
                <Link
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100 transition-colors"
                  aria-label={`${project.title} GitHub repository`}
                >
                  <GithubIcon className="w-5 h-5" />
                </Link>
              )}
              {project.link && (
                <Link
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100 transition-colors"
                  aria-label={`${project.title} live site`}
                >
                  <ExternalLink className="w-5 h-5" />
                </Link>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
```

- [ ] **Step 2: Commit**
```bash
git add src/components/minor-project-list.tsx
git commit -m "feat(ui): create minor project list component"
```

---

### Task 3: Integrate into Projects Page

**Files:**
- Modify: `src/app/(main)/projects/page.tsx`

- [ ] **Step 1: Write the minimal implementation**
Import and add the component at the bottom.

```tsx
import AnimationContainer from "@/components/animated/animated-container";
import AnimatedTitle from "@/components/animated/animated-title";
import ProjectCard from "@/components/project-card";
import MinorProjectList from "@/components/minor-project-list";
import { getProjects } from "@/lib/project";
import { MINOR_PROJECTS } from "@/lib/constants";
import { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo/metadata";
import { buildBreadcrumbListSchema } from "@/lib/seo/structured-data";
import { StructuredData } from "@/components/seo/StructuredData";

export const metadata: Metadata = generatePageMetadata(
  {
    title: "Projects - Benjamin Looi",
    description: "Explore my portfolio of web applications, browser extensions, and open source contributions. Built with React, TypeScript, Next.js, and modern web technologies.",
  },
  "/projects"
);

const Projects = async () => {
  const projects = await getProjects();
  
  const breadcrumbSchema = buildBreadcrumbListSchema([
    { name: "Home", url: "https://www.benjaminlooi.dev" },
    { name: "Projects", url: "https://www.benjaminlooi.dev/projects" }
  ]);

  return (
    <div>
      <StructuredData schema={breadcrumbSchema} />
      <AnimatedTitle title="Projects" />
      <AnimationContainer>
        <p className="w-full text-base font-normal leading-7 text-justify text-neutral-200">
          Projects I&apos;ve designed and shipped — from enterprise POS systems
          to community platforms and developer tools.
        </p>
        <div className="grid grid-cols-1 gap-3 py-6 lg:py-10 sm:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </AnimationContainer>

      <div className="mt-10 lg:mt-16">
        <AnimatedTitle title="Other Projects" />
        <AnimationContainer>
          <div className="mt-6">
            <MinorProjectList projects={MINOR_PROJECTS} />
          </div>
        </AnimationContainer>
      </div>
    </div>
  );
};
export default Projects;
```

- [ ] **Step 2: Commit**
```bash
git add "src/app/(main)/projects/page.tsx"
git commit -m "feat(pages): integrate minor projects list into projects page"
```