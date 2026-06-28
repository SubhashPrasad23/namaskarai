"use client";

import Link from "next/link";
import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronDown, Globe, Sparkles, Menu, X } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { getTranslation } from "@/i18n";
import Image from "next/image";
import { navLinks, moreLinks } from "@/data/navigation";

export default function Navbar() {
  const { locale, setLocale } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);

  const langRef = useRef<HTMLDivElement>(null);
  const moreRef = useRef<HTMLDivElement>(null);

  const closeMobileMenu = useCallback(() => {
    setMobileOpen(false);
  }, []);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (langRef.current && !langRef.current.contains(e.target as Node)) setLangOpen(false);
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) setMoreOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
      document.documentElement.style.overflow = "";
    };
  }, [mobileOpen]);

  const t = (key: string) => getTranslation(locale, key);


  return (
    <header className="sticky top-0 z-[100]">
      <div className="mx-auto md:max-w-5/6 px-4 py-2 sm:px-6 lg:px-0">
        <div className="shadow-md shadow-red-300/25 border border-red-100/80 rounded-2xl backdrop-blur-xl bg-white/75">
          <nav className="shadow-inner shadow-red-100 border-b rounded-t-2xl border-gray-300 flex items-center justify-between px-5 py-2.5">
            <Link href="/" onClick={closeMobileMenu} className="flex items-center gap-2.5 shrink-0">
              <div className="flex h-9 w-9 items-center justify-center shrink-0">
                <Image src="/icons/logo.svg" alt="logo" width={600} height={600} />
              </div>
              <span className="text-lg font-bold tracking-tight">
                Namaskar <span className="text-red-600">AI</span>
              </span>
            </Link>

            <div className="hidden items-center gap-5 lg:flex">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} className="text-xs font-semibold text-black transition-colors hover:text-red-600 capitalize">
                  {link.labelKey === "community"
                    ? locale === "en" ? "Community" : "\u09B8\u09AE\u09CD\u09AA\u09CD\u09F0\u09A6\u09BE\u09AF\u09BC"
                    : link.labelKey === "update"
                      ? locale === "en" ? "Update" : "\u0986\u09AA\u09A1\u09C7\u099F"
                      : t(link.labelKey)}
                </Link>
              ))}
              <div className="relative" ref={moreRef}>
                <button onClick={() => setMoreOpen(!moreOpen)} className="flex items-center gap-1 font-semibold rounded-lg px-3.5 py-2 text-xs  text-black transition-colors hover:text-red-600">
                  {locale === "en" ? "More" : "\u0985\u09A7\u09BF\u0995"}
                  <ChevronDown className="h-3.5 w-3.5" />
                </button>
                {moreOpen && (
                  <div className="glass-dropdown absolute left-0 top-full mt-4 w-44 p-1.5 z-50" style={{ border: "1px solid rgba(255, 255, 255, 0.6)" }}>
                    {moreLinks.map((link) => (
                      <Link key={link.href} href={link.href} onClick={() => setMoreOpen(false)} className="block rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-red-50 hover:text-red-600">
                        {locale === "en" ? link.label : link.labelAs}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="hidden items-center gap-3 lg:flex">
              <a href="#community" className="hidden glass-btn-red relative overflow-hidden xl:inline-flex items-center gap-1 rounded-xl px-4 py-2.5 text-white font-medium text-xs">
                <span className="absolute top-[3px] left-[6px] right-[6px] h-[45%] rounded-full bg-gradient-to-b from-white/45 to-transparent pointer-events-none" />
                <span className="relative z-10 flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <div className="w-5 h-5 p-0.5 rounded-full bg-white flex items-center justify-center">
                      <Image src="/images/fb.png" alt="fb Icon" width={500} height={500} />
                    </div>
                    <div className="w-5 h-5 p-0.5 rounded-full bg-white flex items-center justify-center text-[10px] text-white">
                      <Image src="/images/instagram.png" alt="instagram Icon" width={500} height={500} />
                    </div>
                  </div>
                  See Community Demos
                </span>
              </a>
              <div className="relative" ref={langRef}>
                <button onClick={() => setLangOpen(!langOpen)} className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-black hover:bg-slate-50 transition-colors">
                  <Globe className="h-4 w-4" />
                  <span>{locale === "en" ? "English" : "\u0985\u09B8\u09AE\u09C0\u09AF\u09BC\u09BE"}</span>
                  <ChevronDown className="h-3.5 w-3.5" />
                </button>
                {langOpen && (
                  <div className="glass-dropdown absolute right-0 top-full mt-4 w-36 p-1.5 z-50" style={{ border: "1px solid rgba(255, 255, 255, 0.6)" }}>
                    <button onClick={() => { setLocale("en"); setLangOpen(false); }} className={`w-full text-left rounded-lg px-3 py-2 text-sm font-medium transition-colors ${locale === "en" ? "bg-red-50 text-red-600" : "text-slate-600 hover:bg-slate-50"}`}>
                      English
                    </button>
                    <button onClick={() => { setLocale("as"); setLangOpen(false); }} className={`w-full text-left rounded-lg px-3 py-2 text-sm font-medium transition-colors ${locale === "as" ? "bg-red-50 text-red-600" : "text-slate-600 hover:bg-slate-50"}`}>
                      {"\u0985\u09B8\u09AE\u09C0\u09AF\u09BC\u09BE"}
                    </button>
                  </div>
                )}
              </div>
              <Link href="/ai-course" className="glass-btn-red relative overflow-hidden inline-flex items-center gap-1 rounded-xl px-4 py-2.5 text-white font-medium text-xs">
                <span className="absolute top-[3px] left-[5px] right-[5px] h-[25%] rounded-full bg-gradient-to-b from-white/60 to-transparent pointer-events-none" />
                <span className="relative z-10">Start Learning</span>
                <ArrowRight className="relative z-10 h-4 w-5" />
              </Link>
            </div>

            <button onClick={() => setMobileOpen((prev) => !prev)} className="relative flex h-9 w-9 items-center justify-center rounded-lg hover:bg-red-50 lg:hidden cursor-pointer transition-colors" aria-label="Toggle menu">
              <span className={`absolute inset-0 flex items-center justify-center transition-all duration-200 ${mobileOpen ? "opacity-0 rotate-90 scale-75" : "opacity-100 rotate-0 scale-100"}`}>
                <Menu className="h-5 w-5" />
              </span>
              <span className={`absolute inset-0 flex items-center justify-center transition-all duration-200 ${mobileOpen ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-75"}`}>
                <X className="h-5 w-5" />
              </span>
            </button>
          </nav>
          <div className="flex items-center gap-2 px-5 py-2 text-sm text-slate-700 font-medium">
            <Sparkles className="text-red-600 h-4 w-4"/>
            <span className="md:text-xs text-[10px]">
              {locale === "en"
                ? "Today's quick start: copy and run 1 prompt in 10 minutes."
                : "\u0986\u099C\u09BF\u09F0 \u09A6\u09CD\u09F0\u09C1\u09A4 \u0986\u09F0\u09AE\u09CD\u09AD: \u09E7\u09E6 \u09AE\u09BF\u09A8\u09BF\u099F\u09A4 \u09E7\u099F\u09BE \u09AA\u09CD\u09F0\u09AE\u09AA\u09CD\u099F \u0995\u09AA\u09BF \u0986\u09F0\u09C1 \u09F0\u09BE\u09A8 \u0995\u09F0\u0995\u0964"}
            </span>
          </div>


          <AnimatePresence>
            {mobileOpen && (
              <motion.div
                key="mobile-menu"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden lg:hidden"
              >
                <div className="px-4 py-4 border-t border-red-50 max-h-[70vh] overflow-y-auto">
                  <div className="flex flex-col gap-1">
                    {navLinks.map((link, i) => (
                      <motion.div key={link.href} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.2, delay: i * 0.05 }}>
                        <Link href={link.href} onClick={closeMobileMenu} className="block rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:text-red-600 hover:bg-red-50">
                          {link.labelKey === "community"
                            ? locale === "en" ? "Community" : "\u09B8\u09AE\u09CD\u09AA\u09CD\u09F0\u09A6\u09BE\u09AF\u09BC"
                            : link.labelKey === "update"
                              ? locale === "en" ? "Update" : "\u0986\u09AA\u09A1\u09C7\u099F"
                              : t(link.labelKey)}
                        </Link>
                      </motion.div>
                    ))}
                    <div className="mt-2 pt-2" style={{ borderTop: "1px solid #fef2f2" }}>
                      <span className="px-3 text-xs font-semibold text-slate-400 uppercase">
                        {locale === "en" ? "More" : "\u0985\u09A7\u09BF\u0995"}
                      </span>
                      {moreLinks.map((link, i) => (
                        <motion.div key={link.href} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.2, delay: (navLinks.length + i) * 0.05 }}>
                          <Link href={link.href} onClick={closeMobileMenu} className="block rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:text-red-600 hover:bg-red-50">
                            {locale === "en" ? link.label : link.labelAs}
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                  <div className="mt-4 flex items-center gap-3 pt-4" style={{ borderTop: "1px solid #fef2f2" }}>
                    <button onClick={() => { setLocale(locale === "en" ? "as" : "en"); }} className="flex items-center gap-2 rounded-lg bg-slate-100 px-3 py-2 text-sm font-medium text-slate-600">
                      {locale === "en" ? "\u0985\u09B8\u09AE\u09C0\u09AF\u09BC\u09BE" : "English"}
                    </button>
                    <Link href="/ai-course" onClick={closeMobileMenu} className="glass-btn flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white">
                      {locale === "en" ? "Start Learning" : "\u09B6\u09BF\u0995\u09BF\u09AC\u09B2\u09C8 \u0986\u09F0\u09AE\u09CD\u09AD \u0995\u09F0\u0995"}
                    </Link>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}

