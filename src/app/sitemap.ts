import { MetadataRoute } from "next";
import { generateSitemap } from "@/lib/seo/sitemap";

/**
 * Next.js sitemap route
 * Generates XML sitemap with priority and changeFrequency for search engines
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return await generateSitemap();
}
