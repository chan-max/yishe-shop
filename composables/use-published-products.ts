import { api } from "~/utils/api";
import { getPreviewImageUrl } from "~/utils/image";
import { getProductPath } from "~/utils/product-url";

export type StorefrontPublishedProduct = {
  id: string;
  title: string;
  description: string;
  category: string;
  type: string;
  imageUrl: string;
  code: string;
  slug: string;
  creator: string;
  price: number | null;
  originalPrice: number | null;
};

type FetchPublishedProductOptions = {
  pageSize?: number;
  searchText?: string;
  type?: string;
  category?: string;
  random?: boolean;
};

const toPrice = (value: unknown) => {
  const price = Number(value || 0);
  return Number.isFinite(price) && price > 0 ? price : null;
};

const normalizeProduct = (product: any): StorefrontPublishedProduct => {
  const images = Array.isArray(product?.images) ? product.images : [];
  const imageUrl =
    images.find(
      (image: unknown) => typeof image === "string" && image.trim().length > 0,
    ) || "";
  const salePrice = toPrice(product?.salePrice);
  const price = salePrice || toPrice(product?.price);
  const originalPrice = toPrice(product?.price);

  return {
    id: String(product?.id || ""),
    title: String(product?.name || "POD 定制商品"),
    description: String(product?.description || ""),
    category: String(product?.type || "POD 商品"),
    type: String(product?.type || "POD 商品"),
    imageUrl,
    code: String(product?.code || ""),
    slug: String(product?.slug || ""),
    creator: String(product?.creator || "衣设创作者"),
    price,
    originalPrice:
      originalPrice && price && originalPrice > price ? originalPrice : null,
  };
};

export const usePublishedProducts = () => {
  const fetchPublishedProducts = async (
    options: FetchPublishedProductOptions = {},
  ) => {
    const response = await api.productList.getPage({
      page: 1,
      pageSize: options.pageSize || 24,
      isPublish: true,
      includeRelations: false,
      random: options.random ?? true,
      type: options.type || options.category,
      // 如果指定了精确的 type 文字类型，则不附带 searchText 模糊搜，保证只过滤该类型商品
      ...(options.type ? {} : { searchText: options.searchText, search: options.searchText }),
    });

    if (
      response.code !== 0 &&
      response.status !== true &&
      response.code !== 200
    ) {
      return [];
    }

    return ((response.data as any)?.list || [])
      .map(normalizeProduct)
      .filter(
        (product: StorefrontPublishedProduct) => product.id && product.imageUrl,
      );
  };

  const getPublishedProductImage = (
    product: StorefrontPublishedProduct,
    width = 640,
  ) =>
    getPreviewImageUrl(product.imageUrl, {
      width,
      quality: 84,
      format: "webp",
    }) || product.imageUrl;

  const getPublishedProductPath = (product: StorefrontPublishedProduct) =>
    getProductPath(product);

  return {
    fetchPublishedProducts,
    getPublishedProductImage,
    getPublishedProductPath,
  };
};
