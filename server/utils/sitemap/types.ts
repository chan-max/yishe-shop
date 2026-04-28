export type SitemapChangefreq = "daily" | "weekly" | "monthly";

export type SitemapImage = {
  loc: string;
  title?: string;
};

export type SitemapUrl = {
  loc: string;
  lastmod?: string;
  changefreq?: SitemapChangefreq;
  priority?: number;
  images?: SitemapImage[];
};

export type ProductSitemapItem = {
  id?: string;
  name?: string;
  type?: string;
  images?: string[];
  tags?: string;
  keywords?: string;
  searchKeywords?: string;
  isActive?: boolean;
  isPublish?: boolean;
  createTime?: string;
  updateTime?: string;
};

export type ProductListResponse = {
  code?: number;
  status?: boolean;
  data?: {
    list?: ProductSitemapItem[];
    total?: number;
  };
};
