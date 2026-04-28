const PRODUCT_UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

const decodePathKeyword = (value: string) => {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
};

export default defineNuxtRouteMiddleware((to) => {
  const rawId = Array.isArray(to.params.id) ? to.params.id[0] : to.params.id;
  const id = String(rawId || "").trim();

  if (!id || PRODUCT_UUID_RE.test(id)) {
    return;
  }

  return navigateTo(`/products/${encodeURIComponent(decodePathKeyword(id))}`, {
    redirectCode: 301,
  });
});
