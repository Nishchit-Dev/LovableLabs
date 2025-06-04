"use client";

import { motion, Variants } from "framer-motion";
import React, { useRef, useEffect, JSX } from "react";
import { frameworks } from "./constants";
import { cn } from "../utils/cn";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Stars } from "@react-three/drei";

interface Framework {
  id: string;
  name: string;
  color: string;
  textColor: string;
}

interface TargetRotation {
  x: number;
  y: number;
}

function InteractiveStars(): JSX.Element {
  const starsRef = useRef<THREE.Points>(null);
  const targetRotation = useRef<TargetRotation>({ x: 0, y: 0 });
  const isHovering = useRef<boolean>(false);
  const containerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const container = document.querySelector(".stars-container");
    if (!container) return;

    containerRef.current = container as HTMLElement;

    const handleMouseMove = (e: MouseEvent) => {
      if (!isHovering.current || !containerRef.current) return;

      // Get container bounds
      const rect = containerRef.current.getBoundingClientRect();

      // Calculate mouse position relative to the container
      const relX = (e.clientX - rect.left) / rect.width;
      const relY = (e.clientY - rect.top) / rect.height;

      // Convert to -1 to 1 range
      const normalizedX = relX * 2 - 1;
      const normalizedY = -(relY * 2 - 1);

      // Update target rotation based on mouse
      targetRotation.current = {
        x: normalizedY * 0.1,
        y: normalizedX * 0.1,
      };
    };

    const handleMouseEnter = () => {
      isHovering.current = true;
    };

    const handleMouseLeave = () => {
      isHovering.current = false;
      targetRotation.current = { x: 0, y: 0 };
    };

    window.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseenter", handleMouseEnter);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseenter", handleMouseEnter);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  // Apply smooth interpolation in the render loop
  useFrame(() => {
    if (starsRef.current) {
      starsRef.current.rotation.x +=
        (targetRotation.current.x - starsRef.current.rotation.x) * 0.075;
      starsRef.current.rotation.y +=
        (targetRotation.current.y - starsRef.current.rotation.y) * 0.075;
    }
  });

  return (
    <Stars
      ref={starsRef}
      radius={240}
      depth={80}
      count={3200}
      factor={4}
      saturation={6}
      fade
      speed={1}
    />
  );
}

function ContinuousShineEffect(): JSX.Element {
  return (
    <motion.div
      className="absolute inset-0 pointer-events-none overflow-hidden rounded-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.15), transparent)",
          transform: "skewX(-20deg)",
        }}
        animate={{
          x: ["200%", "-200%"],
        }}
        transition={{
          repeat: Infinity,
          duration: 3,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute inset-0"
        style={{
          boxShadow: "0 0 10px 2px rgba(255, 255, 255, 0.2)",
        }}
        animate={{
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />

      {/* Subtle bottom light effect - similar to the ::after in your CSS */}
      <motion.div
        className="absolute bottom-0 left-0 right-0"
        style={{
          height: "50%",
          background:
            "radial-gradient(ellipse at center bottom, rgba(255, 255, 255, 0.2) 0%, transparent 70%)",
        }}
        animate={{
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
    </motion.div>
  );
}

export default function DocPage(): JSX.Element {
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

  const getFirstDocPath = (framework: string): string => {
    return `/docs/get-started?framework=${framework}`;
  };

  const linkVariants: Variants = {
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

  const arrowVariants: Variants = {
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
        <div className="h-full w-full overflow-hidden md:rounded-b-full stars-container">
          <Canvas>
            <InteractiveStars />
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
          className="bg-[rgba(40,40,40,0.3)] inline-block px-4 py-1 rounded-full mb-8 backdrop-blur-sm relative"
          {...fadeIn}
        >
          {/* Add the continuous shine effect */}
          <ContinuousShineEffect />

          <span className="text-[var(--font-gray)] text-shadow-lg text-shadow-white uppercase text-sm tracking-wider relative z-10">
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
          LovableLabs UI is available for JavaScript, React and Angular.
        </motion.p>

        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-16"
          {...fadeInUp}
        >
          {frameworks.map((framework: Framework) => (
            <motion.a
              key={framework.id}
              href={getFirstDocPath(framework.id)}
              className={cn(
                "bg-[rgba(30,30,30,0.6)] text-[var(--font-gray)] px-6 py-3 rounded-md flex items-center gap-3 relative backdrop-blur-sm"
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
