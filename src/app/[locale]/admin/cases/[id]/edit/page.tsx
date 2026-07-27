'use client';

import { useEffect, useState, use } from 'react';
import { Link, useRouter } from "@/i18n/navigation";

import { CaseForm, CaseFormData } from '@/components/CaseForm';
import styles from '@/styles/admin.module.css';

interface EditCasePageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function EditCasePage({ params }: EditCasePageProps) {
  const { id } = use(params);
  const router = useRouter();

  const [initialData, setInitialData] = useState<CaseFormData | null>(null);
  const [initialLoading, setInitialLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCase() {
      try {
        const res = await fetch(`/api/cases/${id}`);
        if (!res.ok) {
          throw new Error('Clinical case not found');
        }
        const data = await res.json();
        setInitialData(data.case);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'Error fetching clinical case details');
      } finally {
        setInitialLoading(false);
      }
    }

    fetchCase();
  }, [id]);

  const handleSubmit = async (formData: CaseFormData) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/cases/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to update clinical case');
      }

      router.push('/admin/cases');
      router.refresh();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An error occurred while saving changes');
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <div className={styles.dashboardPage}>
        <div className={styles.mainContent} style={{ textAlign: 'center', padding: '5rem', color: '#777' }}>
          Loading clinical case details...
        </div>
      </div>
    );
  }

  return (
    <div className={styles.dashboardPage}>
      {/* Top Navbar */}
      <header className={styles.navbar}>
        <div className={styles.navBrand}>
          <Link href="/admin/cases" className={styles.brandIcon} style={{ textDecoration: 'none' }}>
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </Link>
          <div>
            <h1 className={styles.brandTitle}>Edit Clinical Case</h1>
            <p className={styles.brandSubtitle}>Update category specialty, descriptions, or treatment image</p>
          </div>
        </div>
      </header>

      {/* Main Content Body */}
      <main className={styles.mainContent}>
        <CaseForm
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
