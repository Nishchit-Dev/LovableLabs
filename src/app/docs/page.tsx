"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import React from "react";
import { frameworks } from "./constants";

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

  // Get the first doc path with the specified framework
  const getFirstDocPath = (framework: string) => {
    return `/docs/get-started?framework=${framework}`;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] py-16 relative">
      <motion.div
        initial={{ y: -150, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="absolute inset-0 bg-gradient-to-b from-[#1E1E1E] to-[#121212] h-screen md:h-auto  md:rounded-b-full   z-[5]"
      ></motion.div>
      <motion.div
        className="w-full max-w-4xl mx-auto text-center z-[10]"
        initial="initial"
        animate="animate"
        transition={{ staggerChildren: 0.1 }}
      >
        <motion.div
          className="bg-[rgba(40,40,40,0.3)] inline-block px-4 py-1 rounded-full mb-8"
          {...fadeIn}
        >
          <span className="text-[var(--font-gray)] text-shadow-lg text-shadow-white uppercase text-sm tracking-wider">
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
          className="text-[var(--font-gray)] text-xl mb-12 "
          {...fadeInUp}
        >
          Lovable UI is available for JavaScript, React and Angular.
        </motion.p>

        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-16"
          {...fadeInUp}
        >
          {frameworks.map((framework) => (
            <Link
              key={framework.id}
              href={getFirstDocPath(framework.id)}
              className="bg-[rgba(30,30,30,0.6)] hover:bg-[rgba(40,40,40,0.8)] text-[var(--font-gray)] px-6 py-3 rounded-md flex items-center gap-3 transition-colors relative "
            >
              <div
                className="w-6 h-6 flex items-center justify-center rounded text-black z-100 "
                style={{
                  backgroundColor: framework.color,
                  color: framework.textColor,
                }}
              >
                {framework.id === "js"
                  ? "JS"
                  : framework.id.charAt(0).toUpperCase()}
              </div>
              {framework.name}
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
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
