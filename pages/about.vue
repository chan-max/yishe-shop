<script lang="ts" setup>
definePageMeta({ layout: "page" });

useHead({
  titleTemplate: "",
  title: "关于衣设 - POD 印花与定制设计开放平台",
  meta: [
    {
      name: "description",
      content:
        "了解衣设 yishe，一个面向品牌、创作者和个人用户的 POD 印花、定制商品与创意设计开放平台。",
    },
    {
      name: "keywords",
      content:
        "衣设,1s.design,POD平台,印花设计,定制商品,私人定制,创意设计平台",
    },
  ],
});

const values = [
  ["POD first", "围绕服饰、礼赠、家居和品牌周边组织商品与视觉内容。"],
  ["Custom ready", "每个方向都保留继续定制、打样和组合成系列的空间。"],
  ["Searchable", "页面结构面向用户浏览，也面向搜索引擎清晰理解。"],
];
</script>

<template>
  <main class="about-page">
    <section class="about-hero">
      <div>
        <span>ABOUT 1S.DESIGN</span>
        <h1>关于衣设</h1>
      </div>
      <p>
        衣设连接 POD 印花、定制商品、创意图案和品牌周边。我们把商品展示、设计灵感和可收录内容组织在同一个平台里，让创意更快变成真实产品。
      </p>
    </section>

    <section class="about-band">
      <strong>POD PRINT</strong>
      <strong>CUSTOM GOODS</strong>
      <strong>PRIVATE DESIGN</strong>
      <strong>BRAND MERCH</strong>
    </section>

    <section class="about-grid">
      <article v-for="item in values" :key="item[0]">
        <span>{{ item[0] }}</span>
        <p>{{ item[1] }}</p>
      </article>
    </section>

    <section class="about-story">
      <h2>从一个图案，延展到一组商品。</h2>
      <p>
        适合独立品牌、内容创作者、活动企划和私人礼物。衣设关注图案如何落到具体商品、材质、场景和展示页面，让每个入口都能服务浏览、转化和 SEO。
      </p>
      <NuxtLink to="/products">浏览 POD 商品</NuxtLink>
    </section>
  </main>
</template>

<style scoped>
.about-page {
  width: var(--ys-container);
  margin: 0 auto;
  padding: clamp(2rem, 5vw, 4.5rem) 0 clamp(3rem, 7vw, 6rem);
  color: #111;
}

.about-hero {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(320px, 0.72fr);
  gap: clamp(1.5rem, 5vw, 4rem);
  align-items: end;
}

.about-hero span,
.about-grid span {
  color: #777;
  font-size: 0.75rem;
  font-weight: 900;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.about-hero h1 {
  margin: 0.8rem 0 0;
  color: #000;
  font-size: clamp(3.2rem, 9vw, 7rem);
  line-height: 0.9;
  font-weight: 900;
}

.about-hero p,
.about-story p,
.about-grid p {
  margin: 0;
  color: #555;
  line-height: 1.85;
}

.about-band {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1px;
  overflow: hidden;
  margin-top: clamp(2rem, 5vw, 4rem);
  border-radius: 20px;
  background: #222;
}

.about-band strong {
  display: grid;
  place-items: center;
  min-height: 5.6rem;
  background: #000;
  color: #fff;
  font-size: clamp(1rem, 2vw, 1.5rem);
  text-align: center;
}

.about-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1rem;
  margin-top: 1rem;
}

.about-grid article,
.about-story {
  border-radius: 20px;
  background: #f0f0f0;
  padding: clamp(1.2rem, 3vw, 2rem);
}

.about-grid p {
  margin-top: 1.4rem;
  color: #111;
  font-size: clamp(1.1rem, 2vw, 1.55rem);
  line-height: 1.25;
  font-weight: 800;
}

.about-story {
  display: grid;
  grid-template-columns: minmax(0, 0.9fr) minmax(320px, 1fr) auto;
  gap: 1.25rem;
  align-items: center;
  margin-top: 1rem;
  background: #000;
  color: #fff;
}

.about-story h2 {
  margin: 0;
  color: #fff;
  font-size: clamp(2rem, 4vw, 3.8rem);
  line-height: 0.98;
}

.about-story p {
  color: rgba(255, 255, 255, 0.68);
}

.about-story a {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 3rem;
  border-radius: 999px;
  background: #fff;
  color: #111;
  font-weight: 900;
  padding: 0 1.2rem;
  text-decoration: none;
  white-space: nowrap;
}

@media (max-width: 860px) {
  .about-hero,
  .about-story,
  .about-grid,
  .about-band {
    grid-template-columns: 1fr;
  }
}
</style>
