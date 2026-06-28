import en from "./locales/en.json";
import as_ from "./locales/as.json";

export type Locale = "en" | "as";

export const locales: Record<Locale, typeof en> = {
  en,
  as: as_,
};

export const defaultLocale: Locale = "en";

export function getTranslation(
  locale: Locale,
  key: string
): string {
  const keys = key.split(".");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let result: any = locales[locale];

  for (const k of keys) {
    if (result && typeof result === "object" && k in result) {
      result = result[k];
    } else {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let fallback: any = locales.en;
      for (const fk of keys) {
        if (fallback && typeof fallback === "object" && fk in fallback) {
          fallback = fallback[fk];
        } else {
          return key;
        }
      }
      return typeof fallback === "string" ? fallback : key;
    }
  }

  return typeof result === "string" ? result : key;
}
