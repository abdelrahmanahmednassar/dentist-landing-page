import { MetadataRoute } from "next";
import { db, blogs } from "@/db";
import { eq, desc } from "drizzle-orm";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://fayed.clinic";
  const currentDate = new Date().toISOString().split("T")[0]; // Format: YYYY-MM-DD

  const staticPages: MetadataRoute.Sitemap = [
    // Home page
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    // Main pages
    {
      url: `${baseUrl}/about-us`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/cases`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blogs`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/team`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact-us`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    // Service detail pages
    {
      url: `${baseUrl}/services/teeth-implants`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services/teeth-beautification`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services/hybrid-veneers`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services/3n-veneers`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

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

    blogUrls = publishedBlogs.map((post) => {
      const dateVal = post.updatedAt || post.publishedAt || post.createdAt;
      let formattedDate = currentDate;
      try {
        if (dateVal) {
          formattedDate = new Date(dateVal).toISOString().split("T")[0];
        }
      } catch {
        formattedDate = currentDate;
      }

      return {
        url: `${baseUrl}/blogs/${post.slug || post.id}`,
        lastModified: formattedDate,
        changeFrequency: "weekly",
        priority: 0.7,
      };
    });
  } catch (error) {
    console.error("Error generating dynamic blog sitemap:", error);
  }

  return [...staticPages, ...blogUrls];
}
