"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import styles from "@/styles/nav.module.css";

export default function Nav() {
  const t = useTranslations();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(false);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    }

    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    if (isMobileMenuOpen) {
      setActiveDropdown(false);
    }
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(false);
  };

  const toggleDropdown = (e: React.MouseEvent) => {
    if (window.innerWidth <= 768) {
      // On mobile, don't toggle dropdown - let the link navigate
      return;
    }
  };

  // Check if link is active
  const isActiveLink = (href: string) => {
    if (href === "/" && pathname === "/") return true;
    if (href !== "/" && pathname.startsWith(href)) return true;
    return false;
  };

  // Check if services dropdown should be highlighted (for service detail pages)
  const isServicesActive = pathname.startsWith("/services");

  // Check if blogs should be highlighted (for blog detail pages)
  const isBlogsActive = pathname.startsWith("/blogs");

  return (
    <nav className={styles.mainNav}>
      <div className="container">
        <div className={styles.navContent}>
          <button
            className={styles.mobileMenuToggle}
            aria-label="Toggle menu"
            onClick={toggleMobileMenu}
          >
            <i className={`bx ${isMobileMenuOpen ? "bx-x" : "bx-menu"}`}></i>
          </button>
          <Link href="/" className={styles.logo} onClick={closeMobileMenu}>
            <Image
              src="/images/logo.png"
              alt="فايد دينتال كلينك - Fayed Dental Clinic Logo"
              width={150}
              height={50}
              priority
            />
          </Link>
          <ul
            className={`${styles.navMenu} ${isMobileMenuOpen ? styles.active : ""}`}
          >
            <li>
              <Link
                href="/"
                className={`${styles.navLink} ${isActiveLink("/") ? styles.active : ""}`}
                onClick={closeMobileMenu}
              >
                {t("nav.home")}
              </Link>
            </li>
            <li>
              <Link
                href="/about-us"
                className={`${styles.navLink} ${isActiveLink("/about-us") ? styles.active : ""}`}
                onClick={closeMobileMenu}
              >
                {t("nav.about")}
              </Link>
            </li>
            <li
              className={`${styles.navItemDropdown} ${styles.hasDropdown} ${activeDropdown ? styles.active : ""}`}
            >
              <Link
                href="/services"
                className={`${styles.navLink} ${styles.servicesLink} ${isServicesActive ? styles.active : ""}`}
                onClick={(e) => {
                  if (window.innerWidth <= 768) {
                    closeMobileMenu();
                  } else {
                    toggleDropdown(e);
                  }
                }}
              >
                {t("nav.services")}
                <i className="bx bx-chevron-down"></i>
              </Link>
              <ul className={styles.servicesDropdown}>
                <li>
                  <Link
                    href="/services/teeth-implants"
                    className={styles.dropdownLink}
                    onClick={closeMobileMenu}
                  >
                    <i className="bx bx-plus-medical"></i>
                    <span>{t("services.s1.title")}</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services/teeth-beautification"
                    className={styles.dropdownLink}
                    onClick={closeMobileMenu}
                  >
                    <i className="bx bx-smile"></i>
                    <span>{t("services.s2.title")}</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services/hybrid-veneers"
                    className={styles.dropdownLink}
                    onClick={closeMobileMenu}
                  >
                    <i className="bx bx-diamond"></i>
                    <span>Hybrid veneers</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services/3n-veneers"
                    className={styles.dropdownLink}
                    onClick={closeMobileMenu}
                  >
                    <i className="bx bx-star"></i>
                    <span>3N Veneers</span>
                  </Link>
                </li>
              </ul>
            </li>
            <li>
              <Link
                href="/cases"
                className={`${styles.navLink} ${isActiveLink("/cases") ? styles.active : ""}`}
                onClick={closeMobileMenu}
              >
                {t("nav.cases")}
              </Link>
            </li>
            <li>
              <Link
                href="/team"
                className={`${styles.navLink} ${isActiveLink("/team") ? styles.active : ""}`}
                onClick={closeMobileMenu}
              >
                {t("nav.team")}
              </Link>
            </li>
            <li>
              <Link
                href="/blogs"
                className={`${styles.navLink} ${isBlogsActive ? styles.active : ""}`}
                onClick={closeMobileMenu}
              >
                {t("nav.blogs")}
              </Link>
            </li>
            <li>
              <Link
                href="/contact-us"
                className={`${styles.navLink} ${isActiveLink("/contact-us") ? styles.active : ""}`}
                onClick={closeMobileMenu}
              >
                {t("nav.contact")}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
