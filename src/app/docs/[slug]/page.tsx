"use client";

import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { getContentBySlug } from "../constants";
import { DocContent } from "../constants/types";
import ReactMarkdown from "react-markdown";

export default function DocPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const slug = params.slug as string;
  const framework = searchParams.get("framework") || "react";

  const [content, setContent] = useState<DocContent | null>(null);

  useEffect(() => {
    const docContent = getContentBySlug(slug, framework);
    setContent(docContent);
  }, [slug, framework]);

  if (!content) {
    return (
      <div className="text-center py-20">
        <h1 className="text-[var(--font-white)] text-2xl">
          Documentation not found for {slug} with framework {framework}
        </h1>
      </div>
    );
  }

  return (
    <div className="text-[var(--font-white)]">
      <h1 className="text-3xl font-bold mb-3">{content.title}</h1>
      <p className="text-[var(--font-gray)] mb-10">{content.description}</p>

      {content.sections.map((section, index) => (
        <div key={index} className="mb-12">
          <div className="markdown-content text-[var(--font-white)]">
            <ReactMarkdown>{section.content}</ReactMarkdown>
          </div>

          {section.code && (
            <div className="mt-6 bg-[#1E1E1E] rounded-md p-4 overflow-x-auto">
              <pre className="text-[var(--font-gray)] text-sm">
                <code>{section.code}</code>
              </pre>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
