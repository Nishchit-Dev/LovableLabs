"use client";

import { motion } from "framer-motion";
import React, { useEffect, useState, use } from "react";
import { getTableOfContents, getContentBySlug, DocContent } from "../constants";

export default function DocPage({
  params,
}: {
  params: Promise<{ slug: string }> | { slug: string };
}) {
  // Properly unwrap params using React.use()
  const unwrappedParams = params instanceof Promise ? use(params) : params;
  const { slug } = unwrappedParams;

  const [content, setContent] = useState<DocContent | null>(null);

  useEffect(() => {
    // Get content based on slug
    setContent(getContentBySlug(slug));

    // Update table of contents - in a real app, this might update a context
    // or some other mechanism to show the TOC in the sidebar
    getTableOfContents(slug);
  }, [slug]);

  const fadeInUp = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  };

  if (!content) {
    return (
      <div className="py-12">
        <h1 className="text-3xl font-bold text-[var(--font-white)] mb-6">
          Documentation not found
        </h1>
        <p className="text-[var(--font-gray)]">
          The requested documentation page &quot;{slug}&quot; could not be
          found.
        </p>
      </div>
    );
  }

  return (
    <motion.div
      initial="initial"
      animate="animate"
      transition={{ staggerChildren: 0.1 }}
    >
      <motion.h1
        className="text-3xl font-bold text-[var(--font-white)] mb-6"
        {...fadeInUp}
      >
        {content.title}
      </motion.h1>

      <motion.p className="text-[var(--font-gray)] mb-8" {...fadeInUp}>
        {content.description}
      </motion.p>

      {content.sections.map((section, index) => (
        <React.Fragment key={index}>
          <motion.h2
            className="text-2xl font-bold text-[var(--font-white)] mb-4 mt-10"
            {...fadeInUp}
            id={section.title.toLowerCase().replace(/\s+/g, "-")}
          >
            {section.title}
          </motion.h2>

          <motion.p className="text-[var(--font-gray)] mb-6" {...fadeInUp}>
            {section.content}
          </motion.p>

          {section.code && (
            <motion.div
              className="bg-[rgba(30,30,30,0.7)] rounded-md p-4 mb-8 overflow-x-auto"
              {...fadeInUp}
            >
              <pre className="text-[var(--font-gray)]">
                <code>{section.code}</code>
              </pre>
            </motion.div>
          )}
        </React.Fragment>
      ))}
    </motion.div>
  );
}
