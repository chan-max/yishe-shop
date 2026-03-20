<script setup lang="ts">
definePageMeta({ layout: "page" });

usePageSEO({
  title: "AI 设计实验室 - 衣设",
  description: "衣设 AI 设计实验室聚合生成设计、优化设计、商业内容生成、趋势决策与协同改稿，让 AI 真正进入设计商品化流程。",
  keywords: "AI设计,图生图,草图转成稿,AI排版,设计评分,营销文案,趋势分析",
  url: "https://1s.design/ai-lab",
  type: "website",
});

const prompts = [
  "法式花园感的春季围巾与香氛礼盒系列",
  "偏艺术家联名的餐具与桌布组合，要留白感",
  "年轻女性向的轻运动卫衣图案，适合社媒传播",
  "为新茶饮品牌生成一套 Logo、包装与活动海报方向",
];

const capabilities = [
  { name: "Generate", text: "让一句话、一张参考图或一张草图，快速长成可继续工作的视觉方案。" },
  { name: "Optimize", text: "继续辅助排版、构图、配色和整体美化，而不是出图后就结束。" },
  { name: "Commerce", text: "把设计继续翻译成商品卖点、营销文案和传播内容。" },
  { name: "Score", text: "在设计上线前，先做一轮评分、趋势判断和改稿建议。" },
];

const signals = [
  ["AI 评分", "89 / 100"],
  ["推荐风格", "法式轻奢"],
  ["适配商品", "6 类"],
];

const steps = [
  ["输入", "文字、参考图、草图一起进入"],
  ["生成", "风格板、主视觉和 SKU 同步展开"],
  ["判断", "系统给出评分、风险和优化建议"],
];

const outputs = ["主视觉方向", "配色建议", "商品落点", "营销文案", "改稿提示"];

const selectedPrompt = ref(prompts[0]);
</script>

