import { isSoftwareProjectType } from "@/lib/project";

describe("isSoftwareProjectType", () => {
	it("classifies desktop projects as software", () => {
		expect(isSoftwareProjectType("desktop")).toBe(true);
	});

	it("does not classify packages as software applications", () => {
		expect(isSoftwareProjectType("package")).toBe(false);
	});
});
