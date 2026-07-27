import { Metadata } from "next";
import AboutClinic from "@/components/AboutClinic";
import Testimonials from "@/components/Testimonials";
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
    path: "/about-us",
    title: isArabic
      ? "من نحن - فايد دينتال كلينك | عيادة أسنان متخصصة في القاهرة"
      : "About Us - Fayed Dental Clinic | Premier Dental Center in Cairo",
    description: isArabic
      ? "تعرف على فايد دينتال كلينك، فريقنا الطبي المتخصص، خبرتنا في طب وتجميل الأسنان، وما يميزنا في تقديم أفضل رعاية صحية للأسنان في القاهرة."
      : "Learn more about Fayed Dental Clinic, our experienced medical team, state-of-the-art dental technologies, and commitment to world-class dental care in Cairo, Egypt.",
    image: "/images/preview-image.png",
    keywords: isArabic
      ? ["عن فايد دينتال", "من نحن", "فريق طبي", "عيادة أسنان القاهرة", "خبرة تجميل أسنان"]
      : ["about Fayed Dental", "dental clinic Cairo", "best dentist Cairo", "Dr. Mohamed Fayed clinic"],
  });
}

export default async function AboutUsPage({
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
        items={[{ name: isArabic ? "من نحن" : "About Us", path: "/about-us" }]}
      />
      <AboutClinic />
      <Testimonials />
    </>
  );
}
