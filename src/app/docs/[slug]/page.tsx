"use client";

import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { getContentBySlug } from "../constants";
import { DocContent } from "../constants/types";
import DocSection from "../components/DocSection";

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

  console.log(content);

  return (
    <>
      <DocSection content={content} />
    </>
  );
}
