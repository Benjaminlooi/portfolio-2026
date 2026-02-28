"use client";
import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";

if (typeof window !== "undefined") {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY as string, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
    person_profiles: "identified_only",
    capture_pageview: false, // We'll handle this manually for Next.js App Router
    capture_pageleave: true,

    // Autocapture - automatically capture clicks, form submissions, etc.
    autocapture: true,

    // Web Vitals - capture Core Web Vitals (LCP, FID, CLS)
    capture_performance: true,

    // Heatmaps - enable heatmap data collection
    enable_heatmaps: true,

    // Session Replay
    session_recording: {
      maskAllInputs: true,
      maskTextSelector: "[data-mask]", // Add data-mask to sensitive elements
    },
  });
}
export function CSPostHogProvider({ children }: React.PropsWithChildren) {
  return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
}
