'use client';

import { useEffect, useState } from 'react';
import { Link } from "@/i18n/navigation";

import styles from '@/styles/admin.module.css';

interface BlogItem {
  id: string;
  titleAr: string;
  titleEn: string;
  slug: string;
  coverImageUrl: string;
  status: 'draft' | 'published' | 'archived';
  isFeatured: boolean;
  readingMinutes: number;
  createdAt: string;
  publishedAt: string | null;
}

export default function AdminBlogsListPage() {
  const [blogs, setBlogs] = useState<BlogItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchAdminBlogs = async () => {
    try {
      const res = await fetch('/api/admin/blogs');
      if (res.ok) {
        const data = await res.json();
        setBlogs(data.blogs || []);
      }
    } catch (err) {
      console.error('Failed to fetch admin blogs', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminBlogs();
  }, []);

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete the blog post "${title}"?`)) {
      return;
    }

    setDeletingId(id);
    try {
      const res = await fetch(`/api/blogs/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setBlogs((prev) => prev.filter((b) => b.id !== id));
      } else {
        alert('Failed to delete blog post');
      }
    } catch (err) {
      alert('Error deleting blog post');
    } finally {
      setDeletingId(null);
    }
  };

  const filteredBlogs = blogs.filter((b) => {
    const matchesSearch =
      b.titleAr.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.titleEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.slug.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === 'all' || b.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className={styles.dashboardPage}>
      {/* Top Navbar */}
      <header className={styles.navbar}>
        <div className={styles.navBrand}>
          <div className={styles.brandIcon}>
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10l5 5v11a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div>
            <h1 className={styles.brandTitle}>Blogs Management</h1>
            <p className={styles.brandSubtitle}>Manage all clinic articles and publications</p>
          </div>
        </div>

        <div className={styles.navActions}>
          <Link href="/admin/blogs/create" className={styles.primaryLinkBtn}>
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Create New Blog
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
              placeholder="Search by title or slug..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--boulder)' }}>Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className={styles.select}
              style={{ width: 'auto', padding: '0.5rem 1rem' }}
            >
              <option value="all">All Statuses</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
              <option value="archived">Archived</option>
            </select>
          </div>
        </div>

        {/* Blogs Table */}
        <div className={styles.tableWrapper}>
          {loading ? (
            <div style={{ padding: '3rem', textAlign: 'center', color: '#777' }}>
              Loading blogs...
            </div>
          ) : filteredBlogs.length === 0 ? (
            <div style={{ padding: '3rem', textAlign: 'center', color: '#777' }}>
              No blog posts found. Click &quot;Create New Blog&quot; to add your first article.
            </div>
          ) : (
            <table className={styles.adminTable}>
              <thead>
                <tr>
                  <th>Title (AR / EN)</th>
                  <th>Status</th>
                  <th>Reading Time</th>
                  <th>Created Date</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredBlogs.map((blog) => (
                  <tr key={blog.id}>
                    <td>
                      <div style={{ fontWeight: 700, color: 'var(--haiti)' }}>{blog.titleAr}</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--boulder)' }}>{blog.titleEn}</div>
                    </td>
                    <td>
                      {blog.status === 'published' && (
                        <span className={styles.badgePublished}>Published</span>
                      )}
                      {blog.status === 'draft' && (
                        <span className={styles.badgeDraft}>Draft</span>
                      )}
                      {blog.status === 'archived' && (
                        <span className={styles.badgeArchived}>Archived</span>
                      )}
                      {blog.isFeatured && (
                        <span className={styles.badgeFeatured}>Featured ⭐</span>
                      )}
                    </td>
                    <td>{blog.readingMinutes} min</td>
                    <td>{new Date(blog.createdAt).toLocaleDateString()}</td>
                    <td style={{ textAlign: 'right' }}>
                      <div className={styles.tableActions} style={{ justifyContent: 'flex-end' }}>
                        <Link
                          href={`/blogs/${blog.id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.actionBtnView}
                        >
                          View
                        </Link>
                        <Link href={`/admin/blogs/${blog.id}/edit`} className={styles.actionBtn}>
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(blog.id, blog.titleEn)}
                          disabled={deletingId === blog.id}
                          className={styles.actionBtnDanger}
                        >
                          {deletingId === blog.id ? 'Deleting...' : 'Delete'}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  );
}
