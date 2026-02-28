'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Search, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import BlogCard from '@/components/blog-card';
import Fuse from 'fuse.js';
import type { BlogMetadata } from '@/lib/blog';

/**
 * Props for BlogSearch component.
 */
interface BlogSearchProps {
  /** Initial list of all blog posts metadata */
  posts: BlogMetadata[];
  /** Placeholder text for search input */
  placeholder?: string;
  /** Whether to track search analytics */
  trackAnalytics?: boolean;
}

/**
 * Client-side blog search component with fuzzy matching.
 * 
 * Uses Fuse.js for fast client-side search across title, excerpt, content, and tags.
 * Debounces input for performance and optionally tracks search analytics.
 * 
 * @param {BlogSearchProps} props - Component props
 * @returns {React.ReactElement} Search input and filtered results
 * 
 * @example
 * ```tsx
 * <BlogSearch 
 *   posts={allBlogPosts} 
 *   placeholder="Search articles..."
 *   trackAnalytics={true}
 * />
 * ```
 */
export function BlogSearch({ 
  posts, 
  placeholder = 'Search blog posts...', 
  trackAnalytics = false 
}: BlogSearchProps): React.ReactElement {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<BlogMetadata[]>(posts);
  const [isSearching, setIsSearching] = useState(false);

  // Create Fuse.js search index (memoized)
  const fuse = useMemo(() => {
    const options = {
      keys: [
        { name: 'title', weight: 0.5 },
        { name: 'description', weight: 0.3 },
        { name: 'summary', weight: 0.3 },
        { name: 'tags', weight: 0.2 },
        { name: 'keywords', weight: 0.2 },
      ],
      threshold: 0.3,
      includeScore: true,
    };
    return new Fuse(posts, options);
  }, [posts]);

  useEffect(() => {
    // Debounced search
    const timer = setTimeout(() => {
      if (query.trim() === '') {
        setResults(posts);
        setIsSearching(false);
        return;
      }

      setIsSearching(true);
      const searchResults = fuse.search(query).map(result => result.item);
      setResults(searchResults);
      setIsSearching(false);

      // Track search analytics
      if (trackAnalytics && typeof window !== 'undefined') {
        // @ts-expect-error - PostHog global
        window.posthog?.capture('blog_search', {
          query,
          results_count: searchResults.length,
        });
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query, posts, fuse, trackAnalytics]);

  return (
    <div className="space-y-6">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-10 pr-10"
          aria-label="Search blog posts"
        />
        {isSearching && (
          <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 animate-spin text-muted-foreground" />
        )}
      </div>

      <div className="space-y-6 md:space-y-12 py-6 lg:py-10">
        {results.length > 0 ? (
          results.map((post) => (
            <BlogCard key={post.slug} blog={post} />
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-muted-foreground">
              No posts found for &quot;{query}&quot;
            </p>
          </div>
        )}
      </div>

      {query && results.length > 0 && (
        <p className="text-sm text-muted-foreground text-center">
          Found {results.length} {results.length === 1 ? 'post' : 'posts'}
        </p>
      )}
    </div>
  );
}
