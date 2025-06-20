"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useParams } from "next/navigation";
import { getContentBySlug } from "../constants";
import { DocContent } from "../constants/types";
import DocSection from "../components/DocSection";
import Link from "next/link";

function DocPageContent() {
  const params = useParams();
  const slug = params.slug as string;

  const [content, setContent] = useState<DocContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchContent = async () => {
      setIsLoading(true);
      setNotFound(false);
      
      // Simulate network delay to ensure skeleton shows
      const docContent = getContentBySlug(slug);
      
      // Small delay to prevent flashing of skeleton for fast loads
      setTimeout(() => {
        setContent(docContent);
        setIsLoading(false);
        setNotFound(!docContent);
      }, 800);
    };
    
    fetchContent();
  }, [slug]);

  if (isLoading) {
    return <DocSkeleton />;
  }

  if (notFound) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <h1 className="text-[var(--font-white)] text-2xl mb-4">
          Documentation not found
        </h1>
        <p className="text-[var(--font-gray)] mb-6">
          We couldn&apos;t find documentation for &quot;{slug}&quot;
        </p>
        <Link
          href="/docs" 
          className="px-4 py-2 bg-[var(--bg-blue)] text-white rounded-md hover:bg-opacity-90 transition-colors"
        >
          Return to Docs
        </Link>
      </div>
    );
  }

  return (
    <>
      <DocSection content={content!} />
    </>
  );
}

// Skeleton loader component for documentation
function DocSkeleton() {
  return (
    <div className="animate-pulse max-w-4xl">
      {/* Title skeleton */}
      <div className="h-10 bg-white/10 rounded-md w-3/4 mb-8"></div>
      
      {/* Description skeleton */}
      <div className="space-y-2 mb-8">
        <div className="h-4 bg-white/10 rounded w-full"></div>
        <div className="h-4 bg-white/10 rounded w-5/6"></div>
        <div className="h-4 bg-white/10 rounded w-4/6"></div>
      </div>
      
      {/* Code block skeleton */}
      <div className="h-40 bg-white/5 rounded-md w-full mb-8 border border-white/10"></div>
      
      {/* Content sections skeleton */}
      <div className="space-y-6 mb-8">
        <div className="h-6 bg-white/10 rounded-md w-1/2 mb-4"></div>
        <div className="space-y-2">
          <div className="h-4 bg-white/10 rounded w-full"></div>
          <div className="h-4 bg-white/10 rounded w-5/6"></div>
          <div className="h-4 bg-white/10 rounded w-4/6"></div>
        </div>
      </div>
      
      {/* Another section skeleton */}
      <div className="space-y-6">
        <div className="h-6 bg-white/10 rounded-md w-2/3 mb-4"></div>
        <div className="space-y-2">
          <div className="h-4 bg-white/10 rounded w-full"></div>
          <div className="h-4 bg-white/10 rounded w-4/5"></div>
          <div className="h-4 bg-white/10 rounded w-3/5"></div>
        </div>
      </div>
    </div>
  );
}

export default function DocPage() {
  return (
    <Suspense fallback={<DocSkeleton />}>
      <DocPageContent />
    </Suspense>
  );
}