<template>
  <div class="lab-page">
    <section class="lab-hero">
      <div class="minimal-kicker">AI Design Lab</div>
      <div class="lab-hero__grid">
        <div class="lab-hero__copy">
          <p class="lab-label">Console Prototype</p>
          <h1>AI 实验室应该像控制台，不应该只是一个出图入口。</h1>
          <p>
            这页按产品界面去做，而不是普通介绍页。输入、生成、判断和商业化输出都放在同一张桌面上，视觉上也更接近真正的操作场景。
          </p>
        </div>

        <div class="lab-hero__panel">
          <span>当前提示词</span>
          <strong>{{ selectedPrompt }}</strong>
          <div class="lab-hero__actions">
            <BaseButton variant="primary" size="lg">开始实验</BaseButton>
            <BaseButton variant="secondary" size="lg">查看能力</BaseButton>
          </div>
        </div>
      </div>
    </section>

    <section class="lab-console">
      <div class="lab-console__left">
        <div class="lab-kicker">Prompt Queue</div>
        <button
          v-for="item in prompts"
          :key="item"
          type="button"
          :class="['lab-prompt', selectedPrompt === item ? 'is-active' : '']"
          @click="selectedPrompt = item"
        >
          {{ item }}
        </button>
      </div>

      <div class="lab-console__center">
        <div class="lab-kicker">Canvas</div>
        <h2>{{ selectedPrompt }}</h2>
        <div class="lab-canvas">
          <div class="lab-canvas__summary">
            当前实验会先生成一组可继续工作的方向，再把结果拆成设计、商品和商业内容三个层面，避免只停在“出了一张图”。
          </div>
          <div class="lab-canvas__outputs">
            <span v-for="item in outputs" :key="item">{{ item }}</span>
          </div>
        </div>
      </div>

      <div class="lab-console__right">
        <div class="lab-kicker">Signals</div>
        <div class="lab-signals">
          <div class="lab-signal" v-for="item in signals" :key="item[0]">
            <span>{{ item[0] }}</span>
            <strong>{{ item[1] }}</strong>
          </div>
        </div>

        <div class="lab-steps">
          <div v-for="item in steps" :key="item[0]" class="lab-step">
            <span>{{ item[0] }}</span>
            <p>{{ item[1] }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="lab-capabilities">
      <div class="lab-kicker">Capability Matrix</div>
      <div class="lab-capabilities__grid">
        <article v-for="item in capabilities" :key="item.name" class="lab-capability">
          <strong>{{ item.name }}</strong>
          <p>{{ item.text }}</p>
        </article>
      </div>
    </section>
  </div>
</template>

<style scoped>
.lab-page {
  padding: 0;
  background:
    radial-gradient(circle at top left, rgba(149, 162, 140, 0.12), transparent 24rem),
    radial-gradient(circle at top right, rgba(201, 158, 123, 0.14), transparent 24rem),
    linear-gradient(180deg, #f4f1ea 0%, #efede7 100%);
}

.lab-hero,
.lab-console,
.lab-capabilities {
  width: min(1560px, calc(100% - 2rem));
  margin: 0 auto;
}

.lab-hero {
  padding: 0.95rem 0 0.82rem;
}

.lab-hero__grid {
  display: grid;
  grid-template-columns: minmax(0, 1.56fr) minmax(18.5rem, 0.44fr);
  gap: 0.8rem;
  padding-top: 0.8rem;
}

.lab-label,
.lab-kicker,
.lab-hero__panel span,
.lab-signal span,
.lab-step span {
  color: rgba(34, 49, 39, 0.5);
  font-size: 0.62rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
}

.lab-hero__copy h1 {
  max-width: min(100%, 15.5em);
  margin-top: 0.55rem;
  color: #1f2b25;
  font-size: clamp(1.32rem, 2vw, 2.04rem);
  line-height: 1.08;
  font-weight: 800;
  letter-spacing: -0.03em;
  text-wrap: balance;
}

.lab-hero__copy p:last-child {
  max-width: 39rem;
  margin-top: 0.68rem;
  color: #59655c;
  font-size: 0.76rem;
  line-height: 1.68;
}

.lab-hero__panel {
  display: grid;
  align-content: start;
  gap: 0.45rem;
  min-height: 11.5rem;
  padding: 0.88rem;
  border-radius: 1rem;
  background: rgba(255, 255, 255, 0.34);
}

.lab-hero__panel strong {
  color: #223127;
  font-size: 0.92rem;
  line-height: 1.38;
}

.lab-hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.55rem;
  margin-top: 0.45rem;
}

.lab-console {
  display: grid;
  grid-template-columns: 0.76fr 1.18fr 0.78fr;
  gap: 0.9rem;
  padding: 0.82rem 0 0.95rem;
  border-top: 1px solid rgba(34, 49, 39, 0.08);
  border-bottom: 1px solid rgba(34, 49, 39, 0.08);
}

.lab-console__left,
.lab-console__center,
.lab-console__right,
.lab-capabilities {
  display: grid;
  align-content: start;
  gap: 0.58rem;
}

.lab-prompt,
.lab-signal,
.lab-step,
.lab-capability {
  padding: 0.8rem;
  border-radius: 0.95rem;
  background: rgba(255, 255, 255, 0.4);
}

.lab-prompt {
  border: 1px solid rgba(34, 49, 39, 0.08);
  text-align: left;
  color: #223127;
  font-size: 0.7rem;
  line-height: 1.55;
}

.lab-prompt.is-active {
  background: #223127;
  color: #f4efe7;
  border-color: #223127;
}

.lab-console__center h2 {
  max-width: 23rem;
  color: #223127;
  font-size: 1.08rem;
  line-height: 1.4;
  font-weight: 700;
}

.lab-canvas {
  display: grid;
  gap: 0.75rem;
  min-height: 20rem;
  align-content: space-between;
  border-radius: 1.1rem;
  background: rgba(255, 255, 255, 0.34);
  padding: 1rem;
}

.lab-canvas__summary {
  max-width: 31rem;
  color: #223127;
  font-size: 0.78rem;
  line-height: 1.68;
}

.lab-canvas__outputs {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
}

.lab-canvas__outputs span {
  padding: 0.48rem 0.62rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.58);
  color: #223127;
  font-size: 0.62rem;
}

.lab-signals,
.lab-steps {
  display: grid;
  gap: 0.55rem;
}

.lab-signal strong {
  display: block;
  margin-top: 0.3rem;
  color: #223127;
  font-size: 0.78rem;
}

.lab-step p,
.lab-capability p {
  margin-top: 0.35rem;
  color: #5b665d;
  font-size: 0.7rem;
  line-height: 1.58;
}

.lab-capabilities {
  padding: 0.92rem 0 2rem;
}

.lab-capabilities__grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 0.8rem;
}

.lab-capability strong {
  color: #223127;
  font-size: 0.84rem;
}

@media (max-width: 1100px) {
  .lab-hero__grid,
  .lab-console,
  .lab-capabilities__grid {
    grid-template-columns: 1fr;
  }
}
</style>
