# SEO Action Plan

## Critical

None found. The site is crawlable, indexable, served over HTTPS, and the primary canonical host redirects correctly.

## High Priority

1. Fix duplicate H1s on blog posts.
   - Keep the template `<h1>`.
   - Convert first MDX H1s to `##` or strip the first MDX H1 during rendering.
   - Rebuild and verify one H1 per post.

2. Redirect legacy `blog.benjaminlooi.dev` URLs.
   - Map old encoded blog paths to current `/blog/{slug}` URLs.
   - Use 301 redirects.
   - Submit updated URLs in Search Console after deployment.

3. Correct sitemap `lastmod`.
   - Blog: use `lastModified || publishedAt`.
   - Projects: use `lastModified || date`.
   - Static pages: use stable manually maintained dates or omit `lastmod`.

4. Normalize JSON-LD image URLs.
   - Add a helper like `absoluteUrl(pathOrUrl)`.
   - Apply it to `BlogPosting`, `CreativeWork`, `SoftwareApplication`, and `Person` image fields.

5. Restore lint as an SEO quality gate.
   - Install/register `eslint-plugin-jsdoc`, or remove the JSDoc rules.
   - Re-run `pnpm lint`.

## Medium Priority

6. Compress and resize heavy project images.
   - Convert large PNGs to AVIF/WebP.
   - Target sub-300 KB for listing/card images where possible.
   - Add `sizes` wherever `AnimatedImage` is used.

7. Decide the indexation policy for `/links`.
   - If it should rank: add canonical/OG metadata and add it to the sitemap.
   - If it is only a social landing page: add `noindex, follow`.

8. Reduce duplicate schema noise.
   - Keep one root `WebSite` schema.
   - Use `Person` and optionally `ProfilePage`/`AboutPage` style schema on relevant pages.

9. Add `/llms.txt`.
   - Include author identity, site summary, canonical blog/project lists, and contact/social references.

## Low Priority

10. Add freshness notes to old technical posts.
    - Mark old OS/framework versions clearly.
    - Add updated alternatives where the advice has changed.

11. Localize third-party blog/social images.
    - Host stable optimized versions locally.
    - Keep attribution metadata where required.

## Verification Checklist

- `pnpm build`
- `pnpm lint`
- Fetch `/robots.txt` and `/sitemap.xml`
- Validate one representative blog post in Rich Results Test or Schema Markup Validator
- Check old blog URLs return 301 to current URLs
- Run PageSpeed Insights for homepage, `/blog`, one blog post, and one project page
