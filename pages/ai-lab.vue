<script setup lang="ts">
definePageMeta({ layout: "page" });

usePageSEO({
  title: "AI 设计实验室 - 衣设",
  description: "衣设 AI 设计实验室聚合生成设计、优化设计、商业内容生成、趋势决策与协同改稿，让 AI 真正进入设计商品化流程。",
  keywords: "AI设计,图生图,草图转成稿,AI排版,设计评分,营销文案,趋势分析",
  url: "https://1s.design/ai-lab",
  type: "website",
});

const capabilityGroups = [
  { id: "generate", name: "AI 生成设计", intro: "让一句话、一张参考图或一张草图，快速长成可继续工作的视觉方案。", points: ["文生图设计", "图生图再设计", "草图转成稿", "局部重绘", "风格迁移"] },
  { id: "optimize", name: "AI 优化设计", intro: "不是只负责出图，而是进一步辅助排版、构图、配色和整体美化。", points: ["自动美化", "AI 排版助手", "AI 构图建议", "AI 用色建议", "AI 字体搭配"] },
  { id: "commerce", name: "AI 商业内容", intro: "把设计语言继续翻译成商品卖点、营销文案和传播内容。", points: ["AI 营销文案", "AI 商品命名", "AI 卖点拆解", "AI 社媒脚本", "直播话术建议"] },
  { id: "decision", name: "AI 决策能力", intro: "在设计正式上线前，先用趋势、评分和改稿建议做一轮智能复盘。", points: ["AI 风格推荐", "AI 趋势分析", "AI 爆款预测", "AI 设计评分", "AI 改稿建议"] },
  { id: "copilot", name: "AI 协同顾问", intro: "让 AI 像一个设计助理一样贯穿整个流程，而不是零散地出几个工具按钮。", points: ["AI 设计顾问", "AI 自动改稿", "AI 品牌助手", "多版本管理", "反馈归纳"] },
];

const workflows = [
  { id: "moodboard", name: "灵感输入与方向整理", intro: "把一句模糊的话翻成更容易继续工作的色板、材质和风格方向。", points: ["风格关键词整理", "色彩气氛归纳", "参考材质补全"] },
  { id: "pattern", name: "图案生成与商品延展", intro: "从一张主图或一个概念，继续生成商品图案、系列方案和商品落位建议。", points: ["主次纹样展开", "尺寸适配建议", "商品画面预览"] },
  { id: "layout", name: "版式、营销与改稿", intro: "把首页、详情页、海报和营销内容先搭出结构，再推进具体优化。", points: ["首屏结构建议", "信息层级整理", "不同尺寸延展"] },
];

const prompts = [
  "法式花园感的春季围巾与香氛礼盒系列",
  "偏艺术家联名的餐具与桌布组合，要留白感",
  "年轻女性向的轻运动卫衣图案，适合社媒传播",
  "为新茶饮品牌生成一套 Logo、包装与活动海报方向",
];

const liveSignals = [
  { title: "AI 评分", value: "89/100", note: "商业度较高，建议强化品牌识别点" },
  { title: "推荐风格", value: "法式轻奢", note: "更适合礼盒、围巾与香氛类商品" },
  { title: "适配商品", value: "6 类", note: "围巾、礼盒、杯具、桌布、海报、手提袋" },
];

const references = ["品牌海报", "商品图", "包装设计", "服饰印花", "社媒封面"];
const aspectRatios = ["1:1", "4:5", "16:9", "9:16"];
const renderModes = ["高保真", "快速探索", "多版本并行"];
const outputOptions = ["商品场景图", "营销文案", "社媒标题", "详情页卖点", "设计评分", "改稿建议"];

const outputModules = [
  { title: "想法输入区", text: "你可以输入一句描述、上传参考图，或者直接贴一张草图。" },
  { title: "画面优化区", text: "把色板、图案、材质、版式和品牌感慢慢拉到一个方向上。" },
  { title: "商品落图区", text: "继续生成场景图、详情页模块和商品化展示素材。" },
  { title: "营销输出区", text: "自动补标题、卖点、社媒文案和传播脚本。" },
];

const roadmap = [
  { phase: "Now", title: "先把 AI 能力做成清晰的产品入口", desc: "让用户一眼能看懂这里不只是出图，而是完整的设计中台。" },
  { phase: "Next", title: "再把生成、评分、改稿和商品化能力接全", desc: "让 AI 真正进入图案、详情页、营销和商品陈列这些高频环节。" },
  { phase: "Later", title: "最后做成协作与经营系统", desc: "把设计师、品牌方、商品系统和运营动作统一到一个工作台里。" },
];

