import { Metadata } from 'next'
import React from 'react'

export async function generateMetadata({
  searchParams
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}): Promise<Metadata> {
  // Get framework from query parameter or default to React
  let framework = 'React';
  if (searchParams && typeof searchParams.framework === 'string') {
    framework = searchParams.framework.charAt(0).toUpperCase() + searchParams.framework.slice(1);
  }

  return {
    title: `Get Started with LovableLabs for ${framework}`,
    description: `Start using LovableLabs UI - A comprehensive guide to installation, setup, and basic usage of our ${framework} component library.`,
    keywords: `LovableLabs UI, ${framework} components, installation guide, setup, getting started, UI library`,
  }
}

export default function GetStartedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
} 