'use client';

import React from 'react';
import { StructuredDataSchema } from '@/types/seo';

/**
 * Props for StructuredData component.
 */
interface StructuredDataProps {
  /** Schema.org structured data object */
  schema: StructuredDataSchema | StructuredDataSchema[];
}

/**
 * Renders JSON-LD structured data script tag for SEO.
 * 
 * This client component injects schema.org structured data into the page head.
 * Supports single or multiple schemas (array).
 * 
 * @param {StructuredDataProps} props - Component props
 * @returns {React.ReactElement} Script tag with JSON-LD
 * 
 * @example
 * ```tsx
 * import { buildPersonSchema, buildBlogPostingSchema } from '@/lib/seo/structured-data';
 * 
 * <StructuredData schema={buildPersonSchema()} />
 * <StructuredData schema={[personSchema, blogPostSchema]} />
 * ```
 */
export function StructuredData({ schema }: StructuredDataProps): React.ReactElement {
  const schemaArray = Array.isArray(schema) ? schema : [schema];
  
  return (
    <>
      {schemaArray.map((schemaItem, index) => (
        <script
          key={`structured-data-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schemaItem, null, 2),
          }}
        />
      ))}
    </>
  );
}
