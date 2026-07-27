'use client';

import { useState, useEffect, useMemo } from 'react';
import { useLocale } from 'next-intl';
import styles from '@/styles/blogs-page.module.css';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';


interface DbBlog {
  id: string;
  titleAr: string;
  titleEn: string;
  slug: string;
  coverImageUrlAr: string;
  coverImageUrlEn: string;
  excerptAr: string;
  excerptEn: string;
  readingMinutes: number;
  tagsAr: string[];
  tagsEn: string[];
  publishedAt: string | null;
  createdAt: string;
}

export default function BlogFilter() {
  const language = useLocale();
  const [activeCategory, setActiveCategory] = useState('all');
  const [dbBlogs, setDbBlogs] = useState<DbBlog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const res = await fetch('/api/blogs');
        if (res.ok) {
          const data = await res.json();
          setDbBlogs(data.blogs || []);
        }
      } catch (err) {
        console.error('Failed to load published blogs', err);
      } finally {
        setLoading(false);
      }
    }

    fetchBlogs();
  }, []);

  // Format blogs array directly from DB
  const formattedBlogs = useMemo(() => {
    return dbBlogs.map((b) => {
      const title = language === 'ar' ? b.titleAr : b.titleEn;
      const excerpt = language === 'ar' ? b.excerptAr : b.excerptEn;
      const tags = language === 'ar' ? b.tagsAr : b.tagsEn;
      const primaryTag = tags[0] || (language === 'ar' ? 'عام' : 'General');
      const publishDate = b.publishedAt
        ? new Date(b.publishedAt).toLocaleDateString(
            language === 'ar' ? 'ar-EG' : 'en-US'
          )
        : new Date(b.createdAt).toLocaleDateString();

      const coverImg = language === 'ar' ? b.coverImageUrlAr : b.coverImageUrlEn;

      return {
        id: b.slug || b.id,
        title,
        excerpt,
        tag: primaryTag,
        tags,
        timeToRead: `${b.readingMinutes} ${language === 'ar' ? 'دقائق' : 'min'}`,
        imagePath: coverImg || b.coverImageUrlAr || b.coverImageUrlEn || '/images/blogs-preview.png',
        publishDate,
      };
    });
  }, [dbBlogs, language]);

  // Extract unique categories dynamically
  const categories = useMemo(() => {
    const allCategory = {
      id: 'all',
      label: language === 'ar' ? 'الكل' : 'All',
    };

    const allTags = new Set<string>();
    formattedBlogs.forEach((blog) => {
      if (blog.tags) {
        blog.tags.forEach((t) => allTags.add(t));
      } else if (blog.tag) {
        allTags.add(blog.tag);
      }
    });

    const tagCategories = Array.from(allTags).map((tag) => ({
      id: tag,
      label: tag,
    }));

    return [allCategory, ...tagCategories];
  }, [formattedBlogs, language]);

  // Filtered blogs
  const filteredBlogs = useMemo(() => {
    if (activeCategory === 'all') return formattedBlogs;
    return formattedBlogs.filter(
      (blog) =>
        blog.tag === activeCategory ||
        (blog.tags && blog.tags.includes(activeCategory))
    );
  }, [formattedBlogs, activeCategory]);

  return (
    <>
      {/* Category Filter */}
      {loading ? (
        <div className={styles.blogCategories}>
          {Array.from({ length: 4 }).map((_, idx) => (
            <div
              key={idx}
              className={`${styles.skeletonPulse} ${styles.skeletonCategoryBtn}`}
            />
          ))}
        </div>
      ) : categories.length > 1 ? (
        <div className={styles.blogCategories}>
          {categories.map((category) => (
            <button
              key={category.id}
              className={`${styles.categoryBtn} ${
                activeCategory === category.id ? styles.active : ''
              }`}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.label}
            </button>
          ))}
        </div>
      ) : null}

      {/* Blog Grid */}
      <div className={styles.blogGrid}>
        {loading ? (
          Array.from({ length: 6 }).map((_, idx) => (
            <article key={idx} className={styles.skeletonCard}>
              <div className={`${styles.skeletonImage} ${styles.skeletonPulse}`}>
                <span className={styles.skeletonBadge} />
              </div>
              <div className={styles.skeletonContent}>
                <div className={styles.skeletonMeta}>
                  <div className={`${styles.skeletonMetaItem} ${styles.skeletonPulse}`} />
                  <div className={`${styles.skeletonMetaItem} ${styles.skeletonPulse}`} />
                </div>
                <div className={styles.skeletonTitle}>
                  <div className={`${styles.skeletonLine} ${styles.skeletonPulse}`} />
                  <div className={`${styles.skeletonLineShort} ${styles.skeletonPulse}`} />
                </div>
                <div className={styles.skeletonExcerpt}>
                  <div className={`${styles.skeletonTextLine} ${styles.skeletonPulse}`} />
                  <div className={`${styles.skeletonTextLineMed} ${styles.skeletonPulse}`} />
                  <div className={`${styles.skeletonTextLineShort} ${styles.skeletonPulse}`} />
                </div>
              </div>
            </article>
          ))
        ) : filteredBlogs.length === 0 ? (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3rem 0', color: '#777' }}>
            {language === 'ar' ? 'لا توجد مقالات متاحة حالياً' : 'No articles available at the moment'}
          </div>
        ) : (
          filteredBlogs.map((blog) => (
            <Link
              key={blog.id}
              href={`/blogs/${blog.id}`}
              className={styles.blogCardLink}
            >
              <article className={styles.blogCard}>
                <div className={styles.blogCardImage}>
                  <Image
                    src={blog.imagePath}
                    alt={blog.title}
                    loading="lazy"
                    width={1200}
                    height={600}
                  />
                  <span className={styles.blogCategory}>{blog.tag}</span>
                </div>
                <div className={styles.blogCardContent}>
                  <div className={styles.blogMeta}>
                    <span className={styles.blogDate}>
                      <i className="bx bx-calendar"></i>
                      <span>{blog.publishDate}</span>
                    </span>
                    <span className={styles.blogReadTime}>
                      <i className="bx bx-time"></i>
                      <span>{blog.timeToRead}</span>
                    </span>
                  </div>
                  <h3 className={styles.blogCardTitle}>{blog.title}</h3>
                  <p className={styles.blogCardExcerpt}>{blog.excerpt}</p>
                </div>
              </article>
            </Link>
          ))
        )}
      </div>
    </>
  );
}
