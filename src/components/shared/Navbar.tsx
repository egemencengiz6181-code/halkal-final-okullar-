"use client"

import React, { useEffect, useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Link, usePathname } from "@/navigation"
import { LucideIcon, ChevronDown, Search, Target, Share2, Code, Globe, Camera, Palette, Megaphone, Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { useTranslations } from 'next-intl'
import LanguageSwitcher from "./LanguageSwitcher"
import Image from "next/image"
import AnalysisModal from "./AnalysisModal"

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

  const openMenu = (name: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setIsHovered(name)
  }

  const closeMenu = () => {
    closeTimer.current = setTimeout(() => setIsHovered(null), 80)
  }

  const navItems: NavItem[] = [
    { name: t('home'), url: "/", icon: Globe },
    { name: t('about'), url: "/about", icon: Globe },
    { name: t('services'), url: "/services", icon: ChevronDown, hasMegaMenu: true },
    { name: t('references'), url: "/references", icon: Globe },
    { name: t('contact'), url: "/contact", icon: Globe },
  ]

  const services: ServiceItem[] = [
    { title: st('items.seo.title'), description: st('items.seo.description'), href: "/services/seo", icon: Search },
    { title: st('items.google-ads.title'), description: st('items.google-ads.description'), href: "/services/google-ads", icon: Target },
    { title: st('items.meta-ads.title'), description: st('items.meta-ads.description'), href: "/services/meta-ads", icon: Share2 },
    { title: st('items.web-design.title'), description: st('items.web-design.description'), href: "/services/web-design", icon: Code },
    { title: st('items.social-media.title'), description: st('items.social-media.description'), href: "/services/social-media", icon: Globe },
    { title: st('items.production.title'), description: st('items.production.description'), href: "/services/production", icon: Camera },
    { title: st('items.design.title'), description: st('items.design.description'), href: "/services/design", icon: Palette },
    { title: st('items.pr.title'), description: st('items.pr.description'), href: "/services/pr", icon: Megaphone },
  ]

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
    <header className="fixed top-0 left-0 right-0 z-50 w-full px-6 md:px-12 py-5 flex items-center justify-between pointer-events-none">
      {/* Logo - Sol Taraf */}
      <div className="pointer-events-auto w-[200px] md:w-[260px] flex items-center">
        <Link href="/" className="flex items-center">
          <Image 
            src="/logos/Main_Logo_Beyaz.png" 
            alt="Renee DesignLab" 
            width={240} 
            height={72} 
            className="h-[64px] md:h-[80px] w-auto object-contain"
            priority
          />
        </Link>
      </div>

      {/* Nav Linkleri - Orta Kısım (sadece desktop) */}
      <div className="pointer-events-auto hidden md:flex flex-col items-center">
        <div className="flex items-center gap-1 bg-white/5 border border-white/10 backdrop-blur-lg py-1 px-1 rounded-full shadow-lg relative max-w-fit">
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
                    "relative cursor-pointer text-sm font-semibold px-6 py-2 rounded-full transition-colors flex items-center gap-2",
                    "text-white/60 hover:text-white",
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
                      className="absolute inset-0 bg-primary/10 rounded-full -z-10"
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
          <div className="pr-4 border-l border-white/10 ml-2 pl-4 flex items-center h-8">
              <LanguageSwitcher />
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
              className="absolute top-full mt-3 w-[640px] p-6 bg-background/95 border border-white/10 backdrop-blur-2xl rounded-[32px] shadow-2xl z-50"
            >
              <div className="grid grid-cols-2 gap-4">
                {services.map((service) => (
                  <Link
                    key={service.title}
                    href={service.href}
                    className="flex items-start gap-4 p-4 rounded-2xl hover:bg-white/5 transition-colors group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <service.icon className="w-5 h-5 text-primary-light" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white mb-1">{service.title}</div>
                      <div className="text-xs text-white/40 line-clamp-1">{service.description}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Sağ taraf - Analiz butonu (sadece desktop) */}
      <div className="pointer-events-auto hidden md:flex items-center justify-end w-[225px]">
        <AnalysisModal />
      </div>

      {/* Hamburger butonu (sadece mobil) */}
      <button
        className="pointer-events-auto md:hidden flex items-center justify-center w-10 h-10 rounded-full bg-white/10 border border-white/10 backdrop-blur-lg text-white"
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
          className="fixed inset-0 z-40 flex flex-col bg-[#0a0a0f]/95 backdrop-blur-2xl md:hidden"
        >
          {/* Üst bar */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
            <Link href="/" onClick={() => setIsMobileOpen(false)}>
              <Image
                src="/logos/Main_Logo_Beyaz.png"
                alt="Renee DesignLab"
                width={200}
                height={60}
                className="h-[56px] w-auto object-contain"
                priority
              />
            </Link>
            <button
              onClick={() => setIsMobileOpen(false)}
              className="w-10 h-10 rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-white"
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
                        "w-full flex items-center justify-between px-4 py-4 rounded-2xl text-left text-base font-semibold transition-colors",
                        isActive ? "bg-primary/10 text-white" : "text-white/60 hover:text-white hover:bg-white/5"
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
                                className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 transition-colors group"
                              >
                                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors shrink-0">
                                  <service.icon className="w-4 h-4 text-primary-light" />
                                </div>
                                <span className="text-sm font-medium text-white/70 group-hover:text-white transition-colors">{service.title}</span>
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
                    "px-4 py-4 rounded-2xl text-base font-semibold transition-colors",
                    isActive ? "bg-primary/10 text-white" : "text-white/60 hover:text-white hover:bg-white/5"
                  )}
                >
                  {item.name}
                </Link>
              )
            })}
          </nav>

          {/* Alt bar - dil + analiz butonu */}
          <div className="px-6 py-6 border-t border-white/10 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-white/40">Dil</span>
              <LanguageSwitcher />
            </div>
            <AnalysisModal />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
    </>
  )
}
