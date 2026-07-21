export type SiteNavigationIcon = "box" | "palette" | "info" | "mail" | "book";

export type SiteSeoPage = {
  title: string;
  description: string;
  keywords: string;
  url: string;
  type?: "website" | "article";
};

export type SiteFeaturedProduct = {
  id: string;
  title: string;
  description?: string;
  category: string;
  imageUrl?: string;
  type?: string;
  code?: string;
  slug?: string;
  creator?: string;
  likes?: number;
};

export type SiteHomeContent = {
  copy: {
    creatorFallback: string;
    srTitle: string;
    hero: {
      brand: string;
      eyebrow: string;
      title: string;
      description: string;
      primaryAction: { label: string; to: string };
      secondaryAction: { label: string; to: string };
    };
    finder: { eyebrow: string; title: string; description: string };
    featureFallbackDescription: string;
    runway: { eyebrow: string; title: string; description: string };
    editorialsAriaLabel: string;
    journey: { ariaLabel: string; eyebrow: string; title: string };
    universe: { ariaLabel: string; eyebrow: string; title: string };
    collection: { ariaLabel: string; eyebrow: string; title: string };
    feed: { eyebrow: string; title: string };
  };
  fallbackProducts: SiteFeaturedProduct[];
  categoryTiles: Array<{ label: string; keyword: string }>;
  productFinderGroups: Array<{
    key: string;
    label: string;
    keyword: string;
    hint: string;
  }>;
  modules: Array<{
    key: string;
    eyebrow: string;
    title: string;
    keyword: string;
    text: string;
    href: string;
    limit: number;
  }>;
  editorials: Array<{ title: string; subtitle: string; href: string }>;
  journeySteps: Array<{ title: string; text: string }>;
};

export type SiteDefinition = {
  id: string;
  brand: {
    name: string;
    nameEn: string;
    fullName: string;
    organizationName: string;
    author: string;
    logo: string;
    favicon: string;
    defaultImage: string;
  };
  urls: {
    site: string;
    apiBase: string;
  };
  locale: string;
  social: {
    twitter?: string;
  };
  seo: {
    description: string;
    twitterDescription: string;
    keywords: string;
    themeColor: string;
    robots: string;
    home: SiteSeoPage;
  };
  announcement: {
    enabled: boolean;
    text: string;
    actionLabel: string;
    actionTo: string;
  };
  navigation: Array<{
    label: string;
    to: string;
    icon: SiteNavigationIcon;
  }>;
  footer: {
    newsletterEyebrow: string;
    newsletterTitle: string;
    newsletterPlaceholder: string;
    newsletterAction: string;
    description: string;
    email: string;
    groups: Record<string, Array<{ name: string; href: string }>>;
  };
  features: {
    announcement: boolean;
    auth: boolean;
    favorites: boolean;
    newsletter: boolean;
  };
  theme: {
    stylesheet: string;
  };
  paths: {
    components: string;
  };
  home: SiteHomeContent;
};
