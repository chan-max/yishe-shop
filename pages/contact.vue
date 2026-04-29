<script lang="ts" setup>
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
  email: "jackieontheway666@gmail.com",
  phones: ["18742539196", "13224229196"],
  github: "https://github.com/chan-max",
  website: "https://1s.design",
};

const socialPlatforms = ref([
  { name: "微信", icon: "mdi-wechat", image: "/contact-img/weixin.jpg", color: "#07c160" },
  { name: "微博", icon: "mdi-sina-weibo", image: "/contact-img/weibo.png", color: "#e6162d" },
  { name: "小红书", icon: "mdi-book-open-page-variant", image: "/contact-img/xiaohongshu.jpg", color: "#ff2442" },
  { name: "抖音", icon: "mdi-music-note", image: "/contact-img/douyin.webp", color: "#000000" },
  { name: "快手", icon: "mdi-video", image: "/contact-img/kuaishou.webp", color: "#ff6600" },
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
        <span>CONTACT 1S.DESIGN</span>
        <h1>发起 POD 定制合作</h1>
      </div>
      <p>
        适合印花图案、品牌周边、私人礼赠、POD 商品上新和创意设计合作。把需求、商品载体和参考方向发来，我们会一起把它落到具体页面与产品。
      </p>
    </section>

    <section class="contact-grid">
      <article class="contact-card contact-card--dark">
        <span>Email</span>
        <a :href="`mailto:${founderInfo.email}`">{{ founderInfo.email }}</a>
      </article>
      <article class="contact-card">
        <span>Phone</span>
        <a :href="`tel:${founderInfo.phones[0]}`">{{ founderInfo.phones[0] }}</a>
        <a :href="`tel:${founderInfo.phones[1]}`">{{ founderInfo.phones[1] }}</a>
      </article>
      <article class="contact-card">
        <span>Website</span>
        <a :href="founderInfo.website" target="_blank">{{ founderInfo.website }}</a>
      </article>
      <article class="contact-card">
        <span>GitHub</span>
        <a :href="founderInfo.github" target="_blank">chan-max</a>
      </article>
    </section>

    <section class="contact-socials">
      <div>
        <span>Social</span>
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
          <v-icon :icon="platform.icon" size="18" />
          <span>{{ platform.name }}</span>
        </button>
      </div>
    </section>

    <Teleport to="body">
      <Transition name="dialog">
        <div v-if="showQRDialog" class="qr-dialog-overlay" @click="closeQRDialog">
          <div class="qr-dialog" @click.stop>
            <button class="qr-close" type="button" @click="closeQRDialog">
              <v-icon>mdi-close</v-icon>
            </button>
            <div v-if="selectedPlatform" class="qr-content">
              <v-icon
                :icon="selectedPlatform.icon"
                size="32"
                :style="{ color: selectedPlatform.color }"
              />
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
  padding: clamp(2rem, 5vw, 4.5rem) 0 clamp(3rem, 7vw, 6rem);
  color: #111;
}

.contact-hero {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(320px, 0.72fr);
  gap: clamp(1.5rem, 5vw, 4rem);
  align-items: end;
}

.contact-hero span,
.contact-card span,
.contact-socials span {
  color: #777;
  font-size: 0.75rem;
  font-weight: 900;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.contact-hero h1 {
  margin: 0.8rem 0 0;
  color: #000;
  font-size: clamp(3rem, 8vw, 6.5rem);
  line-height: 0.9;
  font-weight: 900;
}

.contact-hero p {
  margin: 0;
  color: #555;
  line-height: 1.85;
}

.contact-grid {
  display: grid;
  grid-template-columns: 1.1fr repeat(3, minmax(0, 1fr));
  gap: 1rem;
  margin-top: clamp(2rem, 5vw, 4rem);
}

.contact-card,
.contact-socials {
  border-radius: 20px;
  background: #f0f0f0;
  padding: clamp(1.2rem, 3vw, 2rem);
}

.contact-card {
  display: grid;
  align-content: space-between;
  min-height: 190px;
}

.contact-card--dark {
  background: #000;
  color: #fff;
}

.contact-card a {
  color: inherit;
  font-size: clamp(1rem, 1.7vw, 1.35rem);
  font-weight: 900;
  overflow-wrap: anywhere;
  text-decoration: none;
}

.contact-card:not(.contact-card--dark) a {
  color: #111;
}

.contact-socials {
  display: grid;
  grid-template-columns: minmax(0, 0.8fr) minmax(320px, 1fr);
  gap: 1rem;
  align-items: center;
  margin-top: 1rem;
}

.contact-socials h2 {
  margin: 0.6rem 0 0;
  color: #000;
  font-size: clamp(1.8rem, 4vw, 3.6rem);
  line-height: 0.98;
}

.social-links {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.social-link {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  min-height: 3rem;
  border: 0;
  border-radius: 999px;
  background: #fff;
  color: #111;
  font-weight: 900;
  padding: 0 1rem;
}

.qr-dialog-overlay {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: grid;
  place-items: center;
  background: rgba(0, 0, 0, 0.55);
  padding: 1rem;
}

.qr-dialog {
  position: relative;
  width: min(92vw, 420px);
  border-radius: 24px;
  background: #fff;
  padding: 2rem;
}

.qr-close {
  position: absolute;
  right: 1rem;
  top: 1rem;
  border: 0;
  border-radius: 50%;
  background: #f0f0f0;
  width: 2.2rem;
  height: 2.2rem;
}

.qr-content {
  display: grid;
  justify-items: center;
  gap: 1rem;
  text-align: center;
}

.qr-content img {
  width: min(100%, 260px);
  border-radius: 18px;
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
