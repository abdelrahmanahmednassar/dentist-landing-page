import { MetadataRoute } from "next";
import { db, blogs } from "@/db";
import { eq, desc } from "drizzle-orm";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://fayed.clinic";
const locales = ["ar", "en"];

function createSitemapEntries(
  path: string,
  lastModified: string,
  changeFrequency: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never",
  priority: number
): MetadataRoute.Sitemap {
  const cleanPath = path === "/" ? "" : path.startsWith("/") ? path : `/${path}`;
  
  const languages: Record<string, string> = {
    ar: `${baseUrl}/ar${cleanPath}`,
    en: `${baseUrl}/en${cleanPath}`,
  };

  return locales.map((locale) => ({
    url: `${baseUrl}/${locale}${cleanPath}`,
    lastModified,
    changeFrequency,
    priority,
    alternates: {
      languages,
    },
  }));
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const currentDate = new Date().toISOString().split("T")[0]; // Format: YYYY-MM-DD

  const staticRoutes: Array<{ path: string; frequency: "weekly" | "monthly"; priority: number }> = [
    { path: "", frequency: "weekly", priority: 1.0 },
    { path: "/about-us", frequency: "monthly", priority: 0.8 },
    { path: "/services", frequency: "weekly", priority: 0.9 },
    { path: "/cases", frequency: "weekly", priority: 0.8 },
    { path: "/blogs", frequency: "weekly", priority: 0.8 },
    { path: "/team", frequency: "monthly", priority: 0.7 },
    { path: "/contact-us", frequency: "monthly", priority: 0.7 },
    { path: "/services/teeth-implants", frequency: "monthly", priority: 0.8 },
    { path: "/services/teeth-beautification", frequency: "monthly", priority: 0.8 },
    { path: "/services/hybrid-veneers", frequency: "monthly", priority: 0.8 },
    { path: "/services/3n-veneers", frequency: "monthly", priority: 0.8 },
  ];

  const staticPages: MetadataRoute.Sitemap = staticRoutes.flatMap((route) =>
    createSitemapEntries(route.path, currentDate, route.frequency, route.priority)
  );

  // Dynamically fetch published blogs from the database
  let blogUrls: MetadataRoute.Sitemap = [];
  try {
    const publishedBlogs = await db
      .select({
        id: blogs.id,
        slug: blogs.slug,
        updatedAt: blogs.updatedAt,
        publishedAt: blogs.publishedAt,
        createdAt: blogs.createdAt,
      })
      .from(blogs)
      .where(eq(blogs.status, "published"))
      .orderBy(desc(blogs.publishedAt));

    blogUrls = publishedBlogs.flatMap((post) => {
      const dateVal = post.updatedAt || post.publishedAt || post.createdAt;
      let formattedDate = currentDate;
      try {
        if (dateVal) {
          formattedDate = new Date(dateVal).toISOString().split("T")[0];
        }
      } catch {
        formattedDate = currentDate;
      }

      const blogPath = `/blogs/${post.slug || post.id}`;
      return createSitemapEntries(blogPath, formattedDate, "weekly", 0.7);
    });
  } catch (error) {
    console.error("Error generating dynamic blog sitemap:", error);
  }

  return [...staticPages, ...blogUrls];
}
