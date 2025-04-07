"use client";

import { motion } from "framer-motion";
import React from "react";

export default function GetStartedPage() {
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
        Getting Started with Lovable UI
      </motion.h1>

      <motion.p className="text-[var(--font-gray)] mb-6" {...fadeInUp}>
        Welcome to Lovable UI - a beautiful and flexible UI component library
        for React. This guide will help you get started with installation and
        basic usage.
      </motion.p>

      <motion.h2
        className="text-2xl font-bold text-[var(--font-white)] mb-4 mt-10"
        {...fadeInUp}
        id="installation"
      >
        Installation
      </motion.h2>

      <motion.p className="text-[var(--font-gray)] mb-4" {...fadeInUp}>
        To get started with Lovable UI, install it via npm or yarn:
      </motion.p>

      <motion.div
        className="bg-[rgba(30,30,30,0.7)] rounded-md p-4 mb-8 overflow-x-auto"
        {...fadeInUp}
      >
        <pre className="text-[var(--font-gray)]">
          <code>{`# With npm
npm install lovable-ui

# With yarn
yarn add lovable-ui`}</code>
        </pre>
      </motion.div>

      <motion.h2
        className="text-2xl font-bold text-[var(--font-white)] mb-4 mt-10"
        {...fadeInUp}
        id="basic-usage"
      >
        Basic Usage
      </motion.h2>

      <motion.p className="text-[var(--font-gray)] mb-4" {...fadeInUp}>
        Import components from Lovable UI:
      </motion.p>

      <motion.div
        className="bg-[rgba(30,30,30,0.7)] rounded-md p-4 mb-8 overflow-x-auto"
        {...fadeInUp}
      >
        <pre className="text-[var(--font-gray)]">
          <code>{`import { Button, Card } from 'lovable-ui';

function App() {
  return (
    <div>
      <Card>
        <h2>Welcome to Lovable UI</h2>
        <p>This is a beautiful card component</p>
        <Button>Click me</Button>
      </Card>
    </div>
  );
}`}</code>
        </pre>
      </motion.div>

      <motion.h2
        className="text-2xl font-bold text-[var(--font-white)] mb-4 mt-10"
        {...fadeInUp}
        id="customization"
      >
        Customization
      </motion.h2>

      <motion.p className="text-[var(--font-gray)] mb-4" {...fadeInUp}>
        Lovable UI components are highly customizable. You can override styles,
        extend functionality, and create your own themes:
      </motion.p>

      <motion.div
        className="bg-[rgba(30,30,30,0.7)] rounded-md p-4 mb-8 overflow-x-auto"
        {...fadeInUp}
      >
        <pre className="text-[var(--font-gray)]">
          <code>{`import { ThemeProvider, Button } from 'lovable-ui';

const myTheme = {
  colors: {
    primary: '#ff0088',
    secondary: '#121212',
    // ...other colors
  },
  // ...other theme properties
};

function App() {
  return (
    <ThemeProvider theme={myTheme}>
      <Button>Themed Button</Button>
    </ThemeProvider>
  );
}`}</code>
        </pre>
      </motion.div>

      <motion.h2
        className="text-2xl font-bold text-[var(--font-white)] mb-4 mt-10"
        {...fadeInUp}
        id="next-steps"
      >
        Next Steps
      </motion.h2>

      <motion.p className="text-[var(--font-gray)] mb-4" {...fadeInUp}>
        Now that you&apos;ve got the basics, check out our examples to see more
        complex use cases, or dive into our component documentation to learn
        about all available components and their props.
      </motion.p>
    </motion.div>
  );
}
