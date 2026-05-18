import type React from "react";
import { FaGithub as GithubIcon } from "react-icons/fa6";
import { MdOpenInNew as OpenIcon } from "react-icons/md";
import { Button } from "@/components/ui/button";

interface ProjectActionsProps {
	projectUrl?: string;
	githubUrl?: string;
}

const ProjectActions: React.FC<ProjectActionsProps> = ({
	projectUrl,
	githubUrl,
}) => {
	if (!projectUrl && !githubUrl) {
		return null;
	}

	return (
		<div className="mt-5 flex flex-wrap gap-3">
			{projectUrl && (
				<Button asChild size="sm">
					<a href={projectUrl} target="_blank" rel="noreferrer">
						<OpenIcon className="mr-2 h-4 w-4" />
						Visit project
					</a>
				</Button>
			)}
			{githubUrl && (
				<Button asChild variant="outline" size="sm">
					<a href={githubUrl} target="_blank" rel="noreferrer">
						<GithubIcon className="mr-2 h-4 w-4" />
						GitHub
					</a>
				</Button>
			)}
		</div>
	);
};

export default ProjectActions;
