"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import styles from "@/styles/header.module.css";

export default function LanguageToggle() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const toggleLanguage = () => {
    const nextLocale = locale === "ar" ? "en" : "ar";
    router.replace(pathname || "/", { locale: nextLocale });
  };

  return (
    <button
      className={styles.languageToggleBtn}
      aria-label="Change Language"
      onClick={toggleLanguage}
    >
      <i className="bx bx-world"></i>
      <span>{locale === "ar" ? "EN" : "عربي"}</span>
    </button>
  );
}

