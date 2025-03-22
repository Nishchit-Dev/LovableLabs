"use client";
import { motion } from "framer-motion";

interface AnimatedGradientTextProps {
  children: React.ReactNode;
  className?: string;
}

const AnimatedGradientText: React.FC<AnimatedGradientTextProps> = ({
  children,
  className = "",
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <h1
        className={`text-4xl font-bold text-transparent bg-clip-text ${className}`}
        style={{
          backgroundImage:
            "linear-gradient(-45deg, #4F46E5, #06B6D4, #3B82F6, #8B5CF6)",
          backgroundSize: "300% 300%",
          animation: "gradient-animation 6s ease infinite",
        }}
      >
        {children}
      </h1>

      <style jsx global>{`
        @keyframes gradient-animation {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </motion.div>
  );
};

export default AnimatedGradientText;
