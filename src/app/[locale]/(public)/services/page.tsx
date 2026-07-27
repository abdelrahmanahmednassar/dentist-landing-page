import { Metadata } from "next";
import Services from "@/components/Services";
import { generatePageMetadata } from "@/utils/seo";
import { JsonLdBreadcrumb } from "@/components/JsonLd";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isArabic = locale === "ar";

  return generatePageMetadata({
    locale,
    path: "/services",
    title: isArabic
      ? "خدماتنا - فايد دينتال كلينك | زراعة وتجميل الأسنان والفينير"
      : "Our Dental Services - Fayed Dental Clinic | Implants, Veneers & Smile Design Cairo",
    description: isArabic
      ? "تعرف على خدماتنا الطبية المتخصصة: زراعة الأسنان، تجميل الأسنان، Hybrid Veneers، و3N Veneers بأحدث تقنيات الابتسامة الرقمية بالكمبيوتر."
      : "Discover our specialized dental procedures in Cairo: painless dental implants, Hollywood smile design, Hybrid Veneers, and 3N Veneers using state-of-the-art diagnostic technology.",
    image: "/images/preview-image.png",
    keywords: isArabic
      ? ["خدمات أسنان", "زراعة أسنان", "تجميل أسنان", "فينير", "هايبرد فينير", "3N Veneers", "تبييض الأسنان"]
      : ["dental services Cairo", "cosmetic dentistry Egypt", "dental implants Cairo", "hybrid veneers Egypt", "3n veneers Cairo"],
  });
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isArabic = locale === "ar";

  return (
    <>
      <JsonLdBreadcrumb
        locale={locale}
        items={[{ name: isArabic ? "خدماتنا" : "Our Services", path: "/services" }]}
      />
      <Services />
    </>
  );
}
