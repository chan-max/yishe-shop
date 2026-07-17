import { SITE_URL } from "~/utils/seo";
import type { SitemapIndexEntry, SitemapUrl } from "./types";
import { toAbsoluteUrl } from "./url-utils";

const escapeXml = (value: unknown) =>
  String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

export const renderSitemapIndexXml = (entries: SitemapIndexEntry[]) => {
  const body = entries
    .map(
      (entry) => `  <sitemap>
    <loc>${escapeXml(toAbsoluteUrl(entry.loc))}</loc>${
      entry.lastmod ? `\n    <lastmod>${escapeXml(entry.lastmod)}</lastmod>` : ""
    }
  </sitemap>`,
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</sitemapindex>`;
};

export const renderSitemapUrlSetXml = (urls: SitemapUrl[]) => {
  const body = urls
    .map((url) => {
      const images = (url.images || [])
        .map(
          (image) => `    <image:image>
      <image:loc>${escapeXml(toAbsoluteUrl(image.loc))}</image:loc>${
        image.title
          ? `\n      <image:title>${escapeXml(image.title)}</image:title>`
          : ""
      }
    </image:image>`,
        )
        .join("\n");

      return `  <url>
    <loc>${escapeXml(toAbsoluteUrl(url.loc))}</loc>${
      url.lastmod ? `\n    <lastmod>${escapeXml(url.lastmod)}</lastmod>` : ""
    }${
      url.changefreq
        ? `\n    <changefreq>${escapeXml(url.changefreq)}</changefreq>`
        : ""
    }${
      typeof url.priority === "number"
        ? `\n    <priority>${url.priority.toFixed(1)}</priority>`
        : ""
    }${images ? `\n${images}` : ""}
  </url>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${body}
</urlset>`;
};

export const getProductSitemapUrl = (page: number) =>
  `${SITE_URL}/sitemaps/products/${page}.xml`;
