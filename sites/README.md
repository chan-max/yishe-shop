# Storefront Sites

`sites/` contains the parts of a storefront that are expected to change between
brands. Shared product, account, SEO and sitemap behavior stays in the root core
directories.

## Add A Site

1. Copy `sites/yishe` to `sites/<site-id>`.
2. Replace its brand, SEO, navigation, footer, homepage content and theme tokens.
3. Register the new definition in `sites/index.ts`.
4. Supply API and Open API credentials through deployment environment variables.
5. Add structural UI differences under the site's `components/` directory.

Site components are auto-registered with the `Site` prefix. For example,
`sites/yishe/components/ProductCard.vue` becomes `<SiteProductCard />`.

Do not duplicate stores, API clients, middleware, product indexing or sitemap
logic inside a site directory.
