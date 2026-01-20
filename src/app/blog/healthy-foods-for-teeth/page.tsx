import BlogDetail from "@/components/BlogDetail";
import { getMessages } from "next-intl/server";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const messages = (await getMessages()) as any;
  const blog = messages.blogPages.healthyFoodsForTeeth;
  const pageUrl = "https://fayed.clinic/blog/healthy-foods-for-teeth";

  return {
    title: `${blog.title} - فايد دينتال كلينك`,
    description: blog.lead,
    keywords: [
      "أطعمة مفيدة للأسنان",
      "غذاء صحي للأسنان",
      "healthy foods for teeth",
      "dental nutrition",
      "صحة الأسنان",
      "أكلات صحية للأسنان",
      "tooth-friendly foods",
      "تغذية الأسنان",
    ],
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: `${blog.title} - فايد دينتال كلينك`,
      description: blog.lead,
      url: pageUrl,
      type: "article",
      locale: "ar_EG",
      siteName: "فايد دينتال كلينك",
      publishedTime: "2024-02-10T00:00:00.000Z",
      authors: ["Dr. Mohamed Fayed"],
      images: [
        {
          url: "/images/blog/healthy-foods-for-teeth.jpg",
          width: 1200,
          height: 630,
          alt: blog.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${blog.title} - فايد دينتال كلينك`,
      description: blog.lead,
      images: ["/images/blog/healthy-foods-for-teeth.jpg"],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default function HealthyFoodsForTeethPage() {
  return <BlogDetail blogKey="healthyFoodsForTeeth" />;
}
