<script lang="ts" setup>
import type { StorefrontPublishedProduct } from "~/composables/use-published-products";

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
      content: "衣设,1s.design,POD平台,印花设计,定制商品,私人定制,创意设计平台",
    },
  ],
});

const {
  fetchPublishedProducts,
  getPublishedProductImage,
  getPublishedProductPath,
} = usePublishedProducts();

const products = ref<StorefrontPublishedProduct[]>([]);

try {
  products.value = await fetchPublishedProducts({ pageSize: 10, random: true });
} catch (error) {
  console.error("获取关于页商品失败:", error);
}

const platformCapabilities = [
  {
    title: "商品市场",
    text: "集中展示衣设已发布的 POD 商品，让用户按品类、关键词和使用场景浏览。",
  },
  {
    title: "创意发现",
    text: "把服饰、家居、礼赠与数码周边放在同一个平台中，降低寻找灵感的成本。",
  },
  {
    title: "定制服务",
    text: "用户可以从任意商品详情发起同款定制，并自动带入参考图片和商品信息。",
  },
];

const platformFlow = [
  ["发现商品", "通过首页、分类和搜索浏览已发布商品"],
  ["查看详情", "了解商品图片、类型、关键词与相关信息"],
  ["收藏或定制", "保存喜欢的商品，或直接发起同款设计"],
  ["沟通需求", "围绕商品载体、用途和视觉方向继续确认"],
];

const serviceTargets = [
  ["个人用户", "寻找礼物、纪念品、穿搭与家居类定制商品"],
  ["内容创作者", "把插画、摄影、字体与 IP 作品延展到商品"],
  ["品牌与企业", "制作活动周边、员工礼赠与品牌商品系列"],
  ["设计需求方", "从真实商品出发，更清楚地说明设计需求"],
];
</script>

<template>
  <main class="about-market">
    <section class="about-market__hero">
      <div>
        <span>ABOUT 1S.DESIGN</span>
        <h1>衣设是一个 POD 商品商城与创意定制平台</h1>
        <p>
          平台连接已发布商品、创意内容与定制需求。用户可以先浏览真实商品，再决定购买方向、收藏灵感或发起同款定制。
        </p>
      </div>
      <aside>
        <strong>平台定位</strong>
        <p>POD 商品浏览、商品发现与定制服务的一体化入口。</p>
        <NuxtLink to="/products">
          进入商品市场
          <AppIcon name="arrow-right" :size="13" aria-hidden="true" />
        </NuxtLink>
      </aside>
    </section>

    <section
      v-if="products.length"
      class="about-product-strip"
      aria-label="衣设平台商品"
    >
      <NuxtLink
        v-for="product in products.slice(0, 8)"
        :key="product.id"
        :to="getPublishedProductPath(product)"
      >
        <img
          :src="getPublishedProductImage(product, 360)"
          :alt="product.title"
        />
        <span>{{ product.title }}</span>
      </NuxtLink>
    </section>

    <section class="about-market__section">
      <header class="about-section-head">
        <div>
          <span>PLATFORM STRUCTURE</span>
          <h2>不是单一商品页，而是一套完整的平台路径</h2>
        </div>
        <p>
          首页负责发现商品，分类和搜索负责缩小范围，商品详情承接内容与定制入口，用户中心负责收藏和个人信息。
        </p>
      </header>

      <div class="about-capability-grid">
        <article
          v-for="(capability, index) in platformCapabilities"
          :key="capability.title"
        >
          <span>{{ String(index + 1).padStart(2, "0") }}</span>
          <h3>{{ capability.title }}</h3>
          <p>{{ capability.text }}</p>
        </article>
      </div>
    </section>

    <section class="about-market__flow">
      <header class="about-section-head">
        <div>
          <span>HOW IT WORKS</span>
          <h2>从浏览商品到发起定制</h2>
        </div>
        <NuxtLink to="/design">
          进入定制页
          <AppIcon name="chevron-right" :size="12" aria-hidden="true" />
        </NuxtLink>
      </header>

      <ol>
        <li v-for="(item, index) in platformFlow" :key="item[0]">
          <span>{{ String(index + 1).padStart(2, "0") }}</span>
          <strong>{{ item[0] }}</strong>
          <p>{{ item[1] }}</p>
        </li>
      </ol>
    </section>

    <section class="about-market__section">
      <header class="about-section-head">
        <div>
          <span>WHO WE SERVE</span>
          <h2>面向不同规模的 POD 商品需求</h2>
        </div>
      </header>

      <div class="about-target-list">
        <article v-for="(target, index) in serviceTargets" :key="target[0]">
          <span>{{ String(index + 1).padStart(2, "0") }}</span>
          <strong>{{ target[0] }}</strong>
          <p>{{ target[1] }}</p>
        </article>
      </div>
    </section>

    <section class="about-market__cta">
      <div>
        <h2>从衣设已发布的商品开始浏览</h2>
        <p>找到喜欢的商品后，可以收藏、查看详情或直接发起同款定制。</p>
      </div>
      <div>
        <NuxtLink to="/products" class="about-cta-primary">
          浏览全部商品
          <AppIcon name="arrow-right" :size="13" aria-hidden="true" />
        </NuxtLink>
        <NuxtLink to="/design" class="about-cta-secondary"> 发起定制 </NuxtLink>
      </div>
    </section>
  </main>
