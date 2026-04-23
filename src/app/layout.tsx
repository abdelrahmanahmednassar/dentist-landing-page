import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { Tajawal } from "next/font/google";
import { getMessages, getLocale } from "next-intl/server";
import "./globals.css";
import Header from "@/components/Header";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { Providers } from "@/components/Providers";
import styles from "@/styles/footer.module.css";

const tajawal = Tajawal({
  weight: ["400", "700"],
  subsets: ["arabic"],
  display: "swap",
});

// Environment variables (create .env.local file)
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://fayed.clinic";
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || "GTM-MTJHBG8W";
const GOOGLE_ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID || "AW-17913088176";
const PHONE = process.env.NEXT_PUBLIC_PHONE || "+201034317813";
const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP || "+201002507882";

export const metadata: Metadata = {
  title: "فايد دينتال كلينك | افضل عيادة اسنان في مصر - دكتور محمد فايد",
  description:
    "فايد دينتال كلينك مع دكتور محمد فايد من أفضل عيادات الأسنان في مصر. نقدم زراعة الأسنان وتجميل الأسنان والفينير وعلاج الجذور بأحدث التقنيات في القاهرة.",
  keywords: [
    "افضل عيادة اسنان",
    "افضل عيادة اسنان في مصر",
    "أفضل عيادة اسنان",
    "أفضل عيادة اسنان في مصر",
    "عيادة أسنان القاهرة",
    "عيادة أسنان في مصر",
    "دكتور أسنان",
    "زراعة أسنان",
    "تجميل أسنان",
    "فينير",
    "تبييض أسنان",
    "علاج جذور",
    "حشو عصب",
    "دكتور محمد فايد",
    "فايد دينتال كلينك",
    "عيادة أسنان مصر",
    "أخصائي أسنان",
  ],
  authors: [{ name: "Dr. Mohamed Fayed - Fayed Dental Clinic" }],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/`,
    title: "فايد دينتال كلينك | افضل عيادة اسنان في مصر",
    description:
      "ابحث عن افضل عيادة اسنان أو افضل عيادة اسنان في مصر؟ فايد دينتال كلينك يقدم رعاية متقدمة في زراعة وتجميل الأسنان في القاهرة.",
    siteName: "فايد دينتال كلينك",
    locale: "ar_EG",
    images: [
      {
        url: "/images/preview-image.png",
        width: 1200,
        height: 630,
        alt: "فايد دينتال كلينك",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "فايد دينتال كلينك | افضل عيادة اسنان في مصر",
    description:
      "فايد دينتال كلينك من أفضل عيادات الأسنان في مصر بخدمات زراعة وتجميل وعلاج الأسنان بأحدث التقنيات.",
    images: ["/images/preview-image.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      {
        url: "/images/favicon/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
      },
      {
        url: "/images/favicon/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
    ],
    apple: [
      {
        url: "/images/favicon/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },
  manifest: "/images/favicon/site.webmanifest",
  other: {
    language: "Arabic",
    "revisit-after": "7 days",
    "format-detection": "telephone=no",
  },
  // Add Google verification if you have it
  // verification: {
  //   google: "your-google-site-verification-code",
  // },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = (await getMessages()) as any;
  const dir = locale === "ar" ? "rtl" : "ltr";
  const whatsappCta =
    messages?.whatsappCta || messages?.nav?.contact || "Contact Us";

  return (
    <html
      lang={locale}
      dir={dir}
      className={tajawal.className}
      data-scroll-behavior="smooth"
      itemScope
      itemType="https://schema.org/WebSite"
    >
      <head>
        <meta name="theme-color" content="#BE9249" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />

        {/* hreflang tags for language alternatives */}
        <link rel="alternate" hrefLang="ar" href={SITE_URL} />
        <link rel="alternate" hrefLang="en" href={SITE_URL} />
        <link rel="alternate" hrefLang="x-default" href={SITE_URL} />
      </head>
      <body>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>

        <Providers locale={locale} messages={messages}>
          <Header />
          <Nav />
          {children}
          <Footer />

          {/* WhatsApp Float Badge */}
          <Link
            href={`https://wa.me/${WHATSAPP.replace(/\+/g, "")}`}
            className={styles.whatsappFloat}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${whatsappCta} on WhatsApp`}
          >
            <span className={styles.whatsappIcon} aria-hidden="true">
              <i className="bx bxl-whatsapp"></i>
            </span>
            <span className={styles.whatsappText}>{whatsappCta}</span>
          </Link>

          {/* Scroll to Top Button */}
          <ScrollToTop />
        </Providers>

        {/* Google Tag Manager - Main Script */}
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${GTM_ID}');
            `,
          }}
        />

        {/* Google Ads Script - Only if not using GTM for tracking */}
        {/* If you're using GTM, configure Google Ads there instead and remove this script */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`}
          strategy="afterInteractive"
        />
        <Script
          id="google-ads-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GOOGLE_ADS_ID}');
            `,
          }}
        />

        {/* Structured Data - Dentist */}
        <Script
          id="structured-data-dentist"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Dentist",
              name: "فايد دينتال كلينك - Dr. Mohamed Fayed",
              alternateName: "Fayed Dental Clinic",
              description:
                "فايد دينتال كلينك - دكتور محمد فايد، عيادة أسنان متخصصة في القاهرة وتعد من أفضل خيارات الباحثين عن افضل عيادة اسنان في مصر لخدمات زراعة وتجميل الأسنان.",
              url: SITE_URL,
              logo: `${SITE_URL}/images/logo.png`,
              image: `${SITE_URL}/images/preview-image.png`,
              telephone: PHONE,
              email: "info@fayedentalclinic.com",
              address: {
                "@type": "PostalAddress",
                streetAddress:
                  "٤٧ شارع جامعة الدول العربية - متفرع من شارع شهاب",
                addressLocality: "القاهرة",
                addressRegion: "القاهرة",
                postalCode: "",
                addressCountry: "EG",
              },
              areaServed: {
                "@type": "Country",
                name: "Egypt",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: "30.0444",
                longitude: "31.2357",
              },
              openingHoursSpecification: [
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: [
                    "Saturday",
                    "Sunday",
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                  ],
                  opens: "14:00",
                  closes: "22:00",
                },
              ],
              priceRange: "$$",
              currenciesAccepted: "EGP",
              medicalSpecialty: [
                "Dentistry",
                "Oral Surgery",
                "Cosmetic Dentistry",
                "Dental Implants",
                "Orthodontics",
                "Endodontics",
              ],
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: "خدمات عيادة الأسنان",
                itemListElement: [
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "زراعة الأسنان",
                      description:
                        "الحل الأمثل لتعويض الفقد في الأسنان بأيدي متخصصي زراعة الأسنان",
                    },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "تجميل الأسنان",
                      description:
                        "تقنية تصميم الإبتسامة بالكمبيوتر في تجميل الأسنان",
                    },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Hybrid veneers",
                      description:
                        "أحدث طرق تجميل الأسنان والتي تجمع بين دقة وسرعة تقنيات تصميم الإبتسامة بالكمبيوتر",
                    },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "3N Veneers",
                      description:
                        "أحدث وأكثر التقنيات تقدماً في عالم تجميل الأسنان",
                    },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "علاج الجذور وحشو العصب",
                      description:
                        "علاج جذور الأسنان وحشو العصب بأحدث التقنيات",
                    },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "العلاج التحفظي والحشو",
                      description: "حشو الأسنان والعلاج التحفظي",
                    },
                  },
                ],
              },
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.8",
                reviewCount: "3500",
              },
              sameAs: [
                "https://www.facebook.com/share/1Bvk7SVjLS/?mibextid=wwXIfr",
                "https://www.instagram.com/dr_mohamedfayed_clinic?igsh=MTZ4MzBkbnY3dXBtMg%3D%3D&utm_source=qr",
                "https://www.tiktok.com/@mohamedfayed33?_r=1&_t=ZS-921cT0C6hAj",
              ],
            }),
          }}
        />

        {/* Structured Data - Organization */}
        <Script
          id="structured-data-organization"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "فايد دينتال كلينك - Fayed Dental Clinic",
              alternateName: "Dr. Mohamed Fayed Dental Clinic",
              url: SITE_URL,
              logo: `${SITE_URL}/images/logo.png`,
              description:
                "فايد دينتال كلينك من أفضل عيادات الأسنان في مصر بقيادة دكتور محمد فايد.",
              contactPoint: {
                "@type": "ContactPoint",
                telephone: PHONE,
                contactType: "Customer Service",
                areaServed: "EG",
                availableLanguage: ["Arabic", "English"],
              },
              sameAs: [
                "https://www.facebook.com/share/1Bvk7SVjLS/?mibextid=wwXIfr",
                "https://www.instagram.com/dr_mohamedfayed_clinic?igsh=MTZ4MzBkbnY3dXBtMg%3D%3D&utm_source=qr",
                "https://www.tiktok.com/@mohamedfayed33?_r=1&_t=ZS-921cT0C6hAj",
              ],
            }),
          }}
        />

        {/* Structured Data - BreadcrumbList */}
        <Script
          id="structured-data-breadcrumb"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "الرئيسية",
                  item: SITE_URL,
                },
              ],
            }),
          }}
        />

        {/* Structured Data - WebSite */}
        <Script
          id="structured-data-website"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "فايد دينتال كلينك",
              url: SITE_URL,
              potentialAction: {
                "@type": "SearchAction",
                target: {
                  "@type": "EntryPoint",
                  urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
                },
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />

        {/* Structured Data - LocalBusiness */}
        <Script
          id="structured-data-local-business"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "فايد دينتال كلينك",
              image: `${SITE_URL}/images/preview-image.png`,
              "@id": SITE_URL,
              url: SITE_URL,
              telephone: PHONE,
              priceRange: "$$",
              address: {
                "@type": "PostalAddress",
                streetAddress:
                  "٤٧ شارع جامعة الدول العربية - متفرع من شارع شهاب",
                addressLocality: "القاهرة",
                addressRegion: "القاهرة",
                postalCode: "",
                addressCountry: "EG",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: 30.0444,
                longitude: 31.2357,
              },
              openingHoursSpecification: {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: [
                  "Saturday",
                  "Sunday",
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                ],
                opens: "14:00",
                closes: "22:00",
              },
            }),
          }}
        />
      </body>
    </html>
  );
}
