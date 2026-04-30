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
