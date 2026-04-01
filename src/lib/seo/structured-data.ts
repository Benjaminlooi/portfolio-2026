import type {
  Person,
  BlogPosting,
  WebSite,
  BreadcrumbList,
  WithContext,
} from 'schema-dts';

const SITE_URL = 'https://www.benjaminlooi.dev';
const SITE_NAME = 'Benjamin Looi Portfolio';
const AUTHOR_NAME = 'Benjamin Looi';

/**
 * Build a Person schema for the author
 * @param personData - Person information
 * @returns JSON-LD Person schema
 */
export function buildPersonSchema(personData: {
  name: string;
  url: string;
  jobTitle?: string;
  description?: string;
  image?: string;
  sameAs?: string[];
}): WithContext<Person> {
  const schema: WithContext<Person> = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: personData.name,
    url: personData.url,
  };

  if (personData.jobTitle) {
    schema.jobTitle = personData.jobTitle;
  }

  if (personData.description) {
    schema.description = personData.description;
  }

  if (personData.image) {
    schema.image = personData.image;
  }

  if (personData.sameAs && personData.sameAs.length > 0) {
    schema.sameAs = personData.sameAs;
  }

  return schema;
}

/**
 * Build a BlogPosting schema for a blog post
 * @param blogData - Blog post information
 * @returns JSON-LD BlogPosting schema
 */
export function buildBlogPostingSchema(blogData: {
  headline: string;
  description?: string;
  author: string;
  datePublished: string;
  dateModified?: string;
  url: string;
  image?: string;
}): WithContext<BlogPosting> {
  const schema: WithContext<BlogPosting> = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: blogData.headline,
    author: {
      '@type': 'Person',
      name: blogData.author,
      url: SITE_URL,
    },
    datePublished: blogData.datePublished,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': blogData.url,
    },
  };

  if (blogData.description) {
    schema.description = blogData.description;
  }

  if (blogData.dateModified) {
    schema.dateModified = blogData.dateModified;
  }

  if (blogData.image) {
    schema.image = blogData.image;
  }

  return schema;
}

/**
 * Build a WebSite schema for the portfolio
 * @param websiteData - Website information
 * @returns JSON-LD WebSite schema
 */
export function buildWebSiteSchema(websiteData: {
  name: string;
  url: string;
  description?: string;
  searchUrl?: string;
}): WithContext<WebSite> {
  const schema: WithContext<WebSite> = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: websiteData.name,
    url: websiteData.url,
  };

  if (websiteData.description) {
    schema.description = websiteData.description;
  }

  if (websiteData.searchUrl) {
    schema.potentialAction = {
      '@type': 'SearchAction',
      target: `${websiteData.searchUrl}?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    } as any; // schema-dts doesn't fully support query-input
  }

  return schema;
}

/**
 * Build a BreadcrumbList schema for navigation
 * @param breadcrumbs - Array of breadcrumb items
 * @returns JSON-LD BreadcrumbList schema
 */
export function buildBreadcrumbListSchema(
  breadcrumbs: Array<{ name: string; url: string }>
): WithContext<BreadcrumbList> {
  const schema: WithContext<BreadcrumbList> = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: crumb.url,
    })),
  };

  return schema;
}
