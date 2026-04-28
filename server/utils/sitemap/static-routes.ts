import type { SitemapUrl } from "./types";

export const staticSitemapRoutes: SitemapUrl[] = [
  { loc: "/", changefreq: "daily", priority: 1 },
  { loc: "/products", changefreq: "daily", priority: 0.95 },
  { loc: "/design", changefreq: "weekly", priority: 0.85 },
  { loc: "/portfolio", changefreq: "weekly", priority: 0.8 },
  { loc: "/free-design", changefreq: "weekly", priority: 0.78 },
  { loc: "/ai-lab", changefreq: "weekly", priority: 0.75 },
  { loc: "/post", changefreq: "weekly", priority: 0.78 },
  { loc: "/pricing", changefreq: "monthly", priority: 0.68 },
  { loc: "/about", changefreq: "monthly", priority: 0.62 },
  { loc: "/contact", changefreq: "monthly", priority: 0.62 },
];

export const buildStaticSitemapUrls = (now = new Date().toISOString()) =>
  staticSitemapRoutes.map((route) => ({
    lastmod: now,
    ...route,
  }));
