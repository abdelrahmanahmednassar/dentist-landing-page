import { Metadata } from "next";
import Services from "@/components/Services";

export const metadata: Metadata = {
  title: "خدماتنا - فايد دينتال كلينك | زراعة وتجميل الأسنان",
  description:
    "تعرف على خدماتنا المتخصصة: زراعة الأسنان، تجميل الأسنان، Hybrid Veneers، 3N Veneers. أحدث التقنيات بأعلى معايير الجودة.",
  keywords: [
    "خدمات أسنان",
    "زراعة أسنان",
    "تجميل أسنان",
    "فينير",
    "هايبرد فينير",
    "3N Veneers",
    "dental services Cairo",
    "cosmetic dentistry",
    "تبييض الأسنان",
  ],
  alternates: {
    canonical: "https://fayed.clinic/services",
  },
  openGraph: {
    title: "خدماتنا - فايد دينتال كلينك",
    description:
      "تعرف على خدماتنا المتخصصة: زراعة وتجميل الأسنان، Hybrid Veneers، 3N Veneers.",
    url: "https://fayed.clinic/services",
    type: "website",
    locale: "ar_EG",
    siteName: "فايد دينتال كلينك",
    images: [
      {
        url: "/images/services-preview.jpg",
        width: 1200,
        height: 630,
        alt: "خدمات فايد دينتال كلينك",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "خدماتنا - فايد دينتال كلينك",
    description:
      "تعرف على خدماتنا المتخصصة: زراعة وتجميل الأسنان، Hybrid Veneers، 3N Veneers.",
    images: ["/images/services-preview.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ServicesPage() {
  return (
    <>
      <Services />
    </>
  );
}
