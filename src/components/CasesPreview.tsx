import { Link } from "@/i18n/navigation";

import styles from "@/styles/cases-doctor.module.css";

export default function CasesPreview() {
  return (
    <section className={styles.casesDoctorSection} id="cases">
      <div className={styles.casesDoctorContent}>
        <div className={styles.casesHeader}>
          <h2 className={styles.caseTitle}>نتائج من عيادتنا</h2>
        </div>

        <div className={styles.casesPreview}>
          <p className={styles.casesDescription}>
            شاهد مجموعة من حالات زراعة وتجميل الأسنان التي قمنا بها في فايد
            دينتال كلينك
          </p>
          <Link href="/cases" className={styles.viewAllBtn}>
            عرض جميع الحالات
            <i className="bx bx-left-arrow-alt"></i>
          </Link>
        </div>
      </div>
    </section>
  );
}
