"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { clsx } from "clsx";

interface ShinyTextProps {
  text: string;
  disabled?: boolean;
  speed?: number;
  className?: string;
  isHoverEnable: boolean;
  hoverClass?: string;
}

const ShinyText: React.FC<ShinyTextProps> = ({
  text,
  disabled = false,
  speed = 5,
  className = "",
  isHoverEnable = true,
  hoverClass = "",
}) => {
  const animation = useMemo(
    () => ({
      backgroundPosition: ["100%", "-100%"],
      transition: {
        duration: speed,
        ease: "linear",
        repeat: Infinity,
      },
    }),
    [speed]
  );

  return (
    <motion.span
      className={clsx(
        `inline-block text-[#b5b5b5a4] ${
          isHoverEnable ? `${hoverClass}` : ""
        }  transition-colors duration-300 bg-gradient-to-r from-transparent via-white/80 to-transparent bg-[length:200%_100%] [background-clip:text] ",
        !disabled && "animate-none`,
        className
      )}
      animate={!disabled ? animation : {}}
    >
      {text}
    </motion.span>
  );
};

export default ShinyText;
