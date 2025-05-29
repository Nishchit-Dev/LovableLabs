"use client";

import ShinyText from "@/UI/ShinyText";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Navbar() {
  const links = [
    { label: "Docs", path: "/docs" },
    { label: "Examples", path: "/examples" },
    { label: "playground", path: "/playground" },
  ];

  return (
    <nav className="bg-black/30  backdrop-blur-sm text-white px-6 py-3 fixed top-5 z-[99]   w-[65%] left-1/2 -translate-x-1/2 rounded-full">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-6">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <motion.div
              className="w-6 h-6 bg-[var(--bg-blue)] rounded flex items-center justify-center text-black text-[16px] font-bold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              LU
            </motion.div>
          </Link>

          {/* Nav links */}
          <div className="flex gap-6">
            {links.map((link, index) => (
              <div key={index}>
                <motion.div
                  className="relative group"
                  whileHover="hover"
                  initial="rest"
                  animate="rest"
                >
                  <Link
                    href={link.path}
                    className="text-[var(--font-gray)] group-hover:text-[var(--font-white)] transition-colors duration-300"
                  >
                    <motion.span
                      variants={{
                        rest: {
                          textShadow: "0px 0px 0px rgba(255,255,255,0)",
                        },
                        hover: {
                          textShadow: "0px 0px 8px rgba(255,255,255,0.8)",
                        },
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      {link.label}
                    </motion.span>

                    {/* Underline animation */}
                    <motion.div
                      className="absolute left-0 -bottom-1 h-[2px] bg-[var(--font-white)] rounded"
                      variants={{
                        rest: { width: 0 },
                        hover: { width: "100%" },
                      }}
                      transition={{
                        duration: 0.3,
                        ease: "easeInOut",
                      }}
                    />
                  </Link>
                </motion.div>
              </div>
            ))}
          </div>
        </div>

        {/* Right side */}
        {false && (
          <div className="flex items-center space-x-4">
            <ShinyText
              text="Get Prem +"
              speed={3}
              isHoverEnable={true}
              hoverClass="hover:text-blue-300"
              className="cursor-pointer"
            />
          </div>
        )}
      </div>
    </nav>
  );
}
