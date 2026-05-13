"use client";

import { usePathname, useSearchParams } from "next/navigation";
import posthog from "posthog-js";
import { Suspense, useEffect } from "react";

function PostHogPageViewTracker() {
	const pathname = usePathname();
	const searchParams = useSearchParams();

	useEffect(() => {
		if (pathname) {
			let url = window.origin + pathname;
			if (searchParams?.toString()) {
				url = url + `?${searchParams.toString()}`;
			}
			posthog.capture("$pageview", { $current_url: url });
		}
	}, [pathname, searchParams]);

	return null;
}

export function PostHogPageView() {
	return (
		<Suspense fallback={null}>
			<PostHogPageViewTracker />
		</Suspense>
	);
}
