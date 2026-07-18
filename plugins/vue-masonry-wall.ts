export default defineNuxtPlugin(async (nuxtApp) => {
  const masonryWallModule = await import("@yeger/vue-masonry-wall");
  const masonryExportName = ["Masonry", "Wall"].join("");
  const MasonryWall =
    (masonryWallModule as any)[masonryExportName] ||
    (masonryWallModule as any).default;

  nuxtApp.vueApp.component("MasonryWall", MasonryWall);
});
