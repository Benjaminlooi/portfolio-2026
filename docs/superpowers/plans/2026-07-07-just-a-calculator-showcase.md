# Just a Calculator Showcase Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create a new project showcase page for the browser extension "Just a Calculator" inside the personal portfolio site.

**Architecture:** Add an MDX project page under `src/content/projects/just-a-calculator.mdx` and place the generated hero banner in the `public/images/projects/` directory.

**Tech Stack:** Next.js (App Router), MDX, Tailwind CSS, TypeScript.

## Global Constraints
- **Type**: Must be `type: "extension"`.
- **Featured status**: Must be `featured: true`.
- **Formatting**: Biome formatter is used. Runs of `pnpm check` must pass cleanly.

---

### Task 1: Asset Preparation & Image Setup

**Files:**
- Create: `public/images/projects/just-a-calculator-hero.jpg`

**Interfaces:**
- Consumes: `/Users/ben/.gemini/antigravity/brain/c3b7edf4-6e83-4df9-aa67-375d1e991f19/just_a_calculator_hero_1783358883162.jpg` (generated banner)
- Produces: Web-accessible hero banner asset at `public/images/projects/just-a-calculator-hero.jpg`

- [ ] **Step 1: Copy the generated hero banner from artifacts**
  
  Run: `cp /Users/ben/.gemini/antigravity/brain/c3b7edf4-6e83-4df9-aa67-375d1e991f19/just_a_calculator_hero_1783358883162.jpg /Users/ben/ghq/github.com/Benjaminlooi/portfolio-2026/public/images/projects/just-a-calculator-hero.jpg`

- [ ] **Step 2: Verify the file exists and is readable**

  Run: `ls -lh /Users/ben/ghq/github.com/Benjaminlooi/portfolio-2026/public/images/projects/just-a-calculator-hero.jpg`
  Expected: File exists and size matches ~100-500 KB.

- [ ] **Step 3: Commit the asset**

  Run:
  ```bash
  git add public/images/projects/just-a-calculator-hero.jpg
  git commit -m "assets: add just-a-calculator project showcase hero image"
  ```

---

### Task 2: Create Project Showcase MDX Page

**Files:**
- Create: `src/content/projects/just-a-calculator.mdx`

**Interfaces:**
- Consumes: `public/images/projects/just-a-calculator-hero.jpg`
- Produces: Structured project page at `/projects/just-a-calculator` parsed by Next.js app router.

- [ ] **Step 1: Create the MDX project page file**

  Create file `/Users/ben/ghq/github.com/Benjaminlooi/portfolio-2026/src/content/projects/just-a-calculator.mdx` with the following content:
  ```markdown
  ---
  title: "Just a Calculator"
  description: "A satirical browser extension built with WXT and React 19 that rewrites AI hype back to reality, one text node at a time."
  date: "2026-07-06"
  type: "extension"
  stack: ["wxt", "react", "typescript", "vanilla css"]
  slug: "just-a-calculator"
  image: "/images/projects/just-a-calculator-hero.jpg"
  featured: true
  link: ""
  github: "https://github.com/Benjaminlooi/calculator2"
  ---

  ## Overview

  In 2026, every application is "AI-powered," every SaaS startup is an "AI company," and every basic database search or text template is branded as "artificial intelligence." 

  **Just a Calculator** is a satirical browser extension designed to restore sanity to the web. It replaces every instance of the word "AI" (and its associated buzzwords) with "Calculator" (or other deflating alternatives) on the websites you visit. Because, when you strip away the marketing, that is exactly what they are: calculators.

  ## Under the Hood: DOM walking with TreeWalker

  To perform text replacement without breaking the web pages you visit, the content script targets text nodes exclusively. Instead of parsing the entire HTML string, the extension walks the page's DOM using `document.createTreeWalker` with `NodeFilter.SHOW_TEXT`.

  It explicitly filters out elements whose text should never be edited:
  - **Inputs and editable content**: `INPUT`, `TEXTAREA`, and anything with `isContentEditable` set to true. Swapping text inside these would break forms.
  - **Scripts and styles**: `SCRIPT`, `STYLE`, `TEMPLATE`, and `SVG` to avoid breaking page behavior or styling.
  - **Code blocks**: `CODE`, `PRE`, and `KBD` to ensure development code examples are left untouched.

  ```typescript
  const SKIP_TAGS = new Set([
    'SCRIPT', 'STYLE', 'NOSCRIPT', 'IFRAME', 'OBJECT', 
    'TEXTAREA', 'INPUT', 'SELECT', 'OPTION', 'TEMPLATE', 
    'SVG', 'CODE', 'PRE', 'KBD', 'TITLE', 'META'
  ]);
  ```

  For each matching text node, a casing-aware helper applies regex replacement rules to swap terms like `ChatGPT` for `Chat Calc` or `machine learning` for `memorizing`, preserving lowercase, uppercase, and title-case matching.

  ## Handling Dynamic Content with MutationObserver

  Modern single-page applications (SPAs) and infinite-scrolling pages (like Twitter/X, Gmail, or Slack) render content dynamically long after the initial page load. 

  To handle this without constantly re-scanning the page, the extension registers a `MutationObserver`. The observer watches for added or modified nodes, running only those newly updated tree segments through the DOM-walking replacer, maintaining near-zero CPU overhead.

  ## Optimization: Storage Throttling & Reactive Popup

  Synchronizing data dynamically between a content script and the extension's popup UI can quickly degrade performance if done naively. 

  To prevent blocking the browser's main thread:
  1. **Throttled Local Sync**: The extension keeps a running tally of "hype terms removed" in memory. Instead of saving to `chrome.storage.local` on every match, updates are batched and written every 1.5 seconds, or immediately when navigating away from the page using the `pagehide` event listener.
  2. **Reactive UI State**: The popup is built using **React 19** and **WXT's Storage API**. It watches the extension storage reactively using `storage.watch`, updating the popup counter in real-time as you browse.
  3. **Feature Toggle**: A toggle switch lets users temporarily disable the extension, which immediately stops content script execution on subsequent page loads and dims the popup UI dynamically.

  ## Project Summary

  - ** Satirical Premise**: Replaces the term "AI" with "Calculator" and other hype terms with humorous alternatives (e.g., `neural network` &rarr; `tangled wire`).
  - **WXT Extension Framework**: Built on a modern web extension framework enabling cross-browser builds (Chrome, Firefox).
  - **High Performance**: Optimized with low-overhead TreeWalking, MutationObserver targeting, and batched storage writes.
  - **Modern UI**: A responsive, toggleable popup built with React 19 and vanilla CSS.
  ```

- [ ] **Step 2: Commit the new MDX file**

  Run:
  ```bash
  git add src/content/projects/just-a-calculator.mdx
  git commit -m "feat: add just-a-calculator project showcase MDX page"
  ```

---

### Task 3: Quality Checks & Build Verification

**Files:**
- Modify: None

**Interfaces:**
- Consumes: Existing project structure and new showcase page.
- Produces: Clean Biome validation check and successful Next.js build.

- [ ] **Step 1: Run code quality checks**

  Run: `pnpm check`
  Expected: Clean check with no formatting or linting errors.

- [ ] **Step 2: Run production website build**

  Run: `pnpm build`
  Expected: Next.js build compiles successfully with the new project page included in static generation.
