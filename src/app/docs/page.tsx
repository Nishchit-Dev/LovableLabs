"use client";

import { motion } from "framer-motion";
import React from "react";
import { frameworks } from "./constants";
import { cn } from "../utils/cn";
import { Canvas } from "@react-three/fiber";
import { SpotLight, Stars } from "@react-three/drei";

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

  const linkVariants = {
    initial: { scale: 1, filter: "drop-shadow(0 0 0 transparent)" },
    hover: (color: string) => ({
      scale: 1.05,
      filter: `drop-shadow(0 5px 5px ${color})`,
      transition: {
        duration: 0.4,

        scale: { duration: 0.4 },
        filter: { duration: 0.4 },
      },
    }),
  };

  const arrowVariants = {
    initial: { x: 0 },
    hover: {
      x: 7,
      transition: {
        duration: 0.4,
      },
    },
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] py-16 relative">
      <motion.div
        initial={{ y: -150, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="absolute inset-0 top-0 bg-gradient-to-b from-[#1E1E1E] to-[#121212] h-screen md:h-auto md:rounded-b-full z-[5]"
      >
        <div className="h-full w-full overflow-hidden md:rounded-b-full">
          <Canvas>
            <Stars
              radius={240}
              depth={80}
              count={3200}
              factor={4}
              saturation={6}
              fade
              speed={1}
            />
          </Canvas>
        </div>
      </motion.div>
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
          className="text-5xl md:text-6xl font-bold mb-6 text-font-white"
          {...fadeInUp}
        >
          Get started <br /> with <span className="text-font-blue">Love</span>
        </motion.h1>

        <motion.p
          className="text-[var(--font-gray)] text-xl mb-12"
          {...fadeInUp}
        >
          Lovable UI is available for JavaScript, React and Angular.
        </motion.p>

        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-16"
          {...fadeInUp}
        >
          {frameworks.map((framework) => (
            <motion.a
              key={framework.id}
              href={getFirstDocPath(framework.id)}
              className={cn(
                "bg-[rgba(30,30,30,0.6)] text-[var(--font-gray)] px-6 py-3 rounded-md flex items-center gap-3 relative"
              )}
              variants={linkVariants}
              initial="initial"
              whileHover="hover"
              custom={framework.color}
            >
              <div
                className="w-6 h-6 flex items-center justify-center rounded text-black z-100"
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
              <motion.svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                variants={arrowVariants}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </motion.svg>
            </motion.a>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
