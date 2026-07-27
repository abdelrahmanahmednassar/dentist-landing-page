import { Link } from "@/i18n/navigation";
import Image from "next/image";
import styles from "@/styles/featured-blogs.module.css";
import { getTranslations, getLocale } from "next-intl/server";
import { db, blogs } from "@/db";
import { eq, and, desc } from "drizzle-orm";

export default async function FeaturedBlogs() {
  const t = await getTranslations();
  const locale = await getLocale();
  const isArabic = locale === "ar";

  let featuredBlogsList: Array<{
    id: string;
    slug: string;
    titleAr: string;
    titleEn: string;
    excerptAr: string;
    excerptEn: string;
    descriptionAr: string;
    descriptionEn: string;
    coverImageUrlAr: string;
    coverImageUrlEn: string;
    publishedAt: Date | null;
    createdAt: Date;
  }> = [];

  try {
    featuredBlogsList = await db
      .select({
        id: blogs.id,
        slug: blogs.slug,
        titleAr: blogs.titleAr,
        titleEn: blogs.titleEn,
        excerptAr: blogs.excerptAr,
        excerptEn: blogs.excerptEn,
        descriptionAr: blogs.descriptionAr,
        descriptionEn: blogs.descriptionEn,
        coverImageUrlAr: blogs.coverImageUrlAr,
        coverImageUrlEn: blogs.coverImageUrlEn,
        publishedAt: blogs.publishedAt,
        createdAt: blogs.createdAt,
      })
      .from(blogs)
      .where(and(eq(blogs.status, "published"), eq(blogs.isFeatured, true)))
      .orderBy(desc(blogs.publishedAt), desc(blogs.createdAt))
      .limit(3);
  } catch (error) {
    console.error("Error fetching featured blogs for homepage:", error);
  }

  return (
    <section
      className={styles.featuredBlogsSection}
      id="featured-blogs"
      aria-labelledby="featured-blogs-title"
    >
      {/* Top angled polygon shape to transition smoothly from Services section */}
      <div className={styles.topDivider} aria-hidden="true">
        <svg
          viewBox="0 0 1200 80"
          preserveAspectRatio="none"
          className={styles.dividerSvg}
        >
          <polygon points="0,80 600,0 1200,80" fill="#f9f9f9" />
        </svg>
      </div>

      <div className={styles.featuredBlogsContainer}>
        <div className={styles.header}>
          <span className={styles.label}>{t("featuredBlogs.label")}</span>
          <h2 className={styles.title} id="featured-blogs-title">
            {t("featuredBlogs.title")}
          </h2>
          <p className={styles.subtitle}>{t("featuredBlogs.subtitle")}</p>
        </div>

        {featuredBlogsList.length === 0 ? (
          <div className={styles.emptyState}>
            <p>{t("featuredBlogs.noBlogs")}</p>
          </div>
        ) : (
          <div className={styles.cardsGrid}>
            {featuredBlogsList.map((blog) => {
              const title = isArabic ? blog.titleAr : blog.titleEn;
              const excerpt = isArabic
                ? blog.excerptAr || blog.descriptionAr
                : blog.excerptEn || blog.descriptionEn;
              const imageUrl = isArabic
                ? blog.coverImageUrlAr ||
                  blog.coverImageUrlEn ||
                  "/images/blogs-preview.png"
                : blog.coverImageUrlEn ||
                  blog.coverImageUrlAr ||
                  "/images/blogs-preview.png";

              const dateObj = blog.publishedAt
                ? new Date(blog.publishedAt)
                : new Date(blog.createdAt);
              const formattedDate = dateObj.toLocaleDateString(
                isArabic ? "ar-EG" : "en-US",
                {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                }
              );
              const targetUrl = `/blogs/${blog.slug || blog.id}`;

              return (
                <Link
                  key={blog.id}
                  href={targetUrl}
                  className={styles.cardLink}
                >
                  <article className={styles.card}>
                    <div className={styles.cardImageWrapper}>
                      <Image
                        src={imageUrl}
                        alt={title}
                        width={400}
                        height={260}
                        className={styles.cardImage}
                        loading="lazy"
                      />
                    </div>
                    <time
                      dateTime={dateObj.toISOString()}
                      className={styles.cardDate}
                    >
                      {formattedDate}
                    </time>
                    <h3 className={styles.cardTitle}>{title}</h3>
                    <p className={styles.cardExcerpt}>{excerpt}</p>
                    <span className={styles.readMore} dir="ltr">
                      {t("featuredBlogs.readMore")}
                    </span>
                  </article>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
