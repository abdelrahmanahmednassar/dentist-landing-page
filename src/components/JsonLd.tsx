import React from "react";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://fayed.clinic";

interface BreadcrumbItem {
  name: string;
  path?: string; // Relative to locale (e.g. "/services") or absolute URL
}

export function JsonLdBreadcrumb({
  items,
  locale,
}: {
  items: BreadcrumbItem[];
  locale: string;
}) {
  const homeName = locale === "ar" ? "الرئيسية" : "Home";
  
  const allItems = [
    { name: homeName, url: `${SITE_URL}/${locale}` },
    ...items.map((item) => ({
      name: item.name,
      url: item.path
        ? item.path.startsWith("http")
          ? item.path
          : `${SITE_URL}/${locale}${item.path.startsWith("/") ? item.path : `/${item.path}`}`
        : undefined,
    })),
  ];

  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: allItems.map((item, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: item.name,
      ...(item.url ? { item: item.url } : {}),
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function JsonLdBlogPost({
  title,
  description,
  url,
  image,
  datePublished,
  dateModified,
  authorName = "Dr. Mohamed Fayed",
  locale,
}: {
  title: string;
  description: string;
  url: string;
  image?: string;
  datePublished?: string;
  dateModified?: string;
  authorName?: string;
  locale: string;
}) {
  const imageUrl = image
    ? image.startsWith("http")
      ? image
      : `${SITE_URL}${image}`
    : `${SITE_URL}/images/blogs-preview.png`;

  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    headline: title,
    description: description,
    image: [imageUrl],
    ...(datePublished ? { datePublished } : {}),
    ...(dateModified ? { dateModified: dateModified || datePublished } : {}),
    author: {
      "@type": "Person",
      name: authorName,
      jobTitle: "Dentist & Dental Implant Specialist",
      url: `${SITE_URL}/${locale}/about-us`,
    },
    publisher: {
      "@type": "MedicalOrganization",
      name: locale === "ar" ? "فايد دينتال كلينك" : "Fayed Dental Clinic",
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/images/logo.png`,
      },
    },
    inLanguage: locale === "ar" ? "ar-EG" : "en-US",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function JsonLdMedicalProcedure({
  name,
  description,
  url,
  image,
  procedureType = "Cosmetic Dentistry & Implantology",
  locale,
}: {
  name: string;
  description: string;
  url: string;
  image?: string;
  procedureType?: string;
  locale: string;
}) {
  const imageUrl = image
    ? image.startsWith("http")
      ? image
      : `${SITE_URL}${image}`
    : `${SITE_URL}/images/services-preview.jpg`;

  const schema = {
    "@context": "https://schema.org",
    "@type": ["MedicalProcedure", "Service"],
    name: name,
    description: description,
    image: imageUrl,
    url: url,
    procedureType: procedureType,
    provider: {
      "@type": "Dentist",
      name: locale === "ar" ? "فايد دينتال كلينك - د. محمد فايد" : "Fayed Dental Clinic - Dr. Mohamed Fayed",
      image: `${SITE_URL}/images/preview-image.png`,
      telephone: process.env.NEXT_PUBLIC_PHONE || "+201034317813",
      address: {
        "@type": "PostalAddress",
        streetAddress: locale === "ar" ? "٤٧ شارع جامعة الدول العربية - متفرع من شارع شهاب" : "47 Gameat El-Dowal El-Arabia St, off Shehab St",
        addressLocality: locale === "ar" ? "القاهرة" : "Cairo",
        addressRegion: "Cairo",
        addressCountry: "EG",
      },
    },
    areaServed: {
      "@type": "Country",
      name: "Egypt",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
