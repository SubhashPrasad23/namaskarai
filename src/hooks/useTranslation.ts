"use client";

import { useLanguage } from "@/i18n/LanguageContext";
import { getTranslation } from "@/i18n";

export function useTranslation() {
  const { locale, setLocale, toggleLocale } = useLanguage();

  const t = (key: string): string => {
    return getTranslation(locale, key);
  };

  return { t, locale, setLocale, toggleLocale };
}
