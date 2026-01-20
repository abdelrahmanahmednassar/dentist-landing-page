import BlogDetail from "@/components/BlogDetail";
import { getMessages } from "next-intl/server";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const messages = (await getMessages()) as any;
  const blog = messages.blogPages.laserTeethWhitening;
  const pageUrl = "https://fayed.clinic/blog/laser-teeth-whitening";

  return {
    title: `${blog.title} - فايد دينتال كلينك`,
    description: blog.lead,
    keywords: [
      "تبييض الأسنان بالليزر",
      "تبييض الأسنان",
      "laser teeth whitening",
      "teeth whitening",
      "اسنان بيضاء",
      "تبييض اسنان احترافي",
      "teeth bleaching",
      "تبييض زوم",
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
      publishedTime: "2024-02-15T00:00:00.000Z",
      authors: ["Dr. Mohamed Fayed"],
      images: [
        {
          url: "/images/blog/laser-teeth-whitening.jpg",
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
      images: ["/images/blog/laser-teeth-whitening.jpg"],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default function LaserTeethWhiteningPage() {
  return <BlogDetail blogKey="laserTeethWhitening" />;
}
