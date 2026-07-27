'use client';

import { useState } from 'react';
import { Link, useRouter } from "@/i18n/navigation";

import { CaseForm, CaseFormData } from '@/components/CaseForm';
import styles from '@/styles/admin.module.css';

export default function CreateCasePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (formData: CaseFormData) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/cases', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to create clinical case');
      }

      router.push('/admin/cases');
      router.refresh();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An error occurred while creating case');
    } finally {
      setLoading(false);
    }
  };

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
            <h1 className={styles.brandTitle}>Add New Clinical Case</h1>
            <p className={styles.brandSubtitle}>Showcase a new before & after treatment or patient experience in the catalog</p>
          </div>
        </div>
      </header>

      {/* Main Content Body */}
      <main className={styles.mainContent}>
        <CaseForm
          mode="create"
          onSubmit={handleSubmit}
          loading={loading}
          error={error}
        />
      </main>
    </div>
  );
}
