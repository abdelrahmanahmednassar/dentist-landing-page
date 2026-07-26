import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { db, blogs } from '@/db';
import { desc } from 'drizzle-orm';
import { verifySessionToken, COOKIE_NAME } from '@/lib/auth';

// GET /api/admin/blogs - Protected admin route to list all blog posts
export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;

    if (!token) {
      return NextResponse.json({ error: 'Unauthenticated' }, { status: 401 });
    }

    const user = await verifySessionToken(token);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const allBlogs = await db
      .select({
        id: blogs.id,
        slug: blogs.slug,
        titleAr: blogs.titleAr,
        titleEn: blogs.titleEn,
        excerptAr: blogs.excerptAr,
        excerptEn: blogs.excerptEn,
        coverImageUrlAr: blogs.coverImageUrlAr,
        coverImageUrlEn: blogs.coverImageUrlEn,
        ogImageUrl: blogs.ogImageUrl,
        tagsAr: blogs.tagsAr,
        tagsEn: blogs.tagsEn,
        status: blogs.status,
        isFeatured: blogs.isFeatured,
        readingMinutes: blogs.readingMinutes,
        createdAt: blogs.createdAt,
        updatedAt: blogs.updatedAt,
        publishedAt: blogs.publishedAt,
      })
      .from(blogs)
      .orderBy(desc(blogs.createdAt));

    return NextResponse.json({
      success: true,
      blogs: allBlogs,
    });
  } catch (error) {
    console.error('Error fetching admin blogs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch admin blogs' },
      { status: 500 }
    );
  }
}
