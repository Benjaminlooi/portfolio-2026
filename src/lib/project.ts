import fs from "fs";
import path from "path";
import matter from "gray-matter";

const rootDirectory = path.join(process.cwd(), "src/content/projects");

export type Project = {
  metadata: ProjectMetadata;
  content: string;
};

export type ProjectType = "web" | "mobile" | "extension" | "package";

export interface ProjectMetadata {
  type: ProjectType;
  title: string;
  description: string;
  date: string;
  stack: string[];
  slug: string;
  image: string;
  link: string;
  github: string;
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  try {
    const filePath = path.join(rootDirectory, `${slug}.mdx`);
    const fileContent = fs.readFileSync(filePath, { encoding: "utf8" });
    const { data, content } = matter(fileContent);
    return {
      metadata: {
        ...data,
        slug,
        date: data.date ?? "",
        stack: data.stack ?? [],
        link: data.link ?? "",
        github: data.github ?? "",
        description: data.description ?? "",
        image: data.image ?? "",
        title: data.title ?? "",
        type: data.type ?? "",
      },
      content,
    };
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getProjects(limit?: number): Promise<ProjectMetadata[]> {
  const files = fs.readdirSync(rootDirectory);

  const projects = files
    .map((file) => getProjectMetadata(file))
    .sort((a, b) => {
      if (new Date(a.date ?? "") < new Date(b.date ?? "")) {
        return 1;
      } else {
        return -1;
      }
    });

  if (limit) {
    return projects.slice(0, limit);
  }

  return projects;
}

export function getProjectMetadata(filepath: string): ProjectMetadata {
  const slug = filepath.replace(/\.mdx$/, "");
  const filePath = path.join(rootDirectory, filepath);
  const fileContent = fs.readFileSync(filePath, { encoding: "utf8" });
  const { data } = matter(fileContent);
  return {
    ...data,
    slug,
    date: data.date ?? "",
    stack: data.stack ?? [],
    link: data.link ?? "",
    github: data.github ?? "",
    description: data.description ?? "",
    image: data.image ?? "",
    title: data.title ?? "",
    type: data.type ?? "",
  };
}

function normalizeTerm(term: string): string {
  return term.toLowerCase().replace(/[^a-z0-9]/g, "");
}

function termsOverlap(a: string, b: string): boolean {
  const normalizedA = normalizeTerm(a);
  const normalizedB = normalizeTerm(b);

  if (!normalizedA || !normalizedB) return false;
  if (normalizedA === normalizedB) return true;
  if (normalizedA.length < 3 || normalizedB.length < 3) return false;

  return (
    normalizedA.includes(normalizedB) ||
    normalizedB.includes(normalizedA)
  );
}

function scoreProjectSimilarity(
  currentProject: ProjectMetadata,
  candidateProject: ProjectMetadata
): number {
  const sharedStack = candidateProject.stack.filter((stack) =>
    currentProject.stack.some((currentStack) => termsOverlap(stack, currentStack))
  ).length;

  const sameType = currentProject.type === candidateProject.type ? 1 : 0;

  return sharedStack * 3 + sameType;
}

export function getRelatedProjects(
  currentSlug: string,
  limit: number = 3
): ProjectMetadata[] {
  const allProjects = fs
    .readdirSync(rootDirectory)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => getProjectMetadata(file));

  const currentProject = allProjects.find((project) => project.slug === currentSlug);
  if (!currentProject) return [];

  return allProjects
    .filter((project) => project.slug !== currentSlug)
    .map((project) => ({
      project,
      score: scoreProjectSimilarity(currentProject, project),
    }))
    .filter((item) => item.score > 0)
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return new Date(b.project.date).getTime() - new Date(a.project.date).getTime();
    })
    .slice(0, limit)
    .map((item) => item.project);
}
