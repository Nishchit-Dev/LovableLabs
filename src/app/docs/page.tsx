"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import React from "react";
import { docCategories } from "./constants/navigation";

export default function DocPage() {
  const fadeIn = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.5 },
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  };

  // Get the first item from the first category
  const getFirstDocPath = () => {
    // In a real app, you would have different paths for different frameworks
    // For now, we'll just use the first item in the first category
    return docCategories[0]?.items[0]?.path || "/docs/animation-overview";
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] py-16">
      <motion.div
        className="w-full max-w-4xl mx-auto text-center"
        initial="initial"
        animate="animate"
        transition={{ staggerChildren: 0.1 }}
      >
        <motion.div
          className="bg-[rgba(40,40,40,0.3)] inline-block px-4 py-1 rounded-full mb-8"
          {...fadeIn}
        >
          <span className="text-[var(--font-gray)] uppercase text-sm tracking-wider">
            Documentation
          </span>
        </motion.div>

        <motion.h1
          className="text-5xl md:text-6xl font-bold text-[var(--font-white)] mb-6"
          {...fadeInUp}
        >
          Get started <br /> with Love
        </motion.h1>

        <motion.p
          className="text-[var(--font-gray)] text-xl mb-12"
          {...fadeInUp}
        >
          Lovable UI is available for vanilla JavaScript, React and Vue.
        </motion.p>

        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-16"
          {...fadeInUp}
        >
          <Link
            href={getFirstDocPath()}
            className="bg-[rgba(30,30,30,0.6)] hover:bg-[rgba(40,40,40,0.8)] text-[var(--font-gray)] px-6 py-3 rounded-md flex items-center gap-3 transition-colors"
          >
            <div className="bg-[#f7df1e] w-6 h-6 flex items-center justify-center rounded text-black">
              JS
            </div>
            JavaScript
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>

          <Link
            href={getFirstDocPath()}
            className="bg-[rgba(30,30,30,0.6)] hover:bg-[rgba(40,40,40,0.8)] text-[var(--font-gray)] px-6 py-3 rounded-md flex items-center gap-3 transition-colors"
          >
            <div className="bg-[#61dafb] w-6 h-6 flex items-center justify-center rounded text-black">
              R
            </div>
            React
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>

          <Link
            href={getFirstDocPath()}
            className="bg-[rgba(30,30,30,0.6)] hover:bg-[rgba(40,40,40,0.8)] text-[var(--font-gray)] px-6 py-3 rounded-md flex items-center gap-3 transition-colors"
          >
            <div className="bg-[#42b883] w-6 h-6 flex items-center justify-center rounded text-white">
              V
            </div>
            Vue
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
