import { Metadata } from "next";
import { getMessages } from "next-intl/server";
import ServiceDetail from "@/components/ServiceDetail";
import { generatePageMetadata } from "@/utils/seo";
import { JsonLdBreadcrumb, JsonLdMedicalProcedure } from "@/components/JsonLd";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://fayed.clinic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isArabic = locale === "ar";
  const t = (await getMessages()) as any;
  const service = t.servicePages.hybridVeneers;

  return generatePageMetadata({
    locale,
    path: "/services/hybrid-veneers",
    title: `${service.title} | ${isArabic ? "فايد دينتال كلينك - دكتور محمد فايد" : "Fayed Dental Clinic - Dr. Mohamed Fayed"}`,
    description: service.lead,
    image: "/images/preview-image.png",
    keywords: isArabic
      ? ["Hybrid Veneers", "هايبرد فينير", "تجميل الأسنان", "فينير متحرك", "عدسات الأسنان اللاصقة", "ابتسامة هوليود"]
      : ["hybrid veneers Cairo", "dental veneers Egypt", "cosmetic dentistry Cairo", "smile makeover Egypt", "custom veneers Cairo"],
  });
}

export default async function HybridVeneersPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isArabic = locale === "ar";
  const t = (await getMessages()) as any;
  const service = t.servicePages.hybridVeneers;
  const procedureUrl = `${SITE_URL}/${locale}/services/hybrid-veneers`;

  return (
    <>
      <JsonLdBreadcrumb
        locale={locale}
        items={[
          { name: isArabic ? "خدماتنا" : "Our Services", path: "/services" },
          { name: service.title, path: "/services/hybrid-veneers" },
        ]}
      />
      <JsonLdMedicalProcedure
        locale={locale}
        name={service.title}
        description={service.lead}
        url={procedureUrl}
        image="/images/services/hybrid-veneers.jpg"
        procedureType="Cosmetic Dentistry & Hybrid Veneers"
      />
      <ServiceDetail serviceKey="hybridVeneers" />
    </>
  );
}
