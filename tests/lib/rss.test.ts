/** @jest-environment node */

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { XMLParser, XMLValidator } from "fast-xml-parser";
import matter from "gray-matter";

describe("RSS feed", () => {
	let xml: string;
	beforeAll(() => {
		// Run in Node so the ESM feed package uses its real XML serializer.
		xml = execFileSync(
			process.execPath,
			[
				"--experimental-strip-types",
				"--input-type=module",
				"-e",
				'import { generateRSSFeed } from "./src/lib/seo/rss.ts"; process.stdout.write(await generateRSSFeed());',
			],
			{
				cwd: process.cwd(),
				encoding: "utf8",
				stdio: ["ignore", "pipe", "pipe"],
			},
		);
	});

	it("generates valid XML with usable external and local image enclosures", () => {
		expect(XMLValidator.validate(xml)).toBe(true);
		const feed = new XMLParser({ ignoreAttributes: false }).parse(xml);
		const enclosures = feed.rss.channel.item.map(
			(item: { enclosure: Record<string, string> }) => item.enclosure,
		);
		expect(enclosures).toContainEqual({
			"@_url":
				"https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=1200&h=630&fit=crop",
			"@_length": "0",
			"@_type": "image/jpeg",
		});
		expect(enclosures).toContainEqual({
			"@_url": "https://www.benjaminlooi.dev/images/og-default.png",
			"@_length": "0",
			"@_type": "image/png",
		});
	});

	it("uses each post's publication date and lists the newest posts first", () => {
		const blogDir = path.join(process.cwd(), "src/content/blogs");
		const expectedPosts = fs
			.readdirSync(blogDir)
			.filter((file) => file.endsWith(".mdx"))
			.map((file) => {
				const { data } = matter(
					fs.readFileSync(path.join(blogDir, file), "utf8"),
				);
				return {
					link: `https://www.benjaminlooi.dev/blog/${file.replace(/\.mdx$/, "")}`,
					pubDate: new Date(data.publishedAt).toUTCString(),
				};
			})
			.sort((a, b) => Date.parse(b.pubDate) - Date.parse(a.pubDate))
			.slice(0, 20);
		const feed = new XMLParser().parse(xml);
		expect(
			feed.rss.channel.item.map((item: { link: string; pubDate: string }) => ({
				link: item.link,
				pubDate: item.pubDate,
			})),
		).toEqual(expectedPosts);
	});
});
