import BlogDetail from "@/components/BlogDetail";
import { getMessages } from "next-intl/server";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const messages = (await getMessages()) as any;
  const blog = messages.blogPages.childrenDentalCare;
  const pageUrl = "https://fayed.clinic/blog/children-dental-care";

  return {
    title: `${blog.title} - فايد دينتال كلينك`,
    description: blog.lead,
    keywords: [
      "طب أسنان الأطفال",
      "رعاية أسنان الأطفال",
      "صحة أسنان الأطفال",
      "children dental care",
      "kids dentistry",
      "pediatric dentistry",
      "عيادة أسنان أطفال",
      "تسوس الأسنان عند الأطفال",
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
      publishedTime: "2024-01-15T00:00:00.000Z",
      authors: ["Dr. Mohamed Fayed"],
      images: [
        {
          url: "/images/blog/children-dental-care.jpg",
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
      images: ["/images/blog/children-dental-care.jpg"],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default function ChildrenDentalCarePage() {
  return <BlogDetail blogKey="childrenDentalCare" />;
}
