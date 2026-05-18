# PostHog Recruiter Intent Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add privacy-conscious PostHog tracking for recruiter and hiring-manager intent.

**Architecture:** Keep visitors anonymous until contact form submission, then use the existing `identifyUser` flow. Add typed analytics helpers in `src/lib/posthog-analytics.ts`, then wire client-side tracker components into project and blog detail pages plus high-intent external links.

**Tech Stack:** Next.js App Router, React client components, PostHog JS, Jest, Testing Library.

---

### Task 1: Typed Recruiter Intent Helpers

**Files:**
- Modify: `src/lib/posthog-analytics.ts`
- Create: `tests/lib/posthog-analytics.test.ts`

- [ ] **Step 1: Write failing tests**

```ts
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

		expect(posthog.capture).toHaveBeenNthCalledWith("profile_link_click", {
			platform: "linkedin",
			url: "https://linkedin.com/in/benjaminlooi/",
			location: "links_page",
		});
		expect(posthog.capture).toHaveBeenNthCalledWith("resume_download", {
			location: "links_page",
			url: "/resume_2026.pdf",
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

		expect(posthog.capture).toHaveBeenNthCalledWith("blog_post_view", {
			slug: "tailwindcss-v4-breaks-coding-ai-agents",
			title: "Tailwind CSS v4 breaks coding AI agents",
			tags: ["tailwind", "ai"],
		});
		expect(posthog.capture).toHaveBeenNthCalledWith("hire_intent_signal", {
			score: 8,
			signals: ["resume_download", "github_click"],
		});
	});
});
```

- [ ] **Step 2: Run tests to verify failure**

Run: `pnpm test tests/lib/posthog-analytics.test.ts --runInBand`

Expected: FAIL because the new helper functions are not exported.

- [ ] **Step 3: Add helper types and functions**

Add typed wrappers around `posthog.capture` for recruiter-intent events:

```ts
export type ProfilePlatform = "linkedin" | "github" | "cal" | "email" | "x" | "website";
export type ProjectExternalTarget = "demo" | "github";

export function trackProjectView(props: {
	slug: string;
	title: string;
	type?: string;
}) {
	posthog.capture("project_view", props);
}
```

Repeat for `trackProjectExternalClick`, `trackProfileLinkClick`, `trackResumeDownload`, `trackBlogPostView`, and `trackHireIntentSignal`.

- [ ] **Step 4: Run tests to verify pass**

Run: `pnpm test tests/lib/posthog-analytics.test.ts --runInBand`

Expected: PASS.

### Task 2: Wire Project And Blog Detail Views

**Files:**
- Create: `src/components/providers/project-view-tracker.tsx`
- Create: `src/components/providers/blog-post-view-tracker.tsx`
- Modify: `src/app/(main)/projects/[slug]/page.tsx`
- Modify: `src/app/(main)/blog/[slug]/page.tsx`
- Modify: `src/components/project-actions.tsx`
- Modify: `tests/components/project-actions.test.tsx`

- [ ] **Step 1: Write failing component tests**

Add a test that clicks the live project and GitHub links, then expects `trackProjectExternalClick` to be called with `target: "demo"` and `target: "github"`.

- [ ] **Step 2: Run test to verify failure**

Run: `pnpm test tests/components/project-actions.test.tsx --runInBand`

Expected: FAIL because `ProjectActions` does not call the tracker.

- [ ] **Step 3: Implement project action tracking and view trackers**

Pass `slug` and `title` into `ProjectActions`, call `trackProjectExternalClick` from link `onClick`, and mount `ProjectViewTracker` / `BlogPostViewTracker` once per detail page.

- [ ] **Step 4: Run tests**

Run: `pnpm test tests/components/project-actions.test.tsx tests/lib/posthog-analytics.test.ts --runInBand`

Expected: PASS.

### Task 3: Wire Profile Links, Resume Downloads, And Contact Start

**Files:**
- Modify: `src/components/social-link.tsx`
- Modify: `src/components/links.tsx`
- Modify: `src/app/(main)/contact/page.tsx`
- Modify: `src/components/forms/contact-form.tsx`

- [ ] **Step 1: Add focused tests if the components already have test coverage**

No existing tests cover these components. Keep implementation scoped and verify with typecheck/lint/build.

- [ ] **Step 2: Implement high-intent link tracking**

Add optional tracking props to `SocialLink`, pass platform metadata from `Links`, track contact-page social links, track direct email/book-a-call clicks, and capture `contact_form_started` once when a user first focuses a form field.

- [ ] **Step 3: Verify the full change**

Run: `pnpm test --runInBand`

Run: `pnpm check`

Expected: PASS for both commands.
