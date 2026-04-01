const OPEN_API_KEY_STORAGE_KEYS = [
  "open-api-key",
  "openApiKey",
  "x-open-api-key",
  "xOpenApiKey",
];

type RuntimeConfigLike = {
  public?: {
    openApiKey?: string;
  };
  openApiKey?: string;
};

function normalizeOpenApiKey(value?: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

export function resolveOpenApiKey(runtimeConfig?: RuntimeConfigLike): string {
  if (process.client && typeof window !== "undefined") {
    for (const key of OPEN_API_KEY_STORAGE_KEYS) {
      const value = normalizeOpenApiKey(window.localStorage.getItem(key));
      if (value) {
        return value;
      }
    }

    const nuxtPayload = (window as typeof window & { __NUXT__?: any }).__NUXT__;
    const payloadValue = normalizeOpenApiKey(nuxtPayload?.config?.public?.openApiKey);
    if (payloadValue) {
      return payloadValue;
    }
  }

  return (
    normalizeOpenApiKey(runtimeConfig?.public?.openApiKey) ||
    normalizeOpenApiKey(runtimeConfig?.openApiKey) ||
    normalizeOpenApiKey(process.env.NUXT_PUBLIC_OPEN_API_KEY)
  );
}
