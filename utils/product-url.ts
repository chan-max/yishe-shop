const normalizeProductSlug = (value?: string | null) =>
  String(value || "")
    .trim()
    .replace(/^\/+|\/+$/g, "");

export const getProductPath = (product?: { id?: string; slug?: string } | null) => {
  const id = String(product?.id || "").trim();
  if (!id) return "/products";
  const slug = normalizeProductSlug(product?.slug);
  return slug ? `/product/${id}/${encodeURIComponent(slug)}` : `/product/${id}`;
};

export const getProductAbsoluteUrl = (
  product: { id?: string; slug?: string },
  siteUrl: string,
) => `${siteUrl}${getProductPath(product)}`;
