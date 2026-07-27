import { NextResponse } from "next/server";
import { db, blogs } from "@/db";
import { eq, desc } from "drizzle-orm";

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://fayed.clinic";
  let content = `# Fayed Dental Clinic - Dental Care & Clinical Articles (Blog Directory)
> Complete index of clinical dental advice, oral health guidelines, and advanced cosmetic dental news.
> For full site overview, visit [LLMs Index](${baseUrl}/llms.txt).

`;

  try {
    const publishedBlogs = await db
      .select()
      .from(blogs)
      .where(eq(blogs.status, "published"))
      .orderBy(desc(blogs.publishedAt));

    if (publishedBlogs.length === 0) {
      content += `*No published articles currently available in the directory.*\n`;
    } else {
      content += `## Arabic Articles / المقالات الطبية بالعربية\n`;
      for (const post of publishedBlogs) {
        const slug = post.slug || post.id;
        content += `- [${post.titleAr}](${baseUrl}/ar/blogs/${slug}/index.md): ${post.excerptAr || post.descriptionAr}\n`;
      }
      content += `\n## English Articles / Medical Guides in English\n`;
      for (const post of publishedBlogs) {
        const slug = post.slug || post.id;
        content += `- [${post.titleEn}](${baseUrl}/en/blogs/${slug}/index.md): ${post.excerptEn || post.descriptionEn}\n`;
      }
    }
  } catch (err) {
    console.error("Failed to query blogs for llms-blogs.txt:", err);
    content += `*Notice: Unable to fetch dynamic database records at this time. Please visit ${baseUrl}/blogs.* \n`;
  }

  return new NextResponse(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, must-revalidate",
    },
  });
}
