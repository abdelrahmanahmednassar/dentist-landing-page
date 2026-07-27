"use client";

import { useState, useEffect } from "react";
import { Link, usePathname } from "@/i18n/navigation";
import styles from "@/styles/admin-layout.module.css";

interface AdminUser {
  id: string;
  email: string;
  name?: string | null;
  role: string;
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [user, setUser] = useState<AdminUser | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (pathname.includes("/login")) return;

    async function fetchUser() {
      try {
        const res = await fetch("/api/auth/me");
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
        }
      } catch (err) {
        console.error("Failed to fetch user in admin layout", err);
      }
    }

    fetchUser();
  }, [pathname]);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch (e) {
      console.error(e);
    }
    window.location.href = "/admin/login";
  };

  if (pathname.includes("/login")) {
    return <>{children}</>;
  }

  const isExactAdmin = pathname === "/admin";
  const isBlogs = pathname.startsWith("/admin/blogs");
  const isCases = pathname.startsWith("/admin/cases");

  return (
    <div className={styles.adminWrapper}>
      {/* Mobile Backdrop Overlay */}
      <div
        className={`${styles.overlay} ${sidebarOpen ? styles.overlayActive : ""}`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Main Left Sidebar */}
      <aside className={`${styles.sidebar} ${sidebarOpen ? styles.sidebarOpen : ""}`}>
        {/* Brand Header */}
        <div className={styles.brandBox}>
          <div className={styles.brandIcon}>
            <i className="bx bx-shield-quarter"></i>
          </div>
          <div className={styles.brandText}>
            <span className={styles.brandTitle}>Fayed Clinic</span>
            <span className={styles.brandSubtitle}>Control Portal</span>
          </div>
        </div>

        {/* Navigation Section */}
        <div className={styles.navSection}>
          <div className={styles.navLabel}>Core Modules</div>
          <ul className={styles.navList}>
            <li>
              <Link
                href="/admin"
                onClick={() => setSidebarOpen(false)}
                className={`${styles.navLink} ${isExactAdmin ? styles.active : ""}`}
              >
                <i className="bx bx-grid-alt"></i>
                <span>Overview & Security</span>
              </Link>
            </li>
            <li>
              <Link
                href="/admin/blogs"
                onClick={() => setSidebarOpen(false)}
                className={`${styles.navLink} ${isBlogs ? styles.active : ""}`}
              >
                <i className="bx bx-news"></i>
                <span>Blog Management</span>
              </Link>
            </li>
            <li>
              <Link
                href="/admin/cases"
                onClick={() => setSidebarOpen(false)}
                className={`${styles.navLink} ${isCases ? styles.active : ""}`}
              >
                <i className="bx bx-images"></i>
                <span>Cases Management</span>
              </Link>
            </li>
          </ul>

          <div className={styles.navDivider}></div>

          <div className={styles.navLabel}>External</div>
          <ul className={styles.navList}>
            <li>
              <Link href="/" target="_blank" className={styles.navLink}>
                <i className="bx bx-globe"></i>
                <span>Live Clinic Website</span>
              </Link>
            </li>
          </ul>
        </div>

        {/* Sidebar Footer with User Details and Logout */}
        <div className={styles.sidebarFooter}>
          {user ? (
            <div className={styles.userInfo}>
              <div className={styles.userDetails}>
                <p className={styles.userName}>{user.name || user.email.split("@")[0]}</p>
                <span className={styles.userBadge}>{user.role || "Admin"}</span>
              </div>
            </div>
          ) : (
            <div className={styles.userInfo}>
              <span style={{ fontSize: "0.8rem", color: "#8c96b5" }}>Authenticated Session</span>
            </div>
          )}
          <button onClick={handleLogout} className={styles.logoutBtn} aria-label="Sign Out">
            <i className="bx bx-log-out"></i>
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content View */}
      <div className={styles.mainContainer}>
        {/* Mobile Top Toggle Bar */}
        <header className={styles.mobileTopBar}>
          <div className={styles.mobileBrand}>
            <i className="bx bx-shield-quarter" style={{ color: "var(--main-color)" }}></i>
            <span>Fayed Admin</span>
          </div>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className={styles.mobileToggleBtn}
            aria-label="Toggle Navigation Sidebar"
          >
            <i className={`bx ${sidebarOpen ? "bx-x" : "bx-menu"}`}></i>
          </button>
        </header>

        {children}
      </div>
    </div>
  );
}
