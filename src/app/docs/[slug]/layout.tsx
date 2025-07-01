import { Metadata } from 'next'
import React from 'react'


export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ slug: string }>  
}): Promise<Metadata> {

  const { slug } = await params;
  

  const formatComponentName = (slug: string): string => {
    return slug.split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };
  
  const componentName = formatComponentName(slug);
  
  return {
    title: `${componentName} | Docs for React`,
    description: `Learn how to use the ${componentName} component from LovableLabs UI in your React applications.`,
    keywords: `${componentName}, React component, LovableLabs UI, UI library, React UI, ${slug}`,
  };
}

export default async function SlugLayout({
  children,
  
}: {
  children: React.ReactNode
  params: Promise<{ slug: string }>  
}) {

  
  return <>{children}</>
}