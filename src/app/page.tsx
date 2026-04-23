import type { Metadata } from "next";
import Script from "next/script";
import Hero from "@/components/Hero";
import CasesFull from "@/components/CasesFull";
import AboutClinic from "@/components/AboutClinic";
import Testimonials from "@/components/Testimonials";
import Services from "@/components/Services";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://fayed.clinic";

export const metadata: Metadata = {
  title: "افضل عيادة اسنان في مصر | فايد دينتال كلينك",
  description:
    "إذا كنت تبحث عن افضل عيادة اسنان أو افضل عيادة اسنان في مصر، فايد دينتال كلينك يقدم خدمات زراعة وتجميل الأسنان وعلاج الجذور بأحدث التقنيات في القاهرة.",
  keywords: [
    "افضل عيادة اسنان",
    "افضل عيادة اسنان في مصر",
    "أفضل عيادة اسنان في مصر",
    "عيادة اسنان في مصر",
    "عيادة أسنان القاهرة",
    "دكتور أسنان في القاهرة",
    "زراعة الأسنان في مصر",
    "تجميل الأسنان في مصر",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "افضل عيادة اسنان في مصر | فايد دينتال كلينك",
    description:
      "فايد دينتال كلينك من أفضل عيادات الأسنان في مصر بخبرة متقدمة في زراعة الأسنان وتجميل الأسنان.",
    url: "/",
    type: "website",
    locale: "ar_EG",
    images: [
      {
        url: "/images/preview-image.png",
        width: 1200,
        height: 630,
        alt: "فايد دينتال كلينك - افضل عيادة اسنان في مصر",
      },
    ],
  },
};

export default function Home() {
  return (
    <>
      <Script
        id="structured-data-home-webpage"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "افضل عيادة اسنان في مصر | فايد دينتال كلينك",
            url: SITE_URL,
            inLanguage: "ar-EG",
            isPartOf: {
              "@type": "WebSite",
              name: "فايد دينتال كلينك",
              url: SITE_URL,
            },
            about: {
              "@type": "Dentist",
              name: "فايد دينتال كلينك",
              areaServed: "Egypt",
            },
            keywords: [
              "افضل عيادة اسنان",
              "افضل عيادة اسنان في مصر",
              "عيادة أسنان في مصر",
            ],
          }),
        }}
      />

      <Script
        id="structured-data-home-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "ما هي افضل عيادة اسنان في مصر؟",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "فايد دينتال كلينك من أفضل عيادات الأسنان في مصر، ويقدم خدمات زراعة الأسنان وتجميل الأسنان وعلاج الجذور بأحدث التقنيات الطبية.",
                },
              },
              {
                "@type": "Question",
                name: "كيف أختار افضل عيادة اسنان؟",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "عند اختيار عيادة الأسنان، راجع خبرة الأطباء، نتائج الحالات السابقة، مستوى التعقيم، التقنيات الحديثة، وآراء المرضى. فايد دينتال كلينك يوفر هذه المعايير مع متابعة علاجية مستمرة.",
                },
              },
            ],
          }),
        }}
      />

      <Hero />
      <CasesFull />
      <AboutClinic />
      <Testimonials />
      <Services />
    </>
  );
}
