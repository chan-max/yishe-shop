# Yishe Site Layer

This directory contains the brand-specific surface for the Yishe storefront.

## Edit Here

- Brand names, domain-facing copy, navigation, footer and homepage content
- Theme tokens, fonts and brand asset paths
- Site-specific UI components and page composition added under this directory
- Feature visibility that does not change backend contracts

## Keep In Core

- API request contracts and authentication
- Product, account and favorite state management
- Product publication and indexing rules
- SEO/JSON-LD serializers and sitemap generation
- Shared middleware, image helpers and URL builders

New sites should copy this directory, register their config in `sites/index.ts`,
and supply their own deployment environment variables. Do not place API keys or
other secrets in a site config.
