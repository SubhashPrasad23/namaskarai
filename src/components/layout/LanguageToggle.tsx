"use client";

import { useLanguage } from "@/i18n/LanguageContext";

export default function LanguageToggle() {
  const { locale, toggleLocale } = useLanguage();

  return (
    <button
      onClick={toggleLocale}
      className="flex h-9 items-center rounded-lg bg-[#F67F28] px-3 text-sm font-medium text-white cursor-pointer"
      aria-label="Toggle language"
    >
      <span>{locale === "en" ? "অসমীয়া" : "English"}</span>
    </button>
  );
}
