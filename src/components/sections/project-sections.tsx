import Link from "next/link";
import { getProjects } from "@/lib/project";
import { cn } from "@/lib/utils";
import AnimationContainer from "../animated/animated-container";
import ProjectCard from "../project-card";
import { buttonVariants } from "../ui/button";

const ProjectsSection = async () => {
	const allProjects = await getProjects();
	const selectedSlugs = ["baguette-pos", "eco-garden-cats", "wole"];
	const projects = selectedSlugs.flatMap((slug) =>
		allProjects.filter((project) => project.slug === slug),
	);
	return (
		<AnimationContainer className="w-full py-12 lg:py-16">
			<h2 className="mb-8 text-2xl font-bold tracking-tight text-center text-white lg:text-start">
				Selected work
			</h2>

			<p className="w-full text-base font-normal leading-7 text-left text-neutral-200">
				Business software, community tools, and a networking utility — built
				around the constraints of the people using them.
			</p>
			<div className="grid grid-cols-1 gap-3 py-6 lg:py-10 sm:grid-cols-2 lg:grid-cols-3">
				{projects.map((project) => (
					<ProjectCard key={project.slug} project={project} />
				))}
			</div>
			<div className="flex justify-center w-full">
				<Link
					href="/projects"
					className={cn(
						buttonVariants({ size: "lg" }),
						"mx-auto rounded-full text-center",
					)}
				>
					View all projects
				</Link>
			</div>
		</AnimationContainer>
	);
};
export default ProjectsSection;
