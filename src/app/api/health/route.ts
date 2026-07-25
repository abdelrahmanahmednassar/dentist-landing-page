import { NextResponse } from 'next/server';
import { db } from '@/db';
import { sql } from 'drizzle-orm';

export async function GET() {
  try {
    const isDbConfigured = Boolean(
      process.env.DATABASE_URL &&
        !process.env.DATABASE_URL.includes('user:password@ep-cool-dbname')
    );

    let dbStatus = 'not_configured';
    let dbError: string | null = null;

    if (isDbConfigured) {
      try {
        await db.execute(sql`SELECT 1`);
        dbStatus = 'connected';
      } catch (err) {
        dbStatus = 'connection_failed';
        dbError = err instanceof Error ? err.message : 'Database query failed';
      }
    }

    const responseStatus = dbStatus === 'connection_failed' ? 503 : 200;

    return NextResponse.json(
      {
        status: dbStatus === 'connection_failed' ? 'degraded' : 'ok',
        database: {
          status: dbStatus,
          configured: isDbConfigured,
          error: dbError,
        },
        timestamp: new Date().toISOString(),
      },
      { status: responseStatus }
    );
  } catch (error) {
    return NextResponse.json(
      {
        status: 'error',
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}
