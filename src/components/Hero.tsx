"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import styles from "@/styles/hero.module.css";

export default function Hero() {
  const t = useTranslations();
  const [currentSlide, setCurrentSlide] = useState(0);
  const autoSlideRef = useRef<NodeJS.Timeout | null>(null);

  const slides = [
    {
      image: "/images/hero-slide-1.png",
      alt: "فايد دينتال كلينك - عيادة أسنان متخصصة في القاهرة",
      title: t("hero.slide1.title"),
      subtitle: t("hero.slide1.subtitle"),
      cta: t("hero.slide1.cta"),
      ctaLink: "#about",
      className: styles.heroSlideSlide1,
    },
    {
      image: "/images/hero-slide-2.jpg",
      alt: "خدمات طب الأسنان المتقدمة - فايد دينتال كلينك",
      title: t("hero.slide2.title"),
      subtitle: t("hero.slide2.subtitle"),
      cta: t("hero.slide2.cta"),
      ctaLink: "#services",
      className: styles.heroSlideSlide2,
    },
    {
      image: "/images/hero-slide-3.jpg",
      alt: "رعاية صحية متميزة - خبرة سنوات في علاج وتجميل الأسنان",
      title: t("hero.slide3.title"),
      subtitle: t("hero.slide3.subtitle"),
      cta: t("hero.slide3.cta"),
      ctaLink: "https://wa.me/201002507882",
      isExternal: true,
      className: styles.heroSlideSlide3,
    },
  ];

  const startAutoSlide = () => {
    if (autoSlideRef.current) {
      clearInterval(autoSlideRef.current);
    }
    autoSlideRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
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
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    startAutoSlide(); // Reset timer on manual navigation
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    startAutoSlide(); // Reset timer on manual navigation
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    startAutoSlide(); // Reset timer on manual navigation
  };

  return (
    <section className={styles.hero} id="home">
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
                <h1 className={styles.heroTitle}>{slide.title}</h1>
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

      {/* Service Cards Below Hero */}
      <div className={styles.heroServices}>
        <div className="container">
          <div className={styles.serviceCards}>
            <div className={styles.serviceCard}>
              <div
                className={`${styles.serviceIcon} ${styles.serviceIconCalendar}`}
              >
                <Image
                  src="/images/icon-calendar.png"
                  alt="احجز موعدك في عيادة فايد دينتال كلينك"
                  width={60}
                  height={60}
                />
              </div>
              <h3>{t("hero.card1.title")}</h3>
              <p>{t("hero.card1.desc")}</p>
              <Link
                href="https://wa.me/201002507882"
                className={styles.serviceBtn}
              >
                {t("hero.card1.btn")}
              </Link>
            </div>

            <div
              className={`${styles.serviceCard} ${styles.serviceCardHasServiceImage}`}
            >
              <div className={styles.serviceImage}>
                <Image
                  src="/images/logo-icon.png"
                  alt="دكتور محمد فايد - أخصائي طب وتجميل الأسنان"
                  width={100}
                  height={100}
                />
              </div>
              <h3>{t("hero.card2.title")}</h3>
              <p>{t("hero.card2.desc")}</p>
              <Link
                href="https://wa.me/201002507882"
                className={`${styles.serviceBtn} ${styles.ctaBtnServiceBtn}`}
              >
                {t("hero.card2.btn")}
              </Link>
            </div>

            <div className={styles.serviceCard}>
              <div
                className={`${styles.serviceIcon} ${styles.serviceIconPhone}`}
              >
                <Image
                  src="/images/icon-phone.png"
                  alt="اتصل بنا - فايد دينتال كلينك"
                  width={60}
                  height={60}
                />
              </div>
              <h3>{t("hero.card3.title")}</h3>
              <div>
                <h4>فرع المهندسين</h4>
                <p>
                  <Link
                    className={styles.phoneLink}
                    href="tel:01034317813"
                    target="_blank"
                  >
                    01034317813
                  </Link>
                  {" / "}
                  <Link
                    className={styles.phoneLink}
                    href="tel:01034313422"
                    target="_blank"
                  >
                    01034313422
                  </Link>
                  <br />
                  {t("footer.address.branch1Text")}
                </p>
              </div>
              <div>
                <h4>{t("footer.address.branch2")}</h4>
                <p>
                  <Link
                    className={styles.phoneLink}
                    href="tel:01551089973"
                    target="_blank"
                  >
                    01551089973
                  </Link>
                  {" / "}
                  <Link
                    className={styles.phoneLink}
                    href="tel:01060614740"
                    target="_blank"
                  >
                    01060614740
                  </Link>
                  <br />
                  {t("footer.address.branch2Text")}
                </p>
              </div>
              <Link
                href="https://wa.me/201002507882"
                className={styles.whatsappBtn}
                target="_blank"
              >
                <i className="bx bxl-whatsapp"></i>
                {t("hero.card3.btn")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
