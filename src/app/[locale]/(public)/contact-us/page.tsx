import { Metadata } from "next";
import { Link } from "@/i18n/navigation";

import styles from "@/styles/contact-us.module.css";
import { getTranslations } from "next-intl/server";

export const metadata: Metadata = {
  title: "اتصل بنا - فايد دينتال كلينك | احجز موعدك الآن",
  description:
    "تواصل معنا في فايد دينتال كلينك. فرع المهندسين وفرع مصر الجديدة. احجز موعدك الآن عبر الهاتف أو واتساب.",
  keywords: [
    "اتصل بنا",
    "حجز موعد",
    "عنوان العيادة",
    "رقم الهاتف",
    "فايد دينتال كلينك",
    "contact Fayed Dental",
    "book appointment",
    "عيادة أسنان المهندسين",
  ],
  alternates: {
    canonical: "https://fayed.clinic/contact-us",
  },
  openGraph: {
    title: "اتصل بنا - فايد دينتال كلينك",
    description:
      "تواصل معنا في فايد دينتال كلينك. فرع المهندسين وفرع مصر الجديدة. احجز موعدك الآن.",
    url: "https://fayed.clinic/contact-us",
    type: "website",
    locale: "ar_EG",
    siteName: "فايد دينتال كلينك",
    images: [
      {
        url: "/images/contact-us-preview.jpg",
        width: 1200,
        height: 630,
        alt: "اتصل بنا - فايد دينتال كلينك",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "اتصل بنا - فايد دينتال كلينك",
    description:
      "تواصل معنا في فايد دينتال كلينك. احجز موعدك الآن عبر الهاتف أو واتساب.",
    images: ["/images/contact-us-preview.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function ContactUsPage() {
  const t = await getTranslations();
  return (
    <section className={styles.contactSection}>
      <div className={styles.contactContent}>
        <h1 className={styles.contactTitle}>{t("contact.title")}</h1>
        <p className={styles.contactSubtitle}>{t("contact.subtitle")}</p>

        <div className={styles.branchesContainer}>
          {/* فرع المهندسين */}
          <div className={styles.branchSection}>
            <div className={styles.branchInfo}>
              <h3>{t("contact.branch1.title")}</h3>
              <div className={styles.branchDetails}>
                <p className={styles.branchPhones}>
                  <i className="bx bx-phone"></i>
                  <Link href="tel:01034317813">01034317813</Link> /{" "}
                  <Link href="tel:01034313422">01034313422</Link>
                </p>
                <p className={styles.branchAddress}>
                  <i className="bx bx-map"></i>
                  ٤٧ شارع جامعة الدول العربية - متفرع من شارع شهاب
                </p>
              </div>
            </div>
            <div className={styles.branchMap}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2840.7962063966456!2d31.200516465675747!3d30.04684770270235!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1458150054242b79%3A0x3f7cd5365b7f2a47!2z2LnZitin2K_YqSDYry7Zhdit2YXYryDZgdin2YrYryDZhNi32Kgg2KfZhNij2LPZhtin2YYgLSBNb2hhbWVkIEZheWVkIENsaW5pYw!5e0!3m2!1sar!2seg!4v1785004515230!5m2!1sar!2seg"
                width="600"
                height="450"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
              ></iframe>
            </div>
          </div>

          {/* فرع مصر الجديدة */}
          <div className={styles.branchSection}>
            <div className={styles.branchInfo}>
              <h3>{t("contact.branch2.title")}</h3>
              <div className={styles.branchDetails}>
                <p className={styles.branchPhones}>
                  <i className="bx bx-phone"></i>
                  <Link href="tel:01551089973">01551089973</Link> /{" "}
                  <Link href="tel:01060614740">01060614740</Link>
                </p>
                <p className={styles.branchAddress}>
                  <i className="bx bx-map"></i>
                  ١٦٥ برج عُدي ميدان الألف مسكن - شارع السويس
                </p>
              </div>
            </div>
            <div className={styles.branchMap}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d17453.12786570742!2d31.36128238197!3d30.12046910854262!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14581500016b36cd%3A0x3e367764a1d3d54e!2z2YXZitiv2KfZhiDYp9mE2YEg2YXYs9mD2YY!5e1!3m2!1sar!2seg!4v1768907152950!5m2!1sar!2seg"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>

        <div className={styles.additionalInfo}>
          <div className={styles.infoCard}>
            <i className="bx bx-time-five"></i>
            <h3>{t("contact.hours.title")}</h3>
            <p>
              السبت - الخميس: 2 م حتى 10 م<br />
              الجمعة: مغلق
            </p>
          </div>

          <div className={styles.infoCard}>
            <i className="bx bxl-whatsapp"></i>
            <h3>{t("contact.whatsapp.title")}</h3>
            <p>
              <Link href="https://wa.me/201002507882" target="_blank">
                201002507882+
              </Link>
            </p>
          </div>

          <div className={styles.infoCard}>
            <i className="bx bx-envelope"></i>
            <h3>{t("contact.email.title")}</h3>
            <p>
              <Link href="mailto:info@fayedentalclinic.com">
                info@fayedentalclinic.com
              </Link>
            </p>
          </div>
        </div>

        <div className={styles.contactCta}>
          <Link
            href="https://wa.me/201002507882"
            target="_blank"
            className={styles.contactCtaBtn}
          >
            {t("contact.cta")}
          </Link>
        </div>
      </div>
    </section>
  );
}
