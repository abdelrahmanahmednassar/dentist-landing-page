import { Metadata } from "next";
import { getMessages } from "next-intl/server";
import ServiceDetail from "@/components/ServiceDetail";

export async function generateMetadata(): Promise<Metadata> {
  const t = (await getMessages()) as any;
  const service = t.servicePages.teethImplants;
  const pageUrl = "https://fayed.clinic/services/teeth-implants";

  return {
    title: `${service.title} | فايد دينتال كلينك - Dr. Fayed Dental Clinic`,
    description: service.lead,
    keywords: [
      "زراعة الأسنان",
      "زراعة اسنان القاهرة",
      "تعويض الأسنان المفقودة",
      "dental implants",
      "teeth implants Cairo",
      "dental implants Egypt",
      "implant dentistry",
      "tooth replacement",
      "زرعات الأسنان",
      "زراعة اسنان فورية",
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
          url: "/images/services/teeth-implants.jpg",
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
      images: ["/images/services/teeth-implants.jpg"],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default function TeethImplantsPage() {
  return <ServiceDetail serviceKey="teethImplants" />;
}
