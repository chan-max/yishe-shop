<script setup lang="ts">
definePageMeta({ layout: "page" });

usePageSEO({
  title: "POD 定制设计服务 - 衣设",
  description:
    "为品牌首发、私人礼物、活动周边和创作者 IP 提供 POD 印花、包装视觉、商品样机与系列化定制设计服务。",
  keywords: "POD定制设计,私人定制,印花图案设计,周边定制,礼品定制,品牌视觉,服装印花设计",
  url: "https://1s.design/design",
  type: "website",
});

const tracks = [
  {
    id: "brand",
    name: "品牌首发",
    phase: "01",
    note: "适合刚起步的品牌，把视觉基调、首发商品和对外表达一次定准。",
    line: "先把品牌样子立住，再决定第一批该卖什么。",
    outputs: ["品牌基调", "首发图案", "首批 SKU"],
  },
  {
    id: "campaign",
    name: "主题企划",
    phase: "02",
    note: "适合节日、联名、快闪和上新节点，需要强记忆点和传播感。",
    line: "短周期项目，也可以有完整的叙事和视觉秩序。",
    outputs: ["主题 KV", "物料延展", "社媒包"],
  },
  {
    id: "signature",
    name: "个人系列",
    phase: "03",
    note: "适合创作者、主理人和想长期做自己风格的人。",
    line: "把个人审美整理成一组可以持续发布的系列。",
    outputs: ["图案整理", "SKU 组合", "作品页"],
  },
];

const packages = [
  {
    name: "Starter",
    price: "¥1,980",
    text: "先把方向试准，适合第一次认真做项目。",
  },
  {
    name: "Signature",
    price: "¥4,800",
    text: "适合需要完整发布感、可试卖、可提案的一组系列。",
  },
  {
    name: "Studio Partner",
    price: "定制报价",
    text: "适合长期上新和持续共创，视觉节奏由同一套方法维护。",
  },
];

const serviceTags = [
  "印花图案",
  "服装廓形",
  "包装礼盒",
  "社媒画面",
  "详情页视觉",
  "联名企划",
];

const checkpoints = [
  ["方向确认", "把项目目标、受众、风格边界定清楚"],
  ["系统设计", "把图案、版式和商品结构整理成一组"],
  ["上线交付", "输出发布物料、页面内容和后续延展建议"],
];

const selectedTrack = ref(tracks[0].id);
const selectedPackage = ref(packages[1].name);
const selectedNeeds = ref<string[]>(["印花图案", "详情页视觉"]);
const briefForm = reactive({
  project: "",
  audience: "",
  tone: "",
  launch: "",
  notes: "",
});

const activeTrack = computed(() => tracks.find((item) => item.id === selectedTrack.value) || tracks[0]);

const toggleNeed = (item: string) => {
  if (selectedNeeds.value.includes(item)) {
    selectedNeeds.value = selectedNeeds.value.filter((need) => need !== item);
    return;
  }
  selectedNeeds.value = [...selectedNeeds.value, item];
};

const summaryRows = computed(() => [
  ["项目类型", activeTrack.value.name],
  ["合作方式", selectedPackage.value],
  ["重点需求", selectedNeeds.value.join(" / ") || "待补充"],
]);
</script>

