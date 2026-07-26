import { Metadata } from "next";
import { getMessages } from "next-intl/server";
import ServiceDetail from "@/components/ServiceDetail";

export async function generateMetadata(): Promise<Metadata> {
  const t = (await getMessages()) as any;
  const service = t.servicePages.threeNVeneers;
  const pageUrl = "https://fayed.clinic/services/3n-veneers";

  return {
    title: `${service.title} | فايد دينتال كلينك - Dr. Fayed Dental Clinic`,
    description: service.lead,
    keywords: [
      "3N Veneers",
      "فينير ثري ان",
      "تجميل الأسنان",
      "ابتسامة هوليود",
      "عدسات الأسنان",
      "تجميل الأسنان القاهرة",
      "فينير بدون برد",
      "Hollywood smile",
      "dental veneers Cairo",
      "cosmetic dentistry",
    ],
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: `${service.title} | فايد دينتال كلينك`,
      description: service.lead,
      url: pageUrl,
      type: "website",
      locale: "ar_EG",
      siteName: "فايد دينتال كلينك",
      images: [
        {
          url: "/images/services/3n-veneers.jpg",
          width: 1200,
          height: 630,
          alt: service.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${service.title} | فايد دينتال كلينك`,
      description: service.lead,
      images: ["/images/services/3n-veneers.jpg"],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default function ThreeNVeneersPage() {
  return <ServiceDetail serviceKey="threeNVeneers" />;
}
