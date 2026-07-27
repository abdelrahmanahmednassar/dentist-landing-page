import { NextResponse } from "next/server";

export async function GET() {
  const mcpCard = {
    "$schema": "https://static.modelcontextprotocol.io/schemas/mcp-server-card/v1.json",
    "version": "1.0",
    "protocolVersion": "2025-06-18",
    "serverInfo": {
      "name": "fayed-dental-clinic-mcp-server",
      "title": "Fayed Dental Clinic Agent Server",
      "version": "1.0.0"
    },
    "description": "MCP server card providing tool capabilities to query specialized dental procedures, cosmetic treatments, operating hours, and booking details for Fayed Dental Clinic in Cairo, Egypt.",
    "transport": {
      "type": "streamable-http",
      "endpoint": "/api/markdown"
    },
    "authentication": {
      "required": false
    },
    "tools": [
      {
        "name": "search_clinic_services",
        "title": "Search Clinic Services",
        "description": "Search and retrieve bilingual (English & Arabic) details, benefits, and technologies for dental implants, 3N veneers, hybrid veneers, and cosmetic dentistry.",
        "inputSchema": {
          "type": "object",
          "properties": {
            "service_name": {
              "type": "string",
              "description": "Name of the service (e.g., 'teeth-implants', '3n-veneers', 'teeth-beautification', 'hybrid-veneers')"
            },
            "locale": {
              "type": "string",
              "enum": ["en", "ar"],
              "default": "ar"
            }
          },
          "required": ["service_name"]
        }
      },
      {
        "name": "get_doctor_credentials",
        "title": "Get Doctor Credentials & Team Bio",
        "description": "Retrieve comprehensive professional background and technological equipment for Dr. Mohamed Fayed and the clinical team.",
        "inputSchema": {
          "type": "object",
          "properties": {
            "locale": { "type": "string", "enum": ["en", "ar"], "default": "ar" }
          }
        }
      },
      {
        "name": "get_booking_hours_location",
        "title": "Get Booking Details & Location",
        "description": "Retrieve clinic operating schedule, physical address in Cairo, telephone number, and direct WhatsApp scheduling links for patients.",
        "inputSchema": {
          "type": "object",
          "properties": {
            "locale": { "type": "string", "enum": ["en", "ar"], "default": "ar" }
          }
        }
      },
      {
        "name": "list_dental_blogs",
        "title": "List Dental Care Articles & Advice",
        "description": "List published dental knowledge blog posts in clean Markdown format.",
        "inputSchema": {
          "type": "object",
          "properties": {}
        }
      }
    ]
  };

  return NextResponse.json(mcpCard, {
    headers: {
      "Cache-Control": "public, max-age=3600, must-revalidate",
    },
  });
}
