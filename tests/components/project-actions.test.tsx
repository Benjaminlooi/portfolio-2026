import { render, screen } from "@testing-library/react";
import React from "react";
import ProjectActions from "@/components/project-actions";

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

	it("renders nothing when there are no project links", () => {
		const { container } = render(<ProjectActions projectUrl="" githubUrl="" />);

		expect(container).toBeEmptyDOMElement();
	});
});
