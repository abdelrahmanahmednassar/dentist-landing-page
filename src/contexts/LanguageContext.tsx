"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import arMessages from "../../messages/ar.json";
import enMessages from "../../messages/en.json";

type Language = "ar" | "en";

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

const messages: Record<Language, any> = {
  ar: arMessages,
  en: enMessages,
};

// Helper function to get nested translation value
function getNestedValue(obj: any, path: string): string {
  const keys = path.split(".");
  let value = obj;

  for (const key of keys) {
    if (value && typeof value === "object" && key in value) {
      value = value[key];
    } else {
      return path; // Return the key itself if not found
    }
  }

  return typeof value === "string" ? value : path;
}

// Helper function to get cookie value
function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift() || null;
  return null;
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [language, setLanguage] = useState<Language>("ar");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Get stored language from cookie (not localStorage)
    const storedLang = getCookie("locale") as Language;
    if (storedLang && (storedLang === "ar" || storedLang === "en")) {
      setLanguage(storedLang);
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    // Update HTML attributes immediately for instant visual feedback
    document.documentElement.setAttribute("lang", language);
    document.documentElement.setAttribute(
      "dir",
      language === "ar" ? "rtl" : "ltr",
    );
    document.body.setAttribute("dir", language === "ar" ? "rtl" : "ltr");
  }, [language, mounted]);

  const toggleLanguage = async () => {
    const newLanguage = language === "ar" ? "en" : "ar";

    // 1. Update client state immediately
    setLanguage(newLanguage);

    // 2. Update HTML attributes for instant visual feedback
    if (typeof document !== "undefined") {
      document.documentElement.lang = newLanguage;
      document.documentElement.dir = newLanguage === "ar" ? "rtl" : "ltr";
      document.body.dir = newLanguage === "ar" ? "rtl" : "ltr";
    }

    // 3. Save locale to cookie via API
    await fetch("/api/locale", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ locale: newLanguage }),
    });

    // 4. Refresh server components to pick up new locale from cookie
    router.refresh();
  };

  const t = (key: string): string => {
    return getNestedValue(messages[language], key);
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      <NextIntlClientProvider
        locale={language}
        messages={messages[language]}
        timeZone="Africa/Cairo"
      >
        {children}
      </NextIntlClientProvider>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
