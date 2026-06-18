import type { MetadataRoute } from "next";

const SITE_URL = "https://worthfightingfor.in";

// Served at /robots.txt. Public marketing + auth pages are crawlable;
// the signed-in app surface is kept out of search indexes.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/home",
        "/connected",
        "/invite",
        "/requests",
        "/onboarding",
        "/welcome",
        "/memories",
        "/settings",
        "/store",
        "/session",
        "/sessions",
      ],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
