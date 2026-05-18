import { ArrowLeftIcon } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { CreativeWork, WithContext } from "schema-dts";
// import Image from "next/image";
import AnimatedImage from "@/components/animated/animated-image";
import BlogCard from "@/components/blog-card";
import MDXContent from "@/components/mdx-content";
import ProjectActions from "@/components/project-actions";
import ProjectCard from "@/components/project-card";
import { StructuredData } from "@/components/seo/StructuredData";
import { getRelatedBlogsForProject } from "@/lib/blog";
import {
	getProjectBySlug,
	getProjects,
	getRelatedProjects,
} from "@/lib/project";
import {
	buildBreadcrumbListSchema,
	buildSoftwareApplicationSchema,
} from "@/lib/seo/structured-data";
import { formatDate } from "@/lib/utils";
import type { StructuredDataSchema } from "@/types/seo";

interface Props {
	params: Promise<{ slug: string }>;
}

export const generateMetadata = async ({
	params,
}: Props): Promise<Metadata> => {
	const { slug } = await params;
	const project = await getProjectBySlug(slug);

	if (!project) {
		return {
			title: "Project Not Found",
		};
	}

	const { metadata } = project;
	const { title, description, image } = metadata;
	const canonicalUrl = `https://www.benjaminlooi.dev/projects/${slug}`;
	const imageUrl = image.startsWith("http")
		? image
		: `https://www.benjaminlooi.dev${image}`;

	return {
		title: `${title} - Benjamin Looi`,
		description,
		openGraph: {
			title: `${title} - Benjamin Looi`,
			description,
			url: canonicalUrl,
			type: "article",
			images: [
				{
					url: imageUrl,
					width: 1200,
					height: 630,
					alt: title,
				},
			],
		},
		twitter: {
			card: "summary_large_image",
			title: `${title} - Benjamin Looi`,
			description,
			images: [imageUrl],
		},
		alternates: {
			canonical: canonicalUrl,
		},
	};
};

export async function generateStaticParams() {
	const projects = await getProjects();
	const slugs = projects.map((project) => ({ slug: project.slug }));

	return slugs;
}

const Project = async ({ params }: Props) => {
	const { slug } = await params;

	const project = await getProjectBySlug(slug);

	if (!project) {
		notFound();
	}

	const { metadata, content } = project;
	const { title, image, date, description, type, link, github } = metadata;
	const canonicalUrl = `https://www.benjaminlooi.dev/projects/${slug}`;
	const relatedProjects = getRelatedProjects(slug, 2);
	const relatedBlogs = getRelatedBlogsForProject(metadata, 3);

	const breadcrumbSchema = buildBreadcrumbListSchema([
		{ name: "Home", url: "https://www.benjaminlooi.dev" },
		{ name: "Projects", url: "https://www.benjaminlooi.dev/projects" },
		{ name: title, url: canonicalUrl },
	]);

	const creativeWorkSchema: WithContext<CreativeWork> = {
		"@context": "https://schema.org",
		"@type": "CreativeWork",
		name: title,
		description: description,
		author: {
			"@type": "Person",
			name: "Benjamin Looi",
		},
		datePublished: date,
		image: image
			? image.startsWith("http")
				? image
				: `https://www.benjaminlooi.dev${image}`
			: undefined,
		url: canonicalUrl,
	};

	const schemas: StructuredDataSchema[] = [
		breadcrumbSchema,
		creativeWorkSchema,
	];

	// If the project type is 'web', it's a software application
	if (type === "web" || type === "mobile" || type === "extension") {
		const softwareAppSchema = buildSoftwareApplicationSchema({
			name: title as string,
			description: description as string,
			url: canonicalUrl,
			image: image
				? image.startsWith("http")
					? image
					: `https://www.benjaminlooi.dev${image}`
				: undefined,
			author: "Benjamin Looi",
		});
		schemas.push(softwareAppSchema);
	}

	return (
		<div className="w-full">
			<StructuredData schema={schemas} />
			<Link
				href="/projects"
				className="mb-8 inline-flex items-center gap-2 text-sm font-light text-muted-foreground transition-colors hover:text-foreground"
			>
				<ArrowLeftIcon className="h-5 w-5" />
				<span>Back to projects</span>
			</Link>

			{image && (
				<AnimatedImage
					className="relative mb-6 h-96 w-full overflow-hidden rounded-lg"
					src={image}
					alt={title as string}
					layout
					layoutId={`project-image-${slug}`}
					width={1000}
					height={680}
					sizes="(min-width: 768px) 64rem, 100vw"
					loading="lazy"
					decoding="async"
				/>
			)}

			<div>
				<h1 className="text-3xl font-bold">{title}</h1>
				<p className="mt-3 text-xs text-muted-foreground">
					{formatDate(date ?? "")}
				</p>
				<ProjectActions projectUrl={link} githubUrl={github} />
			</div>

			<div className="prose w-full max-w-full my-6 md:mb-10 prose-invert">
				<MDXContent source={content} />
			</div>

			{relatedProjects.length > 0 && (
				<section className="mt-12 pt-8 border-t">
					<h2 className="text-2xl font-bold mb-6">Related Projects</h2>
					<div className="grid gap-6 md:grid-cols-2">
						{relatedProjects.map((relatedProject) => (
							<ProjectCard key={relatedProject.slug} project={relatedProject} />
						))}
					</div>
				</section>
			)}

			{relatedBlogs.length > 0 && (
				<section className="mt-12 pt-8 border-t">
					<h2 className="text-2xl font-bold mb-6">Related Writing</h2>
					<div className="grid gap-6">
						{relatedBlogs.map((relatedBlog) => (
							<BlogCard key={relatedBlog.slug} blog={relatedBlog} />
						))}
					</div>
				</section>
			)}
		</div>
	);
};

export default Project;
