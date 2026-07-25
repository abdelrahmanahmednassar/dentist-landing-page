'use client';

import { useEffect, useState } from 'react';
import styles from '@/styles/admin.module.css';

interface AdminUser {
  id: string;
  email: string;
  name?: string | null;
  role: string;
}

export default function AdminDashboardPage() {
  const [user, setUser] = useState<AdminUser | null>(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch('/api/auth/me');
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
        }
      } catch (err) {
        console.error('Failed to load user', err);
      }
    }

    fetchUser();
  }, []);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    window.location.href = '/admin/login';
  };

  return (
    <div className={styles.dashboardPage}>
      {/* Top Navbar */}
      <header className={styles.navbar}>
        <div className={styles.navBrand}>
          <div className={styles.brandIcon}>
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <div>
            <h1 className={styles.brandTitle}>Admin Control Center</h1>
            <p className={styles.brandSubtitle}>Protected Management Portal</p>
          </div>
        </div>

        <div className={styles.navActions}>
          {user && (
            <div className={styles.userInfo}>
              <p className={styles.userName}>{user.name || user.email}</p>
              <span className={styles.userBadge}>{user.role}</span>
            </div>
          )}
          <button onClick={handleLogout} className={styles.logoutBtn}>
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Sign Out
          </button>
        </div>
      </header>

      {/* Main Dashboard Body */}
      <main className={styles.mainContent}>
        <div className={styles.heroBanner}>
          <h2 className={styles.welcomeText}>Welcome, {user?.name || user?.email || 'Admin'}! 👋</h2>
          <p className={styles.welcomeDesc}>
            You are logged into the protected admin panel. All operations performed here require admin privileges.
          </p>
        </div>

        {/* Info Grid */}
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statLabel}>User Status</div>
            <div className={styles.statValue}>{user?.role || 'Admin'}</div>
            <p className={styles.statDesc}>Full management access enabled</p>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statLabel}>Session Security</div>
            <div className={styles.statValue}>
              <span className={styles.statusDot} />
              Active (JWT)
            </div>
            <p className={styles.statDesc}>HTTP-only cookie protection</p>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statLabel}>Database Connection</div>
            <div className={styles.statValue}>Neon Postgres</div>
            <p className={styles.statDesc}>Connected via Drizzle ORM</p>
          </div>
        </div>
      </main>
    </div>
  );
}
