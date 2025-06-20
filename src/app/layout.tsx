import type { Metadata } from 'next'
import './globals.css'
import Navbar from './components/Navbar'
import { Geist, Geist_Mono, JetBrains_Mono } from 'next/font/google'
import Footer from './components/Footer'
import { LoopBadge } from './docs/constants/content/code/LoopBadge'
import AnalyticsProvider from './components/Analytics-provider'
import { GoogleAnalytics } from '@next/third-parties/google'
import { Suspense } from 'react'


const jetBrainsMono = JetBrains_Mono({
    subsets: ['latin'],
    preload: true,
    variable: '--font-jetbrains',
    weight: ['100', '200', '300', '400', '500', '600', '700', '800'],
    display: 'swap',
})
const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
    display: 'swap',
    preload: false,
})
const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
    display: 'swap',
    preload: false,
})

export const metadata: Metadata = {
    title: 'LovableLabs UI',
    description: 'A set of beautifully-designed, accessible UI components and a code distribution platform. Works with your favorite frameworks. Enhance your projects with LovableLabs UI.',
    keywords: [
        'UI Components',
        'React Components',
        'Accessible Components',
        'Design System',
        'Component Library',
        'Open Source',
        'Frontend',
        'Web Development',
        'LovableLabs',
        'Next.js',
        'TypeScript',
        'Reusable Components',
        'SEO Friendly',
        'Code Distribution',
    ],
    authors: [{ name: 'LovableLabs', url: 'https://lovablelabs.xyz' }],
    creator: 'LovableLabs',
    publisher: 'LovableLabs',
    openGraph: {
        title: 'LovableLabs UI',
        description: 'A set of beautifully-designed, accessible UI components and a code distribution platform. Works with your favorite frameworks.',
        url: 'https://lovablelabs.xyz',
        siteName: 'LovableLabs UI',
        images: [
            {
                url: 'https://lovablelabs.xyz/og-image.png',
                width: 1200,
                height: 630,
                alt: 'LovableLabs UI - Beautifully-designed, accessible components',
            },
        ],
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'LovableLabs UI',
        description: 'A set of beautifully-designed, accessible UI components and a code distribution platform. Works with your favorite frameworks.',
        images: ['https://lovablelabs.xyz/og-image.png'],
        creator: '@lovablelabs',
    },
    metadataBase: new URL('https://lovablelabs.xyz'),
    robots: {
        index: true,
        follow: true,
        nocache: false,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
}

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {


    return (
        <html lang="en">
            <GoogleAnalytics
                gaId={process.env.NEXT_PUBLIC_GA_TRACKING_ID ?? ''}
                debugMode={process.env.NODE_ENV === 'development'}
            />
            <body
                className={`${geistSans.variable} ${geistMono.variable} bg-[var(--bg-dark)] ${jetBrainsMono.variable} overflow-x-hidden grain-bg antialiased`}
            >
                <Suspense fallback={null}>
                    <AnalyticsProvider />
                </Suspense>
                <Navbar />
                {children}
                <div className="fixed bottom-5 right-10 z-[100] items-end justify-end hidden md:flex lg:flex">
                    <LoopBadge imageSrc="/assets/memoji/logo.png" />
                </div>
                <Footer />
            </body>
        </html>
    )
}