/**
 * PostHog Analytics Utility
 *
 * Centralized helper functions for tracking custom events.
 * These provide type-safe, consistent event tracking across the app.
 */
import posthog from "posthog-js";

export type ProfilePlatform =
	| "linkedin"
	| "github"
	| "cal"
	| "email"
	| "x"
	| "website";
export type ProjectExternalTarget = "demo" | "github";

const HIRE_INTENT_SCORE_KEY = "posthog_hire_intent_score";
const HIRE_INTENT_SIGNALS_KEY = "posthog_hire_intent_signals";
const HIRE_INTENT_CAPTURED_KEY = "posthog_hire_intent_captured";
const HIRE_INTENT_THRESHOLD = 8;

function getSessionStorage() {
	if (typeof window === "undefined") {
		return null;
	}

	return window.sessionStorage;
}

function recordHireIntent(signal: string, points: number) {
	const storage = getSessionStorage();

	if (!storage) {
		return;
	}

	const currentScore = Number(storage.getItem(HIRE_INTENT_SCORE_KEY) ?? "0");
	const currentSignals = JSON.parse(
		storage.getItem(HIRE_INTENT_SIGNALS_KEY) ?? "[]",
	) as string[];
	const nextSignals = currentSignals.includes(signal)
		? currentSignals
		: [...currentSignals, signal];
	const nextScore = currentSignals.includes(signal)
		? currentScore
		: currentScore + points;

	storage.setItem(HIRE_INTENT_SCORE_KEY, String(nextScore));
	storage.setItem(HIRE_INTENT_SIGNALS_KEY, JSON.stringify(nextSignals));

	if (
		nextScore >= HIRE_INTENT_THRESHOLD &&
		storage.getItem(HIRE_INTENT_CAPTURED_KEY) !== "true"
	) {
		storage.setItem(HIRE_INTENT_CAPTURED_KEY, "true");
		trackHireIntentSignal({
			score: nextScore,
			signals: nextSignals,
		});
	}
}

/**
 * Track CTA button clicks
 */
export function trackCTAClick(
	ctaName: string,
	location: string,
	additionalProps?: Record<string, unknown>,
) {
	posthog.capture("cta_click", {
		cta_name: ctaName,
		location,
		...additionalProps,
	});
}

/**
 * Track social link clicks
 */
export function trackSocialClick(platform: string, url: string) {
	posthog.capture("social_link_click", {
		platform,
		url,
	});
}

/**
 * Track scroll depth milestones
 */
export function trackScrollDepth(
	percentage: number,
	pageType: "blog" | "project" | "page",
	pagePath: string,
) {
	posthog.capture("scroll_depth", {
		percentage,
		page_type: pageType,
		page_path: pagePath,
	});
}

/**
 * Identify user after form submission
 * This links anonymous events to a known user
 */
export function identifyUser(email: string, name: string) {
	posthog.identify(email, {
		email,
		name,
		identified_at: new Date().toISOString(),
	});
}

/**
 * Track contact form submission
 */
export function trackContactFormSubmit(
	additionalProps?: Record<string, unknown>,
) {
	posthog.capture("contact_form_submitted", {
		...additionalProps,
	});
}

/**
 * Track blog post read completion
 */
export function trackBlogReadComplete(slug: string, title: string) {
	posthog.capture("blog_read_complete", {
		slug,
		title,
	});
}

/**
 * Track project detail views as recruiter proof-of-work signals.
 */
export function trackProjectView(props: {
	slug: string;
	title: string;
	type?: string;
}) {
	posthog.capture("project_view", props);
	recordHireIntent("project_view", 2);
}

/**
 * Track clicks from a project to its live demo or source code.
 */
export function trackProjectExternalClick(props: {
	slug: string;
	title: string;
	target: ProjectExternalTarget;
	url: string;
}) {
	posthog.capture("project_external_click", props);
	recordHireIntent(
		props.target === "github" ? "project_github_click" : "project_demo_click",
		3,
	);
}

/**
 * Track external profile links that are meaningful for hiring evaluation.
 */
export function trackProfileLinkClick(props: {
	platform: ProfilePlatform;
	url: string;
	location: string;
}) {
	posthog.capture("profile_link_click", props);

	const pointsByPlatform: Record<ProfilePlatform, number> = {
		linkedin: 4,
		github: 4,
		cal: 5,
		email: 5,
		x: 1,
		website: 1,
	};

	recordHireIntent(`${props.platform}_click`, pointsByPlatform[props.platform]);
}

/**
 * Track resume downloads without identifying the visitor.
 */
export function trackResumeDownload(props: { location: string; url: string }) {
	posthog.capture("resume_download", props);
	recordHireIntent("resume_download", 5);
}

/**
 * Track technical writing views as evidence of recruiter/content interest.
 */
export function trackBlogPostView(props: {
	slug: string;
	title: string;
	tags?: string[];
}) {
	posthog.capture("blog_post_view", props);
	recordHireIntent("blog_post_view", 1);
}

/**
 * Track a synthetic high-intent event once anonymous behavior crosses a threshold.
 */
export function trackHireIntentSignal(props: {
	score: number;
	signals: string[];
}) {
	posthog.capture("hire_intent_signal", props);
}

/**
 * Track when a visitor starts the contact form before they identify themselves.
 */
export function trackContactFormStarted() {
	posthog.capture("contact_form_started");
	recordHireIntent("contact_form_started", 6);
}
