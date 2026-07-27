import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { db, blogs } from '@/db';
import { eq, or } from 'drizzle-orm';
import { verifySessionToken, COOKIE_NAME } from '@/lib/auth';
import { deleteCloudinaryImageByUrl } from '@/lib/cloudinary';

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

// GET /api/blogs/[id] - Fetch blog by ID or Slug
export async function GET(request: Request, { params }: RouteParams) {
  try {
    const { id: idOrSlug } = await params;

    const [blog] = await db
      .select()
      .from(blogs)
      .where(or(eq(blogs.id, idOrSlug), eq(blogs.slug, idOrSlug)));

    if (!blog) {
      return NextResponse.json({ error: 'Blog post not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, blog });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch blog post' }, { status: 500 });
  }
}

// PUT /api/blogs/[id] - Admin route to update blog post
export async function PUT(request: Request, { params }: RouteParams) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;

    if (!token) {
      return NextResponse.json({ error: 'Unauthenticated' }, { status: 401 });
    }

    const user = await verifySessionToken(token);
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized: Admin privileges required' }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();

    const [existingBlog] = await db
      .select()
      .from(blogs)
      .where(eq(blogs.id, id));

    if (!existingBlog) {
      return NextResponse.json({ error: 'Blog post not found' }, { status: 404 });
    }

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

    const newStatus = status || existingBlog.status;
    let publishedAt = existingBlog.publishedAt;
    if (newStatus === 'published' && !publishedAt) {
      publishedAt = new Date();
    }

    const [updatedBlog] = await db
      .update(blogs)
      .set({
        titleAr: titleAr !== undefined ? titleAr.trim() : existingBlog.titleAr,
        titleEn: titleEn !== undefined ? titleEn.trim() : existingBlog.titleEn,
        descriptionAr: descriptionAr !== undefined ? descriptionAr : existingBlog.descriptionAr,
        descriptionEn: descriptionEn !== undefined ? descriptionEn : existingBlog.descriptionEn,
        slug: slug !== undefined ? slug.trim().toLowerCase() : existingBlog.slug,
        contentAr: contentAr !== undefined ? contentAr : existingBlog.contentAr,
        contentEn: contentEn !== undefined ? contentEn : existingBlog.contentEn,
        coverImageUrlAr: coverImageUrlAr !== undefined ? coverImageUrlAr : existingBlog.coverImageUrlAr,
        coverImageUrlEn: coverImageUrlEn !== undefined ? coverImageUrlEn : existingBlog.coverImageUrlEn,
        excerptAr: excerptAr !== undefined ? excerptAr : existingBlog.excerptAr,
        excerptEn: excerptEn !== undefined ? excerptEn : existingBlog.excerptEn,
        readingMinutes: readingMinutes !== undefined ? readingMinutes : existingBlog.readingMinutes,
        tagsAr: Array.isArray(tagsAr) ? tagsAr : existingBlog.tagsAr,
        tagsEn: Array.isArray(tagsEn) ? tagsEn : existingBlog.tagsEn,
        status: newStatus,
        isFeatured: isFeatured !== undefined ? Boolean(isFeatured) : existingBlog.isFeatured,
        publishedAt,
        updatedAt: new Date(),
      })
      .where(eq(blogs.id, id))
      .returning();

    return NextResponse.json({ success: true, blog: updatedBlog });
  } catch (error) {
    console.error('Error updating blog:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to update blog' },
      { status: 500 }
    );
  }
}

// DELETE /api/blogs/[id] - Admin route to delete blog post
export async function DELETE(request: Request, { params }: RouteParams) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;

    if (!token) {
      return NextResponse.json({ error: 'Unauthenticated' }, { status: 401 });
    }

    const user = await verifySessionToken(token);
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized: Admin privileges required' }, { status: 401 });
    }

    const { id } = await params;

    const [deleted] = await db
      .delete(blogs)
      .where(eq(blogs.id, id))
      .returning();

    if (!deleted) {
      return NextResponse.json({ error: 'Blog post not found' }, { status: 404 });
    }

    // Automatically delete associated Cloudinary media assets in parallel
    try {
      await Promise.all([
        deleteCloudinaryImageByUrl(deleted.coverImageUrlAr),
        deleteCloudinaryImageByUrl(deleted.coverImageUrlEn),
      ]);
    } catch (cleanErr) {
      console.warn('Non-fatal warning cleaning up Cloudinary media after blog deletion:', cleanErr);
    }

    return NextResponse.json({ success: true, message: 'Blog deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete blog' }, { status: 500 });
  }
}
