'use client';

import { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { BlogForm, BlogFormData } from '@/components/BlogForm';
import styles from '@/styles/admin.module.css';

interface EditBlogPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function EditBlogPage({ params }: EditBlogPageProps) {
  const { id } = use(params);
  const router = useRouter();

  const [initialData, setInitialData] = useState<BlogFormData | null>(null);
  const [initialLoading, setInitialLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchBlog() {
      try {
        const res = await fetch(`/api/blogs/${id}`);
        if (!res.ok) {
          throw new Error('Blog post not found');
        }
        const data = await res.json();
        setInitialData(data.blog);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'Error fetching blog');
      } finally {
        setInitialLoading(false);
      }
    }

    fetchBlog();
  }, [id]);

  const handleSubmit = async (formData: BlogFormData) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/blogs/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to update blog post');
      }

      router.push('/admin/blogs');
      router.refresh();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <div className={styles.dashboardPage}>
        <div className={styles.mainContent} style={{ textAlign: 'center', padding: '5rem' }}>
          Loading blog data...
        </div>
      </div>
    );
  }

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
            <h1 className={styles.brandTitle}>Edit Blog Article</h1>
            <p className={styles.brandSubtitle}>Update article details and translation content</p>
          </div>
        </div>
      </header>

      {/* Main Content Body */}
      <main className={styles.mainContent}>
        <BlogForm
          key={initialData?.id || 'edit'}
          mode="edit"
          initialData={initialData || undefined}
          onSubmit={handleSubmit}
          loading={loading}
          error={error}
        />
      </main>
    </div>
  );
}
