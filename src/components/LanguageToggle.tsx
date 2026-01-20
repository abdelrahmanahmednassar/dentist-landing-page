"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import styles from "@/styles/header.module.css";

export default function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button
      className={styles.languageToggleBtn}
      aria-label="Change Language"
      onClick={toggleLanguage}
    >
      <i className="bx bx-world"></i>
      <span>{language === "ar" ? "EN" : "عربي"}</span>
    </button>
  );
}
