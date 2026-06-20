import { act, fireEvent, render, screen } from "@testing-library/react";
// biome-ignore lint/style/useImportType: Jest JSX transform needs React in scope.
import React from "react";
import { CodeBlock } from "@/components/blog/code-block";

const mockWriteText = jest.fn(() => Promise.resolve());

beforeEach(() => {
	Object.defineProperty(navigator, "clipboard", {
		value: { writeText: mockWriteText },
		writable: true,
		configurable: true,
	});
	mockWriteText.mockClear();
	jest.useFakeTimers();
});

afterEach(() => {
	jest.useRealTimers();
});

function makeChildren(opts: {
	language?: string;
	title?: string;
	titleTag?: "figcaption" | "div";
	code?: string;
	caption?: string;
}) {
	const { language = "ts", title, titleTag = "figcaption", code = "console.log('hi')", caption } = opts;

	const children: React.ReactNode[] = [];

	if (title) {
		const Tag = titleTag;
		children.push(
			React.createElement(Tag, {
				"data-rehype-pretty-code-title": "",
				"data-language": language,
				children: title,
			}),
		);
	}

	children.push(
		React.createElement("pre", {
			"data-language": language,
			children: React.createElement("code", { children: code }),
		}),
	);

	if (caption) {
		children.push(
			React.createElement("figcaption", {
				"data-rehype-pretty-code-caption": "",
				children: caption,
			}),
		);
	}

	return children;
}

