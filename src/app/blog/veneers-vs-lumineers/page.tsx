import BlogDetail from "@/components/BlogDetail";
import { getMessages } from "next-intl/server";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const messages = (await getMessages()) as any;
  const blog = messages.blogPages.veneersVsLumineers;
  const pageUrl = "https://fayed.clinic/blog/veneers-vs-lumineers";

  return {
    title: `${blog.title} - فايد دينتال كلينك`,
    description: blog.lead,
    keywords: [
      "فينير",
      "لومينير",
      "veneers vs lumineers",
      "الفرق بين الفينير واللومينير",
      "عدسات الأسنان",
      "dental veneers",
      "lumineers",
      "تجميل الأسنان",
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
      siteName: "فايد دينتال كلينك`",
      publishedTime: "2024-02-20T00:00:00.000Z",
      authors: ["Dr. Mohamed Fayed"],
      images: [
        {
          url: "/images/blog/veneers-vs-lumineers.jpg",
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
      images: ["/images/blog/veneers-vs-lumineers.jpg"],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default function VeneersVsLumineersPage() {
  return <BlogDetail blogKey="veneersVsLumineers" />;
}
