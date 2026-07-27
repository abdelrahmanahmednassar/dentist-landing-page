import { NextResponse } from "next/server";

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://fayed.clinic";

  const content = `# Robots.txt for Fayed Dental Clinic (fayed.clinic)
# Agent-Ready web policy with explicit AI permissions & Content-Signal support

User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin/
Disallow: /ar/admin/
Disallow: /en/admin/
Disallow: /_next/
Content-Signal: ai-train=yes, search=yes, ai-input=yes

# Explicit permissions for AI & LLM bots
User-agent: GPTBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: Claude-Web
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: Applebot-Extended
Allow: /

Sitemap: ${baseUrl}/sitemap.xml
`;

  return new NextResponse(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, must-revalidate",
    },
  });
}
