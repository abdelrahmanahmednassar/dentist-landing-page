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
    "about Fayed Dental",
    "dental clinic Cairo",
  ],
  alternates: {
    canonical: "https://fayed.clinic/about-us",
  },
  openGraph: {
    title: "من نحن - فايد دينتال كلينك",
    description:
      "تعرف على فايد دينتال كلينك، فريقنا الطبي المتخصص، وخبرتنا في طب وتجميل الأسنان.",
    url: "https://fayed.clinic/about-us",
    type: "website",
    locale: "ar_EG",
    siteName: "فايد دينتال كلينك",
    images: [
      {
        url: "/images/about-us-preview.jpg",
        width: 1200,
        height: 630,
        alt: "فايد دينتال كلينك - من نحن",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "من نحن - فايد دينتال كلينك",
    description:
      "تعرف على فايد دينتال كلينك، فريقنا الطبي المتخصص، وخبرتنا في طب وتجميل الأسنان.",
    images: ["/images/about-us-preview.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function AboutUsPage() {
  return (
    <>
      <AboutClinic />
      <Testimonials />
    </>
  );
}
