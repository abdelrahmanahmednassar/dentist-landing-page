import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { db, blogs } from "@/db";
import { eq } from "drizzle-orm";

export async function GET(request: NextRequest) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://fayed.clinic";
  const rawPath = request.nextUrl.searchParams.get("path") || "/en";

  // Clean path by removing trailing index.md or .md and normalizing slashes
  let cleanPath = rawPath.replace(/\/index\.md$/, "").replace(/\.md$/, "");
  if (!cleanPath.startsWith("/")) cleanPath = "/" + cleanPath;

  const segments = cleanPath.split("/").filter(Boolean);
  const locale = segments[0] === "ar" ? "ar" : "en";
  const isArabic = locale === "ar";

  const routeSegments = segments.slice(1);
  const route = routeSegments[0] || "";

  // 1. Dynamic Blog Article Resolution
  if (route === "blogs" && routeSegments[1]) {
    const slug = routeSegments[1];
    try {
      const [post] = await db
        .select()
        .from(blogs)
        .where(eq(blogs.slug, slug))
        .limit(1);

      if (post) {
        const title = isArabic ? post.titleAr : post.titleEn;
        const desc = isArabic ? post.descriptionAr : post.descriptionEn;
        const body = isArabic ? post.contentAr : post.contentEn;
        const date = post.publishedAt ? new Date(post.publishedAt).toLocaleDateString(locale) : "Recent";
        const tags = isArabic ? post.tagsAr : post.tagsEn;

        const md = `# ${title}\n\n> **${isArabic ? "ملخص" : "Summary"}**: ${desc}\n> **${isArabic ? "تاريخ النشر" : "Published"}**: ${date} | **${isArabic ? "وقت القراءة" : "Reading Time"}**: ~${post.readingMinutes} ${isArabic ? "دقائق" : "min"}\n\n${body}\n\n---\n**Tags**: ${tags.join(", ")}\n\n**${isArabic ? "عيادة فايد لطب وتجميل الأسنان" : "Fayed Dental Clinic"}**\n- Book Appointment / Contact: +201034317813\n- Full Clinic Reading List: ${baseUrl}/llms.txt\n`;
        return new NextResponse(md, { headers: { "Content-Type": "text/markdown; charset=utf-8" } });
      }
    } catch (e) {
      console.error("Error fetching blog for markdown API:", e);
    }
  }

  // 2. Static Content Resolution via i18n Dictionaries
  let dict: any = {};
  try {
    const dictPath = path.join(process.cwd(), "messages", `${locale}.json`);
    const data = await fs.readFile(dictPath, "utf-8");
    dict = JSON.parse(data);
  } catch (err) {
    console.error("Failed to load language dictionary:", err);
  }

  let mdContent = "";
  const headerText = isArabic
    ? `# عيادة فايد لطب وتجميل الأسنان (Fayed Dental Clinic)\n> أفضل عيادة أسنان في مصر - بقيادة د. محمد فايد | القاهرة، مصر\n`
    : `# Fayed Dental Clinic\n> Premier Dental Clinic in Egypt - Led by Dr. Mohamed Fayed | Cairo, Egypt\n`;

  if (route === "" || route === "home") {
    mdContent = `${headerText}\n## ${dict.hero?.slide1?.title || "Fayed Dental Clinic"}\n- **${dict.hero?.slide1?.subtitle}**\n- **${dict.hero?.slide2?.title}**: ${dict.hero?.slide2?.subtitle}\n- **${dict.hero?.slide3?.title}**: ${dict.hero?.slide3?.subtitle}\n\n### ${isArabic ? "خدمات الحجز السريع" : "Quick Booking & Services"}\n1. **${dict.hero?.card1?.title}**: ${dict.hero?.card1?.desc}\n2. **${dict.hero?.card2?.title}**: ${dict.hero?.card2?.desc}\n3. **${dict.hero?.card3?.title}**: ${dict.hero?.card3?.desc}\n\n### ${dict.testimonials?.title || "Client Reviews"}\n- "${dict.testimonials?.t1?.text1}" — *${dict.testimonials?.t1?.author}*\n- "${dict.testimonials?.t2?.text1}" — *${dict.testimonials?.t2?.author}*\n- "${dict.testimonials?.t3?.text1}" — *${dict.testimonials?.t3?.author}*\n`;
  } else if (route === "about-us" || route === "about") {
    mdContent = `${headerText}\n## ${dict.about?.title || "About Fayed Dental Clinic"}\n\n${dict.about?.p1 || ""}\n\n${dict.about?.p2 || ""}\n\n${dict.about?.p3 || ""}\n\n### ${isArabic ? "إحصائيات العيادة" : "Clinic Milestones"}\n- **${dict.about?.stat1?.number}+**: ${dict.about?.stat1?.label}\n- **${dict.about?.stat2?.number}+**: ${dict.about?.stat2?.label}\n- **${dict.about?.stat3?.number}+**: ${dict.about?.stat3?.label}\n- **${dict.about?.stat4?.number}+**: ${dict.about?.stat4?.label}\n`;
  } else if (route === "services") {
    const subService = routeSegments[1];
    if (!subService) {
      mdContent = `${headerText}\n## ${isArabic ? "خدمات عيادة دكتور محمد فايد لطب الأسنان" : "Specialized Dental Services"}\n- [${isArabic ? "زراعة الأسنان الفورية والدائمة" : "Dental Implants"}](${baseUrl}/${locale}/services/teeth-implants/index.md)\n- [${isArabic ? "تجميل الأسنان وابتسامة هوليوود" : "Teeth Beautification & Hollywood Smile"}](${baseUrl}/${locale}/services/teeth-beautification/index.md)\n- [${isArabic ? "الفينير الهجين (Hybrid Veneers)" : "Hybrid Veneers"}](${baseUrl}/${locale}/services/hybrid-veneers/index.md)\n- [${isArabic ? "عدسات 3N الفائقة بدون نحت" : "3N Contact Veneers (Zero-Drilling)"}](${baseUrl}/${locale}/services/3n-veneers/index.md)\n`;
    } else {
      mdContent = `${headerText}\n## ${isArabic ? "تفاصيل الخدمة العلاجية" : "Specialized Treatment Procedure"}: ${subService}\n> Complete clinical procedures and technological advantages for ${subService} at Fayed Dental Clinic.\n\nFor thorough treatment breakdown and appointment consultations, visit our consolidated documentation at [llms-full.txt](${baseUrl}/llms-full.txt) or speak with Dr. Mohamed Fayed's specialists via +201034317813.\n`;
    }
  } else if (route === "cases") {
    mdContent = `${headerText}\n## ${dict.cases?.title || "Results From Our Clinic (Before & After)"}\nWe specialize in permanent aesthetic transformations across multiple clinical disciplines:\n1. ${dict.cases?.section1 || "Dental Implants"}\n2. ${dict.cases?.section2 || "Cosmetic Dentistry with Veneers"}\n3. ${dict.cases?.section3 || "Zirconia Crowns"}\n4. ${dict.cases?.section4 || "Laser Whitening"}\n5. ${dict.cases?.section5 || "Cosmetic Laser Fillings"}\n6. ${dict.cases?.section6 || "Root Canal Treatment"}\n`;
  } else if (route === "contact-us" || route === "contact") {
    mdContent = `${headerText}\n## ${dict.nav?.contact || "Contact Us & Appointments"}\n- **${isArabic ? "أوقات العمل" : "Operating Hours"}**: ${dict.header?.hours || "Sat - Thu 2:00pm - 10:00pm / Friday - CLOSED"}\n- **${isArabic ? "رقم الهاتف / الواتساب" : "Direct Phone / WhatsApp"}**: +201034317813\n- **${isArabic ? "الموقع" : "Location"}**: Cairo, Egypt\n- **${isArabic ? "الحجز السريع" : "Quick Booking"}**: Direct scheduling via WhatsApp or website consultation forms.\n`;
  } else if (route === "blogs") {
    mdContent = `${headerText}\n## ${dict.nav?.blogs || "Dental Care Blogs & Articles"}\nTo see the full chronological index of published dental care articles, visit [${baseUrl}/llms-blogs.txt](${baseUrl}/llms-blogs.txt).\n`;
  } else {
    mdContent = `${headerText}\n## ${isArabic ? "نظرة عامة على العيادة" : "Fayed Dental Clinic Overview"}\nExplore our comprehensive machine-readable AI documentation at [${baseUrl}/llms.txt](${baseUrl}/llms.txt) or our full clinical knowledge database at [${baseUrl}/llms-full.txt](${baseUrl}/llms-full.txt).\n`;
  }

  mdContent += `\n---\n*${isArabic ? "د. محمد فايد | عيادة فايد لطلب وتجميل الأسنان" : "Dr. Mohamed Fayed | Fayed Dental Clinic"} | ${baseUrl}* \n`;

  return new NextResponse(mdContent, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600, must-revalidate",
    },
  });
}
