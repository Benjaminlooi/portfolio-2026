# Window Switcher Showcase Design

## Summary

Add a featured project showcase for
[Window Switcher](https://github.com/Benjaminlooi/window-switcher) to the
portfolio. The showcase will present the project as an extension of an existing
open-source Rust utility and focus on Benjamin's responsive same-app window-grid
contribution rather than implying the utility was built from scratch.

The page will use the portfolio's existing project route, dark visual system,
Poppins typography, MDX rendering, and Long Document case-study structure. No
new page layout, global styling, or bespoke interactive component is required.

## Audience, Purpose, and Tone

- **Audience:** Recruiters, prospective clients, and technical peers.
- **Purpose:** Demonstrate both the usefulness of the finished Windows utility
  and the engineering behind the responsive Rust/Win32 overlay.
- **Tone:** Technical and utilitarian. The copy should be specific, concise, and
  candid about project provenance.

## Project Metadata

Create `src/content/projects/window-switcher.mdx` with this frontmatter:

- `title`: `"Window Switcher"`
- `description`: A concise description of the same-app visual switcher and the
  responsive grid contribution.
- `date`: `"2026-08-03"`
- `type`: `"desktop"`
- `stack`: `["rust", "win32 api", "gdi+", "windows"]`
- `slug`: `"window-switcher"`
- `image`: `"/images/projects/window-switcher-hero.webp"`
- `featured`: `true`
- `link`: `""`
- `github`: `"https://github.com/Benjaminlooi/window-switcher"`

The `desktop` type will be added to `ProjectType`. Desktop projects will also
qualify for the existing software-application structured data emitted by the
project route.

## Content Structure

The page will follow the portfolio's existing single-column MDX case-study
format.

### Overview

Introduce the everyday problem: Windows can switch between applications with
`Alt+Tab`, but moving quickly among several windows of the same application is
less direct. Explain that the project uses `Alt+Backtick` for this workflow and
that Benjamin extended the open-source utility with a responsive visual grid.

### Designing the Interaction

Describe the keyboard-first interaction model:

- Hold Alt and press Backtick repeatedly to move forward.
- Add Shift to move backward.
- Release Alt to activate the selection.
- Press Escape to cancel without changing windows.
- Use pointer quick actions to activate or close a window.

Avoid presenting the optional app-level `Alt+Tab` feature as Benjamin's main
contribution.

### A Grid That Scales

Explain the one- or two-row layout for up to ten windows, independently centered
rows, and ten-window paging for larger sets. Emphasize readable titles, stable
card sizing, and monitor-bound layout rather than reproducing every row-count
rule from the repository specification.

### Capturing Once, Repainting Fast

Explain that window previews are captured once per overlay session, cached, and
reused while selection changes. Cover aspect-fit rendering and neutral fallbacks
for failed captures. Do not claim measured performance numbers that are not
present in the repository.

### Native Windows Edge Cases

Summarize the native constraints that shaped the implementation: Win32 keyboard
hooks, DPI scaling, per-monitor work areas, minimized or externally closed
windows, theme-aware painting, and explicit GDI/GDI+ resource ownership.

### What I Learned

Close with a brief first-person reflection on separating pure layout math from
platform state, treating cancellation as a first-class interaction, and making
resource lifetimes explicit in native UI work.

## Visual Assets

Use the repository's real `assets/showcase.gif` as the source of truth.

- Create `public/images/projects/window-switcher-demo.gif` from the source asset
  without altering its animation.
- Extract a frame in which the same-app overlay is visible, crop it to a 16:9
  composition, and encode it as
  `public/images/projects/window-switcher-hero.webp`.
- Use the WebP as the project-card and page hero image.
- Embed the local GIF once in the MDX article with descriptive alt text.

The showcase will not invent interface chrome, metrics, testimonials, or stock
imagery.

## Code Changes

- Create `src/content/projects/window-switcher.mdx`.
- Create `public/images/projects/window-switcher-hero.webp`.
- Create `public/images/projects/window-switcher-demo.gif`.
- Modify `src/lib/project.ts` to include `desktop` in `ProjectType`.
- Modify `src/app/(main)/projects/[slug]/page.tsx` so desktop projects emit the
  existing software-application schema.
- Add a focused test proving the new project metadata is discoverable and
  correctly typed.
- Do not delete or redesign existing production files.

## Error Handling and Fallbacks

- If a useful GIF frame cannot be extracted, use the clearest available frame
  without adding fabricated UI.
- If the animated GIF fails to render through the existing MDX image component,
  keep the static WebP in the article rather than introducing a new media
  component solely for this showcase.
- Keep `link` empty because the repository has no release under Benjamin's
  account; the GitHub action remains the primary external link.

## Verification

1. Add the metadata test before the implementation and confirm it initially
   fails for the missing project/type.
2. Run the focused test after implementation.
3. Run `pnpm check`.
4. Run the complete Jest suite with `pnpm test -- --runInBand`.
5. Run `pnpm build` and confirm `/projects/window-switcher` is generated.
6. Review the projects listing and showcase page at desktop and mobile widths,
   checking image crop, animated media, content hierarchy, external links, and
   the absence of horizontal overflow.

## Acceptance Criteria

- The project appears as a featured, dated desktop project in the portfolio.
- The showcase clearly distinguishes the upstream utility from Benjamin's
  responsive-grid contribution.
- All technical claims are supported by the repository README, design specs, or
  source structure.
- The hero is a crisp 16:9 WebP derived from the real demonstration.
- The project page links to the correct GitHub repository and has valid software
  structured data.
- Formatting, tests, production build, and responsive visual review pass.
