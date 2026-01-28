import { notFound } from "next/navigation";
import { getLocale } from "next-intl/server";
import { BLOGS } from "@/date/blogs";
import Image from "next/image";
import Link from "next/link";
import styles from "@/styles/blog-detail.module.css";

interface PageProps {
  params: Promise<{
    blogId: string;
  }>;
}

export default async function BlogPage({ params }: PageProps) {
  const { blogId } = await params;
  const locale = await getLocale();
  const blogs = locale === "ar" ? BLOGS.ar : BLOGS.en;

  // Find the blog by ID
  const blog = blogs.find((b) => b.id === blogId); // If blog not found, show 404
  if (!blog) {
    notFound();
  }

  return (
    <article className={styles.blogDetailPage}>
      <div className={styles.blogDetailContainer}>
        {/* Back Button */}
        <Link href="/blogs" className={styles.backButton}>
          <i className="bx bx-right-arrow-alt"></i>
          <span>{locale === "ar" ? "العودة للمدونة" : "Back to Blog"}</span>
        </Link>

        {/* Blog Header */}
        <header className={styles.blogDetailHeader}>
          <span className={styles.blogDetailCategory}>{blog.tag}</span>
          <h1 className={styles.blogDetailTitle}>{blog.title}</h1>
          <div className={styles.blogDetailMeta}>
            <span>
              <i className="bx bx-calendar"></i> {blog.publishDate}
            </span>
            <span>
              <i className="bx bx-time"></i> {blog.timeToRead}
            </span>
          </div>
        </header>

        {/* Featured Image */}
        <div className={styles.blogDetailImage}>
          <Image
            src={blog.imagePath}
            alt={blog.title}
            width={1200}
            height={600}
          />
        </div>

        {/* Blog Content */}
        <div
          className={styles.blogDetailContent}
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
      </div>
    </article>
  );
} // Generate static params for all blog IDs
export async function generateStaticParams() {
  const allBlogIds = [
    ...BLOGS.en.map((blog) => ({ blogId: blog.id })),
    ...BLOGS.ar.map((blog) => ({ blogId: blog.id })),
  ];

  // Remove duplicates
  const uniqueIds = Array.from(
    new Set(allBlogIds.map((item) => item.blogId)),
  ).map((blogId) => ({ blogId }));

  return uniqueIds;
}
