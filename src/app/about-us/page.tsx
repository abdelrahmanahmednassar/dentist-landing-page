import { Metadata } from "next";
import AboutClinic from "@/components/AboutClinic";
import Testimonials from "@/components/Testimonials";

export const metadata: Metadata = {
  title: "من نحن - فايد دينتال كلينك | عيادة أسنان متخصصة في القاهرة",
  description:
    "تعرف على فايد دينتال كلينك، فريقنا الطبي المتخصص، خبرتنا في طب وتجميل الأسنان، وما يميزنا في تقديم أفضل رعاية صحية للأسنان في القاهرة.",
  keywords: [
    "عن فايد دينتال",
    "من نحن",
    "فريق طبي",
    "عيادة أسنان القاهرة",
    "خبرة تجميل أسنان",
  ],
};

export default function AboutUsPage() {
  return (
    <>
      <AboutClinic />
      <Testimonials />
    </>
  );
}
