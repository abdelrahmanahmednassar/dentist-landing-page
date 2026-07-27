import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { db, cases } from '@/db';
import { eq } from 'drizzle-orm';
import { verifySessionToken, COOKIE_NAME } from '@/lib/auth';
import { deleteCloudinaryImageByUrl } from '@/lib/cloudinary';

const VALID_CATEGORIES = [
  'implants',
  'cosmetic',
  'orthodontics',
] as const;

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

// GET /api/cases/[id] - Fetch individual clinical case
export async function GET(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;

    const [caseItem] = await db
      .select()
      .from(cases)
      .where(eq(cases.id, id));

    if (!caseItem) {
      return NextResponse.json({ error: 'Case not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, case: caseItem });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch case' }, { status: 500 });
  }
}

// PUT /api/cases/[id] - Admin route to update case details
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

    const [existingCase] = await db
      .select()
      .from(cases)
      .where(eq(cases.id, id));

    if (!existingCase) {
      return NextResponse.json({ error: 'Case not found' }, { status: 404 });
    }

    const { category, titleAr, titleEn, imageUrl } = body;

    if (category !== undefined && !VALID_CATEGORIES.includes(category)) {
      return NextResponse.json(
        { error: `Invalid category. Must be one of: ${VALID_CATEGORIES.join(', ')}` },
        { status: 400 }
      );
    }

    const [updatedCase] = await db
      .update(cases)
      .set({
        category: category !== undefined ? category : existingCase.category,
        titleAr: titleAr !== undefined ? (titleAr ? titleAr.trim() : null) : existingCase.titleAr,
        titleEn: titleEn !== undefined ? (titleEn ? titleEn.trim() : null) : existingCase.titleEn,
        imageUrl: imageUrl !== undefined ? imageUrl.trim() : existingCase.imageUrl,
        updatedAt: new Date(),
      })
      .where(eq(cases.id, id))
      .returning();

    // Automatically clean up replaced old image asset from Cloudinary
    if (imageUrl !== undefined && imageUrl.trim() !== existingCase.imageUrl && existingCase.imageUrl) {
      try {
        await deleteCloudinaryImageByUrl(existingCase.imageUrl);
      } catch (cleanErr) {
        console.warn('Non-fatal warning cleaning up replaced Cloudinary image:', cleanErr);
      }
    }

    return NextResponse.json({ success: true, case: updatedCase });
  } catch (error) {
    console.error('Error updating case:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to update case' },
      { status: 500 }
    );
  }
}

// DELETE /api/cases/[id] - Admin route to delete a clinical case & scrub Cloudinary media
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
      .delete(cases)
      .where(eq(cases.id, id))
      .returning();

    if (!deleted) {
      return NextResponse.json({ error: 'Case not found' }, { status: 404 });
    }

    // Automatically delete associated Cloudinary media asset
    try {
      if (deleted.imageUrl) {
        await deleteCloudinaryImageByUrl(deleted.imageUrl);
      }
    } catch (cleanErr) {
      console.warn('Non-fatal warning cleaning up Cloudinary media after case deletion:', cleanErr);
    }

    return NextResponse.json({ success: true, message: 'Case deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete case' }, { status: 500 });
  }
}
