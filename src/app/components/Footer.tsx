"use client";

import React from "react";
import { motion } from "framer-motion";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 10, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
      },
    },
  };

  const footerLinks = [
    {
      title: "SITE",
      links: [
        { label: "About", url: "/about" },
        { label: "Blog", url: "/blog" },
        { label: "Docs", url: "/docs" },
      ],
    },
    {
      title: "SOCIAL",
      links: [
        { label: "Discord", url: "https://discord.gg/lovableui" },
        { label: "GitHub", url: "https://github.com/lovable-ui" },
        { label: "X/Twitter", url: "https://twitter.com/lovableui" },
      ],
    },
  ];

  return (
    <motion.footer
      className="bg-[var(--bg-dark)] border-t border-[rgba(255,255,255,0.1)] py-10 px-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-screen-xl mx-auto">
        <div className="pt-4 border-t  mb-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h3 className="text-[var(--font-white)] font-medium">
                Stay in the loop
              </h3>
              <p className="text-[var(--font-gray)] text-sm">
                Subscribe for the latest news & updates.
              </p>
            </div>
            <motion.div
              className="flex mt-4 md:mt-0"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <input
                type="email"
                placeholder="my@email.com"
                className="bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-l px-4 py-2 text-[var(--font-white)]"
              />
              <motion.button
                className="bg-[var(--bg-blue)] text-[var(--bg-offwhite)] font-medium px-4 py-2 rounded-r"
                whileTap={{ scale: 0.95 }}
              >
                Subscribe
              </motion.button>
            </motion.div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between">
          <motion.div variants={itemVariants} className="mb-8 md:mb-0">
            <div className="w-8 h-8 bg-[var(--bg-blue)] rounded flex items-center justify-center text-black font-bold mb-4">
              LU
            </div>
            <p className="text-[var(--font-gray)] text-xs mt-4">
              ©{currentYear} Lovable UI. All rights reserved.
            </p>
          </motion.div>

          <div className="flex space-x-16">
            {footerLinks.map((category, idx) => (
              <motion.div key={idx} variants={itemVariants}>
                <h4 className="text-[var(--font-white)] font-medium mb-4">
                  {category.title}
                </h4>
                <ul className="space-y-2">
                  {category.links.map((link, linkIdx) => (
                    <li key={linkIdx}>
                      <a
                        href={link.url}
                        className="text-[var(--font-gray)] text-sm hover:text-[var(--font-white)] transition-colors"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
