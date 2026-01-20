"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import styles from "@/styles/cases-doctor.module.css";

interface CaseItem {
  type: "image" | "video";
  src: string;
  alt: string;
}

interface CaseSliderProps {
  title: string;
  cases: CaseItem[];
}

export default function CaseSlider({ title, cases }: CaseSliderProps) {
  const t = useTranslations();
  const language = useLocale();
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const autoSlideRef = useRef<NodeJS.Timeout | null>(null);

  const isRTL = language === "ar";

  const stopAutoSlide = useCallback(() => {
    if (autoSlideRef.current) {
      clearInterval(autoSlideRef.current);
      autoSlideRef.current = null;
    }
  }, []);

  const startAutoSlide = useCallback(() => {
    if (autoSlideRef.current) {
      clearInterval(autoSlideRef.current);
    }
    autoSlideRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % cases.length);
    }, 3000);
  }, [cases.length]);

  useEffect(() => {
    startAutoSlide();
    return () => stopAutoSlide();
  }, [startAutoSlide, stopAutoSlide]);

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
