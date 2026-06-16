"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail } from "lucide-react";

interface EnvelopeProps {
  onOpen: () => void;
}

type Phase = "idle" | "flap-open" | "lift" | "done";

export default function EnvelopeAnimation({ onOpen }: EnvelopeProps) {
  const [phase, setPhase] = useState<Phase>("idle");

  const handleOpen = () => {
    if (phase !== "idle") return;

    // Phase 1: open the flap
    setPhase("flap-open");

    // Phase 2: lift envelope away, then call onOpen
    setTimeout(() => {
      setPhase("lift");
      setTimeout(() => {
        setPhase("done");
        onOpen();
      }, 700);
    }, 800);
  };

  if (phase === "done") return null;

  return (
    <motion.div
      key="envelope-screen"
      animate={phase === "lift" ? { opacity: 0, y: -60, scale: 0.88 } : { opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.65, ease: [0.4, 0, 0.2, 1] }}
      className="fixed inset-0 flex flex-col items-center justify-center z-[100]"
      style={{
        background: "linear-gradient(160deg, #FAF6F0 0%, #F5EFE6 40%, #EDE5D8 100%)",
        pointerEvents: phase === "lift" ? "none" : "auto",
      }}
    >
      {/* Gold top border */}
      <div
        className="absolute top-0 inset-x-0 h-1"
        style={{
          background:
            "linear-gradient(90deg, transparent, #D4AF5A, #F0D080, #D4AF5A, transparent)",
        }}
      />

      {/* Subtle dot-grid background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: `radial-gradient(circle, #B8932A 1px, transparent 1px)`,
          backgroundSize: "24px 24px",
        }}
      />

      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="mb-14 text-center px-6"
      >
        <p
          className="font-amiri text-2xl md:text-3xl mb-2"
          style={{ color: "var(--champagne)" }}
        >
          بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
        </p>
        <p className="font-arabic text-base" style={{ color: "var(--text-muted)" }}>
          لديك دعوة خاصة ✉️
        </p>
      </motion.div>

      {/* Envelope container */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.92 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative cursor-pointer"
        style={{ perspective: "800px" }}
        onClick={handleOpen}
        whileHover={phase === "idle" ? { scale: 1.03, y: -5 } : {}}
        whileTap={phase === "idle" ? { scale: 0.98 } : {}}
      >
        {/* Envelope wrapper - fixed size */}
        <div
          style={{
            width: "clamp(240px, 72vw, 340px)",
            height: "clamp(165px, 48vw, 240px)",
            position: "relative",
          }}
        >
          {/* Envelope back body */}
          <div
            className="absolute inset-0 rounded-2xl"
            style={{
              background: "linear-gradient(145deg, #F5EFE6 0%, #EDE5D8 100%)",
              border: "2px solid rgba(201,169,110,0.5)",
              boxShadow:
                "0 20px 60px rgba(107,27,42,0.15), 0 4px 16px rgba(201,169,110,0.2), inset 0 1px 0 rgba(255,255,255,0.8)",
              overflow: "hidden",
            }}
          />

          {/* Side flaps */}
          {/* Left flap */}
          <div className="absolute inset-0 overflow-hidden rounded-2xl" style={{ zIndex: 1 }}>
            <div
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                width: "50%",
                height: "100%",
                background: "linear-gradient(145deg, #EAE2D4 0%, #E0D8C8 100%)",
                clipPath: "polygon(0 0, 100% 50%, 0 100%)",
                borderRight: "1px solid rgba(201,169,110,0.25)",
              }}
            />
            {/* Right flap */}
            <div
              style={{
                position: "absolute",
                right: 0,
                top: 0,
                width: "50%",
                height: "100%",
                background: "linear-gradient(145deg, #E8E0D0 0%, #DDD5C5 100%)",
                clipPath: "polygon(100% 0, 0 50%, 100% 100%)",
                borderLeft: "1px solid rgba(201,169,110,0.25)",
              }}
            />
            {/* Bottom flap */}
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                width: "100%",
                height: "50%",
                background: "linear-gradient(135deg, #EDE5D8 0%, #E8DDD0 100%)",
                clipPath: "polygon(0 100%, 50% 0, 100% 100%)",
                borderTop: "1px solid rgba(201,169,110,0.3)",
              }}
            />
          </div>

          {/* Inner card peek */}
          <div
            className="absolute flex flex-col items-center justify-center gap-2"
            style={{ inset: "25% 20%", zIndex: 4 }}
          >
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{
                background:
                  "linear-gradient(135deg, rgba(107,27,42,0.1), rgba(201,169,110,0.15))",
                border: "1px solid rgba(201,169,110,0.4)",
              }}
            >
              <Mail size={16} style={{ color: "var(--champagne)" }} strokeWidth={1.5} />
            </div>
            <p className="font-arabic text-xs" style={{ color: "var(--champagne)" }}>
              دعوة خطوبة
            </p>
          </div>

          {/* Top flap - animates open */}
          <div
            className="absolute inset-x-0 top-0 rounded-t-2xl overflow-hidden"
            style={{
              height: "50%",
              transformOrigin: "top center",
              transformStyle: "preserve-3d",
              zIndex: 5,
              transform:
                phase === "flap-open" || phase === "lift"
                  ? "rotateX(-170deg)"
                  : "rotateX(0deg)",
              transition:
                phase === "flap-open"
                  ? "transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)"
                  : "none",
            }}
          >
            <div
              style={{
                width: "100%",
                height: "200%",
                background: "linear-gradient(160deg, #F0E8D8 0%, #E8DDD0 100%)",
                clipPath: "polygon(0 0, 50% 100%, 100% 0)",
                borderRadius: "16px 16px 0 0",
                borderBottom: "1px solid rgba(201,169,110,0.35)",
              }}
            />
          </div>

          {/* Wax seal */}
          <motion.div
            animate={
              phase === "idle"
                ? {
                    scale: [1, 1.06, 1],
                    boxShadow: [
                      "0 4px 16px rgba(184,147,42,0.4)",
                      "0 6px 24px rgba(184,147,42,0.65)",
                      "0 4px 16px rgba(184,147,42,0.4)",
                    ],
                  }
                : { scale: 0, opacity: 0 }
            }
            transition={
              phase === "idle"
                ? { repeat: Infinity, duration: 2.5, ease: "easeInOut" }
                : { duration: 0.25 }
            }
            className="absolute z-20 flex items-center justify-center rounded-full"
            style={{
              width: "48px",
              height: "48px",
              background:
                "linear-gradient(135deg, #B8932A 0%, #D4AF5A 50%, #C9A96E 100%)",
              border: "2px solid rgba(255,255,255,0.4)",
              bottom: "-24px",
              left: "50%",
              transform: "translateX(-50%)",
              fontSize: "18px",
              color: "#fff",
              userSelect: "none",
            }}
          >
            ♡
          </motion.div>
        </div>
      </motion.div>

      {/* Open button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.7 }}
        className="mt-20"
      >
        <motion.button
          id="open-invitation"
          onClick={handleOpen}
          disabled={phase !== "idle"}
          whileHover={phase === "idle" ? { scale: 1.05 } : {}}
          whileTap={phase === "idle" ? { scale: 0.97 } : {}}
          className="btn-luxury"
          style={{
            opacity: phase !== "idle" ? 0.65 : 1,
            cursor: phase !== "idle" ? "not-allowed" : "pointer",
          }}
        >
          {phase === "idle" ? "✉️  فتح الدعوة" : "جارٍ الفتح..."}
        </motion.button>
      </motion.div>

      {/* Sparkle dots */}
      {([
        { left: "12%", top: "20%", s: 3, d: 0.5 },
        { left: "85%", top: "15%", s: 2, d: 1.2 },
        { left: "8%",  top: "75%", s: 4, d: 0.8 },
        { left: "90%", top: "70%", s: 3, d: 1.8 },
        { left: "50%", top: "10%", s: 2, d: 2.2 },
        { left: "40%", top: "85%", s: 3, d: 0.3 },
      ] as const).map((sp, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: `${sp.s}px`,
            height: `${sp.s}px`,
            background: "var(--champagne)",
            left: sp.left,
            top: sp.top,
          }}
          animate={{ opacity: [0, 0.7, 0], scale: [0, 1, 0] }}
          transition={{ repeat: Infinity, duration: 2.5, delay: sp.d, ease: "easeInOut" }}
        />
      ))}

      {/* Gold bottom border */}
      <div
        className="absolute bottom-0 inset-x-0 h-1"
        style={{
          background:
            "linear-gradient(90deg, transparent, #D4AF5A, #F0D080, #D4AF5A, transparent)",
        }}
      />
    </motion.div>
  );
}
