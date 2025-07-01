import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'Get Started with LovableLabs for React',
  description: 'Start using LovableLabs UI - A comprehensive guide to installation, setup, and basic usage of our React component library.',
  keywords: 'LovableLabs UI, React components, installation guide, setup, getting started, UI library',
}

export default function GetStartedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
} 