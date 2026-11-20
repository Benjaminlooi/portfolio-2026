/** @jest-environment node */

import { execFileSync } from "node:child_process";
import { XMLParser, XMLValidator } from "fast-xml-parser";

describe("RSS feed", () => {
	it("generates valid XML with usable external and local image enclosures", () => {
		// Run in Node so the ESM feed package uses its real XML serializer.
		const xml = execFileSync(
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
});
