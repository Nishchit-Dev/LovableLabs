"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getContentBySlug } from "../constants";
import { DocContent } from "../constants/types";
import DocSection from "../components/DocSection";

export default function DocPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [content, setContent] = useState<DocContent | null>(null);

  useEffect(() => {
    const docContent = getContentBySlug(slug);
    setContent(docContent);
  }, [slug]);

  if (!content) {
    return (
      <div className="text-center py-20">
        <h1 className="text-[var(--font-white)] text-2xl">
          Documentation not found for {slug}
        </h1>
      </div>
    );
  }

  return (
    <>
      <DocSection content={content} />
    </>
  );
}
