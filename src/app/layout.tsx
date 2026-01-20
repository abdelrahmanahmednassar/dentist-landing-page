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

export const metadata: Metadata = {
  title: "فايد دينتال كلينك - دكتور محمد فايد | عيادة أسنان متخصصة في القاهرة",
  description:
    "ﺗﻌﺮّف ﻋﲆ ﻋﻴﺎدة ﻓﺎﻳﺪ ﻟﻄﺐ اﻷﺳﻨﺎن، أﻃﺒﺎؤﻧﺎ اﻟﺨﱪاء، واﻟﱱاﻣﻨﺎ ﺑﺘﻘﺪﻳﻢ رﻋﺎﻳﺔ آﻣﻨﺔ وﺣﺪﻳﺜﺔ وﺧﺎﻟﻴﺔ ﻣﻦ اﻷﻟﻢ ﻓﻲ القاهرة",
  keywords: [
    "عيادة أسنان القاهرة",
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
  metadataBase: new URL("https://fayed.clinic"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "https://fayed.clinic/",
    title:
      "فايد دينتال كلينك - دكتور محمد فايد | عيادة أسنان متخصصة في القاهرة",
    description:
      "عيادة فايد دينتال كلينك - دكتور محمد فايد، أخصائي طب وتجميل الأسنان. نقدم خدمات زراعة الأسنان، تجميل الأسنان، الفينير، تبييض الأسنان، علاج الجذور، والحشو. خبرة أكثر من 7 سنوات في مجال طب الأسنان بأحدث التقنيات.",
    siteName: "فايد دينتال كلينك",
    locale: "ar_EG",
    images: [
      {
        url: "/images/preview-image.png",
        width: 1200,
        height: 630,
        alt: "فايد دينتال كلينك",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "فايد دينتال كلينك - دكتور محمد فايد | عيادة أسنان متخصصة في القاهرة",
    description:
      "عيادة فايد دينتال كلينك - دكتور محمد فايد، أخصائي طب وتجميل الأسنان. نقدم خدمات زراعة الأسنان، تجميل الأسنان، الفينير، تبييض الأسنان، علاج الجذور، والحشو.",
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
  },
};
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();
  const dir = locale === "ar" ? "rtl" : "ltr";

  return (
    <html
      lang={locale}
      dir={dir}
      className={tajawal.className}
      data-scroll-behavior="smooth"
    >
      <head>
        <meta name="theme-color" content="#BE9249" />

        {/* Structured Data - Dentist */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Dentist",
              name: "فايد دينتال كلينك - Dr. Mohamed Fayed",
              alternateName: "Fayed Dental Clinic",
              description:
                "عيادة فايد دينتال كلينك - دكتور محمد فايد، أخصائي طب وتجميل الأسنان. نقدم خدمات زراعة الأسنان، تجميل الأسنان، الفينير، تبييض الأسنان، علاج الجذور، والحشو.",
              url: "https://fayed.clinic",
              logo: "https://fayed.clinic/images/logo.png",
              image: "https://fayed.clinic/images/preview-image.png",
              telephone: "+201034317813",
              email: "info@fayedentalclinic.com",
              address: {
                "@type": "PostalAddress",
                streetAddress:
                  "٤٧ شارع جامعة الدول العربية - متفرع من شارع شهاب",
                addressLocality: "القاهرة",
                addressRegion: "القاهرة",
                addressCountry: "EG",
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

        {/* Structured Data - LocalBusiness */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "فايد دينتال كلينك",
              image: "https://fayed.clinic/images/preview-image.png",
              "@id": "https://fayed.clinic",
              url: "https://fayed.clinic",
              telephone: "+201034317813",
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
      </head>
      <body>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-MTJHBG8W"
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

          {/* WhatsApp Float Button */}
          <Link
            href="https://wa.me/201002507882"
            className={styles.whatsappFloat}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Contact us on WhatsApp"
          >
            <i className="bx bxl-whatsapp"></i>
          </Link>

          {/* Scroll to Top Button */}
          <ScrollToTop />
        </Providers>

        {/* Google Tag Manager */}
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-MTJHBG8W');
            `,
          }}
        />
      </body>
    </html>
  );
}
