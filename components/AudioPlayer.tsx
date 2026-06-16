"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    
    // Set loop
    audio.loop = true;
    audio.volume = 0.35;

    return () => {
      audio.pause();
    };
  }, []);

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    setHasInteracted(true);

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch (err) {
        console.error("Audio play failed:", err);
      }
    }
  };

  return (
    <>
      {/* Hidden audio element - uses a royalty-free ambient music URL */}
      {/* You can replace this src with your own audio file placed in /public/music.mp3 */}
      <audio
        ref={audioRef}
        src="/music.mp3"
        preload="none"
      />

      {/* Floating button */}
      <motion.div
        initial={{ opacity: 0, scale: 0, x: 20 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ delay: 2, type: "spring", stiffness: 200, damping: 20 }}
        className="fixed bottom-6 left-4 z-50"
      >
        <motion.button
          id="audio-toggle"
          onClick={togglePlay}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.93 }}
          className="relative flex flex-col items-center gap-1.5 rounded-2xl px-4 py-3"
          style={{
            background: "linear-gradient(135deg, rgba(107,27,42,0.85) 0%, rgba(74,14,26,0.9) 100%)",
            backdropFilter: "blur(16px)",
            border: "1px solid rgba(201,169,110,0.4)",
            boxShadow: "0 8px 24px rgba(107,27,42,0.35)",
            color: "#F0D080",
            cursor: "pointer",
            minWidth: "64px",
          }}
          aria-label={isPlaying ? "إيقاف الموسيقى" : "تشغيل الموسيقى"}
        >
          {/* Pulse ring when playing */}
          <AnimatePresence>
            {isPlaying && (
              <motion.div
                initial={{ scale: 1, opacity: 0.7 }}
                animate={{ scale: 1.8, opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeOut" }}
                className="absolute inset-0 rounded-2xl"
                style={{ border: "1px solid rgba(201,169,110,0.5)", pointerEvents: "none" }}
              />
            )}
          </AnimatePresence>

          {/* Icon with rotation animation */}
          <motion.div
            animate={isPlaying ? { rotate: [0, 5, -5, 0] } : { rotate: 0 }}
            transition={isPlaying ? { repeat: Infinity, duration: 2, ease: "easeInOut" } : {}}
          >
            {isPlaying ? (
              <Volume2 size={22} strokeWidth={1.5} />
            ) : (
              <VolumeX size={22} strokeWidth={1.5} />
            )}
          </motion.div>

          <span
            className="font-arabic text-xs leading-tight text-center"
            style={{ color: "#F0D080", fontSize: "11px" }}
          >
            {isPlaying ? "إيقاف" : "موسيقى"}
          </span>
        </motion.button>

        {/* Tooltip on first render */}
        <AnimatePresence>
          {!hasInteracted && (
            <motion.div
              initial={{ opacity: 0, x: -10, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ delay: 2.5 }}
              className="absolute bottom-full mb-2 left-0 rounded-xl px-3 py-2 whitespace-nowrap"
              style={{
                background: "rgba(107,27,42,0.9)",
                border: "1px solid rgba(201,169,110,0.3)",
                color: "#F0D080",
                fontFamily: "'Noto Naskh Arabic', serif",
                fontSize: "12px",
              }}
            >
              🎵 شغّل الموسيقى
              <div
                className="absolute bottom-0 left-4 w-2 h-2 rotate-45 -mb-1"
                style={{ background: "rgba(107,27,42,0.9)" }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
