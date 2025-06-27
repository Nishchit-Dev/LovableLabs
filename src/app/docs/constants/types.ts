import { JSX } from 'react'

// Framework type for different documentation versions
export type Framework = {
    id: string
    name: string
    color: string
    textColor: string
}

// Navigation item type for sidebar items
export type NavItem = {
    icon?: string
    label: string
    path: string
    badge?: {
        text: string
        color: string
        bgColor: string
    }
    isLock?: boolean
    releaseDate?: string
    isComingSoon?: true
    varaints?: number
}

// Category type for grouping navigation items
export type Category = {
    title: string
    slug: string
    items: NavItem[]
}

// Table of contents item for right sidebar
export type TableOfContentsItem = {
    label: string
    anchor: string
    isHeading?: boolean
    tab?: 'preview' | 'variants' // Specify which tab this item belongs to
    subItems?: {
        label: string
        anchor: string
        tab?: 'preview' | 'variants' // Specify which tab this subitem belongs to
    }[]
}

// Content section type for documentation pages
export type ContentSection = {
    title: string
    description?: string
    content?: string
    code?: string
    codeSrc?: string
    copy_event?: string
    isLiveDemo: boolean
    preview?: JSX.Element
    isComingSoon?: boolean
}

// Full document content type
export type DocContent = {
    title: string
    isComingSoon?: boolean
    description: string
    preview?: JSX.Element
    isLock?: boolean
    releaseDate?: string
    SEOTitle?: string
    SEODescription?: string
    sections: ContentSection[]
    variantTab?: ContentSection[]
}
