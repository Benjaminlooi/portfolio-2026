"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { trackScrollDepth } from "@/lib/posthog-analytics";

interface ScrollMilestones {
  25: boolean;
  50: boolean;
  75: boolean;
  100: boolean;
}

/**
 * Tracks scroll depth milestones (25%, 50%, 75%, 100%)
 * Only tracks on blog and project pages for content engagement analysis
 */
export function ScrollDepthTracker() {
  const pathname = usePathname();
  const milestonesRef = useRef<ScrollMilestones>({
    25: false,
    50: false,
    75: false,
    100: false,
  });

  useEffect(() => {
    // Only track on blog and project pages
    const isBlogPage = pathname?.startsWith("/blog/") && pathname !== "/blog";
    const isProjectPage =
      pathname?.startsWith("/projects/") && pathname !== "/projects";

    if (!isBlogPage && !isProjectPage) {
      return;
    }

    const pageType = isBlogPage ? "blog" : "project";

    // Reset milestones on page change
    milestonesRef.current = { 25: false, 50: false, 75: false, 100: false };

    const handleScroll = () => {
      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = Math.round(
        (window.scrollY / scrollHeight) * 100
      );

      const milestones = [25, 50, 75, 100] as const;

      for (const milestone of milestones) {
        if (
          scrollPercent >= milestone &&
          !milestonesRef.current[milestone]
        ) {
          milestonesRef.current[milestone] = true;
          trackScrollDepth(milestone, pageType, pathname);
        }
      }
    };

    // Throttle scroll events for performance
    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", throttledScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", throttledScroll);
    };
  }, [pathname]);

  return null;
}
