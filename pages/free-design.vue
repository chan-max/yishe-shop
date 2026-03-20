<script setup lang="ts">
definePageMeta({ layout: "page" });

usePageSEO({
  title: "免费设计中心 - 衣设",
  description:
    "衣设免费设计中心以工作台的方式承接品牌、电商、社媒、生活与行业设计需求，让用户直接从场景进入设计流程。",
  keywords:
    "免费设计,Logo设计,电商主图,详情页,小红书封面,礼品设计,印花设计,衣设",
  url: "https://1s.design/free-design",
  type: "website",
});

type DesignWorld = {
  id: string;
  name: string;
  icon: string;
  summary: string;
  outputs: string[];
  views: { title: string; description: string; tone: string }[];
  suggestedFlow: string[];
};

const worlds: DesignWorld[] = [
  {
    id: "brand",
    name: "企业品牌",
    icon: "mdi-domain",
    summary: "适合从 Logo、VI、包装到门店传播的一整套品牌启动视觉。",
    outputs: ["Logo", "品牌 VI", "门头招牌", "宣传册", "招商海报", "包装标签"],
    views: [
      { title: "品牌起始页", description: "先把品牌名字、主色、字体和第一张传播首图搭出来。", tone: "专业、克制、品牌感" },
      { title: "线下应用面", description: "门头、海报、导视和物料都在同一个视觉系统里。", tone: "统一、可信、可落地" },
      { title: "商品包装面", description: "包装和宣传图属于同一种品牌语言。", tone: "精致、完整、可销售" },
    ],
    suggestedFlow: ["先定品牌气质", "再出 Logo / VI", "再延展到包装和传播"],
  },
  {
    id: "commerce",
    name: "电商转化",
    icon: "mdi-storefront-outline",
    summary: "适合主图、详情页、促销节点、直播视觉和首页装修这类增长型场景。",
    outputs: ["商品主图", "详情页模块", "促销海报", "直播贴片", "首页装修", "卖点可视化"],
    views: [
      { title: "点击入口面", description: "主图、封面和首屏活动图优先解决点击问题。", tone: "直接、醒目、可转化" },
      { title: "详情叙事面", description: "卖点、参数、场景和对比模块被编排成成交节奏。", tone: "清晰、顺滑、有说服力" },
      { title: "活动换肤面", description: "618、双11、秒杀和上新能快速切换视觉皮肤。", tone: "高效、快反、适配节点" },
    ],
    suggestedFlow: ["先做点击入口", "再排详情节奏", "最后做活动节点素材"],
  },
  {
    id: "social",
    name: "社媒内容",
    icon: "mdi-cellphone-play",
    summary: "适合小红书、短视频、公众号、视频号和私域传播，强调封面节奏和账号记忆点。",
    outputs: ["小红书封面", "短视频封面", "公众号头图", "九宫格", "热点海报", "朋友圈传播图"],
    views: [
      { title: "封面系统面", description: "让一组内容看起来像来自同一个内容品牌。", tone: "有记忆点、系列感强" },
      { title: "热点快反面", description: "节日、热点和话题营销能快速出一波图。", tone: "轻、快、可传播" },
      { title: "私域扩散面", description: "适合转发、邀约和裂变传播。", tone: "高识别、易转发、低门槛" },
    ],
    suggestedFlow: ["先定封面语法", "再做栏目系统", "最后做热点和私域扩散"],
  },
  {
    id: "life",
    name: "生活方式",
    icon: "mdi-home-heart",
    summary: "适合家居、礼物、穿搭、婚礼与纪念场景，让设计回到日常生活。",
    outputs: ["礼物设计", "家居图案", "穿搭图案", "婚礼物料", "个人卡片", "亲子周边"],
    views: [
      { title: "礼物情绪面", description: "更强调关系感、纪念感和独特表达。", tone: "温柔、私人、有温度" },
      { title: "空间延展面", description: "抱枕、挂画、桌布和墙面被放进统一生活语境。", tone: "柔和、耐看、家居感" },
      { title: "个人表达面", description: "穿搭、卡片和周边更像个人风格投射。", tone: "松弛、像本人、易分享" },
    ],
    suggestedFlow: ["先定关系或场景", "再定风格气质", "最后延展到礼物或家居"],
  },
  {
    id: "industry",
    name: "行业专项",
    icon: "mdi-briefcase-outline",
    summary: "面向服装、美妆、餐饮、教育、会务等垂直行业，更强调业务适配度。",
    outputs: ["服装印花", "美妆包装", "餐饮品牌图", "课程招生图", "会务视觉", "活动大屏"],
    views: [
      { title: "行业模板面", description: "先进入更懂业务的设计模板世界，而不是空白画布。", tone: "专业、贴业务、可执行" },
      { title: "批量输出面", description: "适合高频、多尺寸、集中交付。", tone: "高效、成套、流程化" },
      { title: "现场应用面", description: "从线上传播一直延展到线下会场和物料。", tone: "完整、稳、可落地" },
    ],
    suggestedFlow: ["先选行业模板", "再套业务语境", "最后集中出图和延展"],
  },
];

