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
  const service = t.servicePages.teethBeautification;

  return generatePageMetadata({
    locale,
    path: "/services/teeth-beautification",
    title: `${service.title} | ${isArabic ? "فايد دينتال كلينك - دكتور محمد فايد" : "Fayed Dental Clinic - Dr. Mohamed Fayed"}`,
    description: service.lead,
    image: "/images/preview-image.png",
    keywords: isArabic
      ? ["تجميل الأسنان", "ابتسامة هوليود", "تصميم الابتسامة", "فينير الأسنان", "تبييض الأسنان", "تجميل الأسنان القاهرة"]
      : ["cosmetic dentistry Cairo", "Hollywood smile Egypt", "smile design Cairo", "dental aesthetics Egypt", "teeth whitening Cairo"],
  });
}

export default async function TeethBeautificationPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isArabic = locale === "ar";
  const t = (await getMessages()) as any;
  const service = t.servicePages.teethBeautification;
  const procedureUrl = `${SITE_URL}/${locale}/services/teeth-beautification`;

  return (
    <>
      <JsonLdBreadcrumb
        locale={locale}
        items={[
          { name: isArabic ? "خدماتنا" : "Our Services", path: "/services" },
          { name: service.title, path: "/services/teeth-beautification" },
        ]}
      />
      <JsonLdMedicalProcedure
        locale={locale}
        name={service.title}
        description={service.lead}
        url={procedureUrl}
        image="/images/services/teeth-beautification.jpg"
        procedureType="Cosmetic Dentistry & Smile Design"
      />
      <ServiceDetail serviceKey="teethBeautification" />
    </>
  );
}
