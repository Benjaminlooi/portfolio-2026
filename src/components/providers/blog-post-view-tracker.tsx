"use client";

import { useEffect } from "react";
import { trackBlogPostView } from "@/lib/posthog-analytics";

interface BlogPostViewTrackerProps {
	slug: string;
	title: string;
	tags?: string[];
}

export function BlogPostViewTracker({
	slug,
	title,
	tags,
}: BlogPostViewTrackerProps) {
	useEffect(() => {
		trackBlogPostView({ slug, title, tags });
	}, [slug, title, tags]);

	return null;
}
