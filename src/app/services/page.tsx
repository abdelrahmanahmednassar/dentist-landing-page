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
  ],
};

export default function ServicesPage() {
  return (
    <>
      <Services />
    </>
  );
}
