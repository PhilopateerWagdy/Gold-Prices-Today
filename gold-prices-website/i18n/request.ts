// type Locale = "en" | "ar";
import en from "../public/locales/en/translation.json";
import ar from "../public/locales/ar/translation.json";

const translations = {
  en: en,
  ar: ar,
} as const;

export async function getTranslations(locale: "en" | "ar") {
  return (key: keyof (typeof translations)["en" | "ar"]) => {
    return translations[locale][key] ?? key;
  };
}
