import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'Playground',
  description: 'Experiment with and explore LovableLabs UI components in our interactive playground. Test animations, interactions, and different component variations.',
  keywords: 'LovableLabs UI, component playground, interactive demos, UI testing, React components, animations, interactive UI, UI development',
  openGraph: {
    title: 'Interactive Playground | LovableLabs UI',
    description: 'Experiment with LovableLabs UI components in our interactive playground',
    images: [
      {
        url: 'https://lovablelabs.xyz/og-playground.png',
        width: 1200,
        height: 630,
        alt: 'LovableLabs UI Playground',
      },
    ],
  },
}

export default function PlaygroundLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
} 