import { activeSiteConfig } from "../sites";

const toSiteUrl = (path: string) =>
  /^https?:\/\//i.test(path)
    ? path
    : `${activeSiteConfig.urls.site}${path.startsWith("/") ? path : `/${path}`}`;

export const SITE_URL = activeSiteConfig.urls.site;
export const SITE_NAME = activeSiteConfig.seo.home.title;
export const SITE_OG_NAME = activeSiteConfig.brand.fullName;
export const SITE_ORGANIZATION_NAME = activeSiteConfig.brand.organizationName;
export const SITE_AUTHOR = activeSiteConfig.brand.author;
export const SITE_DESCRIPTION = activeSiteConfig.seo.description;
export const SITE_TWITTER_DESCRIPTION =
  activeSiteConfig.seo.twitterDescription;
export const SITE_KEYWORDS = activeSiteConfig.seo.keywords;
export const SITE_DEFAULT_IMAGE = toSiteUrl(
  activeSiteConfig.brand.defaultImage,
);
export const SITE_LOGO = toSiteUrl(activeSiteConfig.brand.logo);
export const SITE_FAVICON = activeSiteConfig.brand.favicon;
export const SITE_THEME_COLOR = activeSiteConfig.seo.themeColor;
export const SITE_LOCALE = activeSiteConfig.locale;
export const SITE_OG_LOCALE = SITE_LOCALE.replace("-", "_");
export const SITE_API_BASE = activeSiteConfig.urls.apiBase;
export const SITE_TWITTER_HANDLE = activeSiteConfig.social.twitter || "";
export const SITE_SEARCH_URL_TEMPLATE = `${SITE_URL}/products/{search_term_string}`;
export const SITE_ROBOTS = activeSiteConfig.seo.robots;
