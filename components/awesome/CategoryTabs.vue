<script lang="ts" setup>
interface Props {
  activeCategory: number;
  isDropdownVisible: boolean;
}

interface Emits {
  (e: "update:activeCategory", value: number): void;
  (e: "update:isDropdownVisible", value: boolean): void;
  (e: "mouseenter", index: number): void;
  (e: "mouseleave"): void;
  (e: "tabChange", index: number): void;
}

interface CategoryBlock {
  name: string;
  description: string;
  items: string[];
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const isMobile = ref(false);

const updateIsMobile = () => {
  if (process.client) {
    isMobile.value = window.matchMedia("(max-width: 768px)").matches;
  }
};

onMounted(() => {
  updateIsMobile();
  if (process.client) {
    window.addEventListener("resize", updateIsMobile, {
      passive: true,
    } as AddEventListenerOptions);
  }
});

onBeforeUnmount(() => {
  if (process.client) {
    window.removeEventListener("resize", updateIsMobile as EventListener);
  }
});

const categories = [
  { name: "全部商品", description: "把品类、风格和使用场景先理清，再决定往哪看。" },
  { name: "快速配送", description: "适合已经决定下单，只想尽快收到的一组内容。" },
  { name: "艺术字设计", description: "把一句话、一个名字或一个概念做成可用表达。" },
  { name: "筹款活动", description: "更适合活动、社群和公益主题的集中展示。" },
  { name: "LGBTQ+创作者", description: "围绕多元表达与创作者内容展开。" },
  { name: "女性创作者", description: "更聚焦女性视角、女性品牌和女性表达。" },
  { name: "更多", description: "把品牌、设计师和专题内容集中放在一起。" },
];

const categoryContent: Record<number, CategoryBlock[]> = {
  0: [
    {
      name: "按品类看",
      description: "先确认你想看的是穿在身上的，还是放进日常里的。",
      items: ["T恤 / 卫衣", "杯子", "帆布包", "手机壳", "抱枕", "挂毯"],
    },
    {
      name: "按使用场景看",
      description: "礼物、通勤、居家、活动，场景通常比风格更容易先选。",
      items: ["礼物", "通勤", "居家", "活动周边", "节日限定", "联名系列"],
    },
    {
      name: "按风格看",
      description: "不想先筛具体品类，就先按气质接近你自己的方向进。",
      items: ["极简", "街头", "复古", "自然", "艺术字", "品牌视觉"],
    },
  ],
  1: [
    {
      name: "配送速度",
      description: "把需要尽快收到的内容单独拎出来。",
      items: ["24小时发货", "48小时发货", "同城配送", "现货商品"],
    },
    {
      name: "适合现在下单的",
      description: "更偏成品和高频需求，不用在这一步想太多。",
      items: ["礼物", "团队周边", "活动补货", "节日限定"],
    },
  ],
  2: [
    {
      name: "设计服务",
      description: "把一句话、一个名字或一个概念做成清楚的视觉表达。",
      items: ["品牌标识", "节日祝福", "服装印花", "家居装饰"],
    },
    {
      name: "风格方向",
      description: "先挑整体气质，再继续细化应用场景。",
      items: ["现代简约", "艺术创意", "商务专业", "复古经典"],
    },
  ],
  3: [
    {
      name: "活动类型",
      description: "更适合社群、公益与短期传播项目。",
      items: ["慈善筹款", "公益项目", "社区支持", "爱心捐赠"],
    },
  ],
  4: [
    {
      name: "创作者主题",
      description: "围绕多元表达和独立视角的内容。",
      items: ["彩虹系列", "包容设计", "多元文化", "自由表达"],
    },
  ],
  5: [
    {
      name: "内容方向",
      description: "聚焦女性创作者、女性品牌和女性表达。",
      items: ["女性设计", "女性品牌", "女性力量", "独立女性"],
    },
  ],
  6: [
    {
      name: "延伸入口",
      description: "把还没归进主类的内容集中放在一起。",
      items: ["所有分类", "品牌专区", "设计师", "活动", "定制设计"],
    },
  ],
};

const activeBlocks = computed(
  () => categoryContent[props.activeCategory] || categoryContent[0],
);

const handleMouseEnter = (index: number) => {
  emit("mouseenter", index);
};

const handleMouseLeave = () => {
  emit("mouseleave");
};

const handleTabChange = (index: number) => {
  emit("tabChange", index);
  if (isMobile.value) {
    const isSameTab = props.activeCategory === index;
    emit("update:activeCategory", index);
    emit("update:isDropdownVisible", isSameTab ? !props.isDropdownVisible : true);
  }
};

const handleItemClick = (_categoryName: string, itemName: string) => {
  navigateTo({
    path: "/products",
    query: { search: itemName },
  });
};
</script>

<template>
  <div class="navigation-menu">
    <div class="tab-bar">
      <div class="tab-container">
        <div
          v-for="(category, index) in categories"
          :key="`tab-group-${index}`"
          class="tab-group"
        >
          <button
            :class="`tab-button ${activeCategory === index ? 'active' : ''}`"
            @click="handleTabChange(index)"
            @mouseenter="handleMouseEnter(index)"
            @mouseleave="handleMouseLeave"
          >
            {{ category.name }}
          </button>
        </div>
      </div>
    </div>

