import Image from "next/image";
import { Link } from "@/i18n/navigation";

import { getTranslations } from "next-intl/server";
import styles from "@/styles/hero.module.css";
import HeroSlider from "@/components/HeroSlider";

export default async function Hero() {
  const t = await getTranslations();

  const slides = [
    {
      image: "/images/hero/1.png",
      alt: "فايد دينتال كلينك - عيادة أسنان متخصصة في القاهرة",
      title: t("hero.slide1.title"),
      subtitle: t("hero.slide1.subtitle"),
      cta: t("hero.slide1.cta"),
      ctaLink: "#about",
      className: styles.heroSlideSlide1,
    },
    {
      image: "/images/hero/2.jpg",
      alt: "خدمات طب الأسنان المتقدمة - فايد دينتال كلينك",
      title: t("hero.slide2.title"),
      subtitle: t("hero.slide2.subtitle"),
      cta: t("hero.slide2.cta"),
      ctaLink: "#services",
      className: styles.heroSlideSlide2,
    },
    {
      image: "/images/hero/3.jpg",
      alt: "رعاية صحية متميزة - خبرة سنوات في علاج وتجميل الأسنان",
      title: t("hero.slide3.title"),
      subtitle: t("hero.slide3.subtitle"),
      cta: t("hero.slide3.cta"),
      ctaLink: "https://wa.me/201002507882",
      isExternal: true,
      className: styles.heroSlideSlide3,
    },
  ];

  return (
    <section className={styles.hero} id="home">
      <HeroSlider slides={slides} />

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
