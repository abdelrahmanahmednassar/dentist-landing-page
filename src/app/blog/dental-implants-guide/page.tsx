import BlogDetail from "@/components/BlogDetail";
import { getMessages } from "next-intl/server";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const messages = (await getMessages()) as any;
  const blog = messages.blogPages.dentalImplantsGuide;
  const pageUrl = "https://fayed.clinic/blog/dental-implants-guide";

  return {
    title: `${blog.title} - فايد دينتال كلينك`,
    description: blog.lead,
    keywords: [
      "زراعة الأسنان",
      "دليل زراعة الأسنان",
      "dental implants guide",
      "teeth implants",
      "زرعات الأسنان",
      "تعويض الأسنان",
      "implant surgery",
      "زراعة اسنان فورية",
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
      publishedTime: "2024-02-01T00:00:00.000Z",
      authors: ["Dr. Mohamed Fayed"],
      images: [
        {
          url: "/images/blog/dental-implants-guide.jpg",
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
      images: ["/images/blog/dental-implants-guide.jpg"],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default function DentalImplantsGuidePage() {
  return <BlogDetail blogKey="dentalImplantsGuide" />;
}
