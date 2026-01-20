import Link from "next/link";
import styles from "@/styles/footer.module.css";
import { getTranslations } from "next-intl/server";

export default async function Footer() {
  const t = await getTranslations();
  return (
    <footer className={styles.footer} id="contact">
      <div className={styles.footerContainer}>
        <div className={styles.footerContent}>
          {/* Right Column: Our Services */}
          <div className={`${styles.footerColumn} ${styles.footerServices}`}>
            <h4 className={styles.footerTitle}>{t("footer.services.title")}</h4>
            <p className={styles.footerIntro}>{t("footer.services.intro")}</p>
            <ul className={styles.footerServicesList}>
              <li>
                <span>{t("footer.service1")}</span>
              </li>
              <li>
                <span>{t("footer.service2")}</span>
              </li>
              <li>
                <span>{t("footer.service3")}</span>
              </li>
              <li>
                <span>{t("footer.service4")}</span>
              </li>
              <li>
                <span>{t("footer.service5")}</span>
              </li>
              <li>
                <span>{t("footer.service6")}</span>
              </li>
            </ul>
          </div>

          {/* Left Column: Contact Us */}
          <div className={`${styles.footerColumn} ${styles.footerContact}`}>
            <h4 className={styles.footerTitle}>{t("footer.contact.title")}</h4>
            <div className={styles.contactInfo}>
              <div className={styles.contactItem}>
                <strong>{t("footer.address.label")}</strong>
                <div>
                  <strong>{t("footer.address.branch1")}</strong>
                  <p>{t("footer.address.branch1Text")}</p>
                </div>
                <div>
                  <strong>{t("footer.address.branch2")}</strong>
                  <p>{t("footer.address.branch2Text")}</p>
                </div>
              </div>
              <div className={styles.contactItem}>
                <strong>{t("footer.phone.label")}</strong>
                <p>
                  <Link href="tel:01034317813" target="_blank">
                    01034317813
                  </Link>
                  {" / "}
                  <Link href="tel:01034313422" target="_blank">
                    01034313422
                  </Link>
                </p>
                <p>
                  <Link href="tel:01551089973" target="_blank">
                    01551089973
                  </Link>
                  {" / "}
                  <Link href="tel:01060614740" target="_blank">
                    01060614740
                  </Link>
                </p>
              </div>
              <div className={styles.contactItem}>
                <strong>{t("footer.hours.label")}</strong>
                <p>{t("footer.hours.text")}</p>
              </div>
            </div>
            <div className={styles.socialMedia}>
              <Link
                href="https://www.instagram.com/dr_mohamedfayed_clinic?igsh=MTZ4MzBkbnY3dXBtMg%3D%3D&utm_source=qr"
                className={styles.socialIcon}
                aria-label="Instagram"
                target="_blank"
              >
                <i className="bx bxl-instagram"></i>
              </Link>
              <Link
                href="https://www.tiktok.com/@mohamedfayed33?_r=1&_t=ZS-921cT0C6hAj"
                className={styles.socialIcon}
                aria-label="TikTok"
                target="_blank"
              >
                <i className="bx bxl-tiktok"></i>
              </Link>
              <Link
                href="https://www.facebook.com/share/1Bvk7SVjLS/?mibextid=wwXIfr"
                className={styles.socialIcon}
                aria-label="Facebook"
                target="_blank"
              >
                <i className="bx bxl-facebook"></i>
              </Link>
            </div>
          </div>
        </div>
        <div className={styles.footerBottom}>
          <p>{t("footer.copyright")}</p>
        </div>
      </div>
    </footer>
  );
}