</template>

<style scoped>
.about-market {
  min-height: 100vh;
  background: #f5f6f8;
  color: #202124;
  padding: 0.8rem 0 1rem;
}

.about-market__hero,
.about-product-strip,
.about-market__section,
.about-market__flow,
.about-market__cta {
  width: var(--ys-container);
  margin-inline: auto;
}

.about-market__hero {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(280px, 0.36fr);
  gap: clamp(2rem, 7vw, 7rem);
  align-items: center;
  min-height: 310px;
  border-radius: 6px;
  background: #151515;
  color: #fff;
  padding: clamp(1.5rem, 4vw, 3.5rem);
}

.about-market__hero span,
.about-section-head span {
  font-size: 0.62rem;
  font-weight: 800;
  letter-spacing: 0.08em;
}

.about-market__hero h1 {
  max-width: 780px;
  margin: 0.55rem 0 0;
  color: #fff;
  font-size: clamp(2rem, 4vw, 3.6rem);
  line-height: 1.08;
}

.about-market__hero > div > p {
  max-width: 680px;
  margin: 0.8rem 0 0;
  color: rgba(255, 255, 255, 0.82);
  font-size: 0.78rem;
  line-height: 1.75;
}

.about-market__hero aside {
  border-left: 1px solid rgba(255, 255, 255, 0.3);
  padding-left: 1.5rem;
}

.about-market__hero aside strong {
  font-size: 0.86rem;
}

.about-market__hero aside p {
  margin: 0.45rem 0 0;
  color: rgba(255, 255, 255, 0.72);
  font-size: 0.7rem;
  line-height: 1.65;
}

.about-market__hero aside a {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  margin-top: 0.9rem;
  color: #fff;
  font-size: 0.7rem;
  font-weight: 800;
  text-decoration: none;
}

.about-product-strip {
  display: grid;
  grid-template-columns: repeat(8, minmax(0, 1fr));
  gap: 0.6rem;
  margin-top: 0.8rem;
  border-radius: 6px;
  background: #fff;
  padding: 0.8rem;
}

.about-product-strip a {
  min-width: 0;
  color: #222;
  text-decoration: none;
}

.about-product-strip img {
  width: 100%;
  aspect-ratio: 1;
  border-radius: 5px;
  object-fit: cover;
}

.about-product-strip span {
  display: block;
  overflow: hidden;
  margin-top: 0.35rem;
  font-size: 0.62rem;
  font-weight: 700;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.about-market__section,
.about-market__flow {
  margin-top: 0.8rem;
  border-radius: 6px;
  background: #fff;
  padding: clamp(1.2rem, 3vw, 2.2rem);
}

.about-section-head {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(260px, 0.42fr);
  gap: 2rem;
  align-items: end;
  margin-bottom: 1.2rem;
}

.about-section-head h2 {
  margin: 0.4rem 0 0;
  font-size: clamp(1.45rem, 2.7vw, 2.3rem);
  line-height: 1.15;
}

.about-section-head > p {
  margin: 0;
  color: #71757a;
  font-size: 0.72rem;
  line-height: 1.7;
}

.about-section-head > a {
  display: inline-flex;
  align-items: center;
  justify-self: end;
  gap: 0.3rem;
  color: #151515;
  font-size: 0.7rem;
  font-weight: 800;
  text-decoration: none;
}

.about-capability-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.7rem;
}

