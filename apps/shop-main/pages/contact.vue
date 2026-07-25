<script lang="ts" setup>
import { SITE_URL } from "~/utils/seo";

definePageMeta({ layout: "page" });

useHead({
  titleTemplate: "",
  title: "联系我们 - 衣设 yishe POD 定制设计",
  meta: [
    {
      name: "description",
      content:
        "联系衣设 yishe，咨询 POD 印花设计、私人定制、品牌周边、礼品定制和创意设计合作。",
    },
    {
      name: "keywords",
      content:
        "联系衣设,POD定制,印花设计合作,私人定制,品牌周边,礼品定制,创意设计服务,1s.design",
    },
  ],
});

const founderInfo = {
  website: SITE_URL,
};

const socialPlatforms = ref([
  { name: "微信", mark: "微", image: "/contact-img/weixin.jpg", color: "#07c160" },
  { name: "微博", mark: "博", image: "/contact-img/weibo.png", color: "#e6162d" },
  { name: "小红书", mark: "红", image: "/contact-img/xiaohongshu.jpg", color: "#ff2442" },
  { name: "抖音", mark: "抖", image: "/contact-img/douyin.webp", color: "#000000" },
  { name: "快手", mark: "快", image: "/contact-img/kuaishou.webp", color: "#ff6600" },
]);

const showQRDialog = ref(false);
const selectedPlatform = ref<(typeof socialPlatforms.value)[number] | null>(null);

const openQRCode = (platform: (typeof socialPlatforms.value)[number]) => {
  selectedPlatform.value = platform;
  showQRDialog.value = true;
};

const closeQRDialog = () => {
  showQRDialog.value = false;
  selectedPlatform.value = null;
};
</script>

<template>
  <main class="contact-page">
    <section class="contact-hero">
      <div>
        <span>联系 1S.DESIGN</span>
        <h1>发起 POD 定制合作</h1>
      </div>
      <p>
        适合印花图案、品牌周边、私人礼赠、POD 商品上新和创意设计合作。把需求、商品载体和参考方向发来，我们会一起把它落到具体页面与产品。
      </p>
    </section>

    <section class="contact-grid">
      <article class="contact-card contact-card--dark">
        <span>网站</span>
        <a :href="founderInfo.website" target="_blank">{{ founderInfo.website }}</a>
      </article>
    </section>

    <section class="contact-socials">
      <div>
        <span>社交平台</span>
        <h2>选择一个平台继续沟通</h2>
      </div>
      <div class="social-links">
        <button
          v-for="platform in socialPlatforms"
          :key="platform.name"
          type="button"
          class="social-link"
          @click="openQRCode(platform)"
        >
          <span class="social-mark" :style="{ color: platform.color }">{{ platform.mark }}</span>
          <span>{{ platform.name }}</span>
        </button>
      </div>
    </section>

    <Teleport to="body">
      <Transition name="dialog">
        <div v-if="showQRDialog" class="qr-dialog-overlay" @click="closeQRDialog">
          <div class="qr-dialog" @click.stop>
            <button class="qr-close" type="button" @click="closeQRDialog">
              <span class="ui-icon" aria-hidden="true">×</span>
            </button>
            <div v-if="selectedPlatform" class="qr-content">
              <span class="qr-mark" :style="{ color: selectedPlatform.color }">{{ selectedPlatform.mark }}</span>
              <h3>{{ selectedPlatform.name }}</h3>
              <img :src="selectedPlatform.image" :alt="`${selectedPlatform.name} 二维码`" />
              <p>使用 {{ selectedPlatform.name }} 扫描二维码</p>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </main>
</template>

<style scoped>
.contact-page {
  width: var(--ys-container);
  margin: 0 auto;
  padding: clamp(1.5rem, 4vw, 3rem) 0 clamp(2rem, 5vw, 4rem);
  color: #111;
}

.contact-hero {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(280px, 0.72fr);
  gap: clamp(1rem, 3vw, 2.5rem);
  align-items: end;
}

.contact-hero span,
.contact-card span,
.contact-socials span {
  color: #777;
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.contact-hero h1 {
  margin: 0.5rem 0 0;
  color: #000;
  font-size: clamp(2rem, 6vw, 4.5rem);
  line-height: 0.95;
  font-weight: 900;
}

.contact-hero p {
  margin: 0;
  color: #555;
  font-size: 0.82rem;
  line-height: 1.7;
}

.contact-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 0.75rem;
  margin-top: clamp(1.5rem, 3vw, 2.5rem);
}

.contact-card,
.contact-socials {
  border-radius: 10px;
  background: #f0f0f0;
  padding: clamp(1rem, 2vw, 1.5rem);
}

.contact-card {
  display: grid;
  align-content: space-between;
  min-height: 140px;
}

.contact-card--dark {
  background: #000;
  color: #fff;
}

.contact-card a {
  color: inherit;
  font-size: clamp(0.82rem, 1.3vw, 1rem);
  font-weight: 700;
  overflow-wrap: anywhere;
  text-decoration: none;
}

.contact-card:not(.contact-card--dark) a {
  color: #111;
}

.contact-socials {
  display: grid;
  grid-template-columns: minmax(0, 0.8fr) minmax(280px, 1fr);
  gap: 0.75rem;
  align-items: center;
  margin-top: 0.75rem;
}

.contact-socials h2 {
  margin: 0.4rem 0 0;
  color: #000;
  font-size: clamp(1.1rem, 3vw, 2rem);
  line-height: 1.15;
}

.social-links {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.social-link {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  min-height: 2.2rem;
  border: 0;
  border-radius: 6px;
  background: #fff;
  color: #111;
  font-weight: 700;
  font-size: 0.78rem;
  padding: 0 0.8rem;
}

.qr-dialog-overlay {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: grid;
  place-items: center;
  background: rgba(0, 0, 0, 0.55);
  padding: 0.75rem;
}

.qr-dialog {
  position: relative;
  width: min(92vw, 360px);
  border-radius: 14px;
  background: #fff;
  padding: 1.5rem;
}

.qr-close {
  position: absolute;
  right: 0.75rem;
  top: 0.75rem;
  border: 0;
  border-radius: 50%;
  background: #f0f0f0;
  width: 1.8rem;
  height: 1.8rem;
}

.qr-content {
  display: grid;
  justify-items: center;
  gap: 0.75rem;
  text-align: center;
}

.qr-content img {
  width: min(100%, 220px);
  border-radius: 10px;
}

.dialog-enter-active,
.dialog-leave-active {
  transition: opacity 180ms ease;
}

.dialog-enter-from,
.dialog-leave-to {
  opacity: 0;
}

@media (max-width: 900px) {
  .contact-hero,
  .contact-grid,
  .contact-socials {
    grid-template-columns: 1fr;
  }
}
</style>
