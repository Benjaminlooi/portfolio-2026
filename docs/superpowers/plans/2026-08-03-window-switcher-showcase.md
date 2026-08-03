# Window Switcher Showcase Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a featured portfolio case study for the responsive same-app visual grid contributed to the Window Switcher Rust utility.

**Architecture:** Extend the existing project metadata model with a `desktop` project type and reuse the current software structured-data path for it. Add the showcase as an MDX content file, using a static WebP hero and the repository's real animated demonstration; no new route, global styling, or UI component is needed.

**Tech Stack:** Next.js 16, React 19, TypeScript, MDX, Jest, Next Image, FFmpeg/ImageMagick for asset preparation.

## Global Constraints

- Preserve the portfolio's existing dark palette, Poppins typography, project route, and Long Document MDX structure.
- Describe Window Switcher as an existing open-source utility that Benjamin extended; do not imply the entire utility was built from scratch.
- Use `type: "desktop"`, `featured: true`, and `date: "2026-08-03"`.
- Use only claims supported by the repository README, design specifications, or source structure.
- Derive all showcase imagery from `https://raw.githubusercontent.com/Benjaminlooi/window-switcher/main/assets/showcase.gif`.
- Do not invent performance metrics, testimonials, stock imagery, or interface chrome.
- Do not add dependencies or redesign existing production files.
- Run `pnpm check` before the final handoff.

---

## File Structure

- `src/lib/project.ts` — owns the project type union and the reusable software-project classification helper.
- `src/app/(main)/projects/[slug]/page.tsx` — consumes the classification helper when deciding whether to emit `SoftwareApplication` structured data.
- `tests/lib/project.test.ts` — verifies desktop classification and discovery of the new MDX metadata.
- `src/content/projects/window-switcher.mdx` — owns all showcase metadata and narrative content.
- `public/images/projects/window-switcher-demo.gif` — unchanged local copy of the project's real animated demonstration.
- `public/images/projects/window-switcher-hero.webp` — static 16:9 project-card and Open Graph hero derived from the demonstration.

---

### Task 1: Support Desktop Software Projects

**Files:**
- Create: `tests/lib/project.test.ts`
- Modify: `src/lib/project.ts:9-25`
- Modify: `src/app/(main)/projects/[slug]/page.tsx:15-23,130-144`

**Interfaces:**
- Consumes: Existing `ProjectType` metadata used by all project MDX files.
- Produces: `ProjectType` including `"desktop"`; `isSoftwareProjectType(type: ProjectType): boolean` for structured-data routing.

- [ ] **Step 1: Write the failing desktop classification test**

Create `tests/lib/project.test.ts`:

```typescript
import { isSoftwareProjectType } from "@/lib/project";

describe("isSoftwareProjectType", () => {
	 it("classifies desktop projects as software", () => {
		 expect(isSoftwareProjectType("desktop")).toBe(true);
	 });

	 it("does not classify packages as software applications", () => {
		 expect(isSoftwareProjectType("package")).toBe(false);
	 });
});
```

- [ ] **Step 2: Run the focused test and confirm the missing interface fails**

Run:

```bash
pnpm test -- tests/lib/project.test.ts --runInBand
```

Expected: FAIL because `isSoftwareProjectType` is not exported and `desktop` is not part of `ProjectType`.

- [ ] **Step 3: Add the desktop type and classification helper**

In `src/lib/project.ts`, replace the type declaration with:

```typescript
export type ProjectType =
	| "web"
	| "mobile"
	| "extension"
	| "desktop"
	| "package";
```

Add immediately after `ProjectMetadata`:

```typescript
export function isSoftwareProjectType(type: ProjectType): boolean {
	return ["web", "mobile", "extension", "desktop"].includes(type);
}
```

- [ ] **Step 4: Route structured data through the helper**

Add `isSoftwareProjectType` to the existing import from `@/lib/project` in `src/app/(main)/projects/[slug]/page.tsx`, then replace:

```typescript
if (type === "web" || type === "mobile" || type === "extension") {
```

with:

```typescript
if (isSoftwareProjectType(type)) {
```

- [ ] **Step 5: Run the focused test and type-aware quality check**

Run:

```bash
pnpm test -- tests/lib/project.test.ts --runInBand
pnpm check src/lib/project.ts 'src/app/(main)/projects/[slug]/page.tsx' tests/lib/project.test.ts
```

Expected: The two tests pass and Biome reports no errors.

- [ ] **Step 6: Commit the desktop project support**

```bash
git add src/lib/project.ts 'src/app/(main)/projects/[slug]/page.tsx' tests/lib/project.test.ts
git commit -m "feat: support desktop software projects"
```

---

### Task 2: Prepare Authentic Showcase Media

**Files:**
- Create: `public/images/projects/window-switcher-demo.gif`
- Create: `public/images/projects/window-switcher-hero.webp`

**Interfaces:**
- Consumes: The repository's 1920×1200 `assets/showcase.gif` demonstration.
- Produces: An unchanged local GIF for MDX and a 1920×1080 WebP frame for project cards and metadata.

- [ ] **Step 1: Download the real demonstration asset**

Run:

