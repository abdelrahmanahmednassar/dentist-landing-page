"use client";

import { useState } from "react";
import { useLocale, useMessages } from "next-intl";
import styles from "@/styles/blogs-page.module.css";
import Image from "next/image";
import Link from "next/link";

const blogRoutes = {
  laserTeethWhitening: "/blog/laser-teeth-whitening",
  dailyDentalCare: "/blog/daily-dental-care",
  dentalImplantsGuide: "/blog/dental-implants-guide",
  veneersVsLumineers: "/blog/veneers-vs-lumineers",
  healthyFoodsForTeeth: "/blog/healthy-foods-for-teeth",
  childrenDentalCare: "/blog/children-dental-care",
};

// Map blog keys to their categories
const blogCategories = {
  laserTeethWhitening: "cosmetic",
  dailyDentalCare: "care",
  dentalImplantsGuide: "implants",
  veneersVsLumineers: "cosmetic",
  healthyFoodsForTeeth: "tips",
  childrenDentalCare: "care",
};

export default function BlogFilter() {
  const language = useLocale();
  const messages = useMessages() as any;
  const blogs = messages.blogPages;
  const [activeCategory, setActiveCategory] = useState("all");

  const categories = [
    { id: "all", label: language === "ar" ? "الكل" : "All" },
    {
      id: "care",
      label: language === "ar" ? "العناية بالأسنان" : "Dental Care",
    },
    { id: "cosmetic", label: language === "ar" ? "تجميل الأسنان" : "Cosmetic" },
    { id: "implants", label: language === "ar" ? "زراعة الأسنان" : "Implants" },
    { id: "tips", label: language === "ar" ? "نصائح عامة" : "Tips" },
  ];

  // Filter blogs by category
  const filteredBlogs = Object.entries(blogs).filter(([key]) => {
    if (activeCategory === "all") return true;
    return (
      blogCategories[key as keyof typeof blogCategories] === activeCategory
    );
  });

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
        {filteredBlogs.map(([key, blog]) => {
          const blogData = blog as any;
          return (
            <Link
              key={key}
              href={blogRoutes[key as keyof typeof blogRoutes]}
              className={styles.blogCardLink}
            >
              <article className={styles.blogCard}>
                <div className={styles.blogCardImage}>
                  <Image
                    src={blogData.image}
                    alt={blogData.imageAlt}
                    loading="lazy"
                    width={1200}
                    height={600}
                  />
                  <span className={styles.blogCategory}>
                    {blogData.category}
                  </span>
                </div>
                <div className={styles.blogCardContent}>
                  <div className={styles.blogMeta}>
                    <span className={styles.blogDate}>
                      <i className="bx bx-calendar"></i>
                      <span>{blogData.date}</span>
                    </span>
                    <span className={styles.blogReadTime}>
                      <i className="bx bx-time"></i>
                      <span>{blogData.readTime}</span>
                    </span>
                  </div>
                  <h3 className={styles.blogCardTitle}>{blogData.title}</h3>
                  <p className={styles.blogCardExcerpt}>
                    {blogData.lead.substring(0, 150)}...
                  </p>
                  <div className={styles.blogTags}>
                    {blogData.tags.map((tag: string, index: number) => (
                      <span key={index} className={styles.blogTag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            </Link>
          );
        })}
      </div>
    </>
  );
}
