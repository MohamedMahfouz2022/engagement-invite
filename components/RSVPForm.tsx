"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { CheckCircle } from "lucide-react";

interface FormData {
  name: string;
  phone: string;
}

export default function RSVPForm() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [formData, setFormData] = useState<FormData>({ name: "", phone: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate submission delay
    await new Promise((resolve) => setTimeout(resolve, 1200));
    console.log("RSVP Form Data:", formData);
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <section ref={ref} className="relative py-20 px-6 z-10" id="rsvp">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-10"
        >
          <h2
            className="font-arabic text-3xl md:text-4xl font-bold mb-4"
            style={{ color: "var(--wine)" }}
          >
            تأكيد الحضور
          </h2>
          <div className="luxury-divider mb-4">
            <span style={{ color: "var(--champagne)" }}>✉️</span>
          </div>
          <p className="font-arabic text-base" style={{ color: "var(--text-muted)" }}>
            يسعدنا مشاركتكم فرحتنا ❤️
          </p>
        </motion.div>

        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="rounded-3xl p-8"
          style={{
            background: "linear-gradient(135deg, rgba(255,255,255,0.6) 0%, rgba(245,239,230,0.5) 100%)",
            backdropFilter: "blur(24px)",
            border: "1px solid rgba(201,169,110,0.25)",
            boxShadow: "0 16px 48px rgba(107,27,42,0.08), inset 0 1px 0 rgba(255,255,255,0.7)",
          }}
        >
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="text-center py-6"
            >
              <motion.div
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ repeat: 2, duration: 0.5 }}
                className="inline-block mb-4"
              >
                <CheckCircle
                  size={60}
                  strokeWidth={1.5}
                  style={{ color: "var(--champagne)" }}
                />
              </motion.div>
              <h3
                className="font-arabic text-2xl font-bold mb-3"
                style={{ color: "var(--wine)" }}
              >
                شكراً لك! 🎉
              </h3>
              <p
                className="font-arabic text-base leading-relaxed"
                style={{ color: "var(--text-muted)" }}
              >
                تم تسجيل حضورك بنجاح
                <br />
                نتطلع لرؤيتك في الحفل
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="rsvp-name"
                  className="font-arabic text-sm font-medium text-right"
                  style={{ color: "var(--wine)" }}
                >
                  الاسم الكريم
                </label>
                <input
                  id="rsvp-name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, name: e.target.value }))
                  }
                  placeholder="أدخل اسمك"
                  className="luxury-input"
                  dir="rtl"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="rsvp-phone"
                  className="font-arabic text-sm font-medium text-right"
                  style={{ color: "var(--wine)" }}
                >
                  رقم الهاتف
                </label>
                <input
                  id="rsvp-phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, phone: e.target.value }))
                  }
                  placeholder="05xxxxxxxx"
                  className="luxury-input"
                  dir="ltr"
                  style={{ textAlign: "right" }}
                />
              </div>

              <motion.button
                id="rsvp-submit"
                type="submit"
                disabled={loading}
                whileHover={{ scale: loading ? 1 : 1.03 }}
                whileTap={{ scale: loading ? 1 : 0.97 }}
                className="btn-luxury mt-2 w-full flex items-center justify-center gap-3"
                style={{
                  opacity: loading ? 0.8 : 1,
                  cursor: loading ? "not-allowed" : "pointer",
                }}
              >
                {loading ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                      className="w-5 h-5 rounded-full border-2 border-transparent"
                      style={{
                        borderTopColor: "#F0D080",
                        borderRightColor: "#F0D080",
                      }}
                    />
                    <span>جارٍ الإرسال...</span>
                  </>
                ) : (
                  <span>تأكيد الحضور ♡</span>
                )}
              </motion.button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