const goalOptions = ["品牌启动", "提升转化", "账号种草", "礼物定制", "商品上新", "活动传播"];
const styleOptions = ["极简高级", "法式花卉", "新中式", "街头潮流", "轻奢礼赠", "自然有机"];
const paceOptions = ["快速单张", "系列输出", "商品化延展"];

const activeWorldId = ref(worlds[0].id);
const activeGoal = ref(goalOptions[0]);
const activeStyle = ref(styleOptions[0]);
const activePace = ref(paceOptions[1]);
const selectedOutputs = ref<string[]>([]);
const activeCanvasView = ref(0);

const brief = reactive({
  use_case: "",
  audience: "",
  keywords: "",
});

const activeWorld = computed(
  () => worlds.find((item) => item.id === activeWorldId.value) || worlds[0],
);

watch(
  activeWorldId,
  () => {
    selectedOutputs.value = activeWorld.value.outputs.slice(0, 3);
    activeCanvasView.value = 0;
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

const currentView = computed(
  () => activeWorld.value.views[activeCanvasView.value] || activeWorld.value.views[0],
);

const statusList = computed(() => [
  `设计世界：${activeWorld.value.name}`,
  `目标：${activeGoal.value}`,
  `风格：${activeStyle.value}`,
  `节奏：${activePace.value}`,
]);

const goToPath = (path: string) => navigateTo(path);
</script>

<template>
  <div class="free-workbench-page px-4 py-8 sm:px-6 lg:px-8">
    <div class="mx-auto max-w-[1700px]">
      <div class="workbench-shell">
        <aside class="wb-sidebar">
          <div class="wb-brand">
            <div class="minimal-kicker">Free Design Workbench</div>
            <h1>免费设计中心</h1>
            <p>这里不再是介绍页，而是可以直接开始筛选和构建设计方向的前端工作台。</p>
          </div>

          <nav class="wb-worlds" aria-label="设计世界">
            <button
              v-for="item in worlds"
              :key="item.id"
              type="button"
              :class="['wb-world', activeWorldId === item.id ? 'is-active' : '']"
              @click="activeWorldId = item.id"
            >
              <div class="wb-world-top">
                <v-icon size="18">{{ item.icon }}</v-icon>
                <span>{{ item.id }}</span>
              </div>
              <strong>{{ item.name }}</strong>
              <p>{{ item.summary }}</p>
            </button>
          </nav>
        </aside>

        <main class="wb-stage">
          <header class="wb-stage-header">
            <div class="wb-stage-copy">
              <div class="minimal-kicker">Current Workspace</div>
              <h2>{{ activeWorld.name }}</h2>
              <p>{{ activeWorld.summary }}</p>
            </div>
            <div class="wb-header-meta">
              <span>已选输出</span>
              <strong>{{ selectedOutputs.length }}</strong>
            </div>
          </header>

          <section class="wb-canvas">
            <div class="wb-canvas-left">
              <div class="wb-canvas-viewer">
                <div class="wb-canvas-arch">
                  <div class="wb-canvas-overlay">
                    <span>{{ currentView.title }}</span>
                    <strong>{{ activeStyle }}</strong>
                    <p>{{ currentView.description }}</p>
                  </div>
                </div>
              </div>

              <div class="wb-view-tabs">
                <button
                  v-for="(item, index) in activeWorld.views"
                  :key="item.title"
                  type="button"
                  :class="['wb-view-tab', activeCanvasView === index ? 'is-active' : '']"
                  @click="activeCanvasView = index"
                >
                  <strong>{{ item.title }}</strong>
                  <span>{{ item.tone }}</span>
                </button>
              </div>
            </div>

            <div class="wb-canvas-right">
              <div class="wb-flow-card">
                <span class="wb-label">推荐流程</span>
                <div class="wb-flow-steps">
                  <div v-for="item in activeWorld.suggestedFlow" :key="item" class="wb-flow-step">
                    {{ item }}
                  </div>
                </div>
              </div>

              <div class="wb-cloud-card">
                <span class="wb-label">输出结果</span>
                <div class="wb-output-cloud">
                  <button
                    v-for="item in activeWorld.outputs"
                    :key="item"
                    type="button"
                    :class="['wb-output-pill', selectedOutputs.includes(item) ? 'is-active' : '']"
                    @click="toggleOutput(item)"
                  >
                    {{ item }}
                  </button>
                </div>
              </div>
            </div>
          </section>

          <section class="wb-composer">
            <div class="wb-control-strip">
              <span class="wb-label">目标导向</span>
              <div class="wb-token-row">
                <button
                  v-for="item in goalOptions"
                  :key="item"
                  type="button"
                  :class="['wb-token', activeGoal === item ? 'is-active' : '']"
                  @click="activeGoal = item"
                >
                  {{ item }}
                </button>
              </div>
            </div>

            <div class="wb-control-strip">
              <span class="wb-label">风格方向</span>
              <div class="wb-token-row">
                <button
                  v-for="item in styleOptions"
                  :key="item"
                  type="button"
                  :class="['wb-token', activeStyle === item ? 'is-active' : '']"
                  @click="activeStyle = item"
                >
                  {{ item }}
                </button>
              </div>
            </div>

            <div class="wb-pace-panel">
              <span class="wb-label">输出节奏</span>
              <button
                v-for="item in paceOptions"
                :key="item"
                type="button"
                :class="['wb-pace', activePace === item ? 'is-active' : '']"
                @click="activePace = item"
              >
                {{ item }}
              </button>
            </div>
          </section>
        </main>

        <aside class="wb-inspector">
          <div class="wb-panel">
            <div class="wb-label">Brief</div>
            <input v-model="brief.use_case" class="wb-input" type="text" placeholder="这次设计用在什么地方" />
            <input v-model="brief.audience" class="wb-input" type="text" placeholder="面向谁，想影响谁" />
            <textarea v-model="brief.keywords" class="wb-input wb-textarea" placeholder="补充关键词、语气、颜色偏好和参考感觉"></textarea>
          </div>

          <div class="wb-panel warm">
            <div class="wb-label">Live Status</div>
            <div class="wb-status-list">
              <div v-for="item in statusList" :key="item" class="wb-status-item">
                {{ item }}
              </div>
            </div>
            <div class="wb-scene-list">
              <span v-for="item in activeWorld.scenes" :key="item">{{ item }}</span>
            </div>
          </div>

          <div class="wb-panel dark">
            <div class="wb-label light">Next Move</div>
            <button class="wb-link" @click="goToPath('/ai-lab')">继续进入 AI 设计中台</button>
            <button class="wb-link" @click="goToPath('/design')">继续进入定制设计服务</button>
            <button class="wb-link" @click="goToPath('/products')">继续进入商品系统</button>
          </div>
        </aside>
      </div>
    </div>
  </div>
</template>

<style scoped>
.free-workbench-page {
  background:
    radial-gradient(circle at 10% 10%, rgba(196, 138, 106, 0.13), transparent 24rem),
    radial-gradient(circle at 88% 16%, rgba(139, 154, 135, 0.16), transparent 28rem),
    linear-gradient(180deg, #f8f5ef, #efe8df);
}

.workbench-shell {
  display: grid;
  gap: 1rem;
}

@media (min-width: 1500px) {
  .workbench-shell {
    grid-template-columns: minmax(18rem, 0.86fr) minmax(0, 1.55fr) minmax(18rem, 0.72fr);
  }
}

.wb-sidebar,
.wb-stage,
.wb-inspector {
  display: grid;
  gap: 0.9rem;
}

@media (min-width: 1500px) {
  .wb-sidebar,
  .wb-inspector {
    position: sticky;
    top: 6rem;
    align-self: start;
  }
}

.wb-brand,
.wb-world,
.wb-stage,
.wb-panel,
.wb-stage-header,
.wb-flow-card,
.wb-cloud-card,
.wb-control-strip,
.wb-pace-panel,
.wb-view-tab {
  border: 1px solid rgba(36, 49, 39, 0.08);
  border-radius: 1.6rem;
  background: rgba(255, 255, 255, 0.82);
}

.wb-brand {
  padding: 1.3rem;
  background: linear-gradient(145deg, rgba(255,255,255,0.94), rgba(243,236,228,0.86));
}

.wb-brand h1 {
  margin-top: 0.8rem;
  font-size: 2rem;
  line-height: 1.02;
  color: #223127;
}

.wb-brand p {
  margin-top: 0.75rem;
  font-size: 0.84rem;
  line-height: 1.8;
  color: #5f695f;
}

.wb-worlds,
.wb-flow-steps,
.wb-status-list {
  display: grid;
  gap: 0.75rem;
}

.wb-world {
  padding: 1rem;
  text-align: left;
  transition: transform 200ms ease, box-shadow 200ms ease;
}

.wb-world:hover {
  transform: translateY(-2px);
  box-shadow: var(--ys-shadow-sm);
}

.wb-world.is-active {
  background: #263328;
  color: #f8f5ef;
}

.wb-world-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.66rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  opacity: 0.66;
}

.wb-world strong {
  display: block;
  margin-top: 0.55rem;
  font-size: 1rem;
}

.wb-world p {
  margin-top: 0.45rem;
  font-size: 0.78rem;
  line-height: 1.7;
  color: inherit;
  opacity: 0.82;
}

.wb-stage {
  padding: 1rem;
  background: linear-gradient(180deg, rgba(255,255,255,0.7), rgba(245,239,231,0.9));
  backdrop-filter: blur(12px);
}

.wb-stage-header {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 1rem;
  padding: 1.2rem;
}

.wb-stage-copy h2 {
  margin-top: 0.75rem;
  font-size: clamp(2rem, 4vw, 3.4rem);
  line-height: 0.98;
  color: #223127;
}

.wb-stage-copy p {
  margin-top: 0.85rem;
  max-width: 38rem;
  font-size: 0.9rem;
  line-height: 1.95;
  color: #5d685e;
}

.wb-header-meta {
  align-self: flex-start;
  border-radius: 999px;
  padding: 0.85rem 1rem;
  background: #fff;
  font-size: 0.76rem;
  color: #606b61;
}

.wb-header-meta strong {
  display: block;
  margin-top: 0.2rem;
  font-size: 1.35rem;
  color: #223127;
}

.wb-canvas {
  display: grid;
  gap: 1rem;
}

@media (min-width: 1180px) {
  .wb-canvas {
    grid-template-columns: minmax(0, 1.18fr) minmax(18rem, 0.82fr);
  }
}

.wb-canvas-left,
.wb-canvas-right {
  display: grid;
  gap: 0.85rem;
}

.wb-canvas-viewer {
  border-radius: 1.8rem;
  padding: 1rem;
  background: linear-gradient(155deg, #e8ddd0, #dee6dc);
  min-height: 31rem;
}

.wb-canvas-arch {
  position: relative;
  height: 100%;
  min-height: 29rem;
  border-radius: 16rem 16rem 1.4rem 1.4rem;
  background: rgba(255,255,255,0.34);
  overflow: hidden;
}

.wb-canvas-overlay {
  position: absolute;
  left: 1rem;
  right: 1rem;
  bottom: 1rem;
  border-radius: 1.2rem;
  padding: 1rem 1rem 1.1rem;
  background: rgba(255,255,255,0.82);
  backdrop-filter: blur(10px);
}

.wb-canvas-overlay span,
.wb-label {
  font-size: 0.66rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: #7e857b;
}

.wb-canvas-overlay strong {
  display: block;
  margin-top: 0.85rem;
  font-family: var(--ys-font-display);
  font-size: 2rem;
  line-height: 1.04;
  color: #233128;
}

.wb-canvas-overlay p {
  margin-top: 0.8rem;
  font-size: 0.84rem;
  line-height: 1.85;
  color: #5e695f;
}

.wb-view-tabs {
  display: grid;
  gap: 0.8rem;
}

@media (min-width: 900px) {
  .wb-view-tabs {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

.wb-view-tab {
  padding: 1rem;
  text-align: left;
  transition: transform 200ms ease, box-shadow 200ms ease, background-color 200ms ease;
}

.wb-view-tab.is-active {
  background: #263328;
  color: #f8f5ef;
}

.wb-view-tab strong {
  display: block;
  font-size: 0.92rem;
}

.wb-view-tab span {
  display: block;
  margin-top: 0.45rem;
  font-size: 0.76rem;
  color: inherit;
  opacity: 0.8;
}

.wb-flow-card,
.wb-cloud-card {
  padding: 1rem;
}

.wb-flow-step {
  border-radius: 1rem;
  padding: 0.9rem 1rem;
  background: rgba(255,255,255,0.88);
  font-size: 0.8rem;
  color: #5a655b;
}

.wb-output-cloud,
.wb-token-row,
.wb-scene-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.65rem;
}

.wb-output-cloud,
.wb-token-row {
  margin-top: 0.85rem;
}

.wb-output-pill,
.wb-token,
.wb-scene-list span {
  border-radius: 999px;
  padding: 0.72rem 0.95rem;
  background: rgba(255,255,255,0.9);
  font-size: 0.75rem;
  color: #586359;
}

.wb-output-pill.is-active,
.wb-token.is-active {
  background: linear-gradient(135deg, #263328, #5d6d5c);
  color: #fff;
}

.wb-composer {
  display: grid;
  gap: 0.9rem;
}

@media (min-width: 1180px) {
  .wb-composer {
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr) minmax(14rem, 0.72fr);
  }
}

.wb-control-strip,
.wb-pace-panel {
  padding: 1rem;
}

.wb-pace-panel {
  display: grid;
  gap: 0.6rem;
}

.wb-pace {
  border-radius: 1rem;
  padding: 0.92rem;
  text-align: left;
  background: #faf8f5;
  color: #59645a;
}

.wb-pace.is-active {
  background: #263328;
  color: #fff;
}

.wb-panel {
  padding: 1rem;
}

.wb-panel.warm {
  background: linear-gradient(135deg, rgba(239,232,223,0.94), rgba(255,255,255,0.84));
}

.wb-panel.dark {
  background: linear-gradient(180deg, rgba(36,49,39,0.96), rgba(73,87,77,0.94));
}

.wb-label.light {
  color: rgba(255,255,255,0.58);
}

.wb-input {
  width: 100%;
  margin-top: 0.8rem;
  border: 1px solid rgba(36,49,39,0.1);
  border-radius: 1rem;
  background: #faf8f5;
  padding: 0.95rem 1rem;
  font-size: 0.78rem;
  outline: none;
}

.wb-textarea {
  min-height: 8rem;
  resize: vertical;
}

.wb-status-list {
  margin-top: 0.9rem;
}

.wb-status-item {
  border-radius: 1rem;
  padding: 0.9rem 1rem;
  background: rgba(255,255,255,0.84);
  font-size: 0.76rem;
  color: #59645a;
}

.wb-scene-list {
  margin-top: 1rem;
}

.wb-link {
  width: 100%;
  margin-top: 0.75rem;
  border-radius: 1rem;
  padding: 0.95rem 1rem;
  text-align: left;
  background: rgba(255,255,255,0.08);
  color: #f8f5ef;
  font-size: 0.82rem;
}
</style>
