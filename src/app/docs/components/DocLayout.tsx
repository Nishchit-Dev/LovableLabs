"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  navItems,
  getTableOfContents,
  getPageNavigation,
  TableOfContentsItem,
} from "../constants";

import "./docLayout.css";

export default function DocLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [tableOfContents, setTableOfContents] = useState<TableOfContentsItem[]>(
    []
  );
  const [navigation, setNavigation] = useState<{
    previous: { label: string; path: string } | null;
    next: { label: string; path: string } | null;
  }>({ previous: null, next: null });

  // References to scrollable elements
  const leftSidebarRef = useRef<HTMLDivElement>(null);
  const mainContentRef = useRef<HTMLDivElement>(null);
  const rightSidebarRef = useRef<HTMLDivElement>(null);

  // Check if we're on the main docs page
  const isMainDocsPage = pathname === "/docs";

  useEffect(() => {
    if (isMainDocsPage) {
      // If on main docs page, reset navigation and TOC
      setTableOfContents([]);
      setNavigation({ previous: null, next: null });
      return;
    }

    // Extract slug from pathname (e.g., "/docs/animation-overview" -> "animation-overview")
    const slug = pathname.split("/").pop() || "";

    // Get table of contents for current page
    setTableOfContents(getTableOfContents(slug));

    // Get navigation links
    setNavigation(getPageNavigation(pathname));
  }, [pathname, isMainDocsPage]);

  // Set up scroll event handlers
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      // Don't prevent default behavior for whole page scrolling
      // We'll only prevent default in specific cases

      // Get the element that was scrolled on
      const targetElement = e.target as Node;
      const deltaY = e.deltaY;

      // Determine if cursor is over left sidebar
      const isOverLeftSidebar =
        leftSidebarRef.current &&
        (leftSidebarRef.current.contains(targetElement) ||
          leftSidebarRef.current === targetElement);

      // Determine if cursor is over main content
      const isOverMainContent =
        mainContentRef.current &&
        (mainContentRef.current.contains(targetElement) ||
          mainContentRef.current === targetElement);

      // Determine if cursor is over right sidebar
      const isOverRightSidebar =
        rightSidebarRef.current &&
        (rightSidebarRef.current.contains(targetElement) ||
          rightSidebarRef.current === targetElement);

      // If scrolling over left sidebar
      if (isOverLeftSidebar && leftSidebarRef.current) {
        const { scrollTop, scrollHeight, clientHeight } =
          leftSidebarRef.current;

        // If scrolling down and not at the bottom yet, let sidebar scroll
        if (deltaY > 0 && scrollTop < scrollHeight - clientHeight) {
          e.preventDefault();
          leftSidebarRef.current.scrollTop += deltaY;
          return;
        }
        // If scrolling down and at the bottom, continue to main content
        else if (
          deltaY > 0 &&
          scrollTop >= scrollHeight - clientHeight &&
          mainContentRef.current
        ) {
          e.preventDefault();
          mainContentRef.current.scrollTop += deltaY;
          return;
        }
        // If scrolling up and not at the top, let sidebar scroll
        else if (deltaY < 0 && scrollTop > 0) {
          e.preventDefault();
          leftSidebarRef.current.scrollTop += deltaY;
          return;
        }
        // Let default behavior for other cases (the page will scroll)
      }

      // If scrolling over main content
      else if (isOverMainContent && mainContentRef.current) {
        const { scrollTop, scrollHeight, clientHeight } =
          mainContentRef.current;

        // If scrolling down and not at the bottom, let main content scroll
        if (deltaY > 0 && scrollTop < scrollHeight - clientHeight) {
          e.preventDefault();
          mainContentRef.current.scrollTop += deltaY;
          return;
        }
        // If scrolling up and not at the top, let main content scroll
        else if (deltaY < 0 && scrollTop > 0) {
          e.preventDefault();
          mainContentRef.current.scrollTop += deltaY;
          return;
        }
        // If scrolling up and at the top, go to sidebar (if it has scrollable content)
        else if (deltaY < 0 && scrollTop <= 0 && leftSidebarRef.current) {
          const { scrollTop: leftScrollTop } = leftSidebarRef.current;

          // Only scroll sidebar if it has room to scroll up
          if (leftScrollTop > 0) {
            e.preventDefault();
            leftSidebarRef.current.scrollTop += deltaY;
            return;
          }
        }
        // Let default behavior for other cases (the page will scroll)
      }

      // If scrolling over right sidebar
      else if (isOverRightSidebar && rightSidebarRef.current) {
        const { scrollTop, scrollHeight, clientHeight } =
          rightSidebarRef.current;

        // If scrolling and not at boundaries, let sidebar scroll
        if (
          (deltaY > 0 && scrollTop < scrollHeight - clientHeight) ||
          (deltaY < 0 && scrollTop > 0)
        ) {
          e.preventDefault();
          rightSidebarRef.current.scrollTop += deltaY;
          return;
        }
        // Let default behavior for other cases (the page will scroll)
      }

      // For all other cases, allow default browser scrolling
    };

    // Add event listener to window
    window.addEventListener("wheel", handleWheel, { passive: false });

    // Cleanup
    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, []);

  if (isMainDocsPage) {
    // For the main docs page, we don't show any navigation
    return <div className="min-h-screen bg-[var(--bg-dark)]">{children}</div>;
  }

  return (
    <div className="flex min-h-screen bg-[var(--bg-dark)] w-full pb-12 lg:pb-20 lg:pt-36 pt-24   lg:px-48 px-12 overflow-y-auto overflow-x-hidden">
      {/* Left Sidebar */}
      <div className="w-[auto] flex-shrink-0 h-screen overflow-hidden">
        <div
          ref={leftSidebarRef}
          className="h-full modern-scrollbar fade-edges"
        >
          <div className="px-4 py-6">
            <div className="flex mb-6 border-b border-[rgba(255,255,255,0.1)]">
              <button className="px-4 py-2 text-[var(--font-gray)] hover:text-[var(--font-white)]">
                JS
              </button>
              <button className="px-4 py-2 text-[var(--font-blue)] border-b-2 border-[var(--bg-blue)]">
                React
              </button>
              <button className="px-4 py-2 text-[var(--font-gray)] hover:text-[var(--font-white)]">
                Vue
              </button>
            </div>

            <div className="space-y-6">
              {navItems.gettingStarted.map((item, index) => (
                <div key={index}>
                  <Link
                    href={item.path}
                    className={`flex items-center transition-colors duration-200 ${
                      pathname === item.path
                        ? "text-[var(--font-white)]"
                        : "text-[var(--font-gray)] hover:text-[var(--font-white)]"
                    }`}
                  >
                    <span className="mr-2">{item.icon}</span> {item.label}
                  </Link>
                </div>
              ))}

              {navItems.categories.map((category, catIndex) => (
                <div className="space-y-2" key={catIndex}>
                  <h3 className="text-[var(--font-white)] font-medium mb-2">
                    {category.title}
                  </h3>
                  <ul className="space-y-2 pl-2">
                    {category.items.map((item, itemIndex) => (
                      <li key={itemIndex}>
                        <Link
                          href={item.path}
                          className={`${
                            pathname === item.path
                              ? "text-[var(--font-white)]"
                              : "text-[var(--font-gray)] hover:text-[var(--font-white)]"
                          } text-sm ${item.badge ? "flex items-center" : ""}`}
                        >
                          {item.label}
                          {item.badge && (
                            <span
                              className="ml-2 text-xs"
                              style={{
                                backgroundColor: item.badge.bgColor,
                                color: item.badge.color,
                                padding: "0.125rem 0.5rem",
                                borderRadius: "0.25rem",
                              }}
                            >
                              {item.badge.text}
                            </span>
                          )}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 h-screen overflow-hidden">
        <div ref={mainContentRef} className="h-full fade-edges">
          <div className="max-w-4xl mx-auto px-8 py-12">
            {children}
            {children}
            {children}
            {children}
            {children}
            {children}
            {(navigation.previous || navigation.next) && (
              <div className="flex justify-between mt-16 pt-8 ">
                {navigation.previous && (
                  <Link
                    href={navigation.previous.path}
                    className="flex items-center text-[var(--font-blue)]"
                  >
                    <span className="mr-2">←</span> {navigation.previous.label}
                  </Link>
                )}
                {navigation.next && (
                  <Link
                    href={navigation.next.path}
                    className="flex items-center text-white bg-[var(--bg-blue)] px-4 py-2 rounded-md"
                  >
                    {navigation.next.label} <span className="ml-2">→</span>
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Right Sidebar - Only shown when we have table of contents */}
      {tableOfContents.length > 0 && (
        <div className="w-[auto] flex-shrink-0 h-screen overflow-hidden hidden md:block">
          <div
            ref={rightSidebarRef}
            className="h-full modern-scrollbar fade-edges"
          >
            <div className="px-4 py-6">
              <h3 className="text-[var(--font-white)] font-medium mb-4 border-b border-[rgba(255,255,255,0.2)] w-fit pb-2">
                On this page
              </h3>

              <ul className="space-y-2">
                {tableOfContents.map((item, index) => (
                  <React.Fragment key={index}>
                    <li>
                      <a
                        href={item.anchor}
                        className={`text-[var(--font-gray)] hover:text-[var(--font-white)] transition-colors duration-200 text-sm ${
                          item.isHeading ? "font-medium" : ""
                        }`}
                      >
                        {item.label}
                      </a>
                    </li>
                    {item.subItems?.map((subItem, subIndex) => (
                      <li key={subIndex}>
                        <a
                          href={subItem.anchor}
                          className="text-[var(--font-gray)] hover:text-[var(--font-white)] text-sm pl-2"
                        >
                          {subItem.label}
                        </a>
                      </li>
                    ))}
                  </React.Fragment>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
