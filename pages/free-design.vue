<script setup lang="ts">
definePageMeta({ layout: "page" });

usePageSEO({
  title: "免费设计中心 - 衣设",
  description:
    "衣设免费设计中心以更具品牌感和场景感的方式承接品牌、电商、社媒、生活与行业设计需求，让用户从目标直接进入设计方向。",
  keywords:
    "免费设计,Logo设计,电商主图,详情页,小红书封面,礼品设计,印花设计,衣设",
  url: "https://1s.design/free-design",
  type: "website",
});

type DesignWorld = {
  id: string;
  name: string;
  short: string;
  icon: string;
  manifesto: string;
  summary: string;
  mood: string;
  scenes: string[];
  outputs: string[];
  route: string[];
  statement: string;
};

const worlds: DesignWorld[] = [
  {
    id: "brand",
    name: "企业品牌",
    short: "Brand",
    icon: "mdi-domain",
    manifesto: "先建立品牌语气，再让所有触点说同一种语言。",
    summary: "适合从 Logo、VI、包装到招商传播的一整套品牌启动与焕新。",
    mood: "稳、干净、可信、长期",
    scenes: ["新品牌启动", "老品牌焕新", "招商发布", "线下门店"],
    outputs: ["Logo", "品牌 VI", "包装设计", "宣传物料", "门店延展", "招商首图"],
    route: ["定品牌气质", "出核心识别", "铺开应用系统"],
    statement: "品牌不是先做一张 Logo 图，而是先决定以后所有画面长什么样。",
  },
  {
    id: "commerce",
    name: "电商转化",
    short: "Commerce",
    icon: "mdi-storefront-outline",
    manifesto: "不是把图做满，而是把点击、停留和成交做顺。",
    summary: "适合商品主图、详情页、活动节点和直播视觉这一类增长型场景。",
    mood: "直接、锋利、清楚、可转化",
    scenes: ["新品上架", "活动换肤", "直播主视觉", "详情页重做"],
    outputs: ["商品主图", "详情页模块", "活动海报", "卖点长图", "直播贴片", "首页装修"],
    route: ["抓点击", "排节奏", "推成交"],
    statement: "好的电商设计，不是信息堆得多，而是用户每一步都知道下一步该看什么。",
  },
  {
    id: "social",
    name: "社媒内容",
    short: "Social",
    icon: "mdi-cellphone-play",
    manifesto: "让内容不是一张张零散地发，而是像一个有记忆点的账号。",
    summary: "适合小红书、短视频、公众号和私域传播，强调封面系统和内容识别。",
    mood: "轻、快、系列化、易传播",
    scenes: ["账号起号", "栏目更新", "热点追踪", "私域传播"],
    outputs: ["小红书封面", "视频封面", "九宫格", "头图海报", "热点快反图", "传播海报"],
    route: ["定封面语法", "做系列模板", "扩散热点内容"],
    statement: "账号感不是靠一句 slogan，而是靠几十张图放在一起仍然像同一组内容。",
  },
  {
    id: "life",
    name: "生活方式",
    short: "Lifestyle",
    icon: "mdi-home-heart",
    manifesto: "让设计回到关系、礼物、家和个人表达这些真实生活里。",
    summary: "适合礼物、家居、穿搭、婚礼和纪念场景，强调情绪和分享欲。",
    mood: "温柔、私人、有温度、耐看",
    scenes: ["生日礼物", "节日定制", "婚礼纪念", "家居焕新"],
    outputs: ["礼物设计", "家居图案", "穿搭图案", "婚礼物料", "纪念卡片", "亲子周边"],
    route: ["定关系场景", "定情绪气质", "延展成物件"],
    statement: "有些设计不是为了卖货，而是为了把关系和记忆留在一件东西上。",
  },
  {
    id: "industry",
    name: "行业专项",
    short: "Industry",
    icon: "mdi-briefcase-outline",
    manifesto: "先进入业务语境，再进入视觉语境。",
    summary: "面向服装、美妆、餐饮、教育和会务等垂直行业，更强调适配度和落地性。",
    mood: "专业、克制、懂业务、可执行",
    scenes: ["服装上新", "课程招生", "餐饮开店", "会务活动"],
    outputs: ["服装印花", "课程招生图", "餐饮物料", "美妆包装", "活动大屏", "现场导视"],
    route: ["选行业模板", "套业务语境", "批量出图交付"],
    statement: "很多需求不是缺创意，而是缺一个真正懂行业的人先把场景翻译出来。",
  },
];

