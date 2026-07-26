import React from "react";
import Header from "@/components/Header";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { Link } from "@/i18n/navigation";
import { getMessages } from "next-intl/server";
import styles from "@/styles/footer.module.css";

const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP || "+201002507882";

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  const messages = (await getMessages()) as any;
  const whatsappCta =
    messages?.whatsappCta || messages?.nav?.contact || "Contact Us";

  return (
    <>
      <Header />
      <Nav />
      {children}
      <Footer />

      {/* WhatsApp Floating Button */}
      <Link
        href={`https://wa.me/${WHATSAPP.replace(/\+/g, "")}`}
        className={styles.whatsappFloat}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${whatsappCta} on WhatsApp`}
      >
        <i className="bx bxl-whatsapp"></i>
      </Link>

      {/* Scroll to Top Button */}
      <ScrollToTop />
    </>
  );
}
