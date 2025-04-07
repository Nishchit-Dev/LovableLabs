"use client";

import React from "react";
import Link from "next/link";

const navItems = {
  gettingStarted: [
    { icon: "🚀", label: "Get started", path: "/docs/get-started" },
    { icon: "⭕", label: "Examples", path: "/docs/examples" },
  ],
  categories: [
    {
      title: "Animation",
      items: [
        { label: "Overview", path: "/docs/animation/overview" },
        { label: "Gestures", path: "/docs/animation/gestures" },
        { label: "Scroll", path: "/docs/animation/scroll" },
        { label: "Layout", path: "/docs/animation/layout" },
        { label: "Transitions", path: "/docs/animation/transitions" },
      ],
    },
    {
      title: "Animation",
      items: [
        { label: "Overview", path: "/docs/animation/overview" },
        { label: "Gestures", path: "/docs/animation/gestures" },
        { label: "Scroll", path: "/docs/animation/scroll" },
        { label: "Layout", path: "/docs/animation/layout" },
        { label: "Transitions", path: "/docs/animation/transitions" },
      ],
    },
    {
      title: "Animation",
      items: [
        { label: "Overview", path: "/docs/animation/overview" },
        { label: "Gestures", path: "/docs/animation/gestures" },
        { label: "Scroll", path: "/docs/animation/scroll" },
        { label: "Layout", path: "/docs/animation/layout" },
        { label: "Transitions", path: "/docs/animation/transitions" },
      ],
    },
    {
      title: "Components",
      items: [
        { label: "motion", path: "/docs/components/motion" },
        { label: "AnimatePresence", path: "/docs/components/animatepresence" },
        {
          label: "AnimateNumber",
          path: "/docs/components/animatenumber",
          badge: {
            text: "Prem+",
            color: "var(--font-blue)",
            bgColor: "var(--bg-dark)",
          },
        },
      ],
    },
    {
      title: "Motion values",
      items: [
        { label: "Overview", path: "/docs/values/overview" },
        { label: "useMotionTemplate", path: "/docs/values/usemotiontemplate" },
      ],
    },
    {
      title: "Integrations",
      items: [{ label: "Radix", path: "/docs/integrations/radix" }],
    },
  ],
};

const tableOfContents = [
  { label: "Setting a transition", anchor: "#setting-transition" },
  { label: "Value-specific transitions", anchor: "#value-specific" },
  { label: "Default transitions", anchor: "#default-transitions" },
  {
    label: "Transition settings",
    anchor: "#transition-settings",
    isHeading: true,
    subItems: [
      { label: "Tween", anchor: "#tween" },
      { label: "Spring", anchor: "#spring" },
      { label: "Inertia", anchor: "#inertia" },
      { label: "Orchestration", anchor: "#orchestration" },
    ],
  },
];

export default function DocLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
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
                    className="flex items-center text-[var(--font-gray)] hover:text-[var(--font-white)] transition-colors duration-200"
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
                          className={`text-[var(--font-gray)] hover:text-[var(--font-white)] text-sm ${
                            item.badge ? "flex items-center" : ""
                          }`}
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

            <div className="flex justify-between mt-16 pt-8 border-t border-[rgba(255,255,255,0.1)]">
              <div className="flex items-center text-[var(--font-blue)]">
                <span className="mr-2">←</span> Layout animations
              </div>
              <div className="flex items-center text-white bg-[var(--bg-blue)] px-4 py-2 rounded-md">
                motion <span className="ml-2">→</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Sidebar  */}
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
    </div>
  );
}
