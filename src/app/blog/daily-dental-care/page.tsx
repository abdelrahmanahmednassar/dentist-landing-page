import BlogDetail from "@/components/BlogDetail";
import { getMessages } from "next-intl/server";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const messages = (await getMessages()) as any;
  const blog = messages.blogPages.dailyDentalCare;
  const pageUrl = "https://fayed.clinic/blog/daily-dental-care";

  return {
    title: `${blog.title} - فايد دينتال كلينك`,
    description: blog.lead,
    keywords: [
      "العناية اليومية بالأسنان",
      "تنظيف الأسنان",
      "صحة الفم",
      "daily dental care",
      "oral hygiene",
      "teeth brushing",
      "فرشاة الأسنان",
      "خيط الأسنان",
      "غسول الفم",
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
      publishedTime: "2024-01-20T00:00:00.000Z",
      authors: ["Dr. Mohamed Fayed"],
      images: [
        {
          url: "/images/blog/daily-dental-care.jpg",
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
      images: ["/images/blog/daily-dental-care.jpg"],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default function DailyDentalCarePage() {
  return <BlogDetail blogKey="dailyDentalCare" />;
}
