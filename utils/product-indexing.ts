export type IndexableProduct = {
  id?: string;
  name?: string;
  type?: string;
  images?: string[];
  slug?: string;
  seoTitle?: string;
  seoDescription?: string;
  isPublish?: boolean;
};

const normalizeText = (value?: string | null) => String(value || "").trim();

export const isIndexableProduct = (product?: IndexableProduct | null) => {
  if (!product) return false;

  const productType = normalizeText(product.type);
  const images = Array.isArray(product.images)
    ? product.images.filter((image) => normalizeText(image))
    : [];

  return Boolean(
    product.isPublish === true &&
      normalizeText(product.id) &&
      normalizeText(product.name) &&
      productType &&
      !/测试|模版|模板/i.test(productType) &&
      normalizeText(product.slug) &&
      normalizeText(product.seoTitle) &&
      normalizeText(product.seoDescription) &&
      images.length,
  );
};
