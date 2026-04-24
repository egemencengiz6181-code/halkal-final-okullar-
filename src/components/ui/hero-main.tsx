"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, MessageCircle, Phone, X } from "lucide-react";
import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import Image from "next/image";

const Waves = dynamic(() => import('@/components/ui/waves'), { ssr: false });

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.14, duration: 0.72, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function HeroMain() {
  const t = useTranslations("HeroMain");
  const { resolvedTheme } = useTheme();
  const wavesBg = resolvedTheme === "dark" ? "#000000" : "#f4f4f8";
  const [contactOpen, setContactOpen] = useState(false);
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* ── WAVES BACKGROUND — sadece desktop (mobilde performans tasarrufu) ── */}
      <div className="hidden md:block absolute inset-0 z-0">
        <Waves
          strokeColor="#E21F26"
          backgroundColor={wavesBg}
          lineCount={14}
          waveSpeedX={0.0007}
          waveSpeedY={0.0005}
          waveAmpX={36}
          waveAmpY={22}
          xGap={16}
          yGap={34}
          friction={0.93}
          tension={0.0035}
          maxCursorMove={80}
        />
      </div>
      {/* Mobil için sade gradient arka plan */}
      <div className="md:hidden absolute inset-0 z-0 bg-gradient-to-br from-gray-100 via-gray-50 to-gray-100 dark:from-[#0a0a0f] dark:via-[#0d0005] dark:to-[#0a0a0f]" />

      {/* ── SCHOOL IMAGE BACKGROUND ──────────────────────────── */}
      <div className="absolute inset-0 z-[1] overflow-hidden">
        <Image
          src="/okul/okul.jpeg"
          alt=""
          fill
          className="object-cover object-center opacity-[0.08]"
          sizes="100vw"
          loading="lazy"
        />
      </div>

      {/* ── VIGNETTE OVERLAY ─────────────────────────────────── */}
      <div className="absolute inset-0 z-[2] bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,transparent_40%,rgba(255,255,255,0.82)_100%)] dark:bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,transparent_40%,rgba(0,0,0,0.82)_100%)]" />

      {/* ── PURPLE GLOW ──────────────────────────────────────── */}
      <motion.div
        className="absolute z-[2] w-[720px] h-[720px] rounded-full blur-[160px] opacity-[0.18]"
        style={{
          background: "radial-gradient(circle, #E21F26 0%, #2E3192 50%, transparent 80%)",
          top: "50%",
          left: "50%",
          x: "-50%",
          y: "-50%",
        }}
        animate={{ scale: [1, 1.07, 0.97, 1] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* ── CONTENT (z-10) ───────────────────────────────────── */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {/* Eyebrow */}
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#E21F26]/30 bg-[#E21F26]/10 backdrop-blur-sm mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#E21F26] animate-pulse" />
          <span className="text-xs font-semibold tracking-[0.25em] uppercase text-[#E21F26]/80">
            Halkalı · Küçükçekmece / İstanbul
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[1.04] text-slate-900 dark:text-white mb-8"
        >
          {t("title_prefix")}{" "}
          <span
            style={{
              background: "linear-gradient(to right, #E21F26, #E65F5F, #2E3192)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
              color: "transparent",
              display: "inline-block",
            }}
          >
            {t("title_highlight")}
          </span>
          <br />
          {t("title_suffix")}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="text-lg md:text-xl text-slate-500 dark:text-white/40 font-light leading-relaxed max-w-2xl mx-auto mb-12"
        >
          {t("subtitle")}
        </motion.p>

        {/* CTA */}
        <motion.div
          custom={3}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            onClick={() => setContactOpen(true)}
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#E21F26] hover:bg-[#BE1821] text-white font-semibold text-sm tracking-wide transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_0_32px_rgba(226,31,38,0.45)] hover:shadow-[0_0_48px_rgba(226,31,38,0.6)]"
            style={{ backgroundColor: '#E21F26' }}
          >
            <MessageCircle className="w-4 h-4" />
            {t("cta")}
            <ArrowRight className="w-4 h-4 -translate-x-1 group-hover:translate-x-0 transition-transform" />
          </button>
        </motion.div>
      </div>

      {/* ── BOTTOM FADE ──────────────────────────────────────── */}
      <div className="absolute bottom-0 left-0 right-0 h-32 z-[2] bg-gradient-to-t from-background to-transparent" />

      {/* ── CONTACT POPUP ────────────────────────────────────── */}
      <AnimatePresence>
        {contactOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
              onClick={() => setContactOpen(false)}
            />
            {/* Modal */}
            <motion.div
              key="modal"
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none"
            >
              <div className="relative w-full max-w-sm pointer-events-auto bg-white dark:bg-zinc-900 rounded-3xl p-8 shadow-2xl border border-black/10 dark:border-white/10">
                {/* Close */}
                <button
                  onClick={() => setContactOpen(false)}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/5 dark:bg-white/10 flex items-center justify-center text-slate-500 dark:text-white/50 hover:bg-black/10 dark:hover:bg-white/20 transition-colors"
                  aria-label="Kapat"
                >
                  <X className="w-4 h-4" />
                </button>

                {/* Header */}
                <div className="mb-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E21F26]/10 border border-[#E21F26]/20 mb-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E21F26] animate-pulse" />
                    <span className="text-xs font-semibold text-[#E21F26] uppercase tracking-wider">Bize Ulaşın</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">Kayıt &amp; Bilgi Al</h3>
                  <p className="text-sm text-slate-500 dark:text-white/40 mt-1">Hemen arayın veya WhatsApp ile yazın.</p>
                </div>

                {/* Buttons */}
                <div className="flex flex-col gap-3">
                  <a
                    href="tel:02124953021"
                    className="flex items-center gap-3 w-full px-5 py-4 rounded-2xl bg-[#E21F26] hover:bg-[#BE1821] text-white font-semibold text-sm transition-all hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_20px_rgba(226,31,38,0.3)]"
                    style={{ backgroundColor: '#E21F26' }}
                  >
                    <Phone className="w-4 h-4 shrink-0" />
                    Tel: 0212 495 30 21
                  </a>
                  <a
                    href="https://wa.me/905453491774"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 w-full px-5 py-4 rounded-2xl bg-[#25D366] hover:bg-[#1ebe5d] text-white font-semibold text-sm transition-all hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <MessageCircle className="w-4 h-4 shrink-0" />
                    Tel 2: 0545 349 17 74
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
