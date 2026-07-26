import { Metadata } from "next";
import { getMessages } from "next-intl/server";
import styles from "@/styles/team.module.css";
import { Link } from "@/i18n/navigation";

import Image from "next/image";

export const metadata: Metadata = {
  title: "فريقنا الطبي - فايد دينتال كلينك | أطباء أسنان متخصصون",
  description:
    "تعرف على فريقنا الطبي المتخصص في فايد دينتال كلينك. أطباء ذوو خبرة عالية في زراعة وتجميل الأسنان بأحدث التقنيات.",
  keywords: [
    "فريق طبي",
    "أطباء أسنان",
    "متخصصون أسنان",
    "دكاترة أسنان القاهرة",
    "فريق فايد دينتال",
  ],
  alternates: {
    canonical: "https://fayed.clinic/team",
  },
  openGraph: {
    title: "فريقنا الطبي - فايد دينتال كلينك",
    description:
      "تعرف على فريقنا الطبي المتخصص في فايد دينتال كلينك. أطباء ذوو خبرة عالية في زراعة وتجميل الأسنان.",
    url: "https://fayed.clinic/team",
    type: "website",
    locale: "ar_EG",
    siteName: "فايد دينتال كلينك",
    images: [
      {
        url: "/images/team-preview.jpg",
        width: 1200,
        height: 630,
        alt: "فريقنا الطبي - فايد دينتال كلينك",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "فريقنا الطبي - فايد دينتال كلينك",
    description:
      "تعرف على فريقنا الطبي المتخصص في فايد دينتال كلينك. أطباء ذوو خبرة عالية في زراعة وتجميل الأسنان.",
    images: ["/images/team-preview.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const teamMembers = [
  {
    image:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=500&h=500&fit=crop",
    memberKey: "member1",
  },
  {
    image:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=500&h=500&fit=crop",
    memberKey: "member2",
  },
  {
    image:
      "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=500&h=500&fit=crop",
    memberKey: "member3",
  },
  {
    image:
      "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=500&h=500&fit=crop",
    memberKey: "member4",
  },
];

export default async function TeamPage() {
  const messages = (await getMessages()) as any;
  const team = messages.team;

  return (
    <section className={styles.teamSection}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <span className={styles.sectionLabel}>{team.label}</span>
          <h1 className={styles.sectionTitle}>{team.title}</h1>
          <p className={styles.sectionSubtitle}>{team.subtitle}</p>
        </div>

        <div className={styles.teamGrid}>
          {teamMembers.map((member, index) => {
            const memberData = team[member.memberKey as keyof typeof team] as {
              name: string;
              position: string;
              bio: string;
              cert1: string;
              cert2: string;
              cert3: string;
              cert4: string;
            };

            return (
              <div key={index} className={styles.teamCard}>
                <div className={styles.teamImage}>
                  <Image
                    src={member.image}
                    alt={memberData.name}
                    loading="lazy"
                    width={600}
                    height={1200}
                  />
                  <div className={styles.teamOverlay}>
                    <div className={styles.teamSocial}>
                      <a href="#" aria-label="Facebook">
                        <i className="bx bxl-facebook"></i>
                      </a>
                      <a href="#" aria-label="Instagram">
                        <i className="bx bxl-instagram"></i>
                      </a>
                      <a href="#" aria-label="LinkedIn">
                        <i className="bx bxl-linkedin"></i>
                      </a>
                    </div>
                  </div>
                </div>
                <div className={styles.teamInfo}>
                  <h3 className={styles.teamName}>{memberData.name}</h3>
                  <p className={styles.teamPosition}>{memberData.position}</p>
                  <p className={styles.teamBio}>{memberData.bio}</p>
                  <div className={styles.teamCertificates}>
                    <h4>{team.certificates}</h4>
                    <ul>
                      <li>{memberData.cert1}</li>
                      <li>{memberData.cert2}</li>
                      <li>{memberData.cert3}</li>
                      <li>{memberData.cert4}</li>
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className={styles.teamCta}>
          <h2>{team.cta.title}</h2>
          <p>{team.cta.text}</p>
          <Link href="/contact-us" className={styles.ctaButton}>
            {team.cta.button}
          </Link>
        </div>
      </div>
    </section>
  );
}
