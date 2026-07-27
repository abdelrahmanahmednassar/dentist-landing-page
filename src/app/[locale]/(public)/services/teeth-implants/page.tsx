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
  const service = t.servicePages.teethImplants;

  return generatePageMetadata({
    locale,
    path: "/services/teeth-implants",
    title: `${service.title} | ${isArabic ? "فايد دينتال كلينك - دكتور محمد فايد" : "Fayed Dental Clinic - Dr. Mohamed Fayed"}`,
    description: service.lead,
    image: "/images/preview-image.png",
    keywords: isArabic
      ? ["زراعة الأسنان", "زراعة اسنان القاهرة", "تعويض الأسنان المفقودة", "زرعات الأسنان", "زراعة اسنان فورية", "أفضل طبيب زراعة أسنان بمصر"]
      : ["dental implants Cairo", "teeth implants Egypt", "implant dentistry Cairo", "tooth replacement Egypt", "immediate dental implants Cairo", "best implant dentist Egypt"],
  });
}

export default async function TeethImplantsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isArabic = locale === "ar";
  const t = (await getMessages()) as any;
  const service = t.servicePages.teethImplants;
  const procedureUrl = `${SITE_URL}/${locale}/services/teeth-implants`;

  return (
    <>
      <JsonLdBreadcrumb
        locale={locale}
        items={[
          { name: isArabic ? "خدماتنا" : "Our Services", path: "/services" },
          { name: service.title, path: "/services/teeth-implants" },
        ]}
      />
      <JsonLdMedicalProcedure
        locale={locale}
        name={service.title}
        description={service.lead}
        url={procedureUrl}
        image="/images/services/teeth-implants.jpg"
        procedureType="Dental Implantology"
      />
      <ServiceDetail serviceKey="teethImplants" />
    </>
  );
}
