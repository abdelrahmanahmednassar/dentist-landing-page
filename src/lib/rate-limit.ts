interface RateLimitRecord {
  count: number;
  resetTime: number;
}

// Simple in-memory cache for sliding window rate limiting
const rateLimitStore = new Map<string, RateLimitRecord>();

export function checkRateLimit(
  identifier: string,
  limit: number = 5,
  windowMs: number = 15 * 60 * 1000 // 15 minutes window
): { success: boolean; limit: number; remaining: number; resetInSeconds: number } {
  const now = Date.now();
  const record = rateLimitStore.get(identifier);

  // If no record exists or window expired, set new window
  if (!record || now > record.resetTime) {
    rateLimitStore.set(identifier, {
      count: 1,
      resetTime: now + windowMs,
    });

    return {
      success: true,
      limit,
      remaining: limit - 1,
      resetInSeconds: Math.ceil(windowMs / 1000),
    };
  }

  // If limit reached, deny request
  if (record.count >= limit) {
    const resetInSeconds = Math.ceil((record.resetTime - now) / 1000);
    return {
      success: false,
      limit,
      remaining: 0,
      resetInSeconds,
    };
  }

  // Increment counter
  record.count += 1;
  const remaining = limit - record.count;
  const resetInSeconds = Math.ceil((record.resetTime - now) / 1000);

  return {
    success: true,
    limit,
    remaining,
    resetInSeconds,
  };
}
