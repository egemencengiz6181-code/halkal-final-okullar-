'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function LocationMap() {
  return (
    <section className="w-full h-[450px] relative overflow-hidden group bg-background">
      <iframe
        src="https://maps.google.com/maps?q=Halkal%C4%B1+Merkez%2C+Fatih+Cd.+No%3A18%2C+Kat%3A2+34303+K%C3%BC%C3%A7%C3%BCk%C3%A7ekmece%2F%C4%B0stanbul&t=&z=16&ie=UTF8&iwloc=&output=embed"
        width="100%"
        height="100%"
        style={{ border: 0, filter: 'grayscale(1) contrast(1.2) invert(0.9)' }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="transition-all duration-1000 group-hover:grayscale-0 group-hover:invert-0 group-hover:contrast-100"
        title="Halkalı Final LGS Dershanesi"
      />
      
      {/* Sanatsal Geçiş Katmanları */}
      <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_120px_rgba(0,0,0,0.9)]" />
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-background via-background/80 to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none" />
      
      {/* Konum Etiketi */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="absolute bottom-12 left-12 p-6 rounded-3xl bg-background/60  border border-black/10 dark:border-white/10 pointer-events-none z-20 hidden md:block"
      >
        <div className="text-primary-light font-bold text-xs uppercase tracking-widest mb-2">Konum</div>
        <div className="text-slate-900 dark:text-white font-medium">Fatih Cd. No:18, Kat:2, Halkalı Merkez</div>
        <div className="text-slate-500 dark:text-white/40 text-sm font-light">Küçükçekmece / İstanbul</div>
      </motion.div>
    </section>
  );
}
