import type { MetadataRoute } from "next";

const SITE_URL = "https://worthfightingfor.in";

// Served at /sitemap.xml. Only public (crawlable) pages are listed.
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const pages = ["", "/login", "/register", "/forgot-password"];

  return pages.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.6,
  }));
}
