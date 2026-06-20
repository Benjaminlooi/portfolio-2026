"use client";

import { Braces, Brackets, Check, Copy, Database, FileCode, Settings, TerminalSquare } from "lucide-react";
import React, { useRef, useState } from "react";

import type { LucideIcon } from "lucide-react";

const ICON_MAP: Record<string, LucideIcon> = {
	ts: FileCode,
	tsx: FileCode,
	js: FileCode,
	javascript: FileCode,
	jsx: FileCode,
	json: Braces,
	bash: TerminalSquare,
	sh: TerminalSquare,
	shell: TerminalSquare,
	shellscript: TerminalSquare,
	zsh: TerminalSquare,
	python: FileCode,
	yaml: FileCode,
	html: FileCode,
	css: FileCode,
	scss: FileCode,
	go: FileCode,
	rust: FileCode,
	php: FileCode,
	sql: Database,
	ini: Settings,
	conf: Settings,
	udev: Settings,
	vue: FileCode,
	text: Brackets,
};

const TERMINAL_LABELS = new Set(["bash", "sh", "shell", "shellscript", "zsh"]);

function prettifyLabel(lang: string): string {
	if (TERMINAL_LABELS.has(lang)) return "Terminal";
	return lang.charAt(0).toUpperCase() + lang.slice(1).toLowerCase();
}

function extractTextContent(children: React.ReactNode): string {
	return React.Children.toArray(children).map((child) => {
		if (typeof child === "string") return child;
		if (typeof child === "number") return String(child);
		if (React.isValidElement(child)) return extractTextContent((child.props as Record<string, unknown>).children as React.ReactNode);
		return "";
	}).join("");
}

function copyWithTextarea(text: string): void {
	const textarea = document.createElement("textarea");
	textarea.value = text;
	textarea.style.position = "fixed";
	textarea.style.opacity = "0";
	document.body.appendChild(textarea);
	textarea.select();
	document.execCommand("copy");
	document.body.removeChild(textarea);
}

export function CodeBlock(props: React.HTMLAttributes<HTMLElement>) {
	const { children, className, ...rest } = props;
	const preRef = useRef<HTMLPreElement>(null);
	const [copied, setCopied] = useState(false);

	let titleElement: React.ReactElement | null = null;
	let preElement: React.ReactElement | null = null;
	let language = "";
	const otherChildren: React.ReactNode[] = [];

	React.Children.forEach(children, (child) => {
		if (!React.isValidElement(child)) return;
		const childProps = child.props as Record<string, unknown>;
		if (childProps["data-rehype-pretty-code-title"] !== undefined) {
			titleElement = child as React.ReactElement;
		} else if ((child.type as string) === "pre" || childProps["data-language"] !== undefined) {
			preElement = child as React.ReactElement;
			const lang = childProps["data-language"];
			if (typeof lang === "string" && lang.length > 0) {
				language = lang;
			}
		} else {
			otherChildren.push(child);
		}
	});

	if (!language && preElement !== null) {
		const preProps = (preElement as React.ReactElement).props as Record<string, unknown>;
		const lang = preProps["data-language"];
		if (typeof lang === "string" && lang.length > 0) {
			language = lang;
		}
	}

	const titleText = titleElement !== null
		? extractTextContent(((titleElement as React.ReactElement).props as Record<string, unknown>).children as React.ReactNode)
		: "";

	const Icon = language ? (ICON_MAP[language] ?? Brackets) : Brackets;
	const label = titleText || (language ? prettifyLabel(language) : "");

	const handleCopy = async () => {
		const codeText = preRef.current?.textContent ?? "";
		if (!codeText) return;

		try {
			await navigator.clipboard.writeText(codeText);
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		} catch {
			copyWithTextarea(codeText);
		}
	};

	return (
		<figure data-rehype-pretty-code-figure className={className} {...rest}>
			<div className="flex items-center justify-between border-b border-white/10 bg-white/5 px-4 py-2">
				<div className="flex items-center gap-1.5">
					<Icon size={14} className="text-white/50" />
					{label && (
						<span className="text-xs font-medium text-white/50">{label}</span>
					)}
				</div>
				<button
					onClick={handleCopy}
					className="flex items-center gap-1 rounded-md p-1 text-white/50 transition-colors hover:bg-white/10 hover:text-white/80"
					aria-label={copied ? "Copied!" : "Copy code"}
					type="button"
				>
					{copied ? <Check size={14} /> : <Copy size={14} />}
				</button>
			</div>
			{preElement ? React.cloneElement(preElement, { ref: preRef }) : null}
			{otherChildren}
		</figure>
	);
}