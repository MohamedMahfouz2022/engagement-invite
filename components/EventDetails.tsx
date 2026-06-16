"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { EVENT_DATE_DISPLAY, EVENT_VENUE } from "@/lib/constants";

const details = [
  {
    icon: "💍",
    label: "المناسبة",
    value: "خطوبة",
    delay: 0.1,
  },
  {
    icon: "📅",
    label: "التاريخ",
    value: EVENT_DATE_DISPLAY,
    delay: 0.2,
  },
  {
    icon: "📍",
    label: "المكان",
    value: EVENT_VENUE,
    delay: 0.3,
  },
];

export default function EventDetails() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      // className="relative py-20 px-6 z-10"
      className="relative min-h-screen flex flex-col items-center justify-evenly text-center px-6 py-32 z-10"
      id="details"
    >
      <div className="flex flex-col items-center justify-center gap-16 max-w-lg mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <h2
            className="font-arabic text-3xl md:text-4xl font-bold mb-4"
            style={{ color: "var(--wine)" }}
          >
            تفاصيل الحفل
          </h2>
          <div className="luxury-divider">
            <span style={{ color: "var(--champagne)" }}>✦</span>
          </div>
        </motion.div>

        {/* Detail Cards */}
        <div className="flex flex-col gap-4 w-96 ">
          {details.map((detail) => (
            <motion.div
              key={detail.label}
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: detail.delay,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{ scale: 1.02, y: -2 }}
              className="glass-card rounded-2xl p-5 flex items-center gap-5"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.5) 0%, rgba(245,239,230,0.4) 100%)",
                border: "1px solid rgba(201,169,110,0.25)",
                boxShadow:
                  "0 4px 24px rgba(107,27,42,0.06), inset 0 1px 0 rgba(255,255,255,0.6)",
              }}
            >
              {/* Icon */}
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl shrink-0"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(107,27,42,0.08), rgba(201,169,110,0.12))",
                  border: "1px solid rgba(201,169,110,0.2)",
                }}
              >
                {detail.icon}
              </div>

              {/* Content */}
              <div className="flex-1 text-center">
                <p
                  className="font-arabic text-sm mb-1"
                  style={{ color: "var(--champagne)" }}
                >
                  {detail.label}
                </p>
                <p
                  className="font-arabic text-xl font-semibold"
                  style={{ color: "var(--wine)" }}
                >
                  {detail.value}
                </p>
              </div>

              {/* Gold accent */}
              <div
                className="w-0.5 h-12 rounded-full shrink-0"
                style={{
                  background:
                    "linear-gradient(180deg, transparent, var(--champagne), transparent)",
                }}
              />
            </motion.div>
          ))}
        </div>

        {/* Bottom message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="text-center mt-10"
        >
          <p
            className="font-arabic text-base leading-relaxed"
            style={{ color: "var(--text-muted)" }}
          >
            بحضوركم تكتمل فرحتنا
            <br />
            وتشرف بمشاركتكم أجمل لحظاتنا ♡
          </p>
        </motion.div>
      </div>
    </section>
  );
}
