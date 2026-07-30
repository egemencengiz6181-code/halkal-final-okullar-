"use client";

import { useState, useEffect, FormEvent } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Loader2, ArrowRight } from "lucide-react";
import Image from "next/image";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5 },
  }),
};

export default function FormPage() {
  const [formData, setFormData] = useState({
    studentName: "",
    parentName: "",
    phone: "",
    email: "",
    grade: "",
    currentSchool: "",
    district: "",
    program: "",
    notes: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  // Body scroll lock
  useEffect(() => {
    document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const message = `
🎓 **Reklam Formu - ${formData.grade} - ${formData.program}**

**Öğrenci Adı Soyadı:** ${formData.studentName}
**Veli Adı Soyadı:** ${formData.parentName}
**Telefon:** ${formData.phone}
**E-posta:** ${formData.email || "Belirtilmedi"}
**Önümüzdeki Yıl Sınıfı:** ${formData.grade}
**Mevcut Okulu:** ${formData.currentSchool}
**Bulunduğu İlçe:** ${formData.district}
**İlgilendiği Program:** ${formData.program}
${formData.notes ? `**Ek Not:** ${formData.notes}` : ""}
      `.trim();

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: `${formData.studentName} (Veli: ${formData.parentName})`,
          email: formData.email || "form@landing.com",
          subject: `Reklam Formu - ${formData.grade} - ${formData.program}`,
          message,
        }),
      });

      if (!res.ok) throw new Error("Form gönderilemedi");

      setSuccess(true);
      setFormData({
        studentName: "",
        parentName: "",
        phone: "",
        email: "",
        grade: "",
        currentSchool: "",
        district: "",
        program: "",
        notes: "",
      });
    } catch (err) {
      setError("Form gönderilirken bir hata oluştu. Lütfen tekrar deneyin.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 py-20">
        {/* Background */}
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-background via-background to-muted" />

        {/* Success Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 max-w-md text-center"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-500/10 border border-green-500/30 mb-6">
            <CheckCircle2 className="w-10 h-10 text-green-500" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
            Başvurunuz Alındı!
          </h1>
          <p className="text-slate-600 dark:text-white/60 mb-8">
            En kısa sürede sizinle iletişime geçeceğiz.
          </p>
          <a
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#E21F26] hover:bg-[#BE1821] text-white font-semibold text-sm transition-all hover:scale-105 shadow-[0_0_20px_rgba(226,31,38,0.3)]"
            style={{ backgroundColor: "#E21F26" }}
          >
            Ana Sayfaya Dön
            <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      </section>
    );
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 py-20">
      {/* Background */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-background via-background to-muted" />

      {/* Simple Glow */}
      <div
        className="absolute z-[2] w-[600px] h-[600px] rounded-full opacity-[0.12] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, #E21F26 0%, #2E3192 50%, transparent 80%)",
          top: "20%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 w-full max-w-2xl mx-auto">
        {/* Logo */}
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="flex justify-center mb-8"
        >
          <Image
            src="/logos/final logo png.png"
            alt="Halkalı Final LGS"
            width={120}
            height={120}
            className="object-contain"
          />
        </motion.div>

        {/* Title */}
        <motion.div
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#E21F26]/30 bg-[#E21F26]/10 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E21F26] animate-pulse" />
            <span className="text-xs font-semibold tracking-[0.25em] uppercase text-[#E21F26]/80">
              Halkalı · Küçükçekmece / İstanbul
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Kayıt ve Bilgi Formu
          </h1>
          <p className="text-lg text-slate-500 dark:text-white/60">
            Formu doldurun, ekibimiz en kısa sürede sizinle iletişime geçsin.
          </p>
        </motion.div>

        {/* Form */}
        <motion.form
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          onSubmit={handleSubmit}
          className="bg-white/50 dark:bg-black/30 border border-black/10 dark:border-white/10 rounded-3xl p-8 md:p-10 space-y-6"
        >
          {/* Öğrenci Adı */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-[0.15em] text-[#E21F26] mb-2">
              Öğrenci Adı Soyadı *
            </label>
            <input
              type="text"
              name="studentName"
              value={formData.studentName}
              onChange={handleChange}
              required
              className="w-full bg-background/50 border border-black/10 dark:border-white/10 hover:border-[#E21F26]/40 focus:border-[#E21F26] rounded-2xl px-4 py-3 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-white/30 outline-none transition-all"
              placeholder="Öğrenci adı soyadı"
            />
          </div>

          {/* Veli Adı */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-[0.15em] text-[#E21F26] mb-2">
              Veli Adı Soyadı *
            </label>
            <input
              type="text"
              name="parentName"
              value={formData.parentName}
              onChange={handleChange}
              required
              className="w-full bg-background/50 border border-black/10 dark:border-white/10 hover:border-[#E21F26]/40 focus:border-[#E21F26] rounded-2xl px-4 py-3 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-white/30 outline-none transition-all"
              placeholder="Veli adı soyadı"
            />
          </div>

          {/* Telefon */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-[0.15em] text-[#E21F26] mb-2">
              Telefon Numarası *
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full bg-background/50 border border-black/10 dark:border-white/10 hover:border-[#E21F26]/40 focus:border-[#E21F26] rounded-2xl px-4 py-3 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-white/30 outline-none transition-all"
              placeholder="05XX XXX XX XX"
            />
          </div>

          {/* E-posta (optional) */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-[0.15em] text-slate-500 dark:text-white/50 mb-2">
              E-posta (opsiyonel)
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-background/50 border border-black/10 dark:border-white/10 hover:border-[#E21F26]/40 focus:border-[#E21F26] rounded-2xl px-4 py-3 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-white/30 outline-none transition-all"
              placeholder="ornek@email.com"
            />
          </div>

          {/* Sınıf */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-[0.15em] text-[#E21F26] mb-2">
              Önümüzdeki Yıl Sınıfı *
            </label>
            <select
              name="grade"
              value={formData.grade}
              onChange={handleChange}
              required
              className="w-full bg-background/50 border border-black/10 dark:border-white/10 hover:border-[#E21F26]/40 focus:border-[#E21F26] rounded-2xl px-4 py-3 text-sm text-slate-900 dark:text-white outline-none transition-all"
            >
              <option value="">Seçiniz...</option>
              <option value="5. Sınıf">5. Sınıf</option>
              <option value="6. Sınıf">6. Sınıf</option>
              <option value="7. Sınıf">7. Sınıf</option>
              <option value="8. Sınıf & LGS">8. Sınıf & LGS</option>
            </select>
          </div>

          {/* Mevcut Okul */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-[0.15em] text-[#E21F26] mb-2">
              Mevcut Okulu *
            </label>
            <input
              type="text"
              name="currentSchool"
              value={formData.currentSchool}
              onChange={handleChange}
              required
              className="w-full bg-background/50 border border-black/10 dark:border-white/10 hover:border-[#E21F26]/40 focus:border-[#E21F26] rounded-2xl px-4 py-3 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-white/30 outline-none transition-all"
              placeholder="Okul adı"
            />
          </div>

          {/* İlçe */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-[0.15em] text-[#E21F26] mb-2">
              Bulunduğunuz İlçe *
            </label>
            <input
              type="text"
              name="district"
              value={formData.district}
              onChange={handleChange}
              required
              className="w-full bg-background/50 border border-black/10 dark:border-white/10 hover:border-[#E21F26]/40 focus:border-[#E21F26] rounded-2xl px-4 py-3 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-white/30 outline-none transition-all"
              placeholder="İlçe adı"
            />
          </div>

          {/* Program */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-[0.15em] text-[#E21F26] mb-2">
              İlgilendiğiniz Program *
            </label>
            <select
              name="program"
              value={formData.program}
              onChange={handleChange}
              required
              className="w-full bg-background/50 border border-black/10 dark:border-white/10 hover:border-[#E21F26]/40 focus:border-[#E21F26] rounded-2xl px-4 py-3 text-sm text-slate-900 dark:text-white outline-none transition-all"
            >
              <option value="">Seçiniz...</option>
              <option value="Ortaokul Programı">Ortaokul Programı</option>
              <option value="Lise Programı">Lise Programı</option>
              <option value="Destek & Analiz">Destek & Analiz</option>
              <option value="VIP Programlar">VIP Programlar</option>
              <option value="Henüz Karar Vermedim">
                Henüz Karar Vermedim
              </option>
            </select>
          </div>

          {/* Ek Not (optional) */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-[0.15em] text-slate-500 dark:text-white/50 mb-2">
              Ek Not (opsiyonel)
            </label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows={4}
              className="w-full bg-background/50 border border-black/10 dark:border-white/10 hover:border-[#E21F26]/40 focus:border-[#E21F26] rounded-2xl px-4 py-3 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-white/30 outline-none transition-all resize-none"
              placeholder="Eklemek istediğiniz bir not varsa..."
            />
          </div>

          {/* Error */}
          {error && (
            <div className="text-red-500 text-sm text-center">{error}</div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-[#E21F26] hover:bg-[#BE1821] disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-semibold text-sm tracking-wide transition-all hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_32px_rgba(226,31,38,0.45)] hover:shadow-[0_0_48px_rgba(226,31,38,0.6)]"
            style={{ backgroundColor: loading ? undefined : "#E21F26" }}
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Gönderiliyor...
              </>
            ) : (
              <>
                Formu Gönder
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </motion.form>
      </div>
    </section>
  );
}
