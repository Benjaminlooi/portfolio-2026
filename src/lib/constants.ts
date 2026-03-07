// icons
import { CalDotComIcon } from "@/components/ui/icons";
import { BsLinkedin as LinkedinIcon } from "react-icons/bs";
// import { FiCodepen as CodepenIcon } from "react-icons/fi";
import { BsGithub as GithubIcon } from "react-icons/bs";
// import {
//   BsTwitterX as TwitterXIcon,
//   BsDiscord as DiscordIcon,
// } from "react-icons/bs";
// import { BsInstagram as InstagramIcon } from "react-icons/bs";

// navigation
export const LINKS = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "About",
    href: "/about",
  },
  {
    name: "Projects",
    href: "/projects",
  },
  {
    name: "Blog",
    href: "/blog",
  },
  {
    name: "Contact",
    href: "/contact",
  },
];

// social media
export const SOCIAL_LINKS = [
  {
    title: "Cal.com",
    icon: CalDotComIcon,
    href: "https://cal.com/benjaminlooi",
  },
  // {
  //   title: "Discord",
  //   icon: DiscordIcon,
  //   href: "https://discord.com/users/669542427454996490",
  // },
  {
    title: "LinkedIn",
    icon: LinkedinIcon,
    href: "https://www.linkedin.com/in/benjaminlooi/",
  },
  {
    title: "GitHub",
    icon: GithubIcon,
    href: "https://github.com/benjaminlooi",
  },
];

// skills
export const SKILLS = [
  {
    title: "Languages",
    icon: "Code2",
    stacks: ["HTML", "CSS", "JavaScript", "TypeScript", "Python"],
  },
  {
    title: "Frontend Frameworks",
    icon: "Layout",
    stacks: ["Vue JS", "Nuxt JS", "React JS", "Next.js", "Angular"],
  },
  {
    title: "Front-end Ecosystems",
    icon: "Layers",
    stacks: [
      "GSAP",
      "Framer Motion",
      "Redux",
      "Axios",
      "React Hook Form",
      "Zod",
      "i18next",
    ],
  },
  {
    title: "Components Libraries",
    icon: "Component",
    stacks: ["Shadcn UI", "Material UI", "Ant Design", "Element UI", "Vuetify"],
  },
  {
    title: "CSS Styling",
    icon: "Palette",
    stacks: [
      "Tailwind CSS",
      "Emotion",
      "Styled Components",
      "CSS Modules",
      "SASS",
      "Bootstrap",
    ],
  },
  {
    title: "Cross-Platform",
    icon: "Smartphone",
    stacks: ["React Native", "Expo"],
  },
  {
    title: "Backend",
    icon: "Server",
    stacks: ["Node.js", "Express.js", "Mongoose"],
  },
  {
    title: "Databases/BaaS/CMS",
    icon: "Database",
    stacks: [
      "MongoDB",
      "PostgreSQL",
      "SQLite",
      "Redis",
      "Firebase/Firestore",
      "Supabase",
      "MySQL",
    ],
  },
  {
    title: "Other Technologies",
    icon: "Cloud",
    stacks: [
      "Docker",
      "AWS",
      "RESTful APIs",
      "OAuth / JWT",
      "CI/CD (Jenkins, GitHub Actions, GitLab CI)",
      "WebSockets",
      "Vercel",
      "Netlify",
    ],
  },
  {
    title: "Other Tools",
    icon: "Wrench",
    stacks: [
      "VS Code",
      "Git",
      "GitHub",
      "Eslint/Prettier",
      "Figma",
      "Postman",
      "Jira",
      "Puppeteer (end-to-end tests)",
      "Webpack / Rollup / Vite (bundlers)",
      "Storybook",
    ],
  },
];


// SEO Constants
export const SITE_URL = 'https://benjaminlooi.dev';
export const SITE_NAME = 'Benjamin Looi Portfolio';
export const AUTHOR_NAME = 'Benjamin Looi';
export const AUTHOR_EMAIL = 'benjamin@benjaminlooi.dev';
export const DEFAULT_OG_IMAGE = '/images/og-default.png';

export const SOCIAL_HANDLES = {
  twitter: '@benjaminlooi',
  linkedin: 'benjaminlooi',
  github: 'benjaminlooi',
};

export const DEFAULT_METADATA = {
  title: 'Benjamin Looi - Full Stack Developer Portfolio',
  description:
    'Explore my portfolio showcasing expertise in web development, UI/UX design, and modern JavaScript frameworks including React, Next.js, and TypeScript. View my projects and blog posts.',
  keywords: [
    'web development',
    'full stack developer',
    'React',
    'Next.js',
    'TypeScript',
    'UI/UX design',
    'portfolio',
  ],
};
