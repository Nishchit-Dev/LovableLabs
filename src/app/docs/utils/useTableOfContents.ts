import { useState, useEffect, useRef } from 'react';
import { TableOfContentsItem } from '../constants/types';
import { getTabSpecificTableOfContents, scrollToSection } from '../constants/table-of-contents';

interface UseTableOfContentsProps {
  slug: string;
  initialTab?: 'preview' | 'variants';
}

interface UseTableOfContentsReturn {
  tableOfContents: TableOfContentsItem[];
  activeTab: 'preview' | 'variants';
  activeSection: string;
  handleTabChange: (tab: 'preview' | 'variants') => void;
  handleTocItemClick: (anchor: string) => void;
}

/**
 * Custom hook for managing table of contents with tab-specific content
 */
export const useTableOfContents = ({ 
  slug, 
  initialTab = 'preview' 
}: UseTableOfContentsProps): UseTableOfContentsReturn => {
  const [tableOfContents, setTableOfContents] = useState<TableOfContentsItem[]>([]);
  const [activeTab, setActiveTab] = useState<'preview' | 'variants'>(initialTab);
  const [activeSection, setActiveSection] = useState<string>('');
  const headersRef = useRef<HTMLElement[]>([]);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Update TOC when tab or slug changes
  useEffect(() => {
    setTableOfContents(getTabSpecificTableOfContents(slug, activeTab));
  }, [slug, activeTab]);

  // Listen for tab changes from DocSection component
  useEffect(() => {
    const handleTabChangeEvent = (event: CustomEvent) => {
      if (event.detail && (event.detail.tab === 'preview' || event.detail.tab === 'variants')) {
        setActiveTab(event.detail.tab);
      }
    };
    
    // Add event listener for custom tab change event
    window.addEventListener('docTabChange' as any, handleTabChangeEvent as EventListener);
    
    return () => {
      window.removeEventListener('docTabChange' as any, handleTabChangeEvent as EventListener);
    };
  }, []);

  // Set up intersection observer to track active section
  useEffect(() => {
    // Disconnect previous observer if it exists
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    // Get all section headers
    const headers = Array.from(document.querySelectorAll('h2[id], h3[id]'));
    headersRef.current = headers as HTMLElement[];

    // Set up new observer
    const observer = new IntersectionObserver(
      (entries) => {
        // Get all entries that are intersecting
        const visibleEntries = entries.filter((entry) => entry.isIntersecting);
        
        // If we have visible entries, set the active section to the first one
        if (visibleEntries.length > 0) {
          // Sort by their position in the document
          visibleEntries.sort((a, b) => {
            const aRect = a.boundingClientRect;
            const bRect = b.boundingClientRect;
            return aRect.top - bRect.top;
          });
          
          // Get the first visible entry
          const firstVisible = visibleEntries[0];
          
          if (firstVisible.target.id) {
            setActiveSection(`#${firstVisible.target.id}`);
          }
        }
      },
      {
        rootMargin: '-80px 0px -80% 0px', // Adjust these values as needed
        threshold: [0, 0.25, 0.5, 0.75, 1]
      }
    );

    // Observe all headers
    headersRef.current.forEach((header) => {
      observer.observe(header);
    });

    observerRef.current = observer;

    return () => {
      observer.disconnect();
    };
  }, [tableOfContents, activeTab]);

  // Handle tab change (can be called directly)
  const handleTabChange = (tab: 'preview' | 'variants') => {
    setActiveTab(tab);
  };

  // Handle TOC item click
  const handleTocItemClick = (anchor: string) => {
    scrollToSection(anchor);
    setActiveSection(anchor);
  };

  return {
    tableOfContents,
    activeTab,
    activeSection,
    handleTabChange,
    handleTocItemClick
  };
}; 