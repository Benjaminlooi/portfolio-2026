import { getProjectBySlug, isSoftwareProjectType } from "@/lib/project";

describe("isSoftwareProjectType", () => {
	it("classifies desktop projects as software", () => {
		expect(isSoftwareProjectType("desktop")).toBe(true);
	});

	it("does not classify packages as software applications", () => {
		expect(isSoftwareProjectType("package")).toBe(false);
	});
});

describe("Window Switcher project", () => {
	it("loads the featured desktop project metadata", async () => {
		const project = await getProjectBySlug("window-switcher");

		expect(project).not.toBeNull();
		expect(project?.metadata).toMatchObject({
			title: "Window Switcher",
			type: "desktop",
			date: "2026-08-03",
			featured: true,
			image: "/images/projects/window-switcher-hero.webp",
			github: "https://github.com/Benjaminlooi/window-switcher",
		});
	});
});
