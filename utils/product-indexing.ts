export type PublishedProduct = {
  id?: string;
  isPublish?: boolean;
};

const normalizeText = (value?: string | null) => String(value || "").trim();

export const isPublishedProduct = (product?: PublishedProduct | null) =>
  Boolean(product?.isPublish === true && normalizeText(product.id));
