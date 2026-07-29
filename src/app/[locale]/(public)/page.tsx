import type { Metadata } from "next";
import Script from "next/script";
import Hero from "@/components/Hero";
import CasesSection from "@/components/CasesSection";
import AboutClinic from "@/components/AboutClinic";
import Testimonials from "@/components/Testimonials";
import Services from "@/components/Services";
import FeaturedBlogs from "@/components/FeaturedBlogs";
import { generatePageMetadata } from "@/utils/seo";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://fayed.clinic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isArabic = locale === "ar";

  return generatePageMetadata({
    locale,
    path: "/",
    title: isArabic
      ? "عيادة د محمد فايد | أفضل عيادة زراعة أسنان في مصر"
      : "Dr. Mohamed Fayed Clinic | Best Dental Implants Clinic in Egypt",
    description: isArabic
      ? "إذا كنت تبحث عن افضل عيادة اسنان أو افضل عيادة اسنان في مصر، فايد دينتال كلينك يقدم خدمات زراعة وتجميل الأسنان وعلاج الجذور بأحدث التقنيات في القاهرة."
      : "Looking for the best dental clinic in Egypt? Fayed Dental Clinic provides advanced dental implants, veneers, cosmetic dentistry, and root canal treatments in Cairo.",
    image: "/images/preview-image.png",
  });
}

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isArabic = locale === "ar";

  return (
    <>
      <Script
        id="structured-data-home-webpage"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: isArabic
              ? "افضل عيادة اسنان في مصر | فايد دينتال كلينك"
              : "Best Dental Clinic in Egypt | Fayed Dental Clinic",
            url: `${SITE_URL}/${locale}`,
            inLanguage: isArabic ? "ar-EG" : "en-US",
            isPartOf: {
              "@type": "WebSite",
              name: isArabic ? "فايد دينتال كلينك" : "Fayed Dental Clinic",
              url: `${SITE_URL}/${locale}`,
            },
            about: {
              "@type": "Dentist",
              name: isArabic ? "فايد دينتال كلينك" : "Fayed Dental Clinic",
              areaServed: "Egypt",
            },
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
            mainEntity: isArabic
              ? [
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
                ]
              : [
                  {
                    "@type": "Question",
                    name: "What is the best dental clinic in Egypt?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Fayed Dental Clinic led by Dr. Mohamed Fayed is one of the premier dental clinics in Egypt, offering advanced dental implants, smile designs, veneers, and pain-free treatments.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "How do I choose the right dental clinic in Cairo?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "When selecting a dental clinic, consider the specialists' experience, before-and-after clinical results, sterilization standards, advanced technology, and patient reviews. Fayed Dental Clinic excels in all these criteria.",
                    },
                  },
                ],
          }),
        }}
      />

      <Hero />
      <CasesSection />
      <AboutClinic />
      <Testimonials />
      <Services />
      <FeaturedBlogs />
    </>
  );
}
