"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { EVENT_DATE } from "@/lib/constants";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calculateTimeLeft(): TimeLeft {
  const now = new Date().getTime();
  const target = EVENT_DATE.getTime();
  const diff = Math.max(0, target - now);

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

interface CountdownUnitProps {
  value: number;
  label: string;
  index: number;
}

function CountdownUnit({ value, label, index }: CountdownUnitProps) {
  const [prevValue, setPrevValue] = useState(value);
  const [flipping, setFlipping] = useState(false);

  useEffect(() => {
    if (value !== prevValue) {
      setFlipping(true);
      const timer = setTimeout(() => {
        setPrevValue(value);
        setFlipping(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [value, prevValue]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="glass-card rounded-2xl p-4 md:p-6 flex flex-col items-center gap-2 flex-1 min-w-0"
      style={{
        background: "rgba(255,255,255,0.35)",
        backdropFilter: "blur(20px)",
        border: "1px solid rgba(201,169,110,0.3)",
        boxShadow:
          "0 8px 32px rgba(107,27,42,0.08), inset 0 1px 0 rgba(255,255,255,0.5)",
      }}
    >
      <div
        className="relative overflow-hidden"
        style={{
          minWidth: "clamp(50px, 12vw, 80px)",
          textAlign: "center",
        }}
      >
        <motion.span
          key={value}
          initial={{ y: flipping ? -30 : 0, opacity: flipping ? 0 : 1 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="font-playfair font-bold block"
          style={{
            fontSize: "clamp(36px, 8vw, 64px)",
            background:
              "linear-gradient(135deg, #6B1B2A 0%, #8B2A3A 60%, #B84060 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            lineHeight: 1,
          }}
        >
          {String(value).padStart(2, "0")}
        </motion.span>
      </div>

      {/* Gold separator line */}
      <div
        className="w-8 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, var(--champagne), transparent)",
        }}
      />

      <span
        className="font-arabic text-sm md:text-base font-medium"
        style={{ color: "var(--champagne)" }}
      >
        {label}
      </span>
    </motion.div>
  );
}

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const units = [
    { value: timeLeft.days, label: "يوم" },
    { value: timeLeft.hours, label: "ساعة" },
    { value: timeLeft.minutes, label: "دقيقة" },
    { value: timeLeft.seconds, label: "ثانية" },
  ];

  return (
    <section
      ref={ref}
      // className="relative py-20 px-6 z-10"
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 py-8 z-10"
      id="countdown"
    >
      <div className="flex flex-col items-center justify-center gap-16 max-w-2xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <p
            className="font-arabic text-lg mb-3"
            style={{ color: "var(--text-muted)" }}
          >
            العد التنازلي حتى الموعد
          </p>
          <div className="luxury-divider">
            <span style={{ color: "var(--champagne)" }}>⏳</span>
          </div>
        </motion.div>

        {/* Countdown Cards */}
        <div className="flex gap-3 md:gap-4" dir="rtl">
          {units.map((unit, i) => (
            <CountdownUnit
              key={unit.label}
              value={unit.value}
              label={unit.label}
              index={i}
            />
          ))}
        </div>

        {/* Date label */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6, duration: 0.7 }}
          className="text-center mt-8 font-arabic text-base"
          style={{ color: "var(--text-muted)" }}
        >
          الجمعة · 17 يوليو 2026
        </motion.p>
      </div>
    </section>
  );
}
