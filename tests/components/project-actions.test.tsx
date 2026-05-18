import { fireEvent, render, screen } from "@testing-library/react";
// biome-ignore lint/style/useImportType: Jest JSX transform needs React in scope.
import React from "react";
import ProjectActions from "@/components/project-actions";
import { trackProjectExternalClick } from "@/lib/posthog-analytics";

jest.mock("@/lib/posthog-analytics", () => ({
	trackProjectExternalClick: jest.fn(),
}));

describe("ProjectActions", () => {
	it("renders live project and GitHub links when both URLs exist", () => {
		render(
			<ProjectActions
				projectUrl="https://example.com"
				githubUrl="https://github.com/Benjaminlooi/example"
			/>,
		);

		expect(
			screen.getByRole("link", { name: /visit project/i }),
		).toHaveAttribute("href", "https://example.com");
		expect(screen.getByRole("link", { name: /github/i })).toHaveAttribute(
			"href",
			"https://github.com/Benjaminlooi/example",
		);
	});

	it("tracks external project link clicks with project context", () => {
		render(
			<ProjectActions
				projectUrl="https://example.com"
				githubUrl="https://github.com/Benjaminlooi/example"
				slug="example"
				title="Example Project"
			/>,
		);

		fireEvent.click(screen.getByRole("link", { name: /visit project/i }));
		fireEvent.click(screen.getByRole("link", { name: /github/i }));

		expect(trackProjectExternalClick).toHaveBeenNthCalledWith(1, {
			slug: "example",
			title: "Example Project",
			target: "demo",
			url: "https://example.com",
		});
		expect(trackProjectExternalClick).toHaveBeenNthCalledWith(2, {
			slug: "example",
			title: "Example Project",
			target: "github",
			url: "https://github.com/Benjaminlooi/example",
		});
	});

	it("renders nothing when there are no project links", () => {
		const { container } = render(<ProjectActions projectUrl="" githubUrl="" />);

		expect(container).toBeEmptyDOMElement();
	});
});
