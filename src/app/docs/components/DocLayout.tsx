"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  navItems,
  getTableOfContents,
  getPageNavigation,
  TableOfContentsItem,
} from "../constants";

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

  if (isMainDocsPage) {
    // For the main docs page, we don't show any navigation
    return <div className="min-h-screen bg-[var(--bg-dark)]">{children}</div>;
  }

  return (
    <div className="flex min-h-screen bg-[var(--bg-dark)]">
      {/* Left Sidebar  */}
      <div className="w-60 flex-shrink-0 h-screen overflow-hidden">
        <div className="h-full overflow-y-auto scrollbar-thin border-r border-[rgba(255,255,255,0.1)]">
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

      {/* Main content  */}
      <div className="flex-1 h-screen overflow-hidden">
        <div className="h-full overflow-y-auto">
          <div className="max-w-4xl mx-auto px-8 py-12">
            {children}

            {(navigation.previous || navigation.next) && (
              <div className="flex justify-between mt-16 pt-8 border-t border-[rgba(255,255,255,0.1)]">
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
        <div className="w-64 flex-shrink-0 h-screen overflow-hidden hidden md:block">
          <div className="h-full overflow-y-auto scrollbar-thin border-l border-[rgba(255,255,255,0.1)]">
            <div className="px-4 py-6">
              <h3 className="text-[var(--font-white)] font-medium mb-4">
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
