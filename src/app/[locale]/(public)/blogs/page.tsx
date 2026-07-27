import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import styles from "@/styles/blogs-page.module.css";
import BlogFilter from "@/components/BlogFilter";
import { generatePageMetadata } from "@/utils/seo";
import { JsonLdBreadcrumb } from "@/components/JsonLd";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isArabic = locale === "ar";

  return generatePageMetadata({
    locale,
    path: "/blogs",
    title: isArabic
      ? "المدونة - فايد دينتال كلينك | مقالات ونصائح العناية بالأسنان"
      : "Dental Blog & Care Tips - Fayed Dental Clinic | Cairo Implants & Veneers Articles",
    description: isArabic
      ? "اقرأ أحدث المقالات والنصائح من دكتور محمد فايد وفريق عيادة فايد حول صحة وتجميل الأسنان، زراعة الأسنان الفورية، تبييض الأسنان، والفينير."
      : "Read authoritative dental health and cosmetic dentistry articles from Dr. Mohamed Fayed and specialists. Tips on immediate dental implants, Hollywood smile care, and oral health.",
    image: "/images/preview-image.png",
    keywords: isArabic
      ? ["مدونة أسنان", "نصائح أسنان", "مقالات طب الأسنان", "العناية بالأسنان", "تجميل الأسنان"]
      : ["dental blog Cairo", "dental tips Egypt", "oral health articles", "dental implants guide Cairo", "veneers maintenance tips"],
  });
}

export default async function BlogsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <>
      <JsonLdBreadcrumb
        locale={locale}
        items={[{ name: locale === "ar" ? "المدونة" : "Blog", path: "/blogs" }]}
      />
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
    </>
  );
}
