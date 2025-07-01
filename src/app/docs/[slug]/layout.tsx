import { Metadata } from 'next'
import React from 'react'

// Generate metadata dynamically based on slug and framework
export async function generateMetadata({ 
  params,
  searchParams 
}: { 
  params: { slug: string },
  searchParams: { [key: string]: string | string[] | undefined }
}): Promise<Metadata> {
  // Format the slug into a readable component name
  const formatComponentName = (slug: string): string => {
    return slug.split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };
  
  const componentName = formatComponentName(params.slug);
  
  // Get framework from query parameter or default to React
  let framework = 'React';
  if (searchParams && typeof searchParams.framework === 'string') {
    framework = searchParams.framework.charAt(0).toUpperCase() + searchParams.framework.slice(1);
  }
  
  return {
    title: `${componentName} | Docs for ${framework}`,
    description: `Learn how to use the ${componentName} component from LovableLabs UI in your ${framework} applications.`,
    keywords: `${componentName}, ${framework} component, LovableLabs UI, UI library, ${framework} UI, ${params.slug}`,
  };
}

export default function SlugLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
} 



