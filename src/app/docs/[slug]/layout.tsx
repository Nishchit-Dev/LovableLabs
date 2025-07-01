import { Metadata } from 'next'
import React from 'react'

// Generate metadata dynamically based on slug
export async function generateMetadata({ 
  params 
}: { 
  params: { slug: string }
}): Promise<Metadata> {
  // Format the slug into a readable component name
  const formatComponentName = (slug: string): string => {
    return slug.split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };
  
  const componentName = formatComponentName(params.slug);
  
  return {
    title: `${componentName} | Docs for React`,
    description: `Learn how to use the ${componentName} component from LovableLabs UI in your React applications.`,
    keywords: `${componentName}, React component, LovableLabs UI, UI library, React UI, ${params.slug}`,
  };
}

export default function SlugLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}