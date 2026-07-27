import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { getTranslations, getLocale } from "next-intl/server";
import styles from "@/styles/cases-doctor.module.css";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";

export default async function CasesSection() {
  const t = await getTranslations();
  const locale = await getLocale();
  const isArabic = locale === "ar";

  return (
    <section className={styles.casesDoctorSection} id="cases">
      <div className="container">
        <div className={styles.casesDoctorWrapper}>
          {/* Item 1: Doctor Card (in RTL displays on the right, matching design) */}
          <div className={styles.doctorCard}>
            <div className={styles.doctorImageContainer}>
              <Image
                src="/images/dr-fayed.png"
                alt={
                  isArabic
                    ? "الدكتور محمد فايد - مؤسس ومدير فايد دينتال كلينك"
                    : "Dr. Mohamed Fayed - Founder & Director of Fayed Dental Clinic"
                }
                width={1152}
                height={2048}
                className={styles.doctorImage}
                priority
              />
            </div>
            <div className={styles.doctorTextContainer}>
              <p className={styles.doctorBio}>{t("cases.doctorText")}</p>
              <div className={styles.doctorMoreWrapper}>
                <Link href="/about-us" className={styles.doctorMoreLink}>
                  {t("cases.doctorMore")}
                </Link>
              </div>
            </div>
          </div>

          {/* Item 2: Cases Before & After Slider */}
          <div className={styles.casesContent}>
            <h2 className={styles.casesTitle}>{t("cases.sectionTitle")}</h2>

            <div className={styles.sliderWrapper}>
              <BeforeAfterSlider
                beforeImage="/images/cases/before-and-after/case-1-before.jpeg"
                afterImage="/images/cases/before-and-after/case-1-after.jpeg"
                beforeLabel={t("cases.before")}
                afterLabel={t("cases.after")}
              />
            </div>

            <div className={styles.moreCasesBtnContainer}>
              <Link href="/cases" className={styles.moreCasesBtn}>
                {t("cases.moreCases")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
