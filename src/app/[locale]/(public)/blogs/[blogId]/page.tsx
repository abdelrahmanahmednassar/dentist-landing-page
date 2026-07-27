import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLocale } from "next-intl/server";
import { db, blogs } from "@/db";
import { eq, or } from "drizzle-orm";
import Image from "next/image";
import { Link } from "@/i18n/navigation";

import { RichTextDisplay } from "@/components/RichTextDisplay";
import styles from "@/styles/blog-detail.module.css";

interface PageProps {
  params: Promise<{
    blogId: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { blogId } = await params;
  const locale = await getLocale();

  try {
    const [dbBlog] = await db
      .select()
      .from(blogs)
      .where(or(eq(blogs.id, blogId), eq(blogs.slug, blogId)));

    if (dbBlog) {
      const title = locale === "ar" ? dbBlog.titleAr : dbBlog.titleEn;
      const description = locale === "ar" ? (dbBlog.descriptionAr || dbBlog.excerptAr) : (dbBlog.descriptionEn || dbBlog.excerptEn);
      const ogImage = locale === "ar" ? dbBlog.coverImageUrlAr : dbBlog.coverImageUrlEn;

      return {
        title,
        description,
        openGraph: {
          title,
          description,
          type: "article",
          images: ogImage ? [{ url: ogImage, alt: title }] : [],
        },
        twitter: {
          card: "summary_large_image",
          title,
          description,
          images: ogImage ? [ogImage] : [],
        },
      };
    }
  } catch (err) {
    console.error("Error fetching blog metadata:", err);
  }

  return {};
}

export default async function BlogPage({ params }: PageProps) {
  const { blogId } = await params;
  const locale = await getLocale();

  let blogData: {
    title: string;
    tag: string;
    timeToRead: string;
    imagePath: string;
    publishDate: string;
    content: string;
  } | null = null;

  try {
    const [dbBlog] = await db
      .select()
      .from(blogs)
      .where(or(eq(blogs.id, blogId), eq(blogs.slug, blogId)));

    if (dbBlog) {
      const title = locale === "ar" ? dbBlog.titleAr : dbBlog.titleEn;
      const content = locale === "ar" ? dbBlog.contentAr : dbBlog.contentEn;
      const tags = locale === "ar" ? dbBlog.tagsAr : dbBlog.tagsEn;
      const tag = tags[0] || (locale === "ar" ? "عام" : "General");
      const publishDate = dbBlog.publishedAt
        ? new Date(dbBlog.publishedAt).toLocaleDateString(
            locale === "ar" ? "ar-EG" : "en-US"
          )
        : new Date(dbBlog.createdAt).toLocaleDateString();

      const coverImg = locale === "ar" ? dbBlog.coverImageUrlAr : dbBlog.coverImageUrlEn;

      blogData = {
        title,
        tag,
        timeToRead: `${dbBlog.readingMinutes} ${locale === "ar" ? "دقائق" : "min"}`,
        imagePath: coverImg || dbBlog.coverImageUrlAr || dbBlog.coverImageUrlEn || "/images/blogs-preview.png",
        publishDate,
        content,
      };
    }
  } catch (err) {
    console.error("Error querying DB for blog page", err);
  }

  if (!blogData) {
    notFound();
  }

  return (
    <article className={styles.blogDetailPage}>
      <div className={styles.blogDetailContainer}>
        {/* Back Button */}
        <Link href="/blogs" className={styles.backButton}>
          <i className="bx bx-right-arrow-alt"></i>
          <span>{locale === "ar" ? "العودة للمدونة" : "Back to Blogs"}</span>
        </Link>

        {/* Blog Header */}
        <header className={styles.blogDetailHeader}>
          <span className={styles.blogDetailCategory}>{blogData.tag}</span>
          <h1 className={styles.blogDetailTitle}>{blogData.title}</h1>
          <div className={styles.blogDetailMeta}>
            <span>
              <i className="bx bx-calendar"></i> {blogData.publishDate}
            </span>
            <span>
              <i className="bx bx-time"></i> {blogData.timeToRead}
            </span>
          </div>
        </header>

        {/* Featured Image */}
        <div className={styles.blogDetailImage}>
          <Image
            src={blogData.imagePath}
            alt={blogData.title}
            width={1200}
            height={600}
          />
        </div>

        {/* Blog Content */}
        <RichTextDisplay
          markdown={blogData.content}
          lang={locale}
          dir={locale === 'ar' ? 'rtl' : 'ltr'}
        />
      </div>
    </article>
  );
}
