"use client";

import { useEffect } from "react";
import { trackProjectView } from "@/lib/posthog-analytics";

interface ProjectViewTrackerProps {
	slug: string;
	title: string;
	type?: string;
}

export function ProjectViewTracker({
	slug,
	title,
	type,
}: ProjectViewTrackerProps) {
	useEffect(() => {
		trackProjectView({ slug, title, type });
	}, [slug, title, type]);

	return null;
}
