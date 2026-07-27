import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { db, blogs } from '@/db';
import { eq, and, or, ilike, desc } from 'drizzle-orm';
import { verifySessionToken, COOKIE_NAME } from '@/lib/auth';

// GET /api/blogs - Public API to list published blog posts
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const tag = searchParams.get('tag');
    const isFeatured = searchParams.get('isFeatured');
    const search = searchParams.get('search');
    const limit = parseInt(searchParams.get('limit') || '20', 10);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const offset = (page - 1) * limit;

    const conditions = [eq(blogs.status, 'published')];

    if (isFeatured === 'true') {
      conditions.push(eq(blogs.isFeatured, true));
    }

    if (search) {
      const searchPattern = `%${search}%`;
      conditions.push(
        or(
          ilike(blogs.titleAr, searchPattern),
          ilike(blogs.titleEn, searchPattern),
          ilike(blogs.excerptAr, searchPattern),
          ilike(blogs.excerptEn, searchPattern)
        )!
      );
    }

    const whereClause = and(...conditions);

    let allPublished = await db
      .select({
        id: blogs.id,
        slug: blogs.slug,
        titleAr: blogs.titleAr,
        titleEn: blogs.titleEn,
        excerptAr: blogs.excerptAr,
        excerptEn: blogs.excerptEn,
        coverImageUrlAr: blogs.coverImageUrlAr,
        coverImageUrlEn: blogs.coverImageUrlEn,
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
      .where(whereClause)
      .orderBy(desc(blogs.publishedAt), desc(blogs.createdAt))
      .limit(limit)
      .offset(offset);

    // Filter by tag if requested
    if (tag && tag !== 'all') {
      allPublished = allPublished.filter(
        (b) => b.tagsAr.includes(tag) || b.tagsEn.includes(tag)
      );
    }

    return NextResponse.json({
      success: true,
      blogs: allPublished,
      page,
      limit,
    });
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blogs' },
      { status: 500 }
    );
  }
}

// POST /api/blogs - Admin API to create a new blog post
export async function POST(request: Request) {
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

    const body = await request.json();
    const {
      titleAr,
      titleEn,
      descriptionAr,
      descriptionEn,
      slug,
      contentAr,
      contentEn,
      coverImageUrlAr,
      coverImageUrlEn,
      excerptAr,
      excerptEn,
      readingMinutes,
      tagsAr,
      tagsEn,
      status,
      isFeatured,
    } = body;

    if (
      !titleAr ||
      !titleEn ||
      !slug ||
      !contentAr ||
      !contentEn ||
      !coverImageUrlAr ||
      !coverImageUrlEn
    ) {
      return NextResponse.json(
        { error: 'Missing required blog fields (titles, slug, contents, coverImageUrlAr, coverImageUrlEn)' },
        { status: 400 }
      );
    }

    // Check slug uniqueness
    const existingSlug = await db
      .select({ id: blogs.id })
      .from(blogs)
      .where(eq(blogs.slug, slug.trim().toLowerCase()));

    if (existingSlug.length > 0) {
      return NextResponse.json(
        { error: 'Slug already exists. Please choose a unique slug.' },
        { status: 400 }
      );
    }

    const newStatus = status || 'draft';

    const [newBlog] = await db
      .insert(blogs)
      .values({
        titleAr: titleAr.trim(),
        titleEn: titleEn.trim(),
        descriptionAr: descriptionAr || titleAr,
        descriptionEn: descriptionEn || titleEn,
        slug: slug.trim().toLowerCase(),
        contentAr,
        contentEn,
        coverImageUrlAr: coverImageUrlAr.trim(),
        coverImageUrlEn: coverImageUrlEn.trim(),
        excerptAr: excerptAr || titleAr,
        excerptEn: excerptEn || titleEn,
        readingMinutes: readingMinutes || 1,
        authorId: user.id,
        tagsAr: Array.isArray(tagsAr) ? tagsAr : [],
        tagsEn: Array.isArray(tagsEn) ? tagsEn : [],
        status: newStatus,
        isFeatured: Boolean(isFeatured),
        publishedAt: newStatus === 'published' ? new Date() : null,
      })
      .returning();

    return NextResponse.json({
      success: true,
      blog: newBlog,
    });
  } catch (error) {
    console.error('Error creating blog:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to create blog' },
      { status: 500 }
    );
  }
}
