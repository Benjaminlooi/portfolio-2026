/**
 * PostHog Analytics Utility
 *
 * Centralized helper functions for tracking custom events.
 * These provide type-safe, consistent event tracking across the app.
 */
import posthog from "posthog-js";

/**
 * Track CTA button clicks
 */
export function trackCTAClick(
  ctaName: string,
  location: string,
  additionalProps?: Record<string, unknown>
) {
  posthog.capture("cta_click", {
    cta_name: ctaName,
    location,
    ...additionalProps,
  });
}

/**
 * Track social link clicks
 */
export function trackSocialClick(platform: string, url: string) {
  posthog.capture("social_link_click", {
    platform,
    url,
  });
}

/**
 * Track scroll depth milestones
 */
export function trackScrollDepth(
  percentage: number,
  pageType: "blog" | "project" | "page",
  pagePath: string
) {
  posthog.capture("scroll_depth", {
    percentage,
    page_type: pageType,
    page_path: pagePath,
  });
}

/**
 * Identify user after form submission
 * This links anonymous events to a known user
 */
export function identifyUser(email: string, name: string) {
  posthog.identify(email, {
    email,
    name,
    identified_at: new Date().toISOString(),
  });
}

/**
 * Track contact form submission
 */
export function trackContactFormSubmit(
  additionalProps?: Record<string, unknown>
) {
  posthog.capture("contact_form_submitted", {
    ...additionalProps,
  });
}

/**
 * Track blog post read completion
 */
export function trackBlogReadComplete(slug: string, title: string) {
  posthog.capture("blog_read_complete", {
    slug,
    title,
  });
}
