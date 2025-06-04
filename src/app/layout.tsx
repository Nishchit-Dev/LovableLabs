import type { Metadata } from 'next'
import './globals.css'
import Navbar from './components/Navbar'

import { Geist, Geist_Mono, JetBrains_Mono } from 'next/font/google'
import Footer from './components/Footer'
import { LoopBadge } from './docs/constants/content/code/LoopBagdeAnimation'



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
    description: 'UI Components for Lovablelabs Devs',
}

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
            <body
                className={`  ${geistSans.variable} ${geistMono.variable} bg-[var(--bg-dark)] ${jetBrainsMono.variable} overflow-x-hidden grain-bg antialiased`}
            >
                <Navbar />
                {children}
                <div className="fixed bottom-5 right-10 z-[100] flex items-end justify-end">
                    <LoopBadge imageSrc="/assets/memoji/logo.png" />
                </div>
                <Footer />
            </body>
        </html>
    )
}
