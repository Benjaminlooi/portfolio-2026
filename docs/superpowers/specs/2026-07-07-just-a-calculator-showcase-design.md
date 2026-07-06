# Design Doc: "Just a Calculator" Showcase Page

Design spec for adding a project showcase page for the new browser extension **Just a Calculator** inside the portfolio.

## Overview
A personal portfolio project showcase page highlighting "Just a Calculator" — a satirical browser extension built with WXT, React 19, TypeScript, and Vanilla CSS. The page combines a humorous, satirical overview of the extension's purpose with a professional technical breakdown of how it's built and optimized.

---

## Frontmatter & Core Configuration

- **File Path**: `[just-a-calculator.mdx](file:///Users/ben/ghq/github.com/Benjaminlooi/portfolio-2026/src/content/projects/just-a-calculator.mdx)`
- **Metadata**:
  - `title`: "Just a Calculator"
  - `description`: "A satirical browser extension built with WXT and React 19 that rewrites AI hype back to reality, one text node at a time."
  - `date`: "2026-07-06"
  - `type`: "extension"
  - `stack`: ["wxt", "react", "typescript", "vanilla css"]
  - `slug`: "just-a-calculator"
  - `image`: "/images/projects/just-a-calculator-hero.webp"
  - `featured`: true
  - `link`: ""
  - `github`: "https://github.com/Benjaminlooi/calculator2"

---

## Structure of the Showcase Page

The page will be structured using MDX headings:

### 1. Overview & The Satirical Hook
- Introduce the core joke of the extension: rewriting AI hype (like "AI", "machine learning", "neural network") to "Calculator", "memorizing", and "tangled wire" respectively.
- Emphasize the irony of using modern 2026 web-extension technology to clean up the hype cycle.

### 2. Under the Hood: High-Performance DOM Rewriting
- Explain how we target text nodes cleanly: using `document.createTreeWalker` to extract only `SHOW_TEXT` nodes, bypassing elements like `SCRIPT`, `STYLE`, `INPUT`, `TEXTAREA` to prevent breaking web application input logic.
- Discuss how we preserve casing (e.g., lower, uppercase, or title case) dynamically based on the matched term (e.g., `AI -> Calculator`, `ai -> calculator`).

### 3. Dynamic DOM Tracking (MutationObserver)
- Discuss the extension's behavior in single-page applications (SPAs) and infinite-scrolling pages (like Twitter/X or Gmail).
- Detail how a `MutationObserver` listens for newly added or modified nodes, running them through the rewrite pipeline immediately.

### 4. Optimization: Throttled Sync and Reactive Popup
- Explain the storage synchronization challenge: writing to `chrome.storage.local` on every DOM replacement degrades browser performance.
- Detail the solution: batching the counter increments in memory and flushing to local storage on a `1.5` second interval, as well as on page unload (`pagehide` listener).
- Cover the React 19 popup UI: using WXT's reactive `storage.watch` API to update the scoreboard in real-time, and rendering a custom on/off toggle switch.

---

## Assets & Images
- A custom hero image is generated at: `/images/projects/just-a-calculator-hero.webp`.
- The image displays a clean dark-mode web window showcasing the extension popup with the `AI -> Calculator` translation and a retro neon calculator graphic in the center.

---

## Verification Plan
1. **Lint and Format**: Run `pnpm check` to ensure Biome styles are maintained.
2. **Build Success**: Run `pnpm build` to confirm the MDX page parses and does not break the Next.js site generation.
3. **Visual Review**: Access the project listing page to confirm that the card render displays the correct categories (categorized under "extension" and "featured").
