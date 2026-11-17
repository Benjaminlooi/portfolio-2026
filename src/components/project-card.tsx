// icons
// import { RiNpmjsLine as NpmIcon } from "react-icons/ri";

import Link from "next/link";
import {
	// FaMobileScreenButton as MobileIcon,
	// FaChrome as ChromeIcon,
	// FaGlobe as WebIcon,
	FaGithub as GithubIcon,
} from "react-icons/fa6";
import { MdOpenInNew as OpenIcon } from "react-icons/md";
import type { ProjectMetadata } from "@/lib/project";
import { formatDate } from "@/lib/utils";
import AnimationContainer from "./animated/animated-container";
// import Image from "next/image";
import AnimatedImage from "./animated/animated-image";
import { Badge } from "./ui/badge";

interface Props {
	project: ProjectMetadata;
}

// const ProjectIcon: React.FC<{ type: Project["type"] }> = ({ type }) => {
//   switch (type) {
//     case "extension":
//       return <ChromeIcon />;
//     case "mobile":
//       return <MobileIcon />;
//     case "package":
//       return <NpmIcon />;
//     case "web":
//       return <WebIcon />;
//     default:
//       return <WebIcon />;
//   }
// };

const ProjectCard: React.FC<Props> = ({ project }) => {
	return (
		<AnimationContainer className="h-full">
			<div className="flex h-full w-full flex-col gap-2 md:gap-4 group border backdrop-blur border-white/10 rounded-2xl p-4">
				<div className="relative shrink-0 rounded-2xl overflow-hidden">
					<Badge className="absolute bottom-2 left-2 uppercase">
						{project.type}
					</Badge>
					<div className="absolute flex items-center gap-2 top-2 right-2 z-10 ">
						{/* <ProjectIcon type={project.type} /> */}
						{project.link && (
							<a
								href={project.link}
								aria-label={`Visit ${project.title} (opens in a new tab)`}
								target="_blank"
								rel="noreferrer"
								className="p-4 bg-black/10 rounded-full backdrop-blur hover:bg-black/30 transition-all"
							>
								<OpenIcon />
							</a>
						)}
						{project.github && (
							<a
								href={project.github}
								aria-label={`View ${project.title} on GitHub (opens in a new tab)`}
								target="_blank"
								rel="noreferrer"
								className="p-4 bg-black/10 rounded-full backdrop-blur hover:bg-black/30 transition-all"
							>
								<GithubIcon />
							</a>
						)}
					</div>
					<Link href={`/projects/${project.slug}`}>
						<AnimatedImage
							src={project.image}
							alt={project.title}
							width={960}
							height={480}
							sizes="(min-width: 640px) 50vw, 100vw"
							layout
							layoutId={`project-image-${project.slug}`}
							className="aspect-video"
							// className=" w-full aspect-video h-full object-cover object-top "
						/>
					</Link>
					{/* <div className="overlay" /> */}
				</div>
				<div className="space-y-2">
					<Link href={`/projects/${project.slug}`}>
						<h3 className="font-semibold group-hover:underline group-hover:text-primary transition-all tracking-tight mt-1 text-base md:text-xl">
							{project.title}
						</h3>
					</Link>
					<time className="font-sans text-xs">{formatDate(project.date)}</time>
					<div className="hidden font-sans text-xs underline print:visible" />
					<div className="prose max-w-full text-pretty font-sans text-sm leading-relaxed text-neutral-300 prose-invert">
						<p>{project.description}</p>
					</div>
				</div>
				<div className=" flex flex-wrap gap-2">
					{project.stack.map((stack) => (
						<Badge
							key={stack}
							className="bg-white/10 capitalize hover:bg-white/20 backdrop-blur"
						>
							{stack}
						</Badge>
					))}
				</div>
				<Link
					href={`/projects/${project.slug}`}
					className="mt-auto inline-flex self-start items-center gap-2 rounded text-sm font-medium text-primary underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4"
					aria-label={`Read case study: ${project.title}`}
				>
					Read case study <span aria-hidden="true">→</span>
				</Link>
			</div>
		</AnimationContainer>
	);
};
export default ProjectCard;
