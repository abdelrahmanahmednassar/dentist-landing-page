"use client";

import { useState, useMemo } from "react";
import { useLocale } from "next-intl";
import styles from "@/styles/blogs-page.module.css";
import Image from "next/image";
import Link from "next/link";
import { BLOGS } from "@/date/blogs";

export default function BlogFilter() {
  const language = useLocale();
  const [activeCategory, setActiveCategory] = useState("all");

  // Get blogs for current language
  const blogs = useMemo(() => {
    return language === "ar" ? BLOGS.ar : BLOGS.en;
  }, [language]);

  // Dynamically extract unique categories from blogs
  const categories = useMemo(() => {
    const allCategory = {
      id: "all",
      label: language === "ar" ? "الكل" : "All",
      tag: "all",
    };

    const uniqueTags = Array.from(
      new Set(
        blogs
          .map((blog) => blog?.tag)
          .filter((tag): tag is string => tag !== undefined),
      ),
    );
    const tagCategories = uniqueTags.map((tag) => ({
      id: tag,
      label: tag,
      tag: tag,
    }));

    return [allCategory, ...tagCategories];
  }, [blogs, language]);

  // Filter blogs by category using the tag from each blog
  const filteredBlogs = useMemo(() => {
    if (activeCategory === "all") return blogs;
    return blogs.filter((blog) => blog?.tag === activeCategory);
  }, [blogs, activeCategory]);

  return (
    <>
      {/* Category Filter */}
      <div className={styles.blogCategories}>
        {categories.map((category) => (
          <button
            key={category.id}
            className={`${styles.categoryBtn} ${activeCategory === category.id ? styles.active : ""}`}
            onClick={() => setActiveCategory(category.id)}
          >
            {category.label}
          </button>
        ))}
      </div>

      {/* Blog Grid */}
      <div className={styles.blogGrid}>
        {filteredBlogs.map((blog) => (
          <Link
            key={blog?.id}
            href={`/blogs/${blog?.id}`}
            className={styles.blogCardLink}
          >
            <article className={styles.blogCard}>
              <div className={styles.blogCardImage}>
                <Image
                  src={blog?.imagePath || ""}
                  alt={blog?.title || ""}
                  loading="lazy"
                  width={1200}
                  height={600}
                />
                <span className={styles.blogCategory}>{blog?.tag}</span>
              </div>
              <div className={styles.blogCardContent}>
                <div className={styles.blogMeta}>
                  <span className={styles.blogDate}>
                    <i className="bx bx-calendar"></i>
                    <span>{blog?.publishDate}</span>
                  </span>
                  <span className={styles.blogReadTime}>
                    <i className="bx bx-time"></i>
                    <span>{blog?.timeToRead}</span>
                  </span>
                </div>
                <h3 className={styles.blogCardTitle}>{blog?.title}</h3>
                <p className={styles.blogCardExcerpt}>
                  {blog?.content.replace(/<[^>]*>/g, "").substring(0, 150)}...
                </p>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </>
  );
}
