import { Metadata } from "next";
import { getMessages } from "next-intl/server";
import ServiceDetail from "@/components/ServiceDetail";

export async function generateMetadata(): Promise<Metadata> {
  const t = (await getMessages()) as any;
  const service = t.servicePages.hybridVeneers;
  const pageUrl = "https://fayed.clinic/services/hybrid-veneers";

  return {
    title: `${service.title} | فايد دينتال كلينك - Dr. Fayed Dental Clinic`,
    description: service.lead,
    keywords: [
      "Hybrid Veneers",
      "هايبرد فينير",
      "تجميل الأسنان",
      "فينير متحرك",
      "عدسات الأسنان اللاصقة",
      "ابتسامة هوليود",
      "تجميل الأسنان القاهرة",
      "dental veneers",
      "cosmetic dentistry Cairo",
      "smile makeover",
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
          url: "/images/services/hybrid-veneers.jpg",
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
      images: ["/images/services/hybrid-veneers.jpg"],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default function HybridVeneersPage() {
  return <ServiceDetail serviceKey="hybridVeneers" />;
}
