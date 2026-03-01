"use client";

import Giscus from "@giscus/react";

export default function GiscusComments() {
  return (
    <section className="mt-12 pt-8 border-t" id="comments">
      <h2 className="text-2xl font-bold mb-6">Comments</h2>
      <Giscus
        repo="benjaminlooi/portfolio-2026"
        repoId="R_kgDORbO25g"
        category="Announcements"
        categoryId="DIC_kwDORbO25s4C3bCK"
        mapping="pathname"
        strict="0"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="top"
        theme="preferred_color_scheme"
        lang="en"
        loading="lazy"
      />
    </section>
  );
}
