"use client";

import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";

interface Heading {
  id: string;
  text: string;
  level: string;
}

export function TableOfContents() {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const observerRef = useRef<IntersectionObserver | null>(null);
  const headingElementsRef = useRef<Record<string, IntersectionObserverEntry>>(
    {}
  );

  const getHeadings = useCallback((): Heading[] => {
    const proseContainer = document.querySelector(".prose");
    if (!proseContainer) return [];

    return Array.from(proseContainer.querySelectorAll("h1, h2, h3"))
      .filter((heading) => heading.id)
      .map((heading) => ({
        id: heading.id,
        text: heading.textContent?.replace(/\s*#$/, "") || "",
        level: heading.tagName.toLowerCase(),
      }));
  }, []);

  useEffect(() => {
    const collected = getHeadings();
    setHeadings(collected);

    if (collected.length === 0) return;

    // Track all heading visibility, determine the topmost visible one
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      headingElementsRef.current = entries.reduce((map, entry) => {
        map[entry.target.id] = entry;
        return map;
      }, headingElementsRef.current);

      const visibleHeadings = Object.values(headingElementsRef.current).filter(
        (entry) => entry.isIntersecting
      );

      if (visibleHeadings.length > 0) {
        // Pick the one closest to the top
        const sorted = visibleHeadings.sort(
          (a, b) => a.boundingClientRect.top - b.boundingClientRect.top
        );
        setActiveId(sorted[0].target.id);
      }
    };

    observerRef.current = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin: "-80px 0px -60% 0px",
      threshold: 0,
    });

    for (const heading of collected) {
      const element = document.getElementById(heading.id);
      if (element) observerRef.current.observe(element);
    }

    return () => {
      observerRef.current?.disconnect();
    };
  }, [getHeadings]);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (!element) return;

    const top = element.getBoundingClientRect().top + window.scrollY - 100;
    window.scrollTo({ top, behavior: "smooth" });
    setActiveId(id);

    // Update URL hash without jumping
    window.history.replaceState(null, "", `#${id}`);
  };

  if (headings.length === 0) return null;

  return (
    <motion.nav
      initial={{ opacity: 0, x: 16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
      className="toc-sidebar"
      aria-label="Table of contents"
    >
      <p className="toc-title">On this page</p>

      <div className="toc-list">
        {headings.map((heading) => {
          const isActive = activeId === heading.id;
          return (
            <button
              key={heading.id}
              type="button"
              onClick={() => scrollTo(heading.id)}
              className={cn("toc-item", {
                "toc-item--active": isActive,
                "toc-item--h1": heading.level === "h1",
                "toc-item--h2": heading.level === "h2",
                "toc-item--h3": heading.level === "h3",
              })}
            >
              {heading.text}
            </button>
          );
        })}
      </div>
    </motion.nav>
  );
}
