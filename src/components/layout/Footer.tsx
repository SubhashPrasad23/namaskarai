"use client";

import Link from "next/link";
import { Globe } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { getTranslation } from "@/i18n";
import Image from "next/image";

const footerLinks = [
  { href: "/prompt-packs", label: "Prompt Packs", labelAs: "\u09AA\u09CD\u09F0\u09AE\u09AA\u09CD\u099F \u09AA\u09C7\u0995" },
  { href: "/ai-tools", label: "AI Tools", labelAs: "\u098F\u0986\u0987 \u09B8\u0981\u099C\u09C1\u09B2\u09BF" },
  { href: "/ai-course", label: "AI Course", labelAs: "\u098F\u0986\u0987 \u09AA\u09BE\u09A0\u09CD\u09AF\u0995\u09CD\u09F0\u09AE" },
  { href: "/news", label: "Updates", labelAs: "\u0986\u09AA\u09A1\u09C7\u099F" },
  { href: "#", label: "FAQ", labelAs: "\u09B8\u0998\u09A8\u09BE\u0987 \u09B8\u09CB\u09A7\u09BE \u09AA\u09CD\u09F0\u09B6\u09CD\u09A8" },
  { href: "/contact", label: "Contact", labelAs: "\u09AF\u09CB\u0997\u09BE\u09AF\u09CB\u0997" },
  { href: "/sitemap.xml", label: "Sitemap", labelAs: "\u099B\u09BE\u0987\u099F\u09AE\u09C7\u09AA" },
];

export default function Footer() {
  const { locale, setLocale } = useLanguage();
  const t = (key: string) => getTranslation(locale, key);

  return (
    <footer className="w-full">
      <div className="mx-auto w-full md:max-w-5/6 pb-0 md:pb-10 px-0 md:px-4 sm:px-6 lg:px-0">
        <div className="glass-card px-5 py-6 sm:px-6 md:rounded-2xl! rounded-none! shadow-inner shadow-white backdrop-blur-xs z-50">
          <div className="flex flex-col items-center text-center md:flex-row md:items-start md:text-left md:justify-between gap-6 sm:gap-8">
            <div className="w-full md:w-auto flex flex-col items-center md:items-start">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center shrink-0">
                  <Image src="/icons/logo.svg" alt="logo" width={600} height={600} />
                </div>
                <div className="space-y-1">
                  <h5 className="text-xl font-bold">
                    Namaskar <span className="text-red-600">AI</span>
                  </h5>
                </div>
              </div>
              <p className="text-xs text-black max-w-xs mt-2">
                {locale === "en"
                  ? "Practical AI learning for Assam in Assamese."
                  : "\u0985\u09B8\u09AE\u09C0\u09AF\u09BC\u09BE\u09A4 \u0985\u09B8\u09AE\u09F0 \u09AC\u09BE\u09AC\u09C7 \u09AC\u09CD\u09AF\u09B1\u09B9\u09BE\u09F0\u09BF\u0995 \u098F\u0986\u0987 \u09B6\u09BF\u0995\u09CD\u09B7\u09A3\u0964"}
              </p>
              <div className="w-10 h-0.5 bg-red-600 mt-3 rounded-full" />
            </div>

            <div className="w-full md:w-auto flex flex-col items-center md:items-start gap-2">
              <h4 className="font-medium text-black lg:text-sm text-xs">
                {locale === "en" ? "Settings" : "\u099B\u09C7\u099F\u09BF\u0982\u099B"}
              </h4>
              <div className="flex items-center gap-3">
                <Globe className="h-4 w-4 text-black shrink-0" />
                <button
                  onClick={() => setLocale("en")}
                  className={`rounded-lg px-4 py-1.5 text-xs font-medium transition-colors ${locale === "en" ? "bg-red-600 text-white" : "text-black hover:bg-slate-200"}`}
                >
                  English
                </button>
                <button
                  onClick={() => setLocale("as")}
                  className={`rounded-lg px-4 py-1.5 text-xs font-medium transition-colors ${locale === "as" ? "bg-red-600 text-white" : "text-black hover:bg-slate-200"}`}
                >
                  {"\u0985\u09B8\u09AE\u09C0\u09AF\u09BC\u09BE"}
                </button>
              </div>
            </div>
          </div>

          <div className="mt-5 border-t pt-3 border-red-100">
            <div className="flex flex-wrap items-center justify-center gap-3 md:gap-6">
              {footerLinks.map((link) => (
                <Link key={link.label} href={link.href} className="text-xs text-black font-medium hover:text-red-600 transition-colors">
                  {locale === "en" ? link.label : link.labelAs}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
