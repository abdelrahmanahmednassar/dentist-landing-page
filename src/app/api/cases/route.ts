import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { db, cases } from '@/db';
import { eq, desc } from 'drizzle-orm';
import { verifySessionToken, COOKIE_NAME } from '@/lib/auth';

const VALID_CATEGORIES = [
  'implants',
  'cosmetic',
  'orthodontics',
] as const;
type CaseCategory = (typeof VALID_CATEGORIES)[number];

// GET /api/cases - Public API to list clinical cases
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const limit = parseInt(searchParams.get('limit') || '50', 10);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const offset = (page - 1) * limit;

    const conditions = [];
    if (category && category !== 'all' && VALID_CATEGORIES.includes(category as CaseCategory)) {
      conditions.push(eq(cases.category, category as CaseCategory));
    }

    const result = await db
      .select()
      .from(cases)
      .where(conditions.length > 0 ? conditions[0] : undefined)
      .orderBy(desc(cases.createdAt))
      .limit(limit)
      .offset(offset);

    return NextResponse.json({
      success: true,
      cases: result,
      page,
      limit,
    });
  } catch (error) {
    console.error('Error fetching cases:', error);
    return NextResponse.json(
      { error: 'Failed to fetch cases' },
      { status: 500 }
    );
  }
}

// POST /api/cases - Admin API to create a new clinical case
export async function POST(request: Request) {
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

    const body = await request.json();
    const { category, titleAr, titleEn, imageUrl } = body;

    if (!category || !imageUrl) {
      return NextResponse.json(
        { error: 'Missing required fields: category and imageUrl are required.' },
        { status: 400 }
      );
    }

    if (!VALID_CATEGORIES.includes(category)) {
      return NextResponse.json(
        { error: `Invalid category. Must be one of: ${VALID_CATEGORIES.join(', ')}` },
        { status: 400 }
      );
    }

    const [newCase] = await db
      .insert(cases)
      .values({
        category,
        titleAr: titleAr?.trim() || null,
        titleEn: titleEn?.trim() || null,
        imageUrl: imageUrl.trim(),
      })
      .returning();

    return NextResponse.json({
      success: true,
      case: newCase,
    });
  } catch (error) {
    console.error('Error creating case:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to create case' },
      { status: 500 }
    );
  }
}
