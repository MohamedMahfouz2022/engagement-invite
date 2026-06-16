"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function FloralDecoration() {
  return (
    <>
      {/* Top-left floral */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-0 select-none"
        style={{
          width: "clamp(160px, 38vw, 300px)",
          mixBlendMode: "darken",
        }}
        initial={{ opacity: 0, scale: 0.8, x: -20, y: -20 }}
        animate={{ opacity: 0.92, scale: 1, x: 0, y: 0 }}
        transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
      >
        <Image
          src="/floral-top-left-v2.png"
          alt=""
          width={300}
          height={300}
          className="w-full h-auto"
          priority
          aria-hidden="true"
        />
      </motion.div>

      {/* Bottom-right floral */}
      <motion.div
        className="fixed bottom-0 right-0 pointer-events-none z-0 select-none"
        style={{
          width: "clamp(160px, 38vw, 280px)",
          mixBlendMode: "darken",
        }}
        initial={{ opacity: 0, scale: 0.8, x: 20, y: 20 }}
        animate={{ opacity: 0.9, scale: 1, x: 0, y: 0 }}
        transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
      >
        <Image
          src="/floral-bottom-right.png"
          alt=""
          width={280}
          height={280}
          className="w-full h-auto"
          aria-hidden="true"
        />
      </motion.div>
    </>
  );
}
