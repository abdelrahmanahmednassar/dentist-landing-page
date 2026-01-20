import { getTranslations } from "next-intl/server";
import styles from "@/styles/cases-doctor.module.css";
import CaseSlider from "@/components/CaseSlider";

interface CaseItem {
  type: "image" | "video";
  src: string;
  alt: string;
}

interface CaseSection {
  titleKey: string;
  cases: CaseItem[];
}

const casesData: CaseSection[] = [
  {
    titleKey: "cases.section1",
    cases: [
      {
        type: "image" as const,
        src: "/images/cases/section-3/case-1.jpg",
        alt: "حالة تجميل أسنان 1 - زراعة الأسنان",
      },
      {
        type: "image" as const,
        src: "/images/cases/section-3/case-2.jpg",
        alt: "حالة تجميل أسنان 2 - زراعة الأسنان",
      },
      {
        type: "image" as const,
        src: "/images/cases/section-3/case-3.jpg",
        alt: "حالة تجميل أسنان 3 - زراعة الأسنان",
      },
    ],
  },
  {
    titleKey: "cases.section2",
    cases: [
      {
        type: "image" as const,
        src: "/images/cases/section-2/case-1.jpg",
        alt: "حالة تجميل أسنان 1 - تجميل الاسنان بالفينيرز",
      },
      {
        type: "image" as const,
        src: "/images/cases/section-2/case-2.jpg",
        alt: "حالة تجميل أسنان 2 - تجميل الاسنان بالفينيرز",
      },
      {
        type: "image" as const,
        src: "/images/cases/section-2/case-3.jpg",
        alt: "حالة تجميل أسنان 3 - تجميل الاسنان بالفينيرز",
      },
      {
        type: "image" as const,
        src: "/images/cases/section-2/case-4.jpg",
        alt: "حالة تجميل أسنان 4 - تجميل الاسنان بالفينيرز",
      },
      {
        type: "image" as const,
        src: "/images/cases/section-2/case-5.jpg",
        alt: "حالة تجميل أسنان 5 - تجميل الاسنان بالفينيرز",
      },
    ],
  },
  {
    titleKey: "cases.section3",
    cases: [
      {
        type: "image" as const,
        src: "/images/cases/section-1/case-1.jpg",
        alt: "حالة تجميل أسنان - تركيبات الزيركون",
      },
    ],
  },
  {
    titleKey: "cases.section4",
    cases: [
      {
        type: "image" as const,
        src: "/images/cases/section-4/case-1.jpeg",
        alt: "حالة تجميل أسنان - التبييض بالليزر",
      },
    ],
  },
  {
    titleKey: "cases.section5",
    cases: [
      {
        type: "video" as const,
        src: "/images/cases/section-5/video-1.mp4",
        alt: "فيديو - حشو تجميلي ليزر",
      },
    ],
  },
  {
    titleKey: "cases.section6",
    cases: [
      {
        type: "video" as const,
        src: "/images/cases/section-6/video-2.mp4",
        alt: "فيديو - حشو عصب",
      },
    ],
  },
];

export default async function CasesFull() {
  const t = await getTranslations();

  return (
    <section className={styles.casesDoctorSection} id="cases">
      <div className={styles.casesDoctorContent}>
        <div className={styles.casesHeader}>
          <h2 className={styles.caseTitle}>{t("cases.title")}</h2>
        </div>

        <div className={styles.casesGroups}>
          {casesData.map((section, index) => (
            <CaseSlider
              key={index}
              title={t(section.titleKey)}
              cases={section.cases}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
