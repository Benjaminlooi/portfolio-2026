"use client";

// biome-ignore lint/style/useImportType: Jest JSX transform needs React in scope.
import React from "react";
import { FaGithub as GithubIcon } from "react-icons/fa6";
import { MdOpenInNew as OpenIcon } from "react-icons/md";
import { Button } from "@/components/ui/button";
import { trackProjectExternalClick } from "@/lib/posthog-analytics";

interface ProjectActionsProps {
	projectUrl?: string;
	githubUrl?: string;
	slug?: string;
	title?: string;
}

const ProjectActions: React.FC<ProjectActionsProps> = ({
	projectUrl,
	githubUrl,
	slug,
	title,
}) => {
	if (!projectUrl && !githubUrl) {
		return null;
	}

	const trackExternalClick = (target: "demo" | "github", url: string) => {
		if (!slug || !title) {
			return;
		}

		trackProjectExternalClick({
			slug,
			title,
			target,
			url,
		});
	};

	return (
		<div className="mt-5 flex flex-wrap gap-3">
			{projectUrl && (
				<Button asChild size="sm">
					<a
						href={projectUrl}
						target="_blank"
						rel="noreferrer"
						onClick={() => trackExternalClick("demo", projectUrl)}
					>
						<OpenIcon className="mr-2 h-4 w-4" />
						Visit project
					</a>
				</Button>
			)}
			{githubUrl && (
				<Button asChild variant="outline" size="sm">
					<a
						href={githubUrl}
						target="_blank"
						rel="noreferrer"
						onClick={() => trackExternalClick("github", githubUrl)}
					>
						<GithubIcon className="mr-2 h-4 w-4" />
						GitHub
					</a>
				</Button>
			)}
		</div>
	);
};

export default ProjectActions;
