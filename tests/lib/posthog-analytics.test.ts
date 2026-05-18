jest.mock("posthog-js", () => ({
	capture: jest.fn(),
	identify: jest.fn(),
}));

import posthog from "posthog-js";
import {
	trackBlogPostView,
	trackHireIntentSignal,
	trackProfileLinkClick,
	trackProjectExternalClick,
	trackProjectView,
	trackResumeDownload,
} from "@/lib/posthog-analytics";

describe("PostHog recruiter intent helpers", () => {
	beforeEach(() => {
		jest.clearAllMocks();
		window.sessionStorage.clear();
	});

	it("captures project views with hiring context", () => {
		trackProjectView({
			slug: "open-resume",
			title: "Open Resume",
			type: "web",
		});

		expect(posthog.capture).toHaveBeenCalledWith("project_view", {
			slug: "open-resume",
			title: "Open Resume",
			type: "web",
		});
	});

	it("captures project external clicks", () => {
		trackProjectExternalClick({
			slug: "open-resume",
			title: "Open Resume",
			target: "github",
			url: "https://github.com/Benjaminlooi/open-resume",
		});

		expect(posthog.capture).toHaveBeenCalledWith("project_external_click", {
			slug: "open-resume",
			title: "Open Resume",
			target: "github",
			url: "https://github.com/Benjaminlooi/open-resume",
		});
	});

	it("captures high-intent profile and resume actions", () => {
		trackProfileLinkClick({
			platform: "linkedin",
			url: "https://linkedin.com/in/benjaminlooi/",
			location: "links_page",
		});
		trackResumeDownload({ location: "links_page", url: "/resume_2026.pdf" });

		expect(posthog.capture).toHaveBeenNthCalledWith(1, "profile_link_click", {
			platform: "linkedin",
			url: "https://linkedin.com/in/benjaminlooi/",
			location: "links_page",
		});
		expect(posthog.capture).toHaveBeenNthCalledWith(2, "resume_download", {
			location: "links_page",
			url: "/resume_2026.pdf",
		});
	});

	it("captures a hire intent signal when anonymous behavior crosses the threshold", () => {
		trackResumeDownload({ location: "hero_section", url: "/resume_2026.pdf" });
		trackProfileLinkClick({
			platform: "github",
			url: "https://github.com/benjaminlooi",
			location: "footer_socials",
		});

		expect(posthog.capture).toHaveBeenNthCalledWith(3, "hire_intent_signal", {
			score: 9,
			signals: ["resume_download", "github_click"],
		});
	});

	it("captures blog views and synthetic hiring intent signals", () => {
		trackBlogPostView({
			slug: "tailwindcss-v4-breaks-coding-ai-agents",
			title: "Tailwind CSS v4 breaks coding AI agents",
			tags: ["tailwind", "ai"],
		});
		trackHireIntentSignal({
			score: 8,
			signals: ["resume_download", "github_click"],
		});

		expect(posthog.capture).toHaveBeenNthCalledWith(1, "blog_post_view", {
			slug: "tailwindcss-v4-breaks-coding-ai-agents",
			title: "Tailwind CSS v4 breaks coding AI agents",
			tags: ["tailwind", "ai"],
		});
		expect(posthog.capture).toHaveBeenNthCalledWith(2, "hire_intent_signal", {
			score: 8,
			signals: ["resume_download", "github_click"],
		});
	});
});
