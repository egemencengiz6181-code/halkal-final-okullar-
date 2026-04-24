"use client"

import React, { useEffect, useState, useRef, useMemo, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Link, usePathname } from "@/navigation"
import { LucideIcon, ChevronDown, GraduationCap, BookOpen, Users, FileText, Menu, X, Trophy, Award, Star } from "lucide-react"
import { cn } from "@/lib/utils"
import { useTranslations } from 'next-intl'
import LanguageSwitcher from "./LanguageSwitcher"
import Image from "next/image"
import dynamic from "next/dynamic"
import ThemeToggle from "./ThemeToggle"

const AnalysisModal = dynamic(() => import('./AnalysisModal'), { ssr: false })

interface NavItem {
  name: string
  url: string
  icon: LucideIcon
  hasMegaMenu?: boolean
}

interface ServiceItem {
  title: string
  description: string
  href: string
  icon: LucideIcon
}

export default function Navbar() {
  const t = useTranslations('Navbar')
  const st = useTranslations('Services')
  const pathname = usePathname()
  const [isHovered, setIsHovered] = useState<string | null>(null)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const openMenu = useCallback((name: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setIsHovered(name)
  }, [])

  const closeMenu = useCallback(() => {
    closeTimer.current = setTimeout(() => setIsHovered(null), 80)
  }, [])

  const navItems: NavItem[] = useMemo(() => [
    { name: t('home'), url: "/", icon: BookOpen },
    { name: t('about'), url: "/about", icon: BookOpen },
    { name: t('services'), url: "/services", icon: ChevronDown, hasMegaMenu: true },
    { name: t('guidance'), url: "/rehberlik", icon: Users },
    { name: t('references'), url: "/references", icon: Award },
    { name: t('contact'), url: "/contact", icon: BookOpen },
  // eslint-disable-next-line react-hooks/exhaustive-deps
  ], [t])

  const services: ServiceItem[] = useMemo(() => [
    { title: st('items.5-sinif.title'), description: st('items.5-sinif.description'), href: "/services/5-sinif", icon: GraduationCap },
    { title: st('items.6-sinif.title'), description: st('items.6-sinif.description'), href: "/services/6-sinif", icon: GraduationCap },
    { title: st('items.7-sinif.title'), description: st('items.7-sinif.description'), href: "/services/7-sinif", icon: GraduationCap },
    { title: st('items.8-sinif.title'), description: st('items.8-sinif.description'), href: "/services/8-sinif", icon: Trophy },
    { title: st('items.deneme-kulubu.title'), description: st('items.deneme-kulubu.description'), href: "/services/deneme-kulubu", icon: FileText },
    { title: st('items.ozel-ders.title'), description: st('items.ozel-ders.description'), href: "/services/ozel-ders", icon: Users },
  // eslint-disable-next-line react-hooks/exhaustive-deps
  ], [st])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Rota değişince mobil menüyü kapat
  useEffect(() => {
    setIsMobileOpen(false)
    setMobileServicesOpen(false)
  }, [pathname])

  // Mobil menü açıkken body scroll'u engelle
  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => { document.body.style.overflow = "" }
  }, [isMobileOpen])

  const activeTab = navItems.find((item) => {
    if (item.url === "/") return pathname === "/" || pathname === ""
    return pathname.startsWith(item.url)
  })?.name || t('home')

  const servicesLabel = t('services')

  return (
    <>
    <header className="fixed top-0 left-0 right-0 z-50 w-full px-6 md:px-12 py-3 md:py-5 flex items-center justify-between pointer-events-none">
      {/* Mobile glassmorphism background band */}
      <div
        className="absolute inset-0 md:hidden bg-black/40 backdrop-blur-[25px] border-b border-white/10 pointer-events-none"
        style={{ WebkitBackdropFilter: 'blur(25px)' }}
      />
      {/* Logo - Sol Taraf */}
      <div className="pointer-events-auto flex-1 flex items-center relative">
        <Link href="/" className="flex items-center">
          <Image 
            src="/logos/final%20logo%20png.png" 
            alt="Halkalı Final LGS Dershanesi" 
            width={1540} 
            height={598} 
            className="h-[44px] md:h-[56px] w-auto object-contain"
            priority
          />
        </Link>
      </div>

      {/* Nav Linkleri - Orta Kısım (sadece desktop) */}
      <div className="pointer-events-auto hidden md:flex flex-col items-center">
        <div className="flex items-center gap-1 bg-black/30 border border-white/15 backdrop-blur-[25px] py-1 px-1 rounded-full shadow-2xl relative max-w-fit" style={{ WebkitBackdropFilter: 'blur(25px)' }}>
          {navItems.map((item) => {
            const isActive = activeTab === item.name

            return (
              <div
                key={item.name}
                onMouseEnter={() => item.hasMegaMenu ? openMenu(item.name) : undefined}
                onMouseLeave={() => item.hasMegaMenu ? closeMenu() : undefined}
                className="relative"
              >
                <Link
                  href={item.url}
                  className={cn(
                    "relative cursor-pointer text-sm font-semibold px-6 py-2 rounded-full transition-colors flex items-center gap-2 [text-shadow:0px_2px_4px_rgba(0,0,0,0.6)]",
                    "text-white/70 hover:text-white",
                    isActive && "text-white"
                  )}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    {item.name}
                    {item.hasMegaMenu && <ChevronDown className={cn("w-3 h-3 transition-transform duration-300", isHovered === item.name && "rotate-180")} />}
                  </span>
                  
                  {isActive && (
                    <motion.div
                      layoutId="lamp"
                      className="absolute inset-0 bg-primary/20 border border-primary/30 backdrop-blur-sm rounded-full -z-10"
                      initial={false}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                    >
                      <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-primary-light rounded-t-full shadow-[0_-4px_8px_0_rgba(139,92,246,0.8)]">
                        <div className="absolute w-12 h-6 bg-primary/20 blur-md -top-2 -left-2" />
                        <div className="absolute w-8 h-6 bg-primary/20 blur-md -top-1" />
                        <div className="absolute w-4 h-4 bg-primary/20 blur-sm top-0 left-2" />
                      </div>
                    </motion.div>
                  )}
                </Link>
              </div>
            )
          })}
          <div className="border-l border-white/15 ml-2 pl-3 flex items-center h-8">
            <ThemeToggle />
          </div>
        </div>

        {/* Mega Menu — sibling to the nav pill, centered below it */}
        <AnimatePresence>
          {isHovered === servicesLabel && (
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.97 }}
              transition={{ duration: 0.18 }}
              onMouseEnter={() => openMenu(servicesLabel)}
              onMouseLeave={() => closeMenu()}
              className="absolute top-full mt-3 w-[640px] p-6 bg-black/75 border border-white/10 backdrop-blur-[30px] rounded-[32px] shadow-2xl z-50"
              style={{ WebkitBackdropFilter: 'blur(30px)' }}
            >
              <div className="grid grid-cols-2 gap-4">
                {services.map((service) => (
                  <Link
                    key={service.title}
                    href={service.href}
                    className="flex items-start gap-4 p-4 rounded-2xl hover:bg-white/10 transition-colors group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                      <service.icon className="w-5 h-5 text-primary-light" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white mb-1 [text-shadow:0px_1px_3px_rgba(0,0,0,0.4)]">{service.title}</div>
                      <div className="text-xs text-white/50 line-clamp-1">{service.description}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Sağ taraf - Analiz butonu (sadece desktop) */}
      <div className="pointer-events-auto hidden md:flex items-center justify-end flex-1">
        <AnalysisModal />
      </div>

      {/* Hamburger butonu (sadece mobil) */}
      <button
        className="pointer-events-auto md:hidden flex items-center justify-center w-10 h-10 rounded-full bg-white/15 border border-white/25 backdrop-blur-lg text-white relative [text-shadow:0px_1px_3px_rgba(0,0,0,0.5)]"
        onClick={() => setIsMobileOpen((v) => !v)}
        aria-label="Menüyü aç/kapat"
      >
        <AnimatePresence mode="wait" initial={false}>
          {isMobileOpen ? (
            <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.18 }}>
              <X className="w-5 h-5" />
            </motion.span>
          ) : (
            <motion.span key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.18 }}>
              <Menu className="w-5 h-5" />
            </motion.span>
          )}
        </AnimatePresence>
      </button>
    </header>

    {/* Mobil Menü Overlay */}
    <AnimatePresence>
      {isMobileOpen && (
        <motion.div
          key="mobile-menu"
          initial={{ opacity: 0, x: "100%" }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: "100%" }}
          transition={{ type: "spring", stiffness: 260, damping: 30 }}
          className="fixed inset-0 z-40 flex flex-col bg-black/85 backdrop-blur-[30px] md:hidden"
          style={{ WebkitBackdropFilter: 'blur(30px)' }}
        >
          {/* Üst bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
            <Link href="/" onClick={() => setIsMobileOpen(false)}>
              <Image
                src="/logos/final%20logo%20png.png"
                alt="Halkalı Final LGS Dershanesi"
                width={1540}
                height={598}
                className="h-[40px] w-auto object-contain"
                priority
              />
            </Link>
            <button
              onClick={() => setIsMobileOpen(false)}
              className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white"
              aria-label="Kapat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Nav linkleri */}
          <nav className="flex-1 overflow-y-auto px-6 py-8 flex flex-col gap-2">
            {navItems.map((item, i) => {
              const isActive = activeTab === item.name
              if (item.hasMegaMenu) {
                return (
                  <div key={item.name}>
                    <button
                      onClick={() => setMobileServicesOpen((v) => !v)}
                      className={cn(
                        "w-full flex items-center justify-between px-4 py-4 rounded-2xl text-left text-base font-semibold transition-colors [text-shadow:0px_1px_3px_rgba(0,0,0,0.5)]",
                        isActive ? "bg-primary/20 border border-primary/30 text-white" : "text-white/60 hover:text-white hover:bg-white/10"
                      )}
                    >
                      <span>{item.name}</span>
                      <ChevronDown className={cn("w-4 h-4 transition-transform duration-300", mobileServicesOpen && "rotate-180")} />
                    </button>
                    <AnimatePresence>
                      {mobileServicesOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.22 }}
                          className="overflow-hidden"
                        >
                          <div className="flex flex-col gap-1 pl-2 pt-2 pb-2">
                            {services.map((service) => (
                              <Link
                                key={service.title}
                                href={service.href}
                                onClick={() => setIsMobileOpen(false)}
                                className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-colors group"
                              >
                                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors shrink-0">
                                  <service.icon className="w-4 h-4 text-primary-light" />
                                </div>
                                <span className="text-sm font-medium text-black/60 group-hover:text-black dark:text-white/70 dark:group-hover:text-white transition-colors">{service.title}</span>
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )
              }
              return (
                <Link
                  key={item.name}
                  href={item.url}
                  onClick={() => setIsMobileOpen(false)}
                  className={cn(
                    "px-4 py-4 rounded-2xl text-base font-semibold transition-colors [text-shadow:0px_1px_3px_rgba(0,0,0,0.5)]",
                    isActive ? "bg-primary/20 border border-primary/30 text-white" : "text-white/60 hover:text-white hover:bg-white/10"
                  )}
                >
                  {item.name}
                </Link>
              )
            })}
          </nav>

          {/* Alt bar - dil + analiz butonu */}
          <div className="px-6 py-6 border-t border-white/10 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <ThemeToggle className="flex-shrink-0" />
              <span className="text-xs text-white/40 select-none">Tema</span>
            </div>
            <AnalysisModal />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
    </>
  )
}