```bash
curl --fail --location --silent --show-error \
  https://raw.githubusercontent.com/Benjaminlooi/window-switcher/main/assets/showcase.gif \
  --output public/images/projects/window-switcher-demo.gif
```

Expected: The command exits successfully and writes a GIF of roughly 500 KB.

- [ ] **Step 2: Validate the downloaded animation before deriving the hero**

Run:

```bash
file public/images/projects/window-switcher-demo.gif
magick identify -format '%f %wx%h %m\n' public/images/projects/window-switcher-demo.gif[0]
```

Expected: `GIF image data` and `window-switcher-demo.gif 1920x1200 GIF`.

- [ ] **Step 3: Extract the visible grid frame and crop it to 16:9**

Run:

```bash
ffmpeg -y -ss 1.6 \
  -i public/images/projects/window-switcher-demo.gif \
  -vf 'crop=1920:1080:0:60' \
  -frames:v 1 -c:v libwebp -quality 82 \
  public/images/projects/window-switcher-hero.webp
```

Expected: The resulting frame shows the same-app window grid centered over the Windows desktop, without fabricated framing.

- [ ] **Step 4: Validate hero format, dimensions, and file size**

Run:

```bash
magick identify -format '%f %wx%h %m %b\n' public/images/projects/window-switcher-hero.webp
test "$(magick identify -format '%wx%h' public/images/projects/window-switcher-hero.webp)" = "1920x1080"
test "$(stat -f '%z' public/images/projects/window-switcher-hero.webp)" -lt 500000
```

Expected: `window-switcher-hero.webp 1920x1080 WEBP`, both assertions exit zero, and the file is under 500 KB.

- [ ] **Step 5: Visually inspect the extracted hero**

Open `public/images/projects/window-switcher-hero.webp` with the local image viewer. Confirm the overlay, selected preview card, readable app header, and Windows desktop context are visible and the crop does not cut through the overlay.

- [ ] **Step 6: Commit the showcase media**

```bash
git add public/images/projects/window-switcher-demo.gif public/images/projects/window-switcher-hero.webp
git commit -m "assets: add window-switcher showcase media"
```

---

### Task 3: Add the Window Switcher Case Study

**Files:**
- Modify: `tests/lib/project.test.ts`
- Create: `src/content/projects/window-switcher.mdx`

**Interfaces:**
- Consumes: `getProjectBySlug(slug: string): Promise<Project | null>`, the `desktop` metadata type, and both Task 2 media paths.
- Produces: `/projects/window-switcher`, automatically discovered by `getProjects()` and `generateStaticParams()`.

- [ ] **Step 1: Add a failing metadata discovery test**

Extend `tests/lib/project.test.ts`:

```typescript
import { getProjectBySlug, isSoftwareProjectType } from "@/lib/project";

describe("Window Switcher project", () => {
	it("loads the featured desktop project metadata", async () => {
		const project = await getProjectBySlug("window-switcher");

		expect(project).not.toBeNull();
		expect(project?.metadata).toMatchObject({
			title: "Window Switcher",
			type: "desktop",
			date: "2026-08-03",
			featured: true,
			image: "/images/projects/window-switcher-hero.webp",
			github: "https://github.com/Benjaminlooi/window-switcher",
		});
	});
});
```

Keep the existing `isSoftwareProjectType` describe block unchanged.

- [ ] **Step 2: Run the focused test and confirm the missing project fails**

Run:

```bash
pnpm test -- tests/lib/project.test.ts --runInBand
```

Expected: FAIL because `src/content/projects/window-switcher.mdx` does not exist and `getProjectBySlug()` returns `null`.

- [ ] **Step 3: Create the MDX project page**

Create `src/content/projects/window-switcher.mdx` with exactly this content:

````mdx
---
title: "Window Switcher"
description: "A Rust and Win32 utility I extended with a responsive visual grid for switching between windows of the same app with Alt+Backtick."
date: "2026-08-03"
type: "desktop"
stack: ["rust", "win32 api", "gdi+", "windows"]
slug: "window-switcher"
image: "/images/projects/window-switcher-hero.webp"
featured: true
link: ""
github: "https://github.com/Benjaminlooi/window-switcher"
---

## Overview

Windows makes it easy to move between applications with `Alt+Tab`, but moving among several windows from the same application is less direct. If I had multiple editor windows open, finding the right one meant cycling through everything or reaching for the taskbar.

