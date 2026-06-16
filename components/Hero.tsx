"use client";

import { motion, easeInOut } from "framer-motion";
import {
  GROOM_NAME,
  BRIDE_NAME,
  GROOM_NAME_EN,
  BRIDE_NAME_EN,
} from "@/lib/constants";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, delay, ease: easeInOut },
  }),
};

export default function Hero() {
  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center gap-8 text-center px-6 py-32 z-10"
      id="hero"
    >
      {/* Bismillah */}
      <motion.div
        custom={0.2}
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        className="mb-8"
      >
        <p
          className="font-amiri text-xl md:text-2xl"
          style={{ color: "var(--champagne)" }}
        >
          بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
        </p>
      </motion.div>

      {/* Luxury divider */}
      <motion.div
        custom={0.4}
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        className="luxury-divider w-48 mx-auto mb-8"
      >
        <span style={{ color: "var(--champagne)", fontSize: "18px" }}>✦</span>
      </motion.div>

      {/* Subtitle */}
      <motion.p
        custom={0.55}
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        className="font-arabic text-lg md:text-xl mb-6"
        style={{ color: "var(--text-muted)" }}
      >
        تشرف بدعوتكم لحضور حفل خطوبة
      </motion.p>

      {/* Names in Arabic - Large Script Style */}
      <motion.div
        custom={0.7}
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        className="relative mb-3"
      >
        <h1
          className="font-amiri font-bold leading-none select-none"
          style={{
            fontSize: "clamp(64px, 18vw, 140px)",
            color: "var(--wine)",
            textShadow: "2px 4px 20px rgba(107,27,42,0.15)",
            letterSpacing: "-0.02em",
          }}
        >
          {GROOM_NAME}{" "}
          <span
            style={{
              fontSize: "0.55em",
              color: "var(--rose)",
              verticalAlign: "middle",
            }}
          >
            &amp;
          </span>{" "}
          {BRIDE_NAME}
        </h1>
      </motion.div>

      {/* Names in English */}
      <motion.div
        custom={0.85}
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        className="flex items-center justify-center gap-4 mb-10"
      >
        <span
          className="font-cormorant italic text-xl md:text-2xl tracking-widest"
          style={{ color: "var(--text-muted)" }}
          dir="ltr"
        >
          {GROOM_NAME_EN}
        </span>
        <span
          className="animate-heartbeat inline-block text-xl"
          style={{ color: "var(--rose)" }}
          aria-hidden="true"
        >
          ♡
        </span>
        <span
          className="font-cormorant italic text-xl md:text-2xl tracking-widest"
          style={{ color: "var(--text-muted)" }}
          dir="ltr"
        >
          {BRIDE_NAME_EN}
        </span>
      </motion.div>

      {/* Luxury divider bottom */}
      <motion.div
        custom={0.95}
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        className="luxury-divider w-64 mx-auto"
      >
        <span style={{ color: "var(--champagne)", fontSize: "14px" }}>❧</span>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span
            className="font-arabic text-sm"
            style={{ color: "var(--champagne)" }}
          >
            تمرير للأسفل
          </span>
          <div
            className="w-6 h-10 rounded-full border-2 flex items-start justify-center pt-2"
            style={{ borderColor: "rgba(201,169,110,0.5)" }}
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: "var(--champagne)" }}
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
