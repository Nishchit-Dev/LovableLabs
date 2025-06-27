'use client'
import Head from 'next/head'
import React from 'react'
import { usePathname } from 'next/navigation' // Fixed: Use usePathname instead of useRouter

interface SEOProps {
    title?: string
    description?: string
    image?: string
    url?: string
    type?: 'website' | 'article' | 'product' | 'profile'
    keywords?: string
    author?: string
    publishedTime?: string
    modifiedTime?: string
    siteName?: string
    locale?: string
    canonicalUrl?: string
    noIndex?: boolean
    noFollow?: boolean
    extraMeta?: Array<React.ReactElement>
    structuredData?: object
}

const routeKeywords: Record<string, string> = {
    '/': 'UI components, React, Next.js, LovableLabs, design system, accessible components, modern UI',
    '/about': 'About LovableLabs, team, mission, company, UI component library',
    '/contact': 'Contact LovableLabs, support, help, customer service',
    '/components':
        'React components, UI library, design system, component documentation',
    '/pricing': 'Pricing, plans, subscription, LovableLabs UI pricing',
    '/docs': 'Documentation, guides, tutorials, component docs, API reference',
    '/blog': 'Blog, articles, UI design, React tutorials, web development',
    '/templates': 'Templates, UI templates, React templates, design templates',
    // Add more routes and keywords as needed
}

const routeTitles: Record<string, string> = {
    '/': 'LovableLabs UI - Beautiful React Components & Design System',
    '/about': 'About Us - LovableLabs UI',
    '/contact': 'Contact Us - LovableLabs UI',
    '/components': 'Components - LovableLabs UI',
    '/pricing': 'Pricing - LovableLabs UI',
    '/docs': 'Documentation - LovableLabs UI',
    '/blog': 'Blog - LovableLabs UI',
    '/templates': 'Templates - LovableLabs UI',
}

const routeDescriptions: Record<string, string> = {
    '/': 'A comprehensive set of beautifully-designed, accessible UI components and design system. Build stunning React applications with LovableLabs UI components.',
    '/about':
        'Learn about LovableLabs, our mission to create beautiful and accessible UI components, and the team behind the design system.',
    '/contact':
        'Get in touch with the LovableLabs team. Contact us for support, partnerships, or general inquiries about our UI components.',
    '/components':
        'Explore our extensive library of React components. Find buttons, forms, navigation, and more with full documentation and examples.',
    '/pricing':
        'Choose the perfect plan for your needs. Explore LovableLabs UI pricing options for individuals, teams, and enterprises.',
    '/docs':
        'Complete documentation for LovableLabs UI components. Learn how to install, customize, and implement our design system.',
    '/blog':
        'Stay updated with the latest in UI design, React development, and web technologies. Read articles from the LovableLabs team.',
    '/templates':
        'Ready-to-use templates built with LovableLabs UI components. Accelerate your development with pre-built designs.',
}

