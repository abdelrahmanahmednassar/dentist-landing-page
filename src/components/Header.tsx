import Link from "next/link";
import styles from "@/styles/header.module.css";
import LanguageToggle from "./LanguageToggle";

export default function Header() {
  return (
    <div className={styles.topHeader}>
      <div className="container">
        <div className={styles.topHeaderContent}>
          <Link
            href="https://wa.me/201002507882"
            className={styles.appointmentBtn}
            target="_blank"
          >
            MAKE AN APPOINTMENT
          </Link>
          <div className={styles.socialIcons}>
            <LanguageToggle />
            <Link
              target="_blank"
              href="https://www.instagram.com/dr_mohamedfayed_clinic?igsh=MTZ4MzBkbnY3dXBtMg%3D%3D&utm_source=qr"
              className={styles.socialIcon}
            >
              <i className="bx bxl-instagram"></i>
            </Link>
            <Link
              target="_blank"
              href="https://www.tiktok.com/@mohamedfayed33?_r=1&_t=ZS-921cT0C6hAj"
              className={styles.socialIcon}
            >
              <i className="bx bxl-tiktok"></i>
            </Link>
            <Link
              target="_blank"
              href="https://www.facebook.com/share/1Bvk7SVjLS/?mibextid=wwXIfr"
              className={styles.socialIcon}
            >
              <i className="bx bxl-facebook"></i>
            </Link>
          </div>
          <div className={styles.topHeaderRight}>
            <div className={styles.contactInfoTop}>
              <div className={styles.contactItemTop}>
                <i className="bx bx-time-five"></i>
                <span>Sat - Thu 2:00pm - 10:00pm / Friday - CLOSED</span>
              </div>
              <div className={styles.contactItemTop}>
                <i className="bx bx-phone"></i>
                <span>
                  <Link
                    className={styles.phoneLink}
                    href="tel:01034317813"
                    target="_blank"
                  >
                    01034317813
                  </Link>
                  {" / "}
                  <Link
                    className={styles.phoneLink}
                    href="tel:01551089973"
                    target="_blank"
                  >
                    01551089973
                  </Link>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
