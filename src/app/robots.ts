import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [],
    },
    host: "https://fayed.clinic",
    sitemap: "https://fayed.clinic/sitemap.xml",
  };
}
