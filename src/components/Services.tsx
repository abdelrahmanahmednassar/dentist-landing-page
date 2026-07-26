import { Link } from "@/i18n/navigation";

import Image from "next/image";
import styles from "@/styles/services.module.css";
import { getTranslations } from "next-intl/server";

const services = [
  {
    titleKey: "services.s1.title",
    descKey: "services.s1.desc",
    image: "/images/services/teeth-whiting.webp",
    alt: "خدمة زراعة الأسنان في فايد دينتال كلينك - الحل الأمثل لتعويض الفقد في الأسنان",
    link: "/services/teeth-implants",
  },
  {
    titleKey: "services.s2.title",
    descKey: "services.s2.desc",
    image: "/images/services/teeth-butify.webp",
    alt: "خدمة تجميل الأسنان في فايد دينتال كلينك - تصميم الإبتسامة بالكمبيوتر",
    link: "/services/teeth-beautification",
  },
  {
    titleKey: "services.s3.title",
    descKey: "services.s3.desc",
    image: "/images/services/Hybrid veneers.webp",
    alt: "Hybrid veneers في فايد دينتال كلينك - أحدث طرق تجميل الأسنان",
    link: "/services/hybrid-veneers",
  },
  {
    titleKey: "services.s4.title",
    descKey: "services.s4.desc",
    image: "/images/services/3N Veneers.webp",
    alt: "3N Veneers في فايد دينتال كلينك - أحدث وأكثر التقنيات تقدماً في تجميل الأسنان",
    link: "/services/3n-veneers",
  },
];

export default async function Services() {
  const t = await getTranslations();
  return (
    <section className={styles.servicesSection} id="services">
      <div className={styles.servicesBackgroundOverlay}></div>
      <div className={styles.servicesContainer}>
        <div className={styles.servicesHeader}>
          <span className={styles.servicesLabel}>{t("services.label")}</span>
          <h2 className={styles.servicesTitle}>{t("services.title")}</h2>
          <p className={styles.servicesSubtitle}>{t("services.subtitle")}</p>
        </div>

        <div className={styles.servicesCards}>
          {services.map((service, index) => (
            <Link
              key={index}
              href={service.link}
              className={styles.serviceCardLink}
            >
              <div className={styles.serviceCardItem}>
                <div className={styles.serviceCardImage}>
                  <Image
                    src={service.image}
                    alt={service.alt}
                    width={400}
                    height={300}
                    loading="lazy"
                  />
                </div>
                <h3 className={styles.serviceCardTitle}>
                  {t(service.titleKey)}
                </h3>
                <p className={styles.serviceCardDescription}>
                  {t(service.descKey)}
                </p>
                <span className={styles.serviceCardLinkText}>
                  {t("services.learnMore")}{" "}
                  <i className="bx bx-left-arrow-alt"></i>
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className={styles.servicesAppointmentCta}>
          <p className={styles.appointmentQuestion}>
            {t("services.cta.question")}
          </p>
          <p className={styles.appointmentText}>{t("services.cta.text")}</p>
          <Link
            href="https://wa.me/201002507882"
            className={styles.appointmentBtn}
            target="_blank"
          >
            {t("services.cta.btn")}
          </Link>
        </div>
      </div>
    </section>
  );
}
