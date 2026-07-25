import type { NavigationGuard } from 'vue-router'
export type MiddlewareKey = "product-or-search" | "public-user-auth"
declare module 'nuxt/app' {
  interface PageMeta {
    middleware?: MiddlewareKey | NavigationGuard | Array<MiddlewareKey | NavigationGuard>
  }
}