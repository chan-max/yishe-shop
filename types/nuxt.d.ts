import { FetchOptions } from 'ofetch'

declare module '#app' {
  interface NuxtApp {
    $customFetch: typeof $fetch
  }
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $customFetch: typeof $fetch
  }
} 