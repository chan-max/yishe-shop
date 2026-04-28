import { SITE_URL } from "~/utils/seo";

export const toIsoDate = (value?: string) => {
  if (!value) return undefined;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? undefined : date.toISOString();
};

export const toAbsoluteUrl = (value?: string) => {
  const url = String(value || "").trim();
  if (!url) return "";
  if (/^https?:\/\//i.test(url)) return url;
  if (url.startsWith("//")) return `https:${url}`;
  return new URL(url.startsWith("/") ? url : `/${url}`, SITE_URL).toString();
};
