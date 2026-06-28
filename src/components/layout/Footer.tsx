"use client";

import Link from "next/link";
import { Globe } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { getTranslation } from "@/i18n";
import Image from "next/image";

const footerLinks = [
  { href: "/prompt-packs", label: "Prompt Packs", labelAs: "প্ৰমপ্ট পেক" },
  { href: "/ai-tools", label: "AI Tools", labelAs: "এআই সঁজুলি" },
  { href: "/ai-course", label: "AI Course", labelAs: "এআই পাঠ্যক্ৰম" },
  { href: "/news", label: "Updates", labelAs: "আপডেট" },
  { href: "#", label: "FAQ", labelAs: "সঘনাই সোধা প্ৰশ্ন" },
  { href: "#", label: "Contact", labelAs: "যোগাযোগ" },
  { href: "#", label: "Sitemap", labelAs: "যোগাযোগ" },

];

export default function Footer() {
  const { locale, setLocale } = useLanguage();
  const t = (key: string) => getTranslation(locale, key);

  return (
    <footer className="">
      <div className="mx-auto max-w-5/6 pb-10 px-4 py-2 sm:px-6 lg:px-0">
        <div className="glass-card px-4 py-5 sm:px-6 rounded-2xl shadow-inner shadow-white backdrop-blur-sm z-50">
          <div className="flex flex-col sm:flex-row items-start justify-between gap-6 sm:gap-8">
            {/* Left */}
            <div className="w-full sm:w-auto">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 items-center justify-center  shrink-0">
                   <Image
                                                      src="/icons/logo.svg"
                                                      alt="logo"
                                                      width={600}
                                                      height={600}
                                                    />
                </div>
                <div className="space-y-1">
                  <h5 className="text-xl font-bold">
                    Namaskar <span className="text-red-600">AI</span>
                  </h5>
                  <p className="text-xs text-black max-w-xs">
                    {locale === "en"
                      ? "Practical AI learning for Assam in Assamese."
                      : "অসমীয়াত অসমৰ বাবে ব্যৱহাৰিক এআই শিক্ষণ।"}
                  </p>
                  <div className="w-10 h-0.5 bg-red-600 mt-2 rounded-full" />
                </div>
              </div>
            </div>

            {/* Right  */}
            <div className="w-full sm:w-auto sm:mr-0 md:mr-10 lg:mr-20 space-y-1">
              <h4 className="font-medium text-black lg:text-sm text-xs">
                {locale === "en" ? "Settings" : "ছেটিংছ"}
              </h4>
              <div className="flex items-center gap-3">
                <Globe className="h-4 w-4 text-black shrink-0" />
                <button
                  onClick={() => setLocale("en")}
                  className={`rounded-lg px-4 py-1.5 text-xs font-medium transition-colors ${
                    locale === "en"
                      ? "bg-red-600 text-white"
                      : "text-black hover:bg-slate-200"
                  }`}
                >
                  English
                </button>
                <button
                  onClick={() => setLocale("as")}
                  className={`rounded-lg px-4 py-1.5 text-xs font-medium transition-colors ${
                    locale === "as"
                      ? "bg-red-600 text-white"
                      : "text-black hover:bg-slate-200"
                  }`}
                >
                  অসমীয়া
                </button>
              </div>
            </div>
          </div>

          <div className="mt-5 border-t pt-3 border-red-100">
            <div className="flex flex-wrap items-center justify-center gap-3 md:gap-6">
              {footerLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-xs text-black  font-medium"
                >
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
