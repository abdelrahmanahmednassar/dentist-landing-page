import { NextResponse } from "next/server";

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://fayed.clinic";

  const apiCatalog = {
    "$schema": "https://static.modelcontextprotocol.io/schemas/api-catalog/v1.json",
    "title": "Fayed Dental Clinic API Catalog",
    "description": "Public APIs and agent-accessible services for Fayed Dental Clinic (Cairo, Egypt).",
    "version": "1.0.0",
    "contact": {
      "name": "Dr. Mohamed Fayed Clinic",
      "url": `${baseUrl}/contact-us`,
    },
    "apis": [
      {
        "id": "markdown-content-negotiation-api",
        "title": "Agent Markdown Content API",
        "description": "Token-optimized Markdown service providing clean text translations of any clinic page without HTML syntax.",
        "version": "1.0",
        "endpoint": `${baseUrl}/api/markdown`,
        "protocol": "http",
        "authentication": { "required": false },
        "documentation": `${baseUrl}/llms.txt`,
      },
      {
        "id": "clinic-agent-skills-api",
        "title": "Clinic Agent Skills Directory",
        "description": "Directory of AI Agent Skills available for booking inquiries, service recommendations, and bilingual patient guidance.",
        "version": "1.0",
        "endpoint": `${baseUrl}/.well-known/agent-skills/index.json`,
        "protocol": "http",
        "authentication": { "required": false }
      }
    ]
  };

  return NextResponse.json(apiCatalog, {
    headers: {
      "Cache-Control": "public, max-age=3600, must-revalidate",
    },
  });
}
