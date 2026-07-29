import type { Metadata } from "next";

const DEFAULT_SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://fayed.clinic";

export interface PageMetadataProps {
  locale: string;
  path: string; // e.g. "/services", "/blogs/xyz" or "/" for home
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  noIndex?: boolean;
}

export function generatePageMetadata({
  locale,
  path,
  title,
  description,
  keywords = [],
  image = "/images/preview-image.png",
  type = "website",
  publishedTime,
  modifiedTime,
  authors = ["Dr. Mohamed Fayed - Fayed Dental Clinic"],
  noIndex = false,
}: PageMetadataProps): Metadata {
  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_SITE_URL;

  // Ensure path starts with / or is empty for root home
  const cleanPath = path === "/" ? "" : path.startsWith("/") ? path : `/${path}`;
  
  // Canonical URL for this specific language and path
  const canonicalUrl = `${SITE_URL}/${locale}${cleanPath}`;
  
  // Full image URL if relative
  const imageUrl = image.startsWith("http") ? image : `${SITE_URL}${image}`;

  const defaultKeywords = locale === "ar" ? [
    "افضل عيادة زراعة اسنان",
    "افضل عيادة اسنان في مصر",
    "أفضل عيادة اسنان",
    "عيادة أسنان القاهرة",
    "دكتور محمد فايد",
    "فايد دينتال كلينك",
    "زراعة أسنان",
    "تجميل أسنان",
    "فينير",
    "تبييض أسنان",
    "علاج جذور",
    "حشو عصب",
  ] : [
    "best dental clinic in Egypt",
    "best dental clinic Cairo",
    "Dr. Mohamed Fayed",
    "Fayed Dental Clinic",
    "dental implants Egypt",
    "cosmetic dentistry Cairo",
    "veneers Egypt",
    "teeth whitening Cairo",
    "root canal treatment Cairo",
    "best dentist Cairo",
  ];

  const allKeywords = Array.from(new Set([...keywords, ...defaultKeywords]));

  return {
    title,
    description,
    keywords: allKeywords,
    authors: authors.map((name) => ({ name })),
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: canonicalUrl,
      languages: {
        ar: `${SITE_URL}/ar${cleanPath}`,
        en: `${SITE_URL}/en${cleanPath}`,
        "x-default": `${SITE_URL}/ar${cleanPath}`,
      },
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: type as any,
      siteName: locale === "ar" ? "فايد دينتال كلينك" : "Fayed Dental Clinic",
      locale: locale === "ar" ? "ar_EG" : "en_EG",
      alternateLocale: locale === "ar" ? ["en_EG"] : ["ar_EG"],
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      ...(publishedTime ? { publishedTime } : {}),
      ...(modifiedTime ? { modifiedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
  };
}