export default function SEO({
    title,
    description,
    image = 'https://lovablelabs.xyz/og-image.png',
    url,
    type = 'website',
    keywords,
    author = 'LovableLabs Team',
    publishedTime,
    modifiedTime,
    siteName = 'LovableLabs UI',
    locale = 'en_US',
    canonicalUrl,
    noIndex = false,
    noFollow = false,
    extraMeta = [],
    structuredData,
}: SEOProps) {
    const pathname = usePathname() // Fixed: Use usePathname for app directory

    // Resolve dynamic values based on current route
    const resolvedTitle = title || routeTitles[pathname] || routeTitles['/']
    const resolvedDescription =
        description || routeDescriptions[pathname] || routeDescriptions['/']
    const resolvedKeywords =
        keywords || routeKeywords[pathname] || routeKeywords['/']
    const resolvedUrl = url || `https://lovablelabs.xyz${pathname}`
    const resolvedCanonicalUrl = canonicalUrl || resolvedUrl

    // Create robots content
    const robotsContent = [
        noIndex ? 'noindex' : 'index',
        noFollow ? 'nofollow' : 'follow',
    ].join(', ')

    return (
        <Head>
            {/* Basic Meta Tags */}
            <title>{resolvedTitle}</title>
            <meta name="description" content={resolvedDescription} />
            <meta name="keywords" content={resolvedKeywords} />
            <meta name="author" content={author} />
            <meta name="robots" content={robotsContent} />
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1.0"
            />
            <meta httpEquiv="Content-Language" content="en" />
            <meta name="theme-color" content="#6366f1" />

            {/* Canonical URL */}
            <link rel="canonical" href={resolvedCanonicalUrl} />

            {/* Open Graph Meta Tags */}
            <meta property="og:type" content={type} />
            <meta property="og:site_name" content={siteName} />
            <meta property="og:title" content={resolvedTitle} />
            <meta property="og:description" content={resolvedDescription} />
            <meta property="og:image" content={image} />
            <meta
                property="og:image:alt"
                content={`${resolvedTitle} - Preview`}
            />
            <meta property="og:url" content={resolvedUrl} />
            <meta property="og:locale" content={locale} />

            {/* Article specific meta tags */}
            {type === 'article' && publishedTime && (
                <meta
                    property="article:published_time"
                    content={publishedTime}
                />
            )}
            {type === 'article' && modifiedTime && (
                <meta property="article:modified_time" content={modifiedTime} />
            )}
            {type === 'article' && author && (
                <meta property="article:author" content={author} />
            )}

            {/* Twitter Card Meta Tags */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:site" content="@lovablelabs" />
            <meta name="twitter:creator" content="@lovablelabs" />
            <meta name="twitter:title" content={resolvedTitle} />
            <meta name="twitter:description" content={resolvedDescription} />
            <meta name="twitter:image" content={image} />
            <meta
                name="twitter:image:alt"
                content={`${resolvedTitle} - Preview`}
            />

            {/* Additional SEO Meta Tags */}
            <meta name="format-detection" content="telephone=no" />
            <meta name="apple-mobile-web-app-capable" content="yes" />
            <meta
                name="apple-mobile-web-app-status-bar-style"
                content="default"
            />
            <meta name="apple-mobile-web-app-title" content={siteName} />

            {/* Favicon and App Icons */}
            <link rel="icon" href="/favicon.ico" />
            <link
                rel="icon"
                type="image/png"
                sizes="32x32"
                href="/favicon-32x32.png"
            />
            <link
                rel="icon"
                type="image/png"
                sizes="16x16"
                href="/favicon-16x16.png"
            />
            <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
            <link rel="manifest" href="/manifest.json" />

            {/* Preconnect to external domains for performance */}
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link
                rel="preconnect"
                href="https://fonts.gstatic.com"
                crossOrigin="anonymous"
            />

            {/* Structured Data (JSON-LD) */}
            {structuredData && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(structuredData),
                    }}
                />
            )}

            {/* Extra meta tags */}
            {extraMeta.map((meta, idx) =>
                React.cloneElement(meta, { key: idx })
            )}
        </Head>
    )
}

// Helper function to generate structured data
export const generateStructuredData = {
    website: (name: string, url: string, description: string) => ({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: name,
        url: url,
        description: description,
        potentialAction: {
            '@type': 'SearchAction',
            target: `${url}/search?q={search_term_string}`,
            'query-input': 'required name=search_term_string',
        },
    }),

    organization: (name: string, url: string, logo: string) => ({
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: name,
        url: url,
        logo: logo,
        sameAs: [
            'https://twitter.com/lovablelabs',
            'https://github.com/lovablelabs',
            'https://linkedin.com/company/lovablelabs',
        ],
    }),

    article: (
        title: string,
        description: string,
        image: string,
        datePublished: string,
        dateModified: string,
        author: string
    ) => ({
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: title,
        description: description,
        image: image,
        datePublished: datePublished,
        dateModified: dateModified,
        author: {
            '@type': 'Person',
            name: author,
        },
    }),

    product: (
        name: string,
        description: string,
        image: string,
        price?: string,
        currency?: string
    ) => ({
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: name,
        description: description,
        image: image,
        ...(price &&
            currency && {
                offers: {
                    '@type': 'Offer',
                    price: price,
                    priceCurrency: currency,
                    availability: 'https://schema.org/InStock',
                },
            }),
    }),
}

// Usage examples:
/*
// Basic usage
<SEO />

// Custom title and description
<SEO 
    title="Custom Page Title"
    description="Custom page description"
/>

// Article page
<SEO 
    title="How to Build Better UI Components"
    description="Learn the best practices for creating reusable UI components"
    type="article"
    publishedTime="2024-01-15T10:00:00Z"
    modifiedTime="2024-01-16T10:00:00Z"
    structuredData={generateStructuredData.article(
        "How to Build Better UI Components",
        "Learn the best practices...",
        "https://lovablelabs.xyz/blog-image.png",
        "2024-01-15T10:00:00Z",
        "2024-01-16T10:00:00Z",
        "John Doe"
    )}
/>

// Product page
<SEO 
    title="Premium UI Components - LovableLabs"
    description="Get access to premium React components"
    type="product"
    structuredData={generateStructuredData.product(
        "Premium UI Components",
        "Professional React components",
        "https://lovablelabs.xyz/product-image.png",
        "99.00",
        "USD"
    )}
/>

// No index page (private/admin)
<SEO 
    title="Admin Dashboard"
    noIndex={true}
    noFollow={true}
/>
*/
