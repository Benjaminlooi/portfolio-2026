# Benjamin Looi Portfolio (2026)

This project is a high-performance personal portfolio and technical blog built with modern web technologies. It prioritizes SEO, performance, and a polished user experience with smooth animations and discovery-driven content.

## Project Overview

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router, Turbopack)
- **UI Library**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with [Radix UI](https://www.radix-ui.com/) primitives
- **Animations**: [Motion](https://www.motion.dev/) (formerly Framer Motion)
- **Content**: MDX-based blogging and project showcase using `next-mdx-remote` and `gray-matter`.
- **Search**: Client-side fuzzy search powered by [Fuse.js](https://fusejs.io/).
- **Analytics**: [PostHog](https://posthog.com/) for user behavior and custom event tracking.
- **Tooling**: [Biome](https://biomejs.dev/) for lightning-fast linting and formatting.

## Building and Running

### Development
```bash
pnpm dev
```
Starts the development server with Turbopack enabled.

### Testing
```bash
pnpm test          # Run tests
pnpm test:watch    # Watch mode
pnpm test:coverage # Coverage report
```
Uses Jest and React Testing Library.

### Quality Checks
```bash
pnpm check  # Lint, format, and check for errors
pnpm format # Apply formatting
pnpm lint   # Run linter
```
Biome is used for all code quality tasks. **Always run `pnpm check` before committing changes.**

### Production Build
```bash
pnpm build
pnpm start
```

## Directory Structure

- `src/app`: App Router pages, layouts, and API routes.
- `src/components`: React components organized by category (UI, Sections, Blog, etc.).
- `src/content`: MDX files for blogs and projects.
- `src/lib`: Utilities, content fetching logic, and SEO helpers.
- `src/actions`: Server actions (e.g., contact form submission).
- `src/styles`: Global CSS and Tailwind configuration.
- `public`: Static assets, including images and resumes.

## Development Conventions

### Content Management
- **Blogs**: Located in `src/content/blogs`. Frontmatter is validated via Zod (see `src/lib/seo/validation.ts`).
- **Projects**: Located in `src/content/projects`. Support for featured status and categorization.
- **Related Content**: A custom similarity engine (`src/lib/blog.ts` and `src/lib/project.ts`) automatically links related posts and projects based on tags and metadata.

### Styling & Theme
- Uses Tailwind CSS with CSS variables (HSL) for theme consistency.
- Dark mode is supported (checked via `dark:` utility classes).
- Typography is handled via `@tailwindcss/typography` for MDX content.

### SEO & Performance
- **High Priority**: SEO is a core pillar. Refer to `ACTION-PLAN.md` and `FULL-AUDIT-REPORT.md` for current SEO status and required improvements.
- **Structured Data**: JSON-LD is generated dynamically for blogs, projects, and the home page.
- **Image Optimization**: Next.js `Image` component is used extensively. High-impact images should be optimized (WebP/AVIF).

### Code Standards
- **Biome**: Follows recommended Biome rules. Tab indentation is preferred.
- **TypeScript**: Strict mode is enabled. Use explicit types where possible.
- **Components**: Prefer small, focused components in `src/components/ui` for reusability.
