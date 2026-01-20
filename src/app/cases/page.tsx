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
  ],
};

export default function CasesPage() {
  return <CasesFull />;
}
