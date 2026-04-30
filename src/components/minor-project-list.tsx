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
