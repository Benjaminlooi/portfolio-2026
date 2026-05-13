# Full SEO Audit: benjaminlooi.dev

Analyzed: 2026-05-13  
Primary URL: https://www.benjaminlooi.dev  
Business type: personal portfolio, software engineer, technical blog, project showcase

## Executive Summary

SEO health score: 79/100

The site has a strong baseline: HTTPS, canonical `www` host, crawlable pages, generated sitemap and robots.txt, descriptive page metadata, structured data, RSS, static rendering for core routes, and good topical breadth across portfolio/projects/blog content.

The main SEO risk is not index blocking. It is quality drift: duplicate blog H1s, inaccurate sitemap `lastmod`, stale indexed legacy blog URLs returning 404, incomplete/relative structured-data image URLs, and heavy project image assets. These issues can weaken search result titles, reduce crawl trust, waste old authority, and hurt page experience.

## Evidence Checked

- Live homepage headers: `200`, Vercel, HTTPS, HSTS, `x-content-type-options: nosniff`, `x-frame-options: SAMEORIGIN`, prerendered homepage.
- Apex host: `https://benjaminlooi.dev` redirects to `https://www.benjaminlooi.dev/`.
- Live robots.txt: allows `/`, disallows `/api/` and `/_next/`, lists sitemap, explicitly allows GPTBot, PerplexityBot, and anthropic-ai.
- Live sitemap: 23 URLs, including homepage, core pages, 12 blog posts, and 6 project pages.
- Production build: passed with Next.js 16.1.6.
- Lint: failed because `jsdoc/require-jsdoc` is configured without a loaded `jsdoc` plugin.
- Search visibility: Google has current `www` results and older `blog.benjaminlooi.dev` results indexed.

## Priority Findings

### High

1. Blog posts render duplicate top-level headings.

The live Tailwind v4 article shows the article title twice as `#` content. Source cause: the blog template renders an `<h1>` and MDX content can also begin with an H1. This can dilute page structure, create accessibility noise, and give Google competing prominent title signals.

Fix: enforce one H1 per article. Prefer the template H1 and normalize MDX content so article bodies start at `##`, or transform the first MDX H1 into hidden/removed content during rendering.

2. Legacy `blog.benjaminlooi.dev` URLs are indexed but now return 404.

Search results still include old blog subdomain URLs. A checked old blog URL returned `404` with `DEPLOYMENT_NOT_FOUND`. If those posts moved into `/blog/...`, this loses historical equity and creates bad search experiences.

Fix: add 301 redirects from old encoded paths to current canonical post URLs. For removed posts, serve a useful custom 410 or redirect to the closest relevant article.

3. Sitemap `lastmod` is unreliable for blog and static pages.

The live sitemap showed many blog/static URLs with the deployment timestamp `2026-05-13T06:17:44Z`, not the actual article publish/update dates. In source, blog sitemap generation reads `data.date`, while blog frontmatter uses `publishedAt`; static pages always use `new Date()`.

Fix: use `publishedAt` and `lastModified` for blog posts, `date`/`lastModified` for projects, and stable explicit dates for static pages. Omit `lastmod` when you cannot assert a real content update.

4. Structured-data image URLs can be relative on blog posts.

`BlogPosting` schema receives `metadata.image` directly. Several posts use local image paths such as `/images/blogs/...`, which are not absolute URLs in JSON-LD. Some validators tolerate this poorly.

Fix: normalize all schema image values to absolute `https://www.benjaminlooi.dev/...` URLs before emitting JSON-LD.

5. SEO QA is blocked by lint configuration.

`pnpm lint` fails before checking code because ESLint references `jsdoc/require-jsdoc` without the `eslint-plugin-jsdoc` plugin being registered/installed.

Fix: install/configure `eslint-plugin-jsdoc`, or remove/disable the JSDoc rules. This should be fixed before treating SEO metadata/schema changes as safely testable.

### Medium

6. Large image assets create page-experience risk.

`public/images` is about 23 MB; `public/images/projects` is about 22 MB. The largest files include `eco-garden-hero.png` at 4.7 MB, several project screenshots around 1-2.3 MB, and `wole.png` around 719 KB.

Fix: convert large PNG screenshots to AVIF/WebP, resize to the actual rendered max width, and add explicit `sizes` to `AnimatedImage` usage so Next can pick smaller variants.

7. `/links` is live but absent from the sitemap and lacks canonical/OG metadata.

The build includes `/links`, but the sitemap does not. Its metadata is minimal and does not use the shared SEO metadata generator.

Fix: decide whether `/links` should rank. If yes, add canonical/Open Graph metadata and include it in the sitemap. If no, add `noindex, follow`.

8. Duplicate `WebSite` JSON-LD appears possible on the homepage.

The root layout emits `WebSite` schema globally, and the homepage also emits another `WebSite` schema. Duplicate schema is usually not fatal, but it adds noise.

Fix: keep one sitewide `WebSite` schema in the root layout and use `Person`/`ProfilePage`-style schema on the homepage.

9. `llms.txt` is not present.

Robots.txt explicitly allows several AI crawlers, but there is no `llms.txt` endpoint. This is optional, but useful for AI-search/GEO readability on a portfolio with technical writing.

Fix: add `/llms.txt` with concise site purpose, key pages, author identity, canonical blog/project URLs, and preferred citation guidance.

### Low

10. Several older technical articles could use freshness notes.

Older Ubuntu, Gatsby, Nuxt, MongoDB, and Terminator posts may still rank for long-tail queries, but some reference old versions. Add "tested on" notes, update dates when materially revised, and point readers to newer equivalent docs when applicable.

11. External image dependencies are used for several blog OG/hero images.

Unsplash URLs work today, but relying on third-party image URLs for important social/search previews is less stable than locally hosted optimized assets.

Fix: download/license-safe hero images, optimize, and serve them from the site.

## Category Scores

- Technical SEO: 18/22
- Content quality: 17/23
- On-page SEO: 16/20
- Schema / structured data: 7/10
- Performance / CWV readiness: 7/10
- AI search readiness: 7/10
- Images: 4/5

Weighted total: 79/100

## What Is Working Well

- Core pages and detail pages are statically rendered or SSG where appropriate.
- Canonical URLs are generated for main pages, blog posts, and project pages.
- Robots.txt is permissive for search crawlers and lists the XML sitemap.
- Sitemap includes the important public portfolio, project, and blog URLs.
- Page titles and meta descriptions are generally descriptive and query-relevant.
- Blog and project pages include related-content modules, improving internal discovery.
- HTTPS, HSTS, `nosniff`, and `SAMEORIGIN` are present.
- RSS feed route exists and builds.
- Project pages include `CreativeWork` and conditional `SoftwareApplication` schema.

## Limitations

This audit used live fetches, search result inspection, headers, sitemap/robots checks, and repository analysis. It did not include authenticated Google Search Console data, CrUX origin field data, or a full Lighthouse/PageSpeed lab run.

## Source References

- Homepage search snapshot: https://www.benjaminlooi.dev/
- Live article snapshot showing duplicate H1: https://www.benjaminlooi.dev/blog/tailwindcss-v4-breaks-coding-ai-agents
- Google canonicalization guidance: https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls
- Google title-link guidance: https://developers.google.com/search/docs/advanced/appearance/good-titles-snippets
- Google Core Web Vitals guidance: https://developers.google.com/search/docs/appearance/core-web-vitals
- Google robots.txt guidance: https://developers.google.com/search/docs/crawling-indexing/robots/robots_txt