<template>
  <div class="design-page">
    <section class="design-hero">
      <div class="minimal-kicker">定制设计工作室</div>
      <div class="design-hero__top">
        <div class="design-hero__copy">
          <p class="design-label">项目对接</p>
          <h1>从一个想法开始，定制一套可以生产的 POD 商品视觉。</h1>
          <p class="design-hero__text">
            选择品牌首发、主题企划或个人系列，明确受众、风格和交付物，让图案、包装、商品样机和传播内容沿同一套方向推进。
          </p>
        </div>

        <div class="design-hero__board">
          <div class="design-hero__board-top">
            <span>当前项目</span>
            <strong>{{ activeTrack.name }}</strong>
          </div>
          <p>{{ activeTrack.line }}</p>
          <div class="design-hero__board-actions">
            <BaseButton variant="primary" size="lg">发起合作</BaseButton>
            <BaseButton variant="outline" size="lg" @click="selectedTrack = tracks[1].id">查看主题企划</BaseButton>
          </div>
        </div>
      </div>
    </section>

    <section class="design-strip">
      <span v-for="tag in serviceTags" :key="tag">{{ tag }}</span>
    </section>

    <section class="design-stage">
      <div class="design-stage__lead">
        <div class="design-stage__head">
          <span>{{ activeTrack.phase }}</span>
          <h2>{{ activeTrack.name }}</h2>
        </div>
        <p class="design-stage__line">{{ activeTrack.line }}</p>
        <p class="design-stage__note">{{ activeTrack.note }}</p>
        <div class="design-stage__outputs">
          <span v-for="output in activeTrack.outputs" :key="output">{{ output }}</span>
        </div>
      </div>

      <div class="design-stage__side">
        <div class="design-meta-card" v-for="row in summaryRows" :key="row[0]">
          <span>{{ row[0] }}</span>
          <strong>{{ row[1] }}</strong>
        </div>
      </div>
    </section>

    <section class="design-layout">
      <div class="design-panel design-panel--tracks">
        <div class="design-panel__head">
          <span class="design-label">项目类型</span>
          <strong>选择项目方向</strong>
        </div>
        <button
          v-for="item in tracks"
          :key="item.id"
          type="button"
          :class="['design-track', selectedTrack === item.id ? 'is-active' : '']"
          @click="selectedTrack = item.id"
        >
          <div class="design-track__top">
            <span>{{ item.phase }}</span>
            <strong>{{ item.name }}</strong>
          </div>
          <p>{{ item.note }}</p>
        </button>
      </div>

      <div class="design-panel design-panel--brief">
        <div class="design-panel__head">
          <span class="design-label">项目简报</span>
          <strong>填写需求</strong>
        </div>

        <div class="design-brief__fields">
          <input v-model="briefForm.project" type="text" placeholder="这次项目叫什么" />
          <input v-model="briefForm.audience" type="text" placeholder="主要面向谁" />
          <input v-model="briefForm.tone" type="text" placeholder="你想要的感觉" />
          <input v-model="briefForm.launch" type="text" placeholder="预计什么时候上线" />
          <textarea
            v-model="briefForm.notes"
            placeholder="补充一点背景，比如参考风格、预算区间、希望先解决的问题。"
          ></textarea>
        </div>

        <div class="design-need-cloud">
          <button
            v-for="item in serviceTags"
            :key="item"
            type="button"
            :class="['design-need', selectedNeeds.includes(item) ? 'is-active' : '']"
            @click="toggleNeed(item)"
          >
            {{ item }}
          </button>
        </div>
      </div>

      <div class="design-panel design-panel--side">
        <div class="design-panel__head">
          <span class="design-label">合作流程</span>
          <strong>节奏安排</strong>
        </div>

        <div class="design-checkpoints">
          <div v-for="item in checkpoints" :key="item[0]" class="design-checkpoint">
            <span>{{ item[0] }}</span>
            <p>{{ item[1] }}</p>
          </div>
        </div>

        <div class="design-package-list">
          <button
            v-for="item in packages"
            :key="item.name"
            type="button"
            :class="['design-package', selectedPackage === item.name ? 'is-active' : '']"
            @click="selectedPackage = item.name"
          >
            <div class="design-package__top">
              <strong>{{ item.name }}</strong>
              <span>{{ item.price }}</span>
            </div>
            <p>{{ item.text }}</p>
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.design-page {
  padding: 0;
  background:
    radial-gradient(circle at top left, rgba(215, 155, 113, 0.16), transparent 26rem),
    linear-gradient(180deg, #f4ece1 0%, #efeee8 100%);
}

.design-hero,
.design-strip,
.design-stage,
.design-layout {
  width: min(1560px, calc(100% - 2rem));
  margin: 0 auto;
}

.design-hero {
  padding: 0.95rem 0 0.85rem;
}

.design-hero__top {
  display: grid;
  grid-template-columns: minmax(0, 1.52fr) minmax(18.5rem, 0.48fr);
  gap: 0.8rem;
  padding-top: 0.8rem;
  align-items: stretch;
}

.design-label {
  color: rgba(34, 49, 39, 0.5);
  font-size: 0.62rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
}

.design-hero__copy h1 {
  max-width: min(100%, 14.5em);
  margin-top: 0.55rem;
  color: #1f2b25;
  font-size: clamp(1.34rem, 2.05vw, 2.08rem);
  line-height: 1.08;
  font-weight: 800;
  letter-spacing: -0.03em;
  text-wrap: balance;
}

.design-hero__copy {
  display: grid;
  align-content: center;
  min-height: 11.5rem;
  padding: 0.2rem 0;
}

.design-hero__text {
  max-width: 38rem;
  margin-top: 0.7rem;
  color: #59655c;
  font-size: 0.76rem;
  line-height: 1.68;
}

.design-hero__board {
  display: grid;
  align-content: start;
  gap: 0.65rem;
  min-height: 11.5rem;
  padding: 0.88rem;
  border-radius: 1rem;
  background: rgba(255, 255, 255, 0.34);
}

.design-hero__board-top span,
.design-meta-card span,
.design-checkpoint span {
  display: block;
  color: rgba(34, 49, 39, 0.48);
  font-size: 0.6rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

.design-hero__board-top strong {
  display: block;
  margin-top: 0.35rem;
  color: #223127;
  font-size: 0.88rem;
  line-height: 1.3;
}

.design-hero__board p {
  color: #223127;
  font-size: 0.8rem;
  line-height: 1.55;
  font-weight: 700;
}

.design-hero__board-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.55rem;
}

.design-strip {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding: 0.62rem 0 0.72rem;
  border-top: 1px solid rgba(34, 49, 39, 0.08);
  border-bottom: 1px solid rgba(34, 49, 39, 0.08);
}

.design-strip span,
.design-stage__outputs span,
.design-need {
  padding: 0.52rem 0.68rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.4);
  color: #223127;
  font-size: 0.64rem;
}