.about-capability-grid article {
  min-height: 190px;
  border: 1px solid #e0e2e5;
  border-radius: 5px;
  padding: 1rem;
}

.about-capability-grid article > span,
.about-target-list article > span,
.about-market__flow li > span {
  color: #7b8086;
  font-size: 0.62rem;
  font-weight: 800;
}

.about-capability-grid h3 {
  margin: 2.5rem 0 0;
  font-size: 1.1rem;
}

.about-capability-grid p,
.about-target-list p,
.about-market__flow li p {
  margin: 0.45rem 0 0;
  color: #6f747a;
  font-size: 0.7rem;
  line-height: 1.65;
}

.about-market__flow {
  background: #f1f1f1;
}

.about-market__flow ol {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1px;
  margin: 0;
  padding: 0;
  background: #d9d9d9;
  list-style: none;
}

.about-market__flow li {
  min-height: 160px;
  background: #f1f1f1;
  padding: 1rem;
}

.about-market__flow li strong {
  display: block;
  margin-top: 2rem;
  font-size: 0.86rem;
}

.about-target-list {
  border-top: 1px solid #e0e2e5;
}

.about-target-list article {
  display: grid;
  grid-template-columns: 50px minmax(130px, 0.35fr) minmax(0, 1fr);
  gap: 1rem;
  align-items: center;
  min-height: 70px;
  border-bottom: 1px solid #e0e2e5;
}

.about-target-list strong {
  font-size: 0.78rem;
}

.about-target-list p {
  margin: 0;
}

.about-market__cta {
  display: flex;
  min-height: 140px;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  margin-top: 0.8rem;
  border-radius: 6px;
  background: #151515;
  color: #fff;
  padding: 1.5rem clamp(1.2rem, 3vw, 2.2rem);
}

.about-market__cta h2 {
  margin: 0;
  color: #fff;
  font-size: clamp(1.3rem, 2.3vw, 1.9rem);
}

.about-market__cta p {
  margin: 0.35rem 0 0;
  color: rgba(255, 255, 255, 0.62);
  font-size: 0.68rem;
}

.about-market__cta > div:last-child {
  display: flex;
  gap: 0.5rem;
}

.about-market__cta a {
  display: inline-flex;
  min-height: 2.6rem;
  align-items: center;
  justify-content: center;
  gap: 0.45rem;
  border: 1px solid rgba(255, 255, 255, 0.35);
  border-radius: 4px;
  padding: 0 0.9rem;
  font-size: 0.7rem;
  font-weight: 800;
  text-decoration: none;
}

.about-cta-primary {
  border-color: #fff !important;
  background: #fff;
  color: #151515;
}

.about-cta-secondary {
  color: #fff;
}

@media (max-width: 900px) {
  .about-product-strip {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }

  .about-market__flow ol {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 700px) {
  .about-market {
    padding-top: 0;
  }

  .about-market__hero,
  .about-product-strip,
  .about-market__section,
  .about-market__flow,
  .about-market__cta {
    width: 100%;
    border-radius: 0;
  }

  .about-market__hero,
  .about-section-head,
  .about-capability-grid {
    grid-template-columns: 1fr;
  }

  .about-market__hero {
    gap: 1.4rem;
    min-height: 0;
    padding: 1.5rem 1rem;
  }

  .about-market__hero h1 {
    font-size: 2rem;
  }

  .about-market__hero aside {
    border-top: 1px solid rgba(255, 255, 255, 0.3);
    border-left: 0;
    padding: 1rem 0 0;
  }

  .about-product-strip,
  .about-market__section,
  .about-market__flow,
  .about-market__cta {
    margin-top: 0.55rem;
    border-top: 6px solid #f3f4f6;
  }

  .about-section-head {
    gap: 0.7rem;
  }

  .about-section-head > a {
    justify-self: start;
  }

  .about-market__flow ol {
    grid-template-columns: 1fr;
  }

  .about-market__flow li {
    min-height: 120px;
  }

  .about-target-list article {
    grid-template-columns: 36px minmax(0, 1fr);
    padding: 0.75rem 0;
  }

  .about-target-list p {
    grid-column: 2;
  }

  .about-market__cta {
    align-items: flex-start;
    flex-direction: column;
    padding: 1.3rem 1rem;
  }

  .about-market__cta > div:last-child {
    width: 100%;
    flex-direction: column;
  }
}
</style>