    <div
      v-if="isDropdownVisible"
      class="dropdown-menu"
      @mouseenter="handleMouseEnter(activeCategory)"
      @mouseleave="handleMouseLeave"
    >
      <div class="menu-content">
        <div class="menu-header">
          <div class="menu-kicker">{{ categories[activeCategory]?.name }}</div>
          <p class="menu-description">
            {{ categories[activeCategory]?.description }}
          </p>
        </div>

        <div class="menu-grid">
          <section
            v-for="block in activeBlocks"
            :key="block.name"
            class="menu-section"
          >
            <h3 class="section-title">{{ block.name }}</h3>
            <p class="section-description">{{ block.description }}</p>
            <div class="section-items">
              <button
                v-for="item in block.items"
                :key="item"
                type="button"
                class="menu-item"
                @click="handleItemClick(block.name, item)"
              >
                {{ item }}
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.navigation-menu {
  position: relative;
  z-index: 10;
}

.tab-bar {
  border-bottom: 1px solid rgba(28, 25, 23, 0.08);
  background: rgba(255, 255, 255, 0.92);
}

.tab-container {
  display: flex;
  align-items: center;
  gap: 8px;
  overflow-x: auto;
  padding: 8px 0;
  scroll-snap-type: x proximity;

  @media (max-width: 768px) {
    gap: 6px;
  }
}

.tab-group {
  flex-shrink: 0;
}

.tab-button {
  min-width: 78px;
  padding: 8px 14px;
  border: 1px solid transparent;
  border-radius: 999px;
  background: transparent;
  color: #78716c;
  font-size: 12px;
  font-weight: 500;
  text-align: center;
  white-space: nowrap;
  cursor: pointer;
  transition: all 0.2s ease;
  scroll-snap-align: start;

  &:hover {
    border-color: rgba(28, 25, 23, 0.08);
    background: #faf8f5;
    color: #1c1917;
  }

  &.active {
    border-color: #1c1917;
    background: #1c1917;
    color: #f7f5f2;
  }

  @media (max-width: 768px) {
    min-width: 68px;
    padding: 6px 10px;
    font-size: 11px;
  }
}

.dropdown-menu {
  border-bottom: 1px solid rgba(28, 25, 23, 0.08);
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(8px);
  animation: slideDown 0.24s ease;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.menu-content {
  display: grid;
  gap: 20px;
  padding: 24px 0 28px;

  @media (max-width: 768px) {
    padding: 18px 0 22px;
  }
}

.menu-header {
  display: grid;
  gap: 8px;
}

.menu-kicker {
  font-size: 11px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #78716c;
}

.menu-description {
  margin: 0;
  max-width: 680px;
  font-size: 13px;
  line-height: 1.7;
  color: #57534e;
}

.menu-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;

  @media (max-width: 960px) {
    grid-template-columns: 1fr;
  }
}

.menu-section {
  border: 1px solid rgba(28, 25, 23, 0.08);
  border-radius: 16px;
  background: #fcfbf9;
  padding: 16px;
}

.section-title {
  margin: 0;
  font-size: 14px;
  font-weight: 600;
  color: #1c1917;
}

.section-description {
  margin: 8px 0 0;
  font-size: 12px;
  line-height: 1.65;
  color: #78716c;
}

.section-items {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 14px;
}

.menu-item {
  border: 1px solid rgba(28, 25, 23, 0.08);
  border-radius: 999px;
  background: white;
  color: #57534e;
  font-size: 12px;
  line-height: 1;
  padding: 10px 12px;
  cursor: pointer;
  transition:
    border-color 0.18s ease,
    background-color 0.18s ease,
    color 0.18s ease,
    transform 0.18s ease;

  &:hover {
    border-color: rgba(28, 25, 23, 0.16);
    background: #f7f5f2;
    color: #1c1917;
    transform: translateY(-1px);
  }

  @media (max-width: 768px) {
    width: 100%;
    text-align: left;
  }
}
</style>
