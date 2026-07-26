'use client';

import { useState } from 'react';
import { Link, useRouter } from "@/i18n/navigation";

import { BlogForm, BlogFormData } from '@/components/BlogForm';
import styles from '@/styles/admin.module.css';

export default function CreateBlogPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (formData: BlogFormData) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/blogs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to create blog post');
      }

      router.push('/admin/blogs');
      router.refresh();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.dashboardPage}>
      {/* Top Navbar */}
      <header className={styles.navbar}>
        <div className={styles.navBrand}>
          <Link href="/admin/blogs" className={styles.brandIcon} style={{ textDecoration: 'none' }}>
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </Link>
          <div>
            <h1 className={styles.brandTitle}>Create New Article</h1>
            <p className={styles.brandSubtitle}>Add a new bilingual post to the clinic blog</p>
          </div>
        </div>
      </header>

      {/* Main Content Body */}
      <main className={styles.mainContent}>
        <BlogForm
          mode="create"
          onSubmit={handleSubmit}
          loading={loading}
          error={error}
        />
      </main>
    </div>
  );
}
