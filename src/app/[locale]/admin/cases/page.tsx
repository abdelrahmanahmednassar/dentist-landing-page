'use client';

import { useEffect, useState } from 'react';
import { Link } from "@/i18n/navigation";

import styles from '@/styles/admin.module.css';

interface CaseItem {
  id: string;
  category: 'implants' | 'cosmetic' | 'orthodontics';
  titleAr: string | null;
  titleEn: string | null;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}

const CATEGORY_LABELS: Record<string, { en: string; ar: string; badgeColor: string }> = {
  implants: { en: 'Dental Implants', ar: 'زراعة الأسنان', badgeColor: '#2f6bc4' },
  cosmetic: { en: 'Cosmetic Dentistry', ar: 'تجميل الأسنان', badgeColor: '#c49747' },
  orthodontics: { en: 'Orthodontics', ar: 'تقويم الأسنان', badgeColor: '#369e6b' },
};

export default function AdminCasesListPage() {
  const [cases, setCases] = useState<CaseItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchCases = async () => {
    try {
      const res = await fetch('/api/cases?limit=200');
      if (res.ok) {
        const data = await res.json();
        setCases(data.cases || []);
      }
    } catch (err) {
      console.error('Failed to fetch clinical cases', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCases();
  }, []);

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete the clinical case "${title || id}"? This will also remove the image from Cloudinary.`)) {
      return;
    }

    setDeletingId(id);
    try {
      const res = await fetch(`/api/cases/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setCases((prev) => prev.filter((c) => c.id !== id));
      } else {
        const data = await res.json();
        alert(`Failed to delete case: ${data.error || 'Unknown error'}`);
      }
    } catch (err) {
      alert('Error deleting case record');
    } finally {
      setDeletingId(null);
    }
  };

  const filteredCases = cases.filter((c) => {
    const titleAr = c.titleAr || '';
    const titleEn = c.titleEn || '';
    const matchesSearch =
      titleAr.toLowerCase().includes(searchTerm.toLowerCase()) ||
      titleEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      categoryFilter === 'all' || c.category === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className={styles.dashboardPage}>
      {/* Top Navbar */}
      <header className={styles.navbar}>
        <div className={styles.navBrand}>
          <div className={styles.brandIcon}>
            <i className="bx bx-images" style={{ fontSize: '1.4rem' }}></i>
          </div>
          <div>
            <h1 className={styles.brandTitle}>Cases Management</h1>
            <p className={styles.brandSubtitle}>Manage clinical before & after cases and smile galleries</p>
          </div>
        </div>

        <div className={styles.navActions}>
          <Link href="/admin/cases/create" className={styles.primaryLinkBtn}>
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Create New Case
          </Link>
        </div>
      </header>

      {/* Main Content Body */}
      <main className={styles.mainContent}>
        {/* Actions & Filters Bar */}
        <div className={styles.actionsBar}>
          <div className={styles.searchBox}>
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search cases by title or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--boulder)' }}>Category:</span>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className={styles.select}
              style={{ width: 'auto', padding: '0.5rem 1rem' }}
            >
              <option value="all">All Categories</option>
              <option value="implants">Dental Implants</option>
              <option value="cosmetic">Cosmetic Dentistry</option>
              <option value="orthodontics">Orthodontics</option>
            </select>
          </div>
        </div>

        {/* Cases Table */}
        <div className={styles.tableWrapper}>
          {loading ? (
            <div style={{ padding: '3rem', textAlign: 'center', color: '#777' }}>
              Loading clinical cases...
            </div>
          ) : filteredCases.length === 0 ? (
            <div style={{ padding: '3rem', textAlign: 'center', color: '#777' }}>
              No clinical cases found. Click &quot;Create New Case&quot; to add your first case record.
            </div>
          ) : (
            <table className={styles.adminTable}>
              <thead>
                <tr>
                  <th style={{ width: '80px' }}>Media</th>
                  <th>Title (AR / EN)</th>
                  <th>Category</th>
                  <th>Created Date</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCases.map((caseItem) => {
                  const catMeta = CATEGORY_LABELS[caseItem.category] || { en: caseItem.category, ar: '', badgeColor: '#666' };
                  return (
                    <tr key={caseItem.id}>
                      <td>
                        <div style={{ width: '60px', height: '60px', borderRadius: '8px', overflow: 'hidden', backgroundColor: '#111', border: '1px solid var(--iron)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <img
                            src={caseItem.imageUrl}
                            alt={caseItem.titleEn || 'Clinical Case'}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          />
                        </div>
                      </td>
                      <td>
                        {caseItem.titleAr || caseItem.titleEn ? (
                          <>
                            <div style={{ fontWeight: 700, color: 'var(--haiti)' }}>{caseItem.titleAr || '-'}</div>
                            <div style={{ fontSize: '0.85rem', color: 'var(--boulder)' }}>{caseItem.titleEn || '-'}</div>
                          </>
                        ) : (
                          <span style={{ fontStyle: 'italic', color: 'var(--boulder)', fontSize: '0.9rem' }}>
                            Untitied Gallery Case
                          </span>
                        )}
                      </td>
                      <td>
                        <span style={{
                          display: 'inline-block',
                          padding: '0.35rem 0.75rem',
                          borderRadius: '20px',
                          fontSize: '0.78rem',
                          fontWeight: 600,
                          color: '#fff',
                          backgroundColor: catMeta.badgeColor,
                          boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
                        }}>
                          {catMeta.en}
                        </span>
                      </td>
                      <td>{new Date(caseItem.createdAt).toLocaleDateString()}</td>
                      <td style={{ textAlign: 'right' }}>
                        <div className={styles.tableActions} style={{ justifyContent: 'flex-end' }}>
                          <a
                            href={caseItem.imageUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.actionBtnView}
                          >
                            Preview
                          </a>
                          <Link href={`/admin/cases/${caseItem.id}/edit`} className={styles.actionBtn}>
                            Edit
                          </Link>
                          <button
                            onClick={() => handleDelete(caseItem.id, caseItem.titleEn || caseItem.titleAr || caseItem.id)}
                            disabled={deletingId === caseItem.id}
                            className={styles.actionBtnDanger}
                          >
                            {deletingId === caseItem.id ? 'Deleting...' : 'Delete'}
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  );
}
