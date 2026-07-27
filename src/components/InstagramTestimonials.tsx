import styles from "@/styles/testimonials.module.css";

interface InstagramTestimonialsProps {
  label?: string;
  title?: string;
  reelUrls: string[];
}

export default function InstagramTestimonials({
  label,
  title,
  reelUrls,
}: InstagramTestimonialsProps) {
  return (
    <div className={styles.videoTestimonialsContainer}>
      {(label || title) && (
        <div className={styles.videoTestimonialsHeader}>
          {label && <p className={styles.testimonialsLabel}>{label}</p>}
          {title && <h3 className={styles.videoTestimonialsTitle}>{title}</h3>}
        </div>
      )}
      <div className={styles.videoGrid}>
        {reelUrls.map((url, index) => {
          const embedUrl = url.endsWith("/")
            ? `${url}embed/`
            : `${url}/embed/`;
          return (
            <div key={index} className={styles.videoCard}>
              <iframe
                src={embedUrl}
                className={styles.videoIframe}
                allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
                title={`Client video testimonial ${index + 1}`}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
