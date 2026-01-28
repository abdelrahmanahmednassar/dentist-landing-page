import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import styles from "@/styles/blogs-page.module.css";
import BlogFilter from "@/components/BlogFilter";

export const metadata: Metadata = {
  title: "المدونة - فايد دينتال كلينك | مقالات ونصائح العناية بالأسنان",
  description:
    "اقرأ أحدث المقالات والنصائح حول صحة وتجميل الأسنان. مقالات متخصصة في زراعة الأسنان، الفينير، تبييض الأسنان، والعناية اليومية بالأسنان.",
  keywords: [
    "مدونة أسنان",
    "نصائح أسنان",
    "مقالات طب الأسنان",
    "العناية بالأسنان",
    "تجميل الأسنان",
    "dental blog",
    "dental tips",
    "oral health articles",
  ],
  alternates: {
    canonical: "https://fayed.clinic/blogs",
  },
  openGraph: {
    title: "المدونة - فايد دينتال كلينك",
    description:
      "اقرأ أحدث المقالات والنصائح حول صحة وتجميل الأسنان من خبراء فايد دينتال كلينك.",
    url: "https://fayed.clinic/blogs",
    type: "website",
    locale: "ar_EG",
    siteName: "فايد دينتال كلينك",
    images: [
      {
        url: "/images/blogs-preview.jpg",
        width: 1200,
        height: 630,
        alt: "مدونة فايد دينتال كلينك",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "المدونة - فايد دينتال كلينك",
    description:
      "اقرأ أحدث المقالات والنصائح حول صحة وتجميل الأسنان من خبراء فايد دينتال كلينك.",
    images: ["/images/blogs-preview.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function BlogsPage() {
  const locale = await getLocale();

  return (
    <section className={styles.blogPageSection}>
      <div className={styles.blogContainer}>
        {/* Page Header */}
        <div className={styles.blogPageHeader}>
          <h1 className={styles.blogPageTitle}>
            {locale === "ar" ? "المدونة" : "Blogs"}
          </h1>
          <p className={styles.blogPageSubtitle}>
            {locale === "ar"
              ? "أحدث المقالات والنصائح حول صحة وجمال الأسنان"
              : "Latest articles and tips on dental health and beauty"}
          </p>
        </div>

        <BlogFilter />
      </div>
    </section>
  );
}
