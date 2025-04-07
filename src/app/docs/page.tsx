"use client";

import { motion } from "framer-motion";
import React from "react";

export default function DocPage({ params }: { params: { slug: string } }) {
  const fadeInUp = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      transition={{ staggerChildren: 0.1 }}
    >
      <motion.h1
        className="text-3xl font-bold text-[var(--font-white)] mb-6"
        {...fadeInUp}
      >
        velocity
      </motion.h1>

      <motion.p className="text-[var(--font-gray)] mb-4" {...fadeInUp}>
        Default: Current value velocity
      </motion.p>

      <motion.p className="text-[var(--font-gray)] mb-6" {...fadeInUp}>
        The initial velocity of the spring.
      </motion.p>

      <motion.div
        className="bg-[rgba(30,30,30,0.7)] rounded-md p-4 mb-8 overflow-x-auto"
        {...fadeInUp}
      >
        <pre className="text-[var(--font-gray)]">
          <code>{`<motion.div
  animate={{ rotate: 180 }}
  transition={{ type: "spring", velocity: 2 }}
/>`}</code>
        </pre>
      </motion.div>

      <motion.h1
        className="text-3xl font-bold text-[var(--font-white)] mb-6 mt-12"
        {...fadeInUp}
      >
        restSpeed
      </motion.h1>

      <motion.p className="text-[var(--font-gray)] mb-4" {...fadeInUp}>
        Default: 0.1
      </motion.p>

      <motion.p className="text-[var(--font-gray)] mb-6" {...fadeInUp}>
        End animation if absolute speed (in units per second) drops below this
        value and delta is smaller than restDelta.
      </motion.p>

      <motion.div
        className="bg-[rgba(30,30,30,0.7)] rounded-md p-4 mb-8 overflow-x-auto"
        {...fadeInUp}
      >
        <pre className="text-[var(--font-gray)]">
          <code>{`<motion.div
  animate={{ rotate: 180 }}
  transition={{ type: "spring", restSpeed: 0.5 }}
/>`}</code>
        </pre>
      </motion.div>
    </motion.div>
  );
}
