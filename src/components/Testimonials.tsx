import Image from "next/image";
import { getTranslations } from "next-intl/server";
import styles from "@/styles/testimonials.module.css";
import TestimonialsSlider from "@/components/TestimonialsSlider";
import InstagramTestimonials from "@/components/InstagramTestimonials";

interface Testimonial {
  text1: string;
  text2: string;
  author: string;
}

export default async function Testimonials() {
  const t = await getTranslations();

  const testimonials: Testimonial[] = [
    {
      text1: t("testimonials.t1.text1"),
      text2: t("testimonials.t1.text2"),
      author: t("testimonials.t1.author"),
    },
    {
      text1: t("testimonials.t2.text1"),
      text2: t("testimonials.t2.text2"),
      author: t("testimonials.t2.author"),
    },
    {
      text1: t("testimonials.t3.text1"),
      text2: t("testimonials.t3.text2"),
      author: t("testimonials.t3.author"),
    },
  ];

  const reelUrls = [
    "https://www.instagram.com/reel/DXYO9zXDL03/",
    "https://www.instagram.com/reel/DWSR-OHDKwB/",
    "https://www.instagram.com/reel/DTB0RBJlpQ0/",
  ];

  return (
    <section className={styles.testimonialsSection}>
      <div className={styles.testimonialsWrapper}>
        {/* Left: Testimonial Image */}
        <div className={styles.testimonialImageWrapper}>
          <Image
            src="/images/testimonial-image.jpeg"
            alt="آراء العملاء - تجربة مرضى فايد دينتال كلينك"
            width={600}
            height={700}
          />
        </div>

        {/* Right: Testimonials Content */}
        <div className={styles.testimonialsContent}>
          <div className={styles.testimonialsHeader}>
            <h2 className={styles.testimonialsTitle}>
              {t("testimonials.title")}
            </h2>
          </div>

          <div className={styles.testimonialsContentText}>
            <TestimonialsSlider testimonials={testimonials} />
          </div>
        </div>
      </div>

      {/* Sub-section: Customer Video Testimonials */}
      <InstagramTestimonials
        label={t("testimonials.videoLabel")}
        title={t("testimonials.videoTitle")}
        reelUrls={reelUrls}
      />
    </section>
  );
}