.design-stage {
  display: grid;
  grid-template-columns: minmax(0, 1.08fr) minmax(18rem, 0.92fr);
  gap: 1rem;
  padding: 0.95rem 0;
  align-items: stretch;
}

.design-stage__lead,
.design-stage__side {
  padding: 0.95rem;
  border-radius: 1rem;
  background: rgba(255, 255, 255, 0.3);
}

.design-stage__head {
  display: flex;
  align-items: baseline;
  gap: 0.55rem;
}

.design-stage__head span {
  color: rgba(34, 49, 39, 0.42);
  font-size: 0.7rem;
  letter-spacing: 0.16em;
}

.design-stage__lead h2 {
  color: #1f2b25;
  font-size: clamp(1.3rem, 2.4vw, 2.35rem);
  line-height: 1;
  font-weight: 800;
}

.design-stage__line {
  margin-top: 0.55rem;
  color: #223127;
  font-size: 0.88rem;
  line-height: 1.45;
  font-weight: 700;
}

.design-stage__note {
  max-width: 33rem;
  margin-top: 0.55rem;
  color: #5b675e;
  font-size: 0.74rem;
  line-height: 1.62;
}

.design-stage__outputs {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.65rem;
}

.design-stage__side {
  display: grid;
  gap: 0.55rem;
}

.design-meta-card {
  padding: 0.82rem 0.88rem;
  border-radius: 0.95rem;
  background: rgba(255, 255, 255, 0.36);
}

.design-meta-card strong {
  display: block;
  margin-top: 0.32rem;
  color: #223127;
  font-size: 0.78rem;
  line-height: 1.4;
}

.design-layout {
  display: grid;
  grid-template-columns: 0.84fr 1.14fr 0.92fr;
  gap: 0.9rem;
  padding: 0.15rem 0 2rem;
  align-items: stretch;
}

.design-panel {
  display: grid;
  align-content: start;
  gap: 0.65rem;
  height: 100%;
  padding: 0.88rem;
  border-radius: 0.95rem;
  background: rgba(255, 255, 255, 0.28);
}

.design-panel__head {
  display: grid;
  gap: 0.2rem;
}

.design-panel__head strong {
  color: #223127;
  font-size: 0.9rem;
}

.design-track,
.design-package {
  padding: 0.82rem 0.85rem;
  border: 1px solid rgba(34, 49, 39, 0.08);
  border-radius: 0.95rem;
  background: rgba(255, 255, 255, 0.36);
  text-align: left;
}

.design-track.is-active,
.design-package.is-active,
.design-need.is-active {
  background: #223127;
  color: #f4efe7;
  border-color: #223127;
}

.design-track__top {
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
}

.design-track__top span {
  font-size: 0.6rem;
  letter-spacing: 0.16em;
  opacity: 0.65;
}

.design-track strong,
.design-package strong {
  font-size: 0.84rem;
}

.design-track p,
.design-package p,
.design-checkpoint p {
  margin-top: 0.38rem;
  font-size: 0.7rem;
  line-height: 1.58;
  color: inherit;
  opacity: 0.82;
}

.design-brief__fields {
  display: grid;
  gap: 0.42rem;
}

.design-brief__fields input,
.design-brief__fields textarea {
  width: 100%;
  padding: 0.62rem 0;
  border: 0;
  border-bottom: 1px solid rgba(34, 49, 39, 0.12);
  background: transparent;
  color: #223127;
  font-size: 0.72rem;
  outline: none;
}

.design-brief__fields textarea {
  min-height: 6rem;
  resize: vertical;
}

.design-need-cloud {
  display: flex;
  flex-wrap: wrap;
  gap: 0.48rem;
  margin-top: 0.7rem;
}

.design-need {
  border: 1px solid rgba(34, 49, 39, 0.08);
}

.design-checkpoints {
  display: grid;
  gap: 0.5rem;
}

.design-checkpoint {
  padding: 0.75rem 0.78rem;
  border-radius: 0.95rem;
  background: rgba(255, 255, 255, 0.32);
}

.design-package-list {
  display: grid;
  gap: 0.55rem;
}

.design-package__top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.8rem;
}

.design-package__top span {
  font-size: 0.72rem;
}

@media (max-width: 1100px) {
  .design-hero__top,
  .design-stage,
  .design-layout {
    grid-template-columns: 1fr;
  }
}
</style>
