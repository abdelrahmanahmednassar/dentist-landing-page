"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "@/styles/hero.module.css";

interface HeroSlide {
  image: string;
  alt: string;
  title: string;
  subtitle: string;
  cta: string;
  ctaLink: string;
  isExternal?: boolean;
  className: string;
}

interface HeroSliderProps {
  slides: HeroSlide[];
}

export default function HeroSlider({ slides }: HeroSliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const autoSlideRef = useRef<NodeJS.Timeout | null>(null);

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
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
  }, [slides.length]);

  useEffect(() => {
    startAutoSlide();
    return () => stopAutoSlide();
  }, [startAutoSlide, stopAutoSlide]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    startAutoSlide();
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    startAutoSlide();
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    startAutoSlide();
  };

  return (
    <div className={styles.heroSlider}>
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`${styles.heroSlide} ${slide.className} ${
            index === currentSlide ? styles.active : ""
          }`}
        >
          <Image
            src={slide.image}
            alt={slide.alt}
            fill
            priority={index === 0}
            style={{ objectFit: "cover" }}
          />
          <div className={styles.heroOverlay}>
            <div className={styles.heroContent}>
              {index === 0 ? (
                <h1 className={styles.heroTitle}>{slide.title}</h1>
              ) : (
                <h2 className={styles.heroTitle}>{slide.title}</h2>
              )}
              <p className={styles.heroSubtitle}>{slide.subtitle}</p>
              {slide.isExternal ? (
                <Link
                  href={slide.ctaLink}
                  className={styles.heroCtaBtn}
                  target="_blank"
                >
                  {slide.cta}
                </Link>
              ) : (
                <Link href={slide.ctaLink} className={styles.heroCtaBtn}>
                  {slide.cta}
                </Link>
              )}
            </div>
          </div>
        </div>
      ))}

      <button
        className={`${styles.heroArrow} ${styles.heroArrowLeft}`}
        onClick={prevSlide}
        aria-label="Previous slide"
      >
        <i className="bx bx-chevron-right"></i>
      </button>
      <button
        className={`${styles.heroArrow} ${styles.heroArrowRight}`}
        onClick={nextSlide}
        aria-label="Next slide"
      >
        <i className="bx bx-chevron-left"></i>
      </button>

      <div className={styles.heroBullets}>
        {slides.map((_, index) => (
          <span
            key={index}
            className={`${styles.heroBullet} ${
              index === currentSlide ? styles.active : ""
            }`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </div>
  );
}
