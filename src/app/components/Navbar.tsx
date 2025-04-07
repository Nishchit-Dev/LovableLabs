"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Navbar() {
  const links = [
    { label: "Docs", path: "/docs" },
    { label: "Examples", path: "/examples" },
  ];

  return (
    <nav className="bg-[rgba(14,14,17,0.8)] backdrop-blur-lg text-white px-8 py-4 sticky top-0 z-[99] border-b border-[rgba(255,255,255,0.1)] shadow-lg rounded-b-xl">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-6">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <motion.div
              className="w-8 h-8 bg-[var(--bg-blue)] rounded flex items-center justify-center text-black font-bold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              LU
            </motion.div>
          </Link>

          {/* Nav links */}
          <div className="flex gap-6">
            {links.map((link, index) => (
              <Link
                href={link.path}
                key={index}
                className="text-[var(--font-gray)] hover:text-[var(--font-white)] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center space-x-4">
          <button className="text-[var(--font-gray)] hover:text-[var(--font-white)]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>
          <motion.button
            className="bg-[var(--bg-blue)] text-[var(--bg-offwhite)] font-medium px-4 py-2 rounded-md flex items-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get Prem+
          </motion.button>
        </div>
      </div>
    </nav>
  );
}
