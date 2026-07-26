import { Metadata } from "next";
import CasesFull from "@/components/CasesFull";

export const metadata: Metadata = {
  title: "حالاتنا - فايد دينتال كلينك | نتائج زراعة وتجميل الأسنان",
  description:
    "شاهد نتائج حالات زراعة وتجميل الأسنان في فايد دينتال كلينك. قبل وبعد: زراعة الأسنان، الفينير، تركيبات الزيركون، التبييض بالليزر، وحشو العصب.",
  keywords: [
    "حالات أسنان",
    "قبل وبعد",
    "نتائج زراعة أسنان",
    "نتائج تجميل أسنان",
    "فينير قبل وبعد",
    "before and after dental cases",
    "dental transformation",
    "smile makeover results",
  ],
  alternates: {
    canonical: "https://fayed.clinic/cases",
  },
  openGraph: {
    title: "حالاتنا - فايد دينتال كلينك",
    description:
      "شاهد نتائج حالات زراعة وتجميل الأسنان في فايد دينتال كلينك. قبل وبعد العلاج.",
    url: "https://fayed.clinic/cases",
    type: "website",
    locale: "ar_EG",
    siteName: "فايد دينتال كلينك",
    images: [
      {
        url: "/images/cases-preview.jpg",
        width: 1200,
        height: 630,
        alt: "حالات زراعة وتجميل الأسنان",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "حالاتنا - فايد دينتال كلينك",
    description: "شاهد نتائج حالات زراعة وتجميل الأسنان. قبل وبعد العلاج.",
    images: ["/images/cases-preview.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function CasesPage() {
  return <CasesFull />;
}
