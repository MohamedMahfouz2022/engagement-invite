"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import EnvelopeAnimation from "@/components/EnvelopeAnimation";
import FloralDecoration from "@/components/FloralDecoration";
import FloatingPetals from "@/components/FloatingPetals";
import Hero from "@/components/Hero";
import Countdown from "@/components/Countdown";
import EventDetails from "@/components/EventDetails";
import LocationButton from "@/components/LocationButton";
import RSVPForm from "@/components/RSVPForm";
import AudioPlayer from "@/components/AudioPlayer";

export default function Home() {
  const [invitationOpen, setInvitationOpen] = useState(false);

  return (
    <main className="relative min-h-screen" dir="rtl">
      {/* ── Envelope intro screen ── */}
      <EnvelopeAnimation onOpen={() => setInvitationOpen(true)} />

      {/* ── Main Invitation Content ── */}
      <AnimatePresence>
        {invitationOpen && (
          <motion.div
            key="invitation"
            initial={{ opacity: 0, scale: 0.97, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            {/* ── Global background ── */}
            <div
              className="fixed inset-0 paper-texture"
              style={{
                background:
                  "linear-gradient(160deg, #FAF6F0 0%, #F5EFE6 35%, #EDE5D8 65%, #F0EAE0 100%)",
                zIndex: 0,
              }}
            />

            {/* ── Luxury golden page border ── */}
            <div
              className="fixed inset-3 pointer-events-none"
              style={{
                border: "1px solid rgba(201,169,110,0.35)",
                borderRadius: "12px",
                boxShadow: "inset 0 0 40px rgba(201,169,110,0.05)",
                zIndex: 2,
              }}
            />
            {/* Corner ornaments */}
            {[
              "top-3 left-3",
              "top-3 right-3",
              "bottom-3 left-3",
              "bottom-3 right-3",
            ].map((pos, i) => (
              <div
                key={i}
                className={`fixed pointer-events-none ${pos} z-3`}
                style={{
                  width: "20px",
                  height: "20px",
                  border: "1px solid rgba(201,169,110,0.6)",
                  borderRadius: "2px",
                  background: "rgba(250,246,240,0.8)",
                }}
              />
            ))}

            {/* ── Floral corner decorations ── */}
            <FloralDecoration />

            {/* ── Floating petals ── */}
            <FloatingPetals />

            {/* ── Page content (above fixed layers) ── */}
            <div className="relative z-10">
              {/* ── HERO ── */}
              <Hero />

              {/* ── Divider ── */}
              <SectionDivider />

              {/* ── WELCOME MESSAGE ── */}
              <WelcomeMessage />

              {/* ── Divider ── */}
              <SectionDivider />

              {/* ── COUNTDOWN ── */}
              <Countdown />

              {/* ── Divider ── */}
              <SectionDivider />

              {/* ── EVENT DETAILS ── */}
              <EventDetails />

              {/* ── Divider ── */}
              <SectionDivider />

              {/* ── LOCATION ── */}
              {/* <LocationButton /> */}

              {/* ── Divider ── */}
              {/* <SectionDivider /> */}

              {/* ── RSVP ── */}
              {/* <RSVPForm /> */}

              {/* ── Footer ── */}
              <Footer />
            </div>

            {/* ── Audio player ── */}
            {/* <AudioPlayer /> */}
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

/* ─── Decorative section divider ─── */
function SectionDivider() {
  return (
    <div className="flex items-center justify-center py-2 px-8 z-10 relative">
      <div
        className="h-px flex-1"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(201,169,110,0.4), transparent)",
        }}
      />
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
        className="mx-4 text-base"
        style={{ color: "var(--champagne)" }}
        aria-hidden="true"
      >
        ✦
      </motion.div>
      <div
        className="h-px flex-1"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(201,169,110,0.4), transparent)",
        }}
      />
    </div>
  );
}

/* ─── Welcome message section ─── */
function WelcomeMessage() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      // className="relative py-16 px-6 text-center z-10"
      className="relative min-h-screen flex flex-col items-center justify-evenly text-center px-6 py-8 z-10"
      id="welcome"
    >
      <div className="flex flex-col items-center justify-center gap-8 max-w-lg mx-auto">
        {/* Decorative rings */}
        <div className="flex justify-center mb-6">
          <motion.div
            animate={{ rotate: [-5, 5, -5] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="text-4xl select-none"
            aria-hidden="true"
          >
            💍
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="font-amiri text-2xl md:text-3xl leading-relaxed"
          style={{ color: "var(--wine)" }}
        >
          يسعدنا مشاركتكم فرحتنا
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-3 text-3xl"
          aria-hidden="true"
        >
          ❤️
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="font-arabic text-base mt-5 leading-relaxed"
          style={{ color: "var(--text-muted)" }}
        >
          وتشرفوننا بحضوركم الكريم في هذه المناسبة السعيدة
        </motion.p>

        {/* Elegant gold line ornament */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-8 flex items-center justify-center gap-3"
        >
          <div
            className="h-px w-20"
            style={{
              background:
                "linear-gradient(90deg, transparent, var(--champagne))",
            }}
          />
          <span style={{ color: "var(--champagne)", fontSize: "10px" }}>◆</span>
          <div
            className="h-px w-20"
            style={{
              background:
                "linear-gradient(90deg, var(--champagne), transparent)",
            }}
          />
        </motion.div>
      </div>
    </motion.section>
  );
}

/* ─── Footer ─── */
function Footer() {
  return (
    <footer className="relative py-12 px-6 text-center z-10">
      <div
        className="h-px mb-8"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(201,169,110,0.4), transparent)",
        }}
      />
      <p
        className="font-amiri text-lg mb-2"
        style={{ color: "var(--champagne)" }}
      >
        محمد &amp; هاجر
      </p>
      <p className="font-arabic text-sm" style={{ color: "var(--text-muted)" }}>
        17 · 7 · 2026
      </p>
      <div className="flex justify-center mt-4 gap-1">
        {["✦", "♡", "✦"].map((s, i) => (
          <span
            key={i}
            style={{ color: "rgba(201,169,110,0.5)", fontSize: "10px" }}
          >
            {s}
          </span>
        ))}
      </div>
    </footer>
  );
}
