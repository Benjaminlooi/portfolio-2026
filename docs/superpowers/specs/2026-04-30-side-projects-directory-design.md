# Side Projects Directory Design Spec

## Overview
Add a section to the bottom of the main `/projects` page to list minor side projects, experiments, and smaller tools that do not warrant a full, dedicated MDX case study page. This maintains the visual impact of featured projects while providing a comprehensive history of other work.

## Approach
A clean, scannable vertical list ("Other Projects") appended below the main `ProjectCard` grid on `src/app/(main)/projects/page.tsx`.

## Data Structure
We will store the data as a static array in `src/lib/constants.ts` (or a dedicated `src/lib/minor-projects.ts` if `constants.ts` is too large).

```typescript
export interface MinorProject {
  title: string;
  description: string;
  link?: string;
  github?: string;
  stack?: string[];
}

export const MINOR_PROJECTS: MinorProject[] = [
  // Example data
  {
    title: "Example Mini Tool",
    description: "A tiny script to do a specific thing.",
    github: "https://github.com/benjaminlooi/example",
    stack: ["TypeScript", "Node.js"]
  }
];
```

## Component UI: `MinorProjectList`
We will create a new component (e.g., `src/components/minor-project-list.tsx`) to render this data.

**Visual Layout:**
*   **Container:** A vertical flex column with subtle borders between items.
*   **Row Item (Desktop):**
    *   Left: `title` (bold) and `description` (subtle text) stacked vertically.
    *   Middle: `stack` rendered as small, subtle pills or comma-separated text.
    *   Right: Icon links for `github` and/or `link` (live site).
*   **Row Item (Mobile):** Stacked layout (Title/Description on top, Stack tags below, Links at the bottom or top right).
*   **Interactivity:** A subtle background color change on row hover to make it feel clickable and interactive.

## Integration
In `src/app/(main)/projects/page.tsx`:
1.  Add a visual separator or spacing below the main grid.
2.  Add an `AnimatedTitle` with the text "Other Projects" or "Experiments".
3.  Render the new `MinorProjectList` component, passing it the `MINOR_PROJECTS` array.

## Review & Testing
*   Ensure responsiveness (mobile, tablet, desktop).
*   Ensure dark/light mode compatibility (using Tailwind classes like `dark:hover:bg-neutral-800`).
*   Verify links open in new tabs (`target="_blank" rel="noopener noreferrer"`).
