"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import styles from "@/styles/cases-doctor.module.css";

interface CaseSliderProps {
  title: string;
  cases: Array<{
    type: "image" | "video";
    src: string;
    alt: string;
  }>;
}

function CaseSlider({ title, cases }: CaseSliderProps) {
  const t = useTranslations();
  const language = useLocale();
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const autoSlideRef = useRef<NodeJS.Timeout | null>(null);

  const isRTL = language === "ar";

  const startAutoSlide = () => {
    if (autoSlideRef.current) {
      clearInterval(autoSlideRef.current);
    }
    autoSlideRef.current = setInterval(() => {
      nextSlide();
    }, 3000);
  };

  const stopAutoSlide = () => {
    if (autoSlideRef.current) {
      clearInterval(autoSlideRef.current);
      autoSlideRef.current = null;
    }
  };

  useEffect(() => {
    startAutoSlide();
    return () => stopAutoSlide();
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % cases.length);
    startAutoSlide();
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + cases.length) % cases.length);
    startAutoSlide();
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    startAutoSlide();
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const deltaX = touchEndX.current - touchStartX.current;
    const threshold = 50;

    if (Math.abs(deltaX) < threshold) return;

    if (deltaX < 0) {
      nextSlide();
    } else {
      prevSlide();
    }
  };

  const handleMouseEnter = () => stopAutoSlide();
  const handleMouseLeave = () => startAutoSlide();

  // In RTL, use positive translateX values instead of negative
  const translateValue = isRTL ? currentSlide * 100 : -(currentSlide * 100);

  return (
    <div className={styles.caseSectionGroup}>
      <h3 className={styles.caseSectionTitle}>{title}</h3>
      <div
        className={styles.premiumCasesSlider}
        ref={sliderRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className={styles.casesViewport}>
          <div
            className={styles.casesTrack}
            style={{ transform: `translateX(${translateValue}%)` }}
          >
            {cases.map((caseItem, index) => (
              <div key={index} className={styles.caseSlide}>
                {caseItem.type === "image" ? (
                  <Image
                    src={caseItem.src}
                    alt={caseItem.alt}
                    width={880}
                    height={880}
                    loading="lazy"
                    style={{ width: "auto", height: "auto" }}
                  />
                ) : (
                  <video
                    src={caseItem.src}
                    controls
                    muted
                    loop
                    aria-label={caseItem.alt}
                    onPlay={stopAutoSlide}
                    onPause={startAutoSlide}
                    onEnded={startAutoSlide}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {cases.length > 1 && (
          <>
            <div className={styles.sliderControls}>
              <button
                className={`${styles.sliderBtn} ${styles.prev}`}
                type="button"
                aria-label={t("cases.prev")}
                onClick={prevSlide}
              >
                &#8249;
              </button>
              <button
                className={`${styles.sliderBtn} ${styles.next}`}
                type="button"
                aria-label={t("cases.next")}
                onClick={nextSlide}
              >
                &#8250;
              </button>
            </div>

            <div className={styles.sliderDots} aria-label={t("cases.title")}>
              {cases.map((_, index) => (
                <button
                  key={index}
                  className={index === currentSlide ? styles.active : ""}
                  onClick={() => goToSlide(index)}
                  aria-label={`${t("cases.title")} ${index + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

const casesData = [
  {
    titleKey: "cases.section1",
    cases: [
      {
        type: "image" as const,
        src: "/images/cases/section-3/case-1.jpg",
        alt: "حالة تجميل أسنان 1 - زراعة الأسنان",
      },
      {
        type: "image" as const,
        src: "/images/cases/section-3/case-2.jpg",
        alt: "حالة تجميل أسنان 2 - زراعة الأسنان",
      },
      {
        type: "image" as const,
        src: "/images/cases/section-3/case-3.jpg",
        alt: "حالة تجميل أسنان 3 - زراعة الأسنان",
      },
    ],
  },
  {
    titleKey: "cases.section2",
    cases: [
      {
        type: "image" as const,
        src: "/images/cases/section-2/case-1.jpg",
        alt: "حالة تجميل أسنان 1 - تجميل الاسنان بالفينيرز",
      },
      {
        type: "image" as const,
        src: "/images/cases/section-2/case-2.jpg",
        alt: "حالة تجميل أسنان 2 - تجميل الاسنان بالفينيرز",
      },
      {
        type: "image" as const,
        src: "/images/cases/section-2/case-3.jpg",
        alt: "حالة تجميل أسنان 3 - تجميل الاسنان بالفينيرز",
      },
      {
        type: "image" as const,
        src: "/images/cases/section-2/case-4.jpg",
        alt: "حالة تجميل أسنان 4 - تجميل الاسنان بالفينيرز",
      },
      {
        type: "image" as const,
        src: "/images/cases/section-2/case-5.jpg",
        alt: "حالة تجميل أسنان 5 - تجميل الاسنان بالفينيرز",
      },
    ],
  },
  {
    titleKey: "cases.section3",
    cases: [
      {
        type: "image" as const,
        src: "/images/cases/section-1/case-1.jpg",
        alt: "حالة تجميل أسنان - تركيبات الزيركون",
      },
    ],
  },
  {
    titleKey: "cases.section4",
    cases: [
      {
        type: "image" as const,
        src: "/images/cases/section-4/case-1.jpeg",
        alt: "حالة تجميل أسنان - التبييض بالليزر",
      },
    ],
  },
  {
    titleKey: "cases.section5",
    cases: [
      {
        type: "video" as const,
        src: "/images/cases/section-5/video-1.mp4",
        alt: "فيديو - حشو تجميلي ليزر",
      },
    ],
  },
  {
    titleKey: "cases.section6",
    cases: [
      {
        type: "video" as const,
        src: "/images/cases/section-6/video-2.mp4",
        alt: "فيديو - حشو عصب",
      },
    ],
  },
];

export default function CasesFull() {
  const t = useTranslations();

  return (
    <section className={styles.casesDoctorSection} id="cases">
      <div className={styles.casesDoctorContent}>
        <div className={styles.casesHeader}>
          <h2 className={styles.caseTitle}>{t("cases.title")}</h2>
        </div>

        <div className={styles.casesGroups}>
          {casesData.map((section, index) => (
            <CaseSlider
              key={index}
              title={t(section.titleKey)}
              cases={section.cases}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
