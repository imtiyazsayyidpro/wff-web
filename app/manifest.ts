import type { MetadataRoute } from "next";

// Web App Manifest — makes the site installable as a PWA.
// Next.js serves this at /manifest.webmanifest and auto-injects <link rel="manifest">.
// Icons are read from /public/icons (see the README note for the files to drop in).
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Worth Fighting For",
    short_name: "WFF",
    description:
      "A calm AI counselor gently guides a turn-based conversation between the two of you — so the hard moments bring you closer.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    // Match the "First Light" day palette (the splash/background while loading).
    background_color: "#fcf8f6",
    theme_color: "#fcf8f6",
    categories: ["lifestyle", "health"],
    icons: [
      {
        src: "/icons/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-maskable-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icons/icon-maskable-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
