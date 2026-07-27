import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLocale } from "next-intl/server";
import { db, blogs } from "@/db";
import { eq, or } from "drizzle-orm";
import Image from "next/image";
import { Link } from "@/i18n/navigation";

import { RichTextDisplay } from "@/components/RichTextDisplay";
import styles from "@/styles/blog-detail.module.css";
import { generatePageMetadata } from "@/utils/seo";
import { JsonLdBreadcrumb, JsonLdBlogPost } from "@/components/JsonLd";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://fayed.clinic";

interface PageProps {
  params: Promise<{
    blogId: string;
    locale: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { blogId, locale } = await params;
  const currentLocale = locale || await getLocale();

  try {
    const [dbBlog] = await db
      .select()
      .from(blogs)
      .where(or(eq(blogs.id, blogId), eq(blogs.slug, blogId)));

    if (dbBlog) {
      const title = currentLocale === "ar" ? dbBlog.titleAr : dbBlog.titleEn;
      const description = currentLocale === "ar" ? (dbBlog.descriptionAr || dbBlog.excerptAr) : (dbBlog.descriptionEn || dbBlog.excerptEn);
      const ogImage = (currentLocale === "ar" ? dbBlog.coverImageUrlAr : dbBlog.coverImageUrlEn) || "/images/blogs-preview.png";
      const tags = (currentLocale === "ar" ? dbBlog.tagsAr : dbBlog.tagsEn) || [];
      const slugOrId = dbBlog.slug || dbBlog.id;

      return generatePageMetadata({
        locale: currentLocale,
        path: `/blogs/${slugOrId}`,
        title: `${title} | ${currentLocale === "ar" ? "فايد دينتال كلينك" : "Fayed Dental Clinic"}`,
        description: description || title,
        image: ogImage,
        keywords: tags.filter((k): k is string => typeof k === "string" && k.trim().length > 0),
        type: "article",
        publishedTime: dbBlog.publishedAt?.toISOString() || dbBlog.createdAt?.toISOString(),
        modifiedTime: dbBlog.updatedAt?.toISOString() || dbBlog.createdAt?.toISOString(),
        authors: ["Dr. Mohamed Fayed - Fayed Dental Clinic"],
      });
    }
  } catch (err) {
    console.error("Error fetching blog metadata:", err);
  }

  return {};
}

export default async function BlogPage({ params }: PageProps) {
  const { blogId, locale } = await params;
  const currentLocale = locale || await getLocale();

  let blogData: {
    title: string;
    tag: string;
    timeToRead: string;
    imagePath: string;
    publishDate: string;
    content: string;
    slugOrId: string;
    datePublishedIso?: string;
    dateModifiedIso?: string;
    description: string;
  } | null = null;

  try {
    const [dbBlog] = await db
      .select()
      .from(blogs)
      .where(or(eq(blogs.id, blogId), eq(blogs.slug, blogId)));

    if (dbBlog) {
      const title = currentLocale === "ar" ? dbBlog.titleAr : dbBlog.titleEn;
      const content = currentLocale === "ar" ? dbBlog.contentAr : dbBlog.contentEn;
      const description = currentLocale === "ar"
        ? (dbBlog.descriptionAr || dbBlog.excerptAr || title)
        : (dbBlog.descriptionEn || dbBlog.excerptEn || title);
      const tags = currentLocale === "ar" ? dbBlog.tagsAr : dbBlog.tagsEn;
      const tag = tags[0] || (currentLocale === "ar" ? "عام" : "General");
      const publishDate = dbBlog.publishedAt
        ? new Date(dbBlog.publishedAt).toLocaleDateString(
            currentLocale === "ar" ? "ar-EG" : "en-US"
          )
        : new Date(dbBlog.createdAt).toLocaleDateString();

      const coverImg = currentLocale === "ar" ? dbBlog.coverImageUrlAr : dbBlog.coverImageUrlEn;
      const slugOrId = dbBlog.slug || dbBlog.id;

      blogData = {
        title,
        tag,
        timeToRead: `${dbBlog.readingMinutes} ${currentLocale === "ar" ? "دقائق" : "min"}`,
        imagePath: coverImg || dbBlog.coverImageUrlAr || dbBlog.coverImageUrlEn || "/images/blogs-preview.png",
        publishDate,
        content,
        slugOrId,
        datePublishedIso: dbBlog.publishedAt?.toISOString() || dbBlog.createdAt?.toISOString(),
        dateModifiedIso: dbBlog.updatedAt?.toISOString() || dbBlog.createdAt?.toISOString(),
        description,
      };
    }
  } catch (err) {
    console.error("Error querying DB for blog page", err);
  }

  if (!blogData) {
    notFound();
  }

  const articleUrl = `${SITE_URL}/${currentLocale}/blogs/${blogData.slugOrId}`;

  return (
    <>
      <JsonLdBreadcrumb
        locale={currentLocale}
        items={[
          { name: currentLocale === "ar" ? "المدونة" : "Blog", path: "/blogs" },
          { name: blogData.title, path: `/blogs/${blogData.slugOrId}` },
        ]}
      />
      <JsonLdBlogPost
        title={blogData.title}
        description={blogData.description}
        url={articleUrl}
        image={blogData.imagePath}
        datePublished={blogData.datePublishedIso}
        dateModified={blogData.dateModifiedIso}
        locale={currentLocale}
      />
      <article className={styles.blogDetailPage}>
        <div className={styles.blogDetailContainer}>
          {/* Back Button */}
          <Link href="/blogs" className={styles.backButton}>
            <i className="bx bx-right-arrow-alt"></i>
            <span>{currentLocale === "ar" ? "العودة للمدونة" : "Back to Blogs"}</span>
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
            lang={currentLocale}
            dir={currentLocale === 'ar' ? 'rtl' : 'ltr'}
          />
        </div>
      </article>
    </>
  );
}
