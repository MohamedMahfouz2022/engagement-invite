"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MapPin } from "lucide-react";
import { LOCATION_URL } from "@/lib/constants";

export default function LocationButton() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 py-8 z-10"
      id="location"
    >
      <div className="flex flex-col justify-center items-center gap-8 mb-8 max-w-lg mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <h2
            className="font-arabic text-2xl md:text-3xl font-bold mb-3"
            style={{ color: "var(--wine)" }}
          >
            الموقع
          </h2>
          <div className="luxury-divider">
            <span style={{ color: "var(--champagne)" }}>📍</span>
          </div>
          <p
            className="font-arabic text-lg mt-4"
            style={{ color: "var(--text-muted)" }}
          >
            Metro Cafe
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <motion.a
            href={LOCATION_URL}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-3 btn-luxury text-lg"
            style={{
              background:
                "linear-gradient(135deg, #6B1B2A 0%, #8B2A3A 50%, #6B1B2A 100%)",
              color: "#F0D080",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: "12px",
              padding: "18px 44px",
              borderRadius: "50px",
              fontFamily: "'Noto Naskh Arabic', serif",
              fontSize: "18px",
              fontWeight: "600",
              border: "1px solid rgba(212,175,90,0.4)",
              boxShadow:
                "0 6px 30px rgba(107,27,42,0.35), 0 2px 8px rgba(201,169,110,0.2)",
              letterSpacing: "0.5px",
            }}
          >
            <MapPin size={20} strokeWidth={1.5} />
            <span>فتح الموقع</span>
          </motion.a>
        </motion.div>

        {/* Decorative text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="font-arabic text-sm mt-6"
          style={{ color: "var(--champagne)" }}
        >
          في انتظار حضوركم ❤️
        </motion.p>
      </div>
    </section>
  );
}
