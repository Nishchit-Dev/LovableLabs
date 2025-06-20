'use client'

import React, { Suspense } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'

// This file handles internal 404 errors in Next.js App Router
function NotFoundContent() {
  return (
    <div className="h-full relative">
      <div
        style={{ opacity: 0.04 }}
        className="absolute z-10 w-screen h-screen bg-[url('https://framerusercontent.com/images/rR6HYXBrMmX4cRpXfXUOvpvpB0.png')] bg-repeat bg-[length:128px] rounded-none"
      ></div>
      <div className="min-h-screen bg-black flex flex-col items-center justify-center overflow-hidden relative px-3 sm:px-4">
        {/* Gradient backgrounds */}
        <div className="w-full absolute h-[70%] sm:h-[75%] md:h-[60%] lg:h-[80%] xl:h-[80%] bottom-0 z-[1]">
          <motion.div
            animate={{ scale: [1, 1.08, 1] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="w-full h-full absolute"
            style={{
              background:
                'radial-gradient(ellipse 100% 100% at bottom, #000000 100%)',
            }}
          ></motion.div>
          <motion.div
            animate={{ scale: [1, 1.15, 1] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="w-full h-full absolute"
            style={{
              background:
                'radial-gradient(ellipse 50% 70% at bottom,#32247A 95%, transparent 140%,transparent 60%,transparent 80%)',
            }}
          ></motion.div>
          <motion.div
            animate={{ scale: [1, 1.18, 1], opacity: [1, 0.7, 1] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="w-full h-full absolute"
            style={{
              background:
                'radial-gradient(ellipse 40% 80% at bottom, #2B1C83 70%, transparent 125%)',
            }}
          ></motion.div>
          <motion.div
            animate={{ scale: [1, 1.08, 1], opacity: [1, 0.8, 1] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="w-full h-full absolute"
            style={{
              background:
                'radial-gradient(ellipse 30% 60% at bottom, #8C80DB 80%, transparent 135%)',
            }}
          ></motion.div>
          <motion.div
            animate={{ scale: [1, 1.07, 1], opacity: [1, 0.75, 1] }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="w-full h-full absolute"
            style={{
              background:
                'radial-gradient(ellipse 20% 40% at bottom, #F9F9FB 50%,transparent 120%)',
            }}
          ></motion.div>
        </div>
        
        {/* Content */}
        <div className="z-[1000] flex flex-col items-center justify-center px-4 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold mb-6 text-white"
          >
            404 - Page Not Found
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl mb-8 max-w-2xl text-white/80"
          >
            The page you are looking for doesn&apos;t exist or has been moved.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="btn-animated"
          >
            <Link 
              href="/"
              className="z-10 px-6 py-3 rounded-lg bg-black/70 border border-violet-200/70 text-white font-medium hover:bg-black/90 transition-all"
            >
              Return Home 🚀
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default function NotFound() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen bg-black">Loading...</div>}>
      <NotFoundContent />
    </Suspense>
  )
} 