"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import styles from "@/styles/cases-page.module.css";

interface CaseItem {
  id: string;
  category: string;
  image: string;
  altText: string;
}

export default function CasesCatalog() {
  const t = useTranslations("casesPage");
  const locale = useLocale();
  const isArabic = locale === "ar";
  const [activeCategory, setActiveCategory] = useState<string>("cosmetic");

  const categories = useMemo(
    () => [
      { id: "cosmetic", label: t("categories.cosmetic") },
      { id: "implants", label: t("categories.implants") },
      { id: "orthodontics", label: t("categories.orthodontics") },
      { id: "experiences", label: t("categories.experiences") },
      { id: "celebrities", label: t("categories.celebrities") },
    ],
    [t]
  );

  // Generate rich mock data using placehold.co images for each category
  const allCases: CaseItem[] = useMemo(() => {
    const data: CaseItem[] = [];
    const colorPalettes = [
      { bg: "1a1e29", fg: "c49747" },
      { bg: "11131a", fg: "ffffff" },
      { bg: "202534", fg: "e0a94b" },
      { bg: "141821", fg: "dddddd" },
    ];

    const categoryPrefixes: Record<string, { ar: string; en: string }> = {
      cosmetic: { ar: "تجميل الأسنان", en: "Cosmetic Case" },
      implants: { ar: "زراعة الأسنان", en: "Dental Implant" },
      orthodontics: { ar: "تقويم الأسنان", en: "Orthodontics" },
      experiences: { ar: "تجارب المرضى", en: "Patient Experience" },
      celebrities: { ar: "ابتسامة المشاهير", en: "Celebrity Smile" },
    };

    const categoriesList = ["cosmetic", "implants", "orthodontics", "experiences", "celebrities"];

    categoriesList.forEach((cat) => {
      // 12 images per category to form a clean 4x3 grid on desktop
      for (let i = 1; i <= 12; i++) {
        const palette = colorPalettes[(i - 1) % colorPalettes.length];
        const titleText = isArabic ? `${categoryPrefixes[cat].ar} - ${i}` : `${categoryPrefixes[cat].en} #${i}`;
        // URL-encode text for placehold.co
        const encodedText = encodeURIComponent( `${categoryPrefixes[cat].en} ${i}`);

        data.push({
          id: `${cat}-${i}`,
          category: cat,
          image: `https://placehold.co/600x800/${palette.bg}/${palette.fg}/png?text=${encodedText}`,
          altText: titleText,
        });
      }
    });

    return data;
  }, [isArabic]);

  const displayedCases = useMemo(
    () => allCases.filter((item) => item.category === activeCategory),
    [allCases, activeCategory]
  );

  return (
    <div className={styles.pageContainer} dir={isArabic ? "rtl" : "ltr"}>
      {/* Header Section */}
      <div className={styles.headerSection}>
        <h1 className={styles.title}>{t("heading")}</h1>
        <p className={styles.subtitle}>{t("subheading")}</p>
      </div>

      {/* Category Tabs Bar */}
      <div className={styles.tabsBar} role="tablist" aria-label="Cases Categories">
        {categories.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              role="tab"
              aria-selected={isActive}
              aria-controls="case-grid"
              onClick={() => setActiveCategory(cat.id)}
              className={`${styles.tabBtn} ${isActive ? styles.activeTab : ""}`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Responsive Case Grid */}
      <div id="case-grid" role="tabpanel" className={styles.gridContainer}>
        {displayedCases.map((caseItem) => (
          <div key={caseItem.id} className={styles.caseCard}>
            <Image
              src={caseItem.image}
              alt={caseItem.altText}
              fill
              unoptimized
              sizes="(max-width: 520px) 100vw, (max-width: 860px) 50vw, (max-width: 1080px) 33vw, 25vw"
              className={styles.caseImage}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