const activeWorldId = ref(worlds[0].id);
const selectedOutputs = ref<string[]>(worlds[0].outputs.slice(0, 3));
const brief = reactive({
  scenario: "",
  audience: "",
  tone: "",
});

const activeWorld = computed(() => worlds.find((item) => item.id === activeWorldId.value) || worlds[0]);

watch(
  activeWorldId,
  () => {
    selectedOutputs.value = activeWorld.value.outputs.slice(0, 3);
  },
  { immediate: true },
);

const toggleOutput = (item: string) => {
  if (selectedOutputs.value.includes(item)) {
    selectedOutputs.value = selectedOutputs.value.filter((value) => value !== item);
    return;
  }
  selectedOutputs.value = [...selectedOutputs.value, item];
};

const fillBrief = () => {
  brief.scenario = activeWorld.value.scenes[0];
  brief.audience = activeWorld.value.name;
  brief.tone = `${activeWorld.value.mood} / ${selectedOutputs.value.join("、")}`;
};

const tickerItems = computed(() => [
  activeWorld.value.name,
  activeWorld.value.mood,
  ...activeWorld.value.scenes,
  ...selectedOutputs.value,
]);

const goToPath = (path: string) => navigateTo(path);
</script>

<template>
  <div class="fd-page">
    <section class="fd-hero">
      <div class="fd-hero__top">
        <div class="minimal-kicker">Free Design Center</div>
        <button class="fd-hero__switch" type="button" @click="fillBrief">把当前方向写进 brief</button>
      </div>

      <div class="fd-hero__headline">
        <p>免费设计中心</p>
        <h1>不再做“几个分类入口”。<br>而是直接给你一整种视觉立场。</h1>
      </div>

      <div class="fd-hero__bottom">
        <div class="fd-hero__lead">
          你可以把它理解成一张设计地图。先选你属于哪一种业务世界，再决定图应该长成什么样，而不是先掉进一堆模板里。
        </div>
        <div class="fd-hero__aside">
          <div class="fd-hero__meta">
            <div class="fd-hero__meta-item">
              <span>当前方向</span>
              <strong>{{ activeWorld.name }}</strong>
            </div>
            <div class="fd-hero__meta-item">
              <span>画面气质</span>
              <strong>{{ activeWorld.mood }}</strong>
            </div>
          </div>
          <div class="fd-hero__actions">
            <BaseButton variant="primary" size="lg" @click="goToPath('/design')">进入定制设计</BaseButton>
            <BaseButton variant="secondary" size="lg" @click="goToPath('/ai-lab')">进入 AI 设计</BaseButton>
          </div>
        </div>
      </div>
    </section>

    <section class="fd-selector">
      <button
        v-for="item in worlds"
        :key="item.id"
        type="button"
        :class="['fd-selector__item', activeWorldId === item.id ? 'is-active' : '']"
        @click="activeWorldId = item.id"
      >
        <span>{{ item.short }}</span>
        <strong>{{ item.name }}</strong>
        <v-icon size="18">{{ item.icon }}</v-icon>
      </button>
    </section>

    <section class="fd-stage">
      <div class="fd-stage__left">
        <div class="fd-stage__label">Current World</div>
        <h2>{{ activeWorld.name }}</h2>
        <div class="fd-stage__manifesto">{{ activeWorld.manifesto }}</div>
        <p class="fd-stage__summary">{{ activeWorld.summary }}</p>
        <div class="fd-stage__statement">
          {{ activeWorld.statement }}
        </div>
      </div>

      <div class="fd-stage__right">
        <div class="fd-stage__column">
          <span class="fd-mini">Mood</span>
          <strong>{{ activeWorld.mood }}</strong>
        </div>
        <div class="fd-stage__column">
          <span class="fd-mini">Route</span>
          <div class="fd-route">
            <div v-for="(item, index) in activeWorld.route" :key="item" class="fd-route__item">
              <em>{{ `0${index + 1}` }}</em>
              <span>{{ item }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="fd-ribbon" aria-label="current context">
      <div class="fd-ribbon__track">
        <span v-for="(item, index) in tickerItems.concat(tickerItems)" :key="`${item}-${index}`">{{ item }}</span>
      </div>
    </section>

    <section class="fd-content">
      <div class="fd-content__block fd-content__block--scenes">
        <div class="fd-section-kicker">Scenes</div>
        <div class="fd-scene-list">
          <div v-for="item in activeWorld.scenes" :key="item" class="fd-scene-list__item">
            {{ item }}
          </div>
        </div>
      </div>

      <div class="fd-content__block fd-content__block--outputs">
        <div class="fd-section-kicker">Outputs</div>
        <div class="fd-output-cloud">
          <button
            v-for="item in activeWorld.outputs"
            :key="item"
            type="button"
            :class="['fd-output-cloud__item', selectedOutputs.includes(item) ? 'is-active' : '']"
            @click="toggleOutput(item)"
          >
            {{ item }}
          </button>
        </div>
      </div>

      <div class="fd-content__block fd-content__block--brief">
        <div class="fd-section-kicker">Brief</div>
        <div class="fd-brief">
          <input v-model="brief.scenario" type="text" placeholder="这次设计要落在哪个场景" />
          <input v-model="brief.audience" type="text" placeholder="主要面对谁" />
          <textarea v-model="brief.tone" placeholder="补充风格、语气、画面倾向和参考感觉"></textarea>
          <div class="fd-brief__actions">
            <BaseButton variant="primary" size="md" @click="fillBrief">自动补全</BaseButton>
            <BaseButton variant="outline" size="md" @click="goToPath('/portfolio')">先看作品</BaseButton>
          </div>
        </div>
      </div>
    </section>

    <section class="fd-cta">
      <div class="fd-cta__copy">
        <div class="fd-section-kicker">Next Step</div>
        <h3>选完方向以后，不要停在这里。</h3>
        <p>继续去 AI 生成、定制设计或商品系统，把这套方向变成真的图、真的方案、真的可交付内容。</p>
      </div>
      <div class="fd-cta__links">
        <button type="button" class="fd-cta__link" @click="goToPath('/ai-lab')">进入 AI 设计中台</button>
        <button type="button" class="fd-cta__link" @click="goToPath('/design')">进入定制设计服务</button>
        <button type="button" class="fd-cta__link" @click="goToPath('/products')">进入商品系统</button>
      </div>
    </section>
  </div>
</template>

<style scoped>
.fd-page {
  padding: 0;
  background:
    radial-gradient(circle at 0% 0%, rgba(226, 154, 96, 0.16), transparent 28rem),
    radial-gradient(circle at 100% 14%, rgba(98, 151, 132, 0.16), transparent 30rem),
    linear-gradient(180deg, #f3eadf 0%, #efece5 52%, #ecefe8 100%);
}

.fd-hero,
.fd-stage,
.fd-content,
.fd-cta {
  width: min(1560px, calc(100% - 2rem));
  margin: 0 auto;
}

.fd-hero {
  padding: 0.7rem 0 0.95rem;
}

.fd-hero__top,
.fd-hero__bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.fd-hero__switch {
  padding: 0.72rem 0.95rem;
  border: 0;
  border-radius: 999px;
  background: rgba(28, 41, 34, 0.08);
  color: #223127;
  font-size: 0.72rem;
  letter-spacing: 0.04em;
}

.fd-hero__headline {
  padding: 1.25rem 0 0.95rem;
}

.fd-hero__headline p,
.fd-section-kicker,
.fd-stage__label,
.fd-mini {
  color: rgba(34, 49, 39, 0.54);
  font-size: 0.64rem;
  letter-spacing: 0.24em;
  text-transform: uppercase;
}

.fd-hero__headline h1 {
  max-width: 12ch;
  margin-top: 0.7rem;
  color: #1f2b25;
  font-size: clamp(1.55rem, 3.3vw, 3rem);
  line-height: 1.04;
  font-weight: 800;
  letter-spacing: -0.03em;
}

.fd-hero__lead {
  max-width: 24rem;
  color: #556158;
  font-size: 0.78rem;
  line-height: 1.68;
}

.fd-hero__aside {
  display: grid;
  gap: 0.7rem;
  width: min(25rem, 100%);
}

.fd-hero__meta {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.6rem;
}

.fd-hero__meta-item {
  padding: 0.72rem 0.8rem;
  border: 1px solid rgba(34, 49, 39, 0.08);
  border-radius: 1rem;
  background: rgba(255, 255, 255, 0.34);
}

.fd-hero__meta-item span {
  display: block;
  color: rgba(34, 49, 39, 0.48);
  font-size: 0.62rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

.fd-hero__meta-item strong {
  display: block;
  margin-top: 0.38rem;
  color: #223127;
  font-size: 0.8rem;
  line-height: 1.35;
  font-weight: 700;
}

.fd-hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  justify-content: flex-start;
}

.fd-selector {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 0;
  width: min(1560px, calc(100% - 2rem));
  margin: 0 auto;
  border-top: 1px solid rgba(34, 49, 39, 0.08);
  border-bottom: 1px solid rgba(34, 49, 39, 0.08);
}

.fd-selector__item {
  display: grid;
  gap: 0.35rem;
  padding: 0.82rem 0.8rem;
  border: 0;
  border-right: 1px solid rgba(34, 49, 39, 0.08);
  background: transparent;
  text-align: left;
  transition: background-color 180ms ease, color 180ms ease, padding 180ms ease;
}

.fd-selector__item:last-child {
  border-right: 0;
}

.fd-selector__item span {
  color: rgba(34, 49, 39, 0.48);
  font-size: 0.64rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

.fd-selector__item strong {
  color: #213027;
  font-size: 0.84rem;
  line-height: 1.25;
}

.fd-selector__item.is-active {
  background: #223127;
}

.fd-selector__item:hover:not(.is-active) {
  background: rgba(255, 255, 255, 0.24);
}

.fd-selector__item.is-active span,
.fd-selector__item.is-active strong,
.fd-selector__item.is-active :deep(.v-icon) {
  color: #f4efe7;
}

.fd-stage {
  display: grid;
  grid-template-columns: minmax(0, 1.08fr) minmax(18rem, 0.92fr);
  gap: 1.2rem;
  padding: 1rem 0 1.15rem;
}

.fd-stage__left h2 {
  margin-top: 0.55rem;
  color: #1f2b25;
  font-size: clamp(1.5rem, 3.5vw, 3rem);
  line-height: 1;
  font-weight: 800;
  letter-spacing: -0.03em;
}

.fd-stage__manifesto {
  max-width: 10ch;
  margin-top: 0.55rem;
  color: #223127;
  font-size: clamp(0.96rem, 1.5vw, 1.28rem);
  line-height: 1.18;
  font-weight: 700;
}

.fd-stage__summary {
  max-width: 40rem;
  margin-top: 0.75rem;
  color: #566159;
  font-size: 0.76rem;
  line-height: 1.62;
}

.fd-stage__statement {
  max-width: 26rem;
  margin-top: 1rem;
  padding-top: 0.65rem;
  border-top: 1px solid rgba(34, 49, 39, 0.1);
  color: #223127;
  font-size: 0.8rem;
  line-height: 1.62;
}

.fd-stage__right {
  display: grid;
  align-content: start;
  gap: 0.85rem;
  padding-top: 0.15rem;
}

.fd-stage__column strong {
  display: block;
  margin-top: 0.45rem;
  color: #223127;
  font-size: 0.92rem;
  line-height: 1.24;
  font-weight: 700;
}

.fd-route {
  display: grid;
  gap: 0.4rem;
  margin-top: 0.55rem;
}

.fd-route__item {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  padding: 0.48rem 0;
  border-bottom: 1px solid rgba(34, 49, 39, 0.08);
}

.fd-route__item em {
  color: rgba(34, 49, 39, 0.42);
  font-size: 0.66rem;
  font-style: normal;
  letter-spacing: 0.16em;
}

.fd-route__item span {
  color: #223127;
  font-size: 0.74rem;
}

.fd-ribbon {
  overflow: hidden;
  width: 100%;
  border-top: 1px solid rgba(34, 49, 39, 0.08);
  border-bottom: 1px solid rgba(34, 49, 39, 0.08);
  background: rgba(255, 255, 255, 0.28);
}

.fd-ribbon__track {
  display: flex;
  gap: 0.9rem;
  width: max-content;
  padding: 0.55rem 0;
  animation: fdTicker 30s linear infinite;
}

.fd-ribbon__track span {
  color: #27352d;
  font-size: 0.68rem;
  white-space: nowrap;
}

.fd-ribbon__track span::after {
  content: " /";
  margin-left: 0.9rem;
  color: rgba(39, 53, 45, 0.35);
}

.fd-content {
  display: grid;
  grid-template-columns: 0.8fr 1.05fr 0.95fr;
  gap: 1rem;
  padding: 1rem 0 1.15rem;
}

.fd-content__block {
  min-height: auto;
}

.fd-scene-list,
.fd-output-cloud {
  display: flex;
  flex-wrap: wrap;
  gap: 0.55rem;
  margin-top: 0.65rem;
}

.fd-scene-list__item,
.fd-output-cloud__item {
  padding: 0.58rem 0.72rem;
  border: 1px solid rgba(34, 49, 39, 0.08);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.42);
  color: #223127;
  font-size: 0.66rem;
}

.fd-output-cloud__item {
  cursor: pointer;
  transition: background-color 180ms ease, color 180ms ease, border-color 180ms ease;
}

.fd-output-cloud__item.is-active {
  border-color: #223127;
  background: #223127;
  color: #f4efe7;
}

.fd-content__block--scenes {
  padding-top: 0.3rem;
}

.fd-content__block--outputs {
  padding: 0.3rem 0 0;
}

.fd-content__block--brief {
  padding: 0.8rem 0.9rem;
  background: rgba(255, 255, 255, 0.42);
  border-radius: 0.9rem;
}

.fd-brief {
  display: grid;
  gap: 0.52rem;
  margin-top: 0.55rem;
}

.fd-brief input,
.fd-brief textarea {
  width: 100%;
  padding: 0.6rem 0;
  border: 0;
  border-bottom: 1px solid rgba(34, 49, 39, 0.12);
  border-radius: 0;
  background: transparent;
  color: #223127;
  font-size: 0.72rem;
  outline: none;
}

.fd-brief textarea {
  min-height: 5.5rem;
  resize: vertical;
}

.fd-brief__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding-top: 0.3rem;
}

.fd-cta {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(22rem, 0.78fr);
  gap: 1.2rem;
  padding: 1rem 0 2.2rem;
  border-top: 1px solid rgba(34, 49, 39, 0.08);
}

.fd-cta__copy h3 {
  max-width: 12ch;
  margin-top: 0.55rem;
  color: #1f2b25;
  font-size: clamp(1.15rem, 2vw, 1.95rem);
  line-height: 1;
  font-weight: 800;
  letter-spacing: -0.03em;
}

.fd-cta__copy p {
  max-width: 32rem;
  margin-top: 0.55rem;
  color: #5b665d;
  font-size: 0.72rem;
  line-height: 1.6;
}

.fd-cta__links {
  display: grid;
  gap: 0;
}

.fd-cta__link {
  padding: 0.72rem 0;
  border: 0;
  border-bottom: 1px solid rgba(34, 49, 39, 0.08);
  background: transparent;
  color: #223127;
  text-align: left;
  font-size: 0.74rem;
  transition: padding-left 180ms ease, color 180ms ease;
}

.fd-cta__link:first-child {
  border-top: 1px solid rgba(34, 49, 39, 0.08);
}

.fd-cta__link:hover {
  padding-left: 0.4rem;
  color: #111915;
}

@keyframes fdTicker {
  from {
    transform: translateX(0);
  }

  to {
    transform: translateX(-50%);
  }
}

@media (max-width: 1100px) {
  .fd-selector,
  .fd-stage,
  .fd-content,
  .fd-cta,
  .fd-hero__top,
  .fd-hero__bottom {
    grid-template-columns: 1fr;
    flex-direction: column;
    align-items: flex-start;
  }

  .fd-selector {
    display: grid;
    grid-template-columns: 1fr;
  }

  .fd-hero__aside,
  .fd-hero__meta {
    width: 100%;
    grid-template-columns: 1fr;
  }

  .fd-selector__item {
    border-right: 0;
    border-bottom: 1px solid rgba(34, 49, 39, 0.08);
  }

  .fd-selector__item:last-child {
    border-bottom: 0;
  }

  .fd-content__block {
    min-height: auto;
  }
}
</style>
