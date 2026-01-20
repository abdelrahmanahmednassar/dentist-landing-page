"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import styles from "@/styles/testimonials.module.css";

export default function Testimonials() {
  const t = useTranslations();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState<"rtl" | "ltr">("rtl");
  const autoSlideRef = useRef<NodeJS.Timeout | null>(null);

  const testimonials = [
    {
      text1: t("testimonials.t1.text1"),
      text2: t("testimonials.t1.text2"),
      author: t("testimonials.t1.author"),
    },
    {
      text1: t("testimonials.t2.text1"),
      text2: t("testimonials.t2.text2"),
      author: t("testimonials.t2.author"),
    },
    {
      text1: t("testimonials.t3.text1"),
      text2: t("testimonials.t3.text2"),
      author: t("testimonials.t3.author"),
    },
  ];

  const startAutoSlide = () => {
    if (autoSlideRef.current) {
      clearInterval(autoSlideRef.current);
    }
    autoSlideRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }, 5000);
  };

  const stopAutoSlide = () => {
    if (autoSlideRef.current) {
      clearInterval(autoSlideRef.current);
      autoSlideRef.current = null;
    }
  };

  useEffect(() => {
    // Set direction from document on mount
    const dir = document.documentElement.getAttribute("dir") || "rtl";
    setDirection(dir as "rtl" | "ltr");

    startAutoSlide();
    return () => stopAutoSlide();
  }, []);

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

  // Calculate transform based on current slide and direction
  const getTransform = () => {
    if (direction === "rtl") {
      return `translateX(${currentSlide * 33.3333}%)`;
    } else {
      return `translateX(-${currentSlide * 33.3333}%)`;
    }
  };

  return (
    <section
      className={styles.testimonialsSection}
      onMouseEnter={stopAutoSlide}
      onMouseLeave={startAutoSlide}
    >
      <div className={styles.testimonialsWrapper}>
        {/* Left: Testimonial Image */}
        <div className={styles.testimonialImageWrapper}>
          <Image
            src="/images/testimonial-image.jpeg"
            alt="آراء العملاء - تجربة مرضى فايد دينتال كلينك"
            width={600}
            height={700}
          />
        </div>

        {/* Right: Testimonials Content */}
        <div className={styles.testimonialsContent}>
          <div className={styles.testimonialsHeader}>
            <h2 className={styles.testimonialsTitle}>
              {t("testimonials.title")}
            </h2>
          </div>

          <div className={styles.testimonialsContentText}>
            <div className={styles.testimonialsSlider}>
              <div
                className={styles.testimonialsTrack}
                style={{ transform: getTransform() }}
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
          </div>
        </div>
      </div>
    </section>
  );
}
