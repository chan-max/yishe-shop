const safeDecode = (value?: string | null) => {
  if (!value) return "";
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
};

const normalizeProductSlug = (value?: string | null) =>
  safeDecode(value)
    .trim()
    .replace(/^\/+|\/+$/g, "");

export const getProductPath = (product?: { id?: string; slug?: string } | null) => {
  const id = String(product?.id || "").trim();
  if (!id) return "/products";
  const rawSlug = normalizeProductSlug(product?.slug);
  return rawSlug ? `/product/${id}/${encodeURIComponent(rawSlug)}` : `/product/${id}`;
};

export const getProductAbsoluteUrl = (
  product: { id?: string; slug?: string },
  siteUrl: string,
) => `${siteUrl}${getProductPath(product)}`;
