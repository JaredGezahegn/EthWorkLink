import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import { translations, type Language, type TranslationKey } from "./translations";

interface LanguageContextType {
  lang: Language;
  toggleLang: () => void;
  t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>("en");

  const toggleLang = useCallback(() => {
    setLang((prev) => (prev === "en" ? "am" : "en"));
  }, []);

  const t = useCallback(
    (key: TranslationKey) => {
      return translations[lang][key] || key;
    },
    [lang]
  );

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