[Window Switcher](https://github.com/Benjaminlooi/window-switcher) is an open-source Rust utility that adds customizable switching shortcuts to Windows. I extended the [original project](https://github.com/sigoden/window-switcher) with a responsive visual grid for its `Alt+Backtick` workflow, turning a basic same-app switcher into a preview-driven interface that remains usable as the window count grows.

## Designing the Interaction

The interaction stays keyboard-first. Hold Alt and press Backtick repeatedly to move through windows from the foreground application. Add Shift to move backward, release Alt to activate the selected window, or press Escape to cancel without changing focus.

The overlay also supports pointer actions. Clicking a card activates it, while a selected or hovered card exposes a close action. After a window closes, the remaining cards rebalance and selection moves to the nearest valid item.

![Window Switcher cycling between Visual Studio Code windows in its responsive preview grid](/images/projects/window-switcher-demo.gif)

## A Grid That Scales

A horizontal thumbnail strip works for two or three windows, but titles and previews quickly become unreadable. The new layout uses one row for small sets and two independently centered rows for larger sets, keeping card dimensions stable for up to ten windows.

When there are more than ten windows, the selection moves through pages of ten. The header still reports the position in the full list, so `11 of 14` remains meaningful even when only the current page is visible. The overlay is calculated against the active monitor's work area and DPI scale, keeping it inside the usable desktop at common display scales.

## Capturing Once, Repainting Fast

Each overlay session builds a model containing the window handle, title, source dimensions, and a cached preview. Selection changes repaint from that model instead of capturing every window again. This keeps rapid keyboard cycling separate from the more expensive capture step.

Preview rectangles are calculated with aspect-fit math, so portrait, square, and ultrawide windows are letterboxed rather than stretched. If a capture fails, the card falls back to a neutral frame with the shared app icon instead of aborting the switcher.

## Native Windows Edge Cases

The interface sits on top of several pieces of native Windows behavior: a low-level keyboard hook, foreground-window tracking, per-monitor work areas, DWM thumbnail capture, and GDI/GDI+ painting. Windows can be minimized, close externally while the overlay is open, or belong to a process running with different privileges.

The implementation treats those cases as ordinary state changes. Invalid handles are pruned before repaint or activation, minimized windows are restored when selected, and Escape retains the original foreground window. Cached bitmaps and icons are owned by the overlay session and released when that session ends, making native resource lifetimes explicit.

## What I Learned

The most useful boundary was separating pure layout math from platform state. Grid distribution, paging, traversal, hit testing, and aspect fitting can be reasoned about without a live desktop; enumeration, focus changes, captures, and GDI ownership stay in the Windows-facing layer.

I also learned that cancellation deserves the same attention as activation. Remembering the original foreground window and making Escape deterministic turned the overlay from a drawing exercise into an interaction that feels safe to use quickly.
````

- [ ] **Step 4: Run the focused test and confirm metadata discovery passes**

Run:

```bash
pnpm test -- tests/lib/project.test.ts --runInBand
pnpm check src/content/projects/window-switcher.mdx tests/lib/project.test.ts
```

Expected: All three project tests pass and Biome reports no errors.

- [ ] **Step 5: Confirm the project participates in automatic ordering**

Run:

```bash
node -e "const fs=require('fs'); const matter=require('gray-matter'); const p='src/content/projects/window-switcher.mdx'; const data=matter(fs.readFileSync(p,'utf8')).data; console.log(data.slug, data.date, data.type, data.featured)"
```

Expected output:

```text
window-switcher 2026-08-03 desktop true
```

- [ ] **Step 6: Commit the case study**

```bash
git add src/content/projects/window-switcher.mdx tests/lib/project.test.ts
git commit -m "feat: add window-switcher project showcase"
```

---

### Task 4: Full and Visual Verification

**Files:**
- Modify: None unless verification exposes a defect in the files from Tasks 1–3.

**Interfaces:**
- Consumes: The complete Window Switcher showcase and existing portfolio routes.
- Produces: Evidence that formatting, tests, static generation, project discovery, structured data, imagery, and responsive rendering work together.

- [ ] **Step 1: Run the full automated verification suite**

Run:

```bash
pnpm check
pnpm test -- --runInBand
pnpm build
```

Expected: All commands exit zero. The production build includes `/projects/window-switcher` in generated project parameters.

- [ ] **Step 2: Start the development server for visual review**

Run:

```bash
pnpm dev
```

Expected: Next.js starts successfully and prints a local URL, normally `http://localhost:3000`.

- [ ] **Step 3: Review the project listing**

Open `http://localhost:3000/projects` and confirm:

- Window Switcher appears first by the `2026-08-03` date.
- The hero fills the existing 16:9 card without distortion.
- The badge reads `desktop` and the GitHub action opens the correct repository.
- The description truncates cleanly without horizontal overflow.

- [ ] **Step 4: Review the showcase page across required widths**

Open `http://localhost:3000/projects/window-switcher` at viewport widths 320, 375, 414, 768, and 1440 pixels. Confirm:

- No viewport has horizontal scrolling.
- The WebP hero keeps the overlay visible and does not crop through it.
- The GIF animates and opens through the existing image lightbox.
- Headings, paragraphs, and links follow the existing project-page hierarchy.
- The GitHub action is keyboard reachable and has a visible focus state.
- The page labels the work as an extension of the original open-source project.

- [ ] **Step 5: Inspect project structured data**

On `/projects/window-switcher`, inspect the rendered JSON-LD scripts and confirm both `CreativeWork` and `SoftwareApplication` entries name `Window Switcher` and use the local hero's canonical absolute URL.

- [ ] **Step 6: Check the final diff and repository state**

Run:

```bash
git diff --check
git status --short
git log -4 --oneline
```

Expected: `git diff --check` is clean, no implementation files remain uncommitted, and the three implementation commits follow the design/plan documentation commits.