const activeWorkflow = ref(workflows[0].id);
const activeCapability = ref(capabilityGroups[0].id);
const selectedPrompt = ref(prompts[0]);
const selectedReference = ref("品牌海报");
const selectedAspect = ref("4:5");
const selectedMode = ref("高保真");
const selectedOutputs = ref<string[]>(["商品场景图", "营销文案", "设计评分"]);

const activeItem = computed(() => workflows.find((item) => item.id === activeWorkflow.value) || workflows[0]);
const activeCapabilityItem = computed(() => capabilityGroups.find((item) => item.id === activeCapability.value) || capabilityGroups[0]);

const toggleOutput = (item: string) => {
  if (selectedOutputs.value.includes(item)) {
    selectedOutputs.value = selectedOutputs.value.filter((output) => output !== item);
    return;
  }
  selectedOutputs.value = [...selectedOutputs.value, item];
};

const generatedSummary = computed(() => [
  `参考类型：${selectedReference.value}`,
  `输出比例：${selectedAspect.value}`,
  `生成模式：${selectedMode.value}`,
  `附加结果：${selectedOutputs.value.join(" / ") || "无"}`,
]);
</script>

<template>
  <div class="ai-lab-page px-4 py-10 sm:px-6 lg:px-8">
    <div class="mx-auto max-w-[1560px] space-y-8">
      <section class="ai-hero-shell">
        <div class="ai-hero-main">
          <div class="minimal-kicker">AI Design Lab</div>
          <h1 class="ai-hero-title">AI 应该进入完整设计流程，而不是只会出几张图。</h1>
          <p class="ai-hero-lead">这一页我直接改成实验舱风格的工作台。它不是普通介绍页，而是让用户在“生成、优化、营销、评分、改稿”之间切换，感受到 AI 是一个可操作的中台。</p>
          <div class="mt-6 flex flex-wrap gap-2">
            <span class="ys-chip text-[11px]">文生图设计</span>
            <span class="ys-chip text-[11px]">AI 排版</span>
            <span class="ys-chip text-[11px]">设计评分</span>
            <span class="ys-chip text-[11px]">趋势分析</span>
            <span class="ys-chip text-[11px]">自动改稿</span>
          </div>
          <div class="ai-signal-row">
            <div v-for="item in liveSignals" :key="item.title" class="ai-signal-card">
              <div class="text-[10px] uppercase tracking-[0.18em] text-stone-400">{{ item.title }}</div>
              <div class="mt-2 text-[18px] font-semibold text-stone-950">{{ item.value }}</div>
              <p class="mt-2 text-[11px] leading-5 text-stone-500">{{ item.note }}</p>
            </div>
          </div>
        </div>

        <div class="ai-prompt-dock">
          <div class="minimal-kicker">Try a direction</div>
          <div class="mt-4 space-y-2">
            <button v-for="item in prompts" :key="item" type="button" :class="['w-full rounded-[1rem] border px-4 py-3 text-left text-[12px] transition duration-200', selectedPrompt === item ? 'border-stone-200 bg-white text-stone-900' : 'border-white/10 bg-white/5 text-stone-200 hover:bg-white/10']" @click="selectedPrompt = item">
              {{ item }}
            </button>
          </div>
          <div class="mt-5 rounded-[1.2rem] bg-white/8 p-4">
            <div class="text-[10px] uppercase tracking-[0.18em] text-stone-300">假设你就从这句话开始</div>
            <p class="mt-3 text-[13px] leading-7 text-stone-100">{{ selectedPrompt }}</p>
          </div>
          <div class="ai-mini-orbit">
            <div class="ai-mini-node">Generate</div>
            <div class="ai-mini-node">Optimize</div>
            <div class="ai-mini-node">Score</div>
          </div>
        </div>
      </section>

      <section class="ai-capability-shell">
        <BusinessSectionIntro kicker="Capability Matrix" title="先把 AI 能力拆开，让用户知道这里不只是生成图。" description="我把能力分成五组，并用更像实验轨道的布局展示，而不是标准两栏说明页。" />
        <div class="ai-capability-grid">
          <div class="ai-capability-rail">
            <button v-for="item in capabilityGroups" :key="item.id" type="button" :class="['ai-capability-card', activeCapability === item.id ? 'is-active' : '']" @click="activeCapability = item.id">
              <div class="text-[15px] font-semibold">{{ item.name }}</div>
              <p class="mt-2 text-[12px] leading-6">{{ item.intro }}</p>
            </button>
          </div>
          <div class="ai-capability-stage">
            <div class="text-[10px] uppercase tracking-[0.22em] text-stone-400">当前能力分组</div>
            <h2 class="mt-3 text-[28px] font-semibold text-stone-950">{{ activeCapabilityItem.name }}</h2>
            <p class="mt-3 text-[13px] leading-7 text-stone-500">{{ activeCapabilityItem.intro }}</p>
            <div class="ai-capability-pool">
              <div v-for="point in activeCapabilityItem.points" :key="point" class="ai-capability-pill">{{ point }}</div>
            </div>
          </div>
        </div>
      </section>

      <section class="ai-workbench-shell">
        <BusinessSectionIntro kicker="AI Workbench" title="把它做成真正可操作的 AI 工作台。" description="不是普通表单加文案，而是让输入、参数、结果、商业输出和视觉预览放在同一页里。" />
        <div class="ai-workbench-grid">
          <div class="ai-control-column">
            <div class="text-[10px] uppercase tracking-[0.22em] text-stone-400">生成配置</div>
            <div class="mt-4 grid gap-4">
              <div>
                <div class="text-[11px] uppercase tracking-[0.18em] text-stone-400">参考类型</div>
                <div class="mt-3 flex flex-wrap gap-2">
                  <button v-for="item in references" :key="item" type="button" :class="['ai-control-chip', selectedReference === item ? 'is-active' : '']" @click="selectedReference = item">{{ item }}</button>
                </div>
              </div>
              <div>
                <div class="text-[11px] uppercase tracking-[0.18em] text-stone-400">输出比例</div>
                <div class="mt-3 flex flex-wrap gap-2">
                  <button v-for="item in aspectRatios" :key="item" type="button" :class="['ai-control-chip', selectedAspect === item ? 'is-active' : '']" @click="selectedAspect = item">{{ item }}</button>
                </div>
              </div>
              <div>
                <div class="text-[11px] uppercase tracking-[0.18em] text-stone-400">生成模式</div>
                <div class="mt-3 space-y-2">
                  <button v-for="item in renderModes" :key="item" type="button" :class="['ai-mode-card', selectedMode === item ? 'is-active' : '']" @click="selectedMode = item">{{ item }}</button>
                </div>
              </div>
              <div>
                <div class="text-[11px] uppercase tracking-[0.18em] text-stone-400">附加输出物</div>
                <div class="mt-3 grid gap-2 sm:grid-cols-2">
                  <button v-for="item in outputOptions" :key="item" type="button" :class="['ai-output-card', selectedOutputs.includes(item) ? 'is-active' : '']" @click="toggleOutput(item)">{{ item }}</button>
                </div>
              </div>
            </div>
          </div>

          <div class="ai-result-column">
            <div class="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div class="text-[10px] uppercase tracking-[0.22em] text-stone-400">结果预览台</div>
                <h2 class="mt-3 text-[28px] font-semibold text-stone-950">本轮 AI 输出结构</h2>
              </div>
              <div class="rounded-[1rem] bg-white px-4 py-3 text-[12px] text-stone-500">预计输出 <strong class="ml-2 text-stone-950">{{ selectedOutputs.length + 1 }}</strong> 项</div>
            </div>
            <div class="ai-summary-ribbon">
              <div v-for="line in generatedSummary" :key="line" class="ai-summary-card">{{ line }}</div>
            </div>
            <div class="ai-result-stage">
              <div class="ai-visual-panel">
                <div class="text-[11px] uppercase tracking-[0.18em] text-stone-400">视觉结果</div>
                <div class="ai-visual-canvas">
                  <div class="ai-visual-shape is-large"></div>
                  <div class="ai-visual-shape is-small"></div>
                  <div class="ai-visual-caption">生成主视觉、延展图案和构图方向</div>
                </div>
              </div>
              <div class="ai-side-results">
                <div class="ai-side-card">
                  <div class="text-[11px] uppercase tracking-[0.18em] text-stone-400">商业结果</div>
                  <div class="mt-3 space-y-2">
                    <div class="rounded-[0.8rem] bg-[#faf8f5] px-3 py-2 text-[11px] text-stone-600">标题建议 3 条</div>
                    <div class="rounded-[0.8rem] bg-[#faf8f5] px-3 py-2 text-[11px] text-stone-600">卖点提炼 5 条</div>
                    <div class="rounded-[0.8rem] bg-[#faf8f5] px-3 py-2 text-[11px] text-stone-600">社媒文案 2 版</div>
                  </div>
                </div>
                <div class="ai-side-card">
                  <div class="text-[11px] uppercase tracking-[0.18em] text-stone-400">优化结果</div>
                  <div class="mt-3 space-y-2">
                    <div class="rounded-[0.8rem] bg-[#faf8f5] px-3 py-2 text-[11px] text-stone-600">配色优化建议</div>
                    <div class="rounded-[0.8rem] bg-[#faf8f5] px-3 py-2 text-[11px] text-stone-600">版式层级建议</div>
                    <div class="rounded-[0.8rem] bg-[#faf8f5] px-3 py-2 text-[11px] text-stone-600">上线前评分卡</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="ys-panel rounded-[1.75rem] p-5 sm:p-6">
        <BusinessSectionIntro kicker="Workflow Engine" title="再把 AI 真正放进设计流程，而不是停在功能名词上。" description="先理清输入，再生成图案和商品方向，最后处理版式、营销和改稿，这样 AI 才会变得有用。" />
        <div class="mt-6 grid gap-3 lg:grid-cols-[0.92fr_1.08fr]">
          <div class="space-y-3">
            <button v-for="item in workflows" :key="item.id" type="button" :class="['ai-capability-card', activeWorkflow === item.id ? 'is-active' : '']" @click="activeWorkflow = item.id">
              <div class="text-[15px] font-semibold">{{ item.name }}</div>
              <p class="mt-2 text-[12px] leading-6">{{ item.intro }}</p>
            </button>
          </div>
          <div class="ai-capability-stage">
            <div class="text-[10px] uppercase tracking-[0.22em] text-stone-400">当前模块</div>
            <h2 class="mt-3 text-[26px] font-semibold text-stone-950">{{ activeItem.name }}</h2>
            <p class="mt-3 text-[13px] leading-7 text-stone-500">{{ activeItem.intro }}</p>
            <div class="ai-capability-pool">
              <div v-for="point in activeItem.points" :key="point" class="ai-capability-pill">{{ point }}</div>
            </div>
          </div>
        </div>
      </section>

      <section class="grid gap-5 xl:grid-cols-[1fr_1fr]">
        <div class="ys-panel rounded-[1.75rem] p-5 sm:p-6">
          <BusinessSectionIntro kicker="Future Surface" title="把输入、优化、商品化和营销输出放在同一页。" description="这部分先做成前端原型，后面再逐步接入真实生成结果和设计工作流。" />
          <div class="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <div v-for="item in outputModules" :key="item.title" class="ai-side-card">
              <div class="text-[14px] font-semibold text-stone-950">{{ item.title }}</div>
              <p class="mt-2 text-[12px] leading-6 text-stone-500">{{ item.text }}</p>
            </div>
          </div>
        </div>

        <div class="ys-panel rounded-[1.75rem] p-5 sm:p-6">
          <BusinessSectionIntro kicker="Roadmap" title="不是一次写满，而是一轮一轮把 AI 能力做成产品。" description="这一轮我先把最像产品的前端结构做出来，下一轮可以继续补更像工作台的细节。" />
          <div class="mt-6 space-y-3">
            <div v-for="item in roadmap" :key="item.phase" class="ai-side-card">
              <div class="flex items-center justify-between gap-3">
                <div class="text-[15px] font-semibold text-stone-950">{{ item.title }}</div>
                <span class="rounded-full bg-[#faf8f5] px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-stone-500">{{ item.phase }}</span>
              </div>
              <p class="mt-2 text-[12px] leading-6 text-stone-500">{{ item.desc }}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.ai-lab-page { background: radial-gradient(circle at 10% 10%, rgba(139,154,135,.12), transparent 22rem), radial-gradient(circle at 88% 14%, rgba(196,138,106,.14), transparent 18rem), linear-gradient(180deg, #f6f4ef, #f2eee7); }
.ai-hero-shell,.ai-capability-grid,.ai-workbench-grid { display:grid; gap:1rem; }
@media (min-width:1280px){ .ai-hero-shell { grid-template-columns:minmax(0,1.1fr) minmax(22rem,.9fr);} .ai-workbench-grid { grid-template-columns:minmax(18rem,.9fr) minmax(0,1.1fr);} }
@media (min-width:1024px){ .ai-capability-grid { grid-template-columns:minmax(16rem,.8fr) minmax(0,1.2fr);} .ai-result-stage { grid-template-columns:minmax(0,1.08fr) minmax(18rem,.92fr);} }
.ai-hero-main,.ai-prompt-dock,.ai-capability-shell,.ai-workbench-shell { border:1px solid rgba(36,49,39,.08); border-radius:2rem; }
.ai-hero-main { padding:1.75rem; background:linear-gradient(145deg, rgba(255,255,255,.84), rgba(241,244,239,.78)); box-shadow:var(--ys-shadow-md); }
.ai-hero-title { margin-top:1rem; max-width:42rem; font-size:clamp(2.2rem,5vw,4rem); line-height:1.02; color:#1f2f26; }
.ai-hero-lead { margin-top:1.2rem; max-width:38rem; font-size:.95rem; line-height:2; color:#5f695f; }
.ai-signal-row { display:grid; gap:.8rem; margin-top:1.4rem; }
@media (min-width:640px){ .ai-signal-row,.ai-summary-ribbon { grid-template-columns:repeat(3,minmax(0,1fr)); } }
.ai-signal-card,.ai-side-card,.ai-summary-card { border-radius:1.2rem; padding:1rem; background:rgba(255,255,255,.82); }
.ai-prompt-dock { padding:1.4rem; background:linear-gradient(180deg, rgba(36,49,39,.96), rgba(73,87,77,.94)); color:#f8f5ef; box-shadow:var(--ys-shadow-lg); }
.ai-mini-orbit { display:flex; flex-wrap:wrap; gap:.6rem; margin-top:1rem; }
.ai-mini-node,.ai-control-chip { border-radius:999px; padding:.55rem .85rem; font-size:.72rem; }
.ai-mini-node { background:rgba(255,255,255,.1); letter-spacing:.12em; text-transform:uppercase; }
.ai-capability-shell,.ai-workbench-shell { padding:1.35rem; background:rgba(255,255,255,.78); backdrop-filter:blur(10px); }
.ai-capability-rail,.ai-side-results { display:grid; gap:.75rem; }
.ai-capability-card { border:1px solid rgba(36,49,39,.1); border-radius:1.35rem; padding:1rem; text-align:left; background:rgba(255,255,255,.76); }
.ai-capability-card.is-active,.ai-mode-card.is-active,.ai-output-card.is-active,.ai-control-chip.is-active { background:#263328; color:#f8f5ef; }
.ai-capability-stage,.ai-result-column { border-radius:1.6rem; padding:1.2rem; background:linear-gradient(135deg, rgba(239,232,223,.9), rgba(255,255,255,.84)); }
.ai-capability-pool { display:flex; flex-wrap:wrap; gap:.7rem; margin-top:1.2rem; }
.ai-capability-pill { border-radius:999px; padding:.75rem 1rem; background:#fff; font-size:.76rem; color:#5a665b; }
.ai-control-column { border:1px solid rgba(36,49,39,.08); border-radius:1.6rem; padding:1.2rem; background:rgba(255,255,255,.9); }
.ai-control-chip { background:#faf8f5; color:#5c665d; }
.ai-mode-card,.ai-output-card { border-radius:1rem; padding:.8rem .9rem; text-align:left; background:#faf8f5; color:#5c665d; }
.ai-summary-ribbon { display:grid; gap:.75rem; margin-top:1.25rem; }
@media (min-width:640px){ .ai-summary-ribbon { grid-template-columns:repeat(2,minmax(0,1fr)); } }
.ai-result-stage { display:grid; gap:1rem; margin-top:1.2rem; }
.ai-visual-panel { border-radius:1.3rem; padding:1rem; background:rgba(255,255,255,.86); }
.ai-visual-canvas { position:relative; overflow:hidden; min-height:18rem; margin-top:1rem; border-radius:1.4rem; background:linear-gradient(145deg,#efe6dc,#dadcd2); }
.ai-visual-shape { position:absolute; background:rgba(255,255,255,.72); backdrop-filter:blur(6px); }
.ai-visual-shape.is-large { left:1.1rem; right:4rem; top:1.1rem; bottom:3.6rem; border-radius:10rem 10rem 1.4rem 1.4rem; }
.ai-visual-shape.is-small { right:1rem; top:2.2rem; width:5.6rem; height:8rem; border-radius:2rem; }
.ai-visual-caption { position:absolute; left:1rem; right:1rem; bottom:1rem; border-radius:1rem; padding:.85rem 1rem; background:rgba(36,49,39,.84); color:#f8f5ef; font-size:.78rem; }
</style>
