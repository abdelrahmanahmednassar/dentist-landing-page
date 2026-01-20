"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useTranslations } from "next-intl";
import styles from "@/styles/testimonials.module.css";

interface Testimonial {
  text1: string;
  text2: string;
  author: string;
}

interface TestimonialsSliderProps {
  testimonials: Testimonial[];
}

export default function TestimonialsSlider({
  testimonials,
}: TestimonialsSliderProps) {
  const t = useTranslations();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction] = useState<"rtl" | "ltr">(() => {
    if (typeof document !== "undefined") {
      return (
        (document.documentElement.getAttribute("dir") as "rtl" | "ltr") || "rtl"
      );
    }
    return "rtl";
  });
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
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }, 5000);
  }, [testimonials.length]);

  useEffect(() => {
    startAutoSlide();
    return () => stopAutoSlide();
  }, [startAutoSlide, stopAutoSlide]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    startAutoSlide();
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length,
    );
    startAutoSlide();
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    startAutoSlide();
  };

  const getTransform = () => {
    if (direction === "rtl") {
      return `translateX(${currentSlide * 33.3333}%)`;
    } else {
      return `translateX(-${currentSlide * 33.3333}%)`;
    }
  };

  return (
    <div className={styles.testimonialsSlider}>
      <div
        className={styles.testimonialsTrack}
        style={{
          transform: getTransform(),
          direction: direction,
        }}
      >
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className={`${styles.testimonialCard} ${
              index === currentSlide ? styles.active : ""
            }`}
          >
            <div className={styles.testimonialText}>
              <p>{testimonial.text1}</p>
              <p>{testimonial.text2}</p>
            </div>
            <div className={styles.testimonialAuthor}>
              <p>{testimonial.author}</p>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.sliderArrows}>
        <button
          className={`${styles.sliderArrow} ${styles.prev}`}
          onClick={prevSlide}
          aria-label={t("cases.prev")}
        >
          <i className="bx bx-chevron-left"></i>
        </button>
        <button
          className={`${styles.sliderArrow} ${styles.next}`}
          onClick={nextSlide}
          aria-label={t("cases.next")}
        >
          <i className="bx bx-chevron-right"></i>
        </button>
      </div>

      <div className={styles.sliderDots}>
        {testimonials.map((_, index) => (
          <button
            key={index}
            className={index === currentSlide ? styles.active : ""}
            onClick={() => goToSlide(index)}
            aria-label={`${t("testimonials.title")} ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
