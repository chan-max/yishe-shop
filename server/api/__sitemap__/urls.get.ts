import { buildSitemapUrls } from "~/server/utils/sitemap";

export default defineSitemapEventHandler(() => buildSitemapUrls());
