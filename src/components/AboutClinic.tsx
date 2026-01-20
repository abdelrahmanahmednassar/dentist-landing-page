import Image from "next/image";
import styles from "@/styles/about-clinic.module.css";
import { getTranslations } from "next-intl/server";

export default async function AboutClinic() {
  const t = await getTranslations();
  return (
    <section className={styles.aboutClinic} id="about">
      <div className={styles.aboutClinicWrapper}>
        {/* Left: Text Content */}
        <div className={styles.aboutClinicContent}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionLabel}>{t("about.label")}</span>
            <h2 className={styles.sectionTitle}>{t("about.title")}</h2>
          </div>
          <div className={styles.aboutText}>
            <p>{t("about.intro")}</p>
            <p>{t("about.p1")}</p>
            <p>{t("about.p2")}</p>
            <p>{t("about.p3")}</p>
          </div>

          <div className={styles.statsRow}>
            <div className={styles.statItem}>
              <div className={styles.statNumber}>
                <span>{t("about.stat1.number")}</span>
                <span>+</span>
              </div>
              <div className={styles.statLabel}>{t("about.stat1.label")}</div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statNumber}>
                <span>{t("about.stat2.number")}</span>
                <span>+</span>
              </div>
              <div className={styles.statLabel}>{t("about.stat2.label")}</div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statNumber}>
                <span>{t("about.stat3.number")}</span>
                <span>+</span>
              </div>
              <div className={styles.statLabel}>{t("about.stat3.label")}</div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statNumber}>
                <span>{t("about.stat4.number")}</span>
                <span>+</span>
              </div>
              <div className={styles.statLabel}>{t("about.stat4.label")}</div>
            </div>
          </div>
        </div>

        {/* Right: Clinic Image */}
        <div className={styles.clinicImageWrapper}>
          <Image
            src="/images/clinic-interior.jpg"
            alt="داخلية عيادة فايد دينتال كلينك - أحدث التقنيات والأجهزة الحديثة"
            width={600}
            height={700}
          />
        </div>
      </div>
    </section>
  );
}