describe("CodeBlock", () => {
	it("renders a header with language icon and label for a ts code block", () => {
		render(
			<CodeBlock data-rehype-pretty-code-figure="">
				{makeChildren({ language: "ts", code: "const x = 1" })}
			</CodeBlock>,
		);

		expect(screen.getByText("Ts")).toBeInTheDocument();
		expect(screen.getByRole("button", { name: /copy code/i })).toBeInTheDocument();
	});

	it("renders 'Terminal' label for bash language", () => {
		render(
			<CodeBlock data-rehype-pretty-code-figure="">
				{makeChildren({ language: "bash", code: "echo hi" })}
			</CodeBlock>,
		);

		expect(screen.getByText("Terminal")).toBeInTheDocument();
	});

	it("renders 'Terminal' label for sh language", () => {
		render(
			<CodeBlock data-rehype-pretty-code-figure="">
				{makeChildren({ language: "sh", code: "ls" })}
			</CodeBlock>,
		);

		expect(screen.getByText("Terminal")).toBeInTheDocument();
	});

	it("renders 'Text' label for text language", () => {
		render(
			<CodeBlock data-rehype-pretty-code-figure="">
				{makeChildren({ language: "text", code: "plain text" })}
			</CodeBlock>,
		);

		expect(screen.getByText("Text")).toBeInTheDocument();
	});

	it("renders title text as header label instead of language label (figcaption shape)", () => {
		render(
			<CodeBlock data-rehype-pretty-code-figure="">
				{makeChildren({ language: "ts", title: "app.ts", titleTag: "figcaption" })}
			</CodeBlock>,
		);

		expect(screen.getByText("app.ts")).toBeInTheDocument();
		expect(screen.queryByText("Ts")).not.toBeInTheDocument();
	});

	it("renders title text as header label instead of language label (div shape)", () => {
		render(
			<CodeBlock data-rehype-pretty-code-figure="">
				{makeChildren({ language: "ts", title: "app.ts", titleTag: "div" })}
			</CodeBlock>,
		);

		expect(screen.getByText("app.ts")).toBeInTheDocument();
		expect(screen.queryByText("Ts")).not.toBeInTheDocument();
	});

	it("renders only Brackets icon and copy button for empty-language blocks (no label)", () => {
		render(
			<CodeBlock data-rehype-pretty-code-figure="">
				<pre>
					<code>some code</code>
				</pre>
			</CodeBlock>,
		);

		expect(screen.queryByText(/^[A-Z]/)).not.toBeInTheDocument();
		expect(screen.getByRole("button", { name: /copy code/i })).toBeInTheDocument();
	});

	it("renders only Brackets icon and copy button for empty-string language", () => {
		render(
			<CodeBlock data-rehype-pretty-code-figure="">
				{makeChildren({ language: "", code: "some code" })}
			</CodeBlock>,
		);

		expect(screen.queryByText(/^[A-Z]/)).not.toBeInTheDocument();
		expect(screen.getByRole("button", { name: /copy code/i })).toBeInTheDocument();
	});

	it("passes through caption figcaption as an additional child", () => {
		render(
			<CodeBlock data-rehype-pretty-code-figure="">
				{makeChildren({ language: "ts", title: "app.ts", caption: "Output of the script" })}
			</CodeBlock>,
		);

		expect(screen.getByText("Output of the script")).toBeInTheDocument();
	});

	it("does not render titleElement separately — it is consumed into the header", () => {
		const { container } = render(
			<CodeBlock data-rehype-pretty-code-figure="">
				{makeChildren({ language: "ts", title: "app.ts" })}
			</CodeBlock>,
		);

		const standaloneTitle = container.querySelector("[data-rehype-pretty-code-title]");
		expect(standaloneTitle).not.toBeInTheDocument();
	});

	it("copies code text via navigator.clipboard.writeText on click", async () => {
		render(
			<CodeBlock data-rehype-pretty-code-figure="">
				{makeChildren({ language: "ts", code: "const x = 1" })}
			</CodeBlock>,
		);

		await act(async () => {
			fireEvent.click(screen.getByRole("button", { name: /copy code/i }));
		});

		expect(mockWriteText).toHaveBeenCalledTimes(1);
		const copiedText = (mockWriteText.mock.calls as string[][])[0][0];
		expect(copiedText).toBe("const x = 1");
	});

	it("shows Check icon for 2 seconds after successful copy", async () => {
		render(
			<CodeBlock data-rehype-pretty-code-figure="">
				{makeChildren({ language: "ts", code: "hello" })}
			</CodeBlock>,
		);

		await act(async () => {
			fireEvent.click(screen.getByRole("button", { name: /copy code/i }));
		});

		expect(screen.getByRole("button", { name: /copied/i })).toBeInTheDocument();

		act(() => {
			jest.advanceTimersByTime(2000);
		});

		expect(screen.getByRole("button", { name: /copy code/i })).toBeInTheDocument();
	});

	it("falls back to textarea copy when navigator.clipboard is undefined", async () => {
		Object.defineProperty(navigator, "clipboard", {
			value: undefined,
			writable: true,
			configurable: true,
		});

		const execCommandMock = jest.fn(() => true);
		document.execCommand = execCommandMock;

		render(
			<CodeBlock data-rehype-pretty-code-figure="">
				{makeChildren({ language: "ts", code: "fallback" })}
			</CodeBlock>,
		);

		await act(async () => {
			fireEvent.click(screen.getByRole("button", { name: /copy code/i }));
		});

		expect(execCommandMock).toHaveBeenCalledWith("copy");
		expect(mockWriteText).not.toHaveBeenCalled();

		// eslint-disable-next-line @typescript-eslint/no-explicit-any -- test cleanup: removing mock
		delete (document as any).execCommand;
	});

	it("falls back to textarea copy when navigator.clipboard.writeText rejects", async () => {
		mockWriteText.mockRejectedValueOnce(new Error("clipboard denied"));
		const execCommandMock = jest.fn(() => true);
		document.execCommand = execCommandMock;

		render(
			<CodeBlock data-rehype-pretty-code-figure="">
				{makeChildren({ language: "ts", code: "reject test" })}
			</CodeBlock>,
		);

		await act(async () => {
			fireEvent.click(screen.getByRole("button", { name: /copy code/i }));
		});

		expect(execCommandMock).toHaveBeenCalledWith("copy");

		// eslint-disable-next-line @typescript-eslint/no-explicit-any -- test cleanup: removing mock
		delete (document as any).execCommand;
	});

	it("renders figure with data-rehype-pretty-code-figure attribute", () => {
		const { container } = render(
			<CodeBlock data-rehype-pretty-code-figure="">
				{makeChildren({ language: "ts" })}
			</CodeBlock>,
		);

		const figure = container.querySelector("figure[data-rehype-pretty-code-figure]");
		expect(figure).toBeInTheDocument();
	});

	it("passes through className and other figure props", () => {
		const { container } = render(
			<CodeBlock data-rehype-pretty-code-figure="" className="my-class" id="test-id">
				{makeChildren({ language: "ts" })}
			</CodeBlock>,
		);

		const figure = container.querySelector("figure");
		expect(figure?.classList.contains("my-class")).toBe(true);
		expect(figure?.id).toBe("test-id");
	});
});