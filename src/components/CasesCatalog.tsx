"use client";

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import styles from "@/styles/cases-page.module.css";

interface CaseRecord {
  id: string;
  category: string;
  titleAr: string | null;
  titleEn: string | null;
  imageUrl: string;
  createdAt: string;
}

export default function CasesCatalog() {
  const t = useTranslations("casesPage");
  const locale = useLocale();
  const isArabic = locale === "ar";
  const [activeCategory, setActiveCategory] = useState<string>("implants");
  const [cases, setCases] = useState<CaseRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedCase, setSelectedCase] = useState<CaseRecord | null>(null);

  const categories = useMemo(
    () => [
      { id: "implants", label: t("categories.implants") },
      { id: "cosmetic", label: t("categories.cosmetic") },
      { id: "orthodontics", label: t("categories.orthodontics") },
    ],
    [t]
  );

  useEffect(() => {
    async function fetchCases() {
      try {
        const res = await fetch("/api/cases?limit=200");
        if (res.ok) {
          const data = await res.json();
          setCases(data.cases || []);
        }
      } catch (err) {
        console.error("Failed to fetch clinical cases:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchCases();
  }, []);

  const displayedCases = useMemo(
    () => cases.filter((item) => item.category === activeCategory),
    [cases, activeCategory]
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
        {loading ? (
          <div className={styles.emptyState}>
            <div className={styles.loadingSpinner}></div>
            <p style={{ margin: 0 }}>
              {isArabic ? "جاري تحميل الحالات الطبية..." : "Loading clinical cases..."}
            </p>
          </div>
        ) : displayedCases.length === 0 ? (
          <div className={styles.emptyState}>
            <i className="bx bx-images" style={{ fontSize: "2.5rem", color: "#a0a8be", display: "block", marginBottom: "12px" }}></i>
            <p style={{ margin: 0 }}>
              {isArabic
                ? "لا توجد حالات متاحة في هذا القسم حالياً. يرجى التفتيش قريباً أو تصفح الأقسام الأخرى."
                : "No clinical cases available in this category yet. Please check back soon or explore other specialties."}
            </p>
          </div>
        ) : (
          displayedCases.map((caseItem) => {
            const title = isArabic
              ? caseItem.titleAr || caseItem.titleEn
              : caseItem.titleEn || caseItem.titleAr;

            return (
              <div
                key={caseItem.id}
                className={styles.caseCard}
                onClick={() => setSelectedCase(caseItem)}
              >
                <Image
                  src={caseItem.imageUrl}
                  alt={title || "Clinical Case Photograph"}
                  fill
                  unoptimized
                  sizes="(max-width: 520px) 100vw, (max-width: 860px) 50vw, (max-width: 1080px) 33vw, 25vw"
                  className={styles.caseImage}
                />
                {title && (
                  <div className={styles.caseOverlay}>
                    <span>{title}</span>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Interactive Lightbox Preview Modal */}
      {selectedCase && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.9)",
            zIndex: 9999,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "24px",
            backdropFilter: "blur(8px)",
          }}
          onClick={() => setSelectedCase(null)}
        >
          <button
            onClick={() => setSelectedCase(null)}
            style={{
              position: "absolute",
              top: "25px",
              right: "30px",
              background: "rgba(255, 255, 255, 0.15)",
              border: "none",
              color: "#ffffff",
              width: "44px",
              height: "44px",
              borderRadius: "50%",
              fontSize: "22px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "background 0.2s ease",
            }}
            aria-label="Close Preview"
          >
            ✕
          </button>

          <div
            style={{
              position: "relative",
              maxWidth: "900px",
              maxHeight: "80vh",
              width: "100%",
              height: "80vh",
              borderRadius: "8px",
              overflow: "hidden",
              boxShadow: "0 20px 60px rgba(0, 0, 0, 0.6)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={selectedCase.imageUrl}
              alt={
                (isArabic
                  ? selectedCase.titleAr || selectedCase.titleEn
                  : selectedCase.titleEn || selectedCase.titleAr) || "Clinical Case Preview"
              }
              fill
              unoptimized
              style={{ objectFit: "contain" }}
            />
          </div>

          {(selectedCase.titleAr || selectedCase.titleEn) && (
            <div
              style={{
                marginTop: "16px",
                color: "#ffffff",
                fontFamily: 'var(--font-family, "Tajawal", sans-serif)',
                fontSize: "19px",
                fontWeight: 700,
                textAlign: "center",
                maxWidth: "800px",
                padding: "10px 24px",
                backgroundColor: "rgba(20, 24, 33, 0.85)",
                borderRadius: "30px",
                border: "1px solid rgba(255, 255, 255, 0.12)",
                boxShadow: "0 4px 15px rgba(0, 0, 0, 0.3)",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {isArabic ? selectedCase.titleAr || selectedCase.titleEn : selectedCase.titleEn || selectedCase.titleAr}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
