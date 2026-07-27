import { Metadata } from "next";
import CasesFull from "@/components/CasesFull";
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
    path: "/cases",
    title: isArabic
      ? "حالاتنا - فايد دينتال كلينك | نتائج زراعة وتجميل الأسنان"
      : "Our Cases & Results - Fayed Dental Clinic | Implants & Veneers Transformation",
    description: isArabic
      ? "شاهد نتائج حالات زراعة وتجميل الأسنان في فايد دينتال كلينك. قبل وبعد: زراعة الأسنان، الفينير، تركيبات الزيركون، التبييض بالليزر، وحشو العصب."
      : "View before-and-after smile transformations at Fayed Dental Clinic in Cairo. Real clinical cases of dental implants, Hollywood smiles, hybrid veneers, and full mouth rehabilitation.",
    image: "/images/preview-image.png",
    keywords: isArabic
      ? ["حالات أسنان", "قبل وبعد", "نتائج زراعة أسنان", "نتائج تجميل أسنان", "فينير قبل وبعد"]
      : ["before and after dental cases", "dental transformation Cairo", "smile makeover results Egypt", "dental veneers before after Cairo"],
  });
}

export default async function CasesPage({
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
        items={[{ name: isArabic ? "حالاتنا" : "Our Cases", path: "/cases" }]}
      />
      <CasesFull />
    </>
  );
}
