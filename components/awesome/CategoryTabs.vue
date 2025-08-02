<script lang="ts" setup>
interface Props {
  activeCategory: number;
  isDropdownVisible: boolean;
}

interface Emits {
  (e: 'update:activeCategory', value: number): void;
  (e: 'update:isDropdownVisible', value: boolean): void;
  (e: 'mouseenter', index: number): void;
  (e: 'mouseleave'): void;
  (e: 'tabChange', index: number): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

// 直接在组件中定义tab数据
const categories = [
  {
    name: '全部商品',
    description: '探索我们丰富的服装系列，从日常休闲到正式场合，满足您的各种需求'
  },
  {
    name: '快速配送',
    description: '24小时内发货，让您快速获得心仪的服装'
  },
  {
    name: '编辑精选',
    description: '由专业编辑精心挑选的优质服装，品质保证'
  },
  {
    name: '筹款活动',
    description: '支持公益事业，购买服装的同时为慈善事业贡献力量'
  },
  {
    name: 'LGBTQ+创作者',
    description: '支持多元文化，展现包容与平等的时尚理念'
  },
  {
    name: '女性创作者',
    description: '由女性设计师打造的独特服装，展现女性力量'
  },
  {
    name: '更多',
    description: '探索更多分类和品牌，发现更多精彩'
  }
];

const handleMouseEnter = (index: number) => {
  emit('mouseenter', index);
};

const handleMouseLeave = () => {
  emit('mouseleave');
};

const handleTabChange = (index: number) => {
  emit('tabChange', index);
};

// 处理小导航点击事件
const handleItemClick = (categoryName: string, itemName: string) => {
  // 只传递搜索关键字
  const searchParams = {
    search: itemName
  };
  
  // 跳转到 products 页面并携带参数
  navigateTo({
    path: '/products',
    query: searchParams
  });
};

// 根据activeCategory返回对应的热门搜索项目
const getTrendingItems = (categoryIndex: number) => {
  const trendingData = {
    0: [ // 全部商品 - 参考ASOS风格
      { 
        name: '商品分类',
        items: [
          { name: '最近发布', isBold: false },
          { name: '人气最高', isBold: false },
          { name: '好评最高', isBold: false },
          { name: '情侣装', isBold: false },
          { name: '童装专属', isBold: false },
          { name: '团队风格', isBold: false },
          { name: '限量发售', isBold: true },
          { name: '热销爆款', isBold: true }
        ]
      },
      { 
        name: '品类',
        items: [
          { name: '服装 &T恤', image: '/thumbnail/tshirt.png' },
          { name: '杯子 & 马克杯', image: '/thumbnail/cup.png' },
          { name: '挎包', image: '/thumbnail/bag.png' },
          { name: '挂毯', image: '/thumbnail/tapestry.png' },
          { name: '毛巾', image: '/thumbnail/towel.png' },
          { name: '鼠标垫', image: '/thumbnail/mousepad.png' }
        ]
      },
      { 
        name: 'BRAND DROPS',
        items: [
          { name: 'ASOS DESIGN', image: '@/thumbnail/asos-design.jpg' },
          { name: 'adidas', image: '@/thumbnail/adidas.jpg' },
          { name: 'British Brands', image: '@/thumbnail/british-brands.jpg' },
          { name: 'New Balance', image: '@/thumbnail/new-balance.jpg' },
          { name: 'New Look', image: '@/thumbnail/new-look.jpg' },
          { name: 'The North Face', image: '@/thumbnail/north-face.jpg' }
        ]
      },

    ],
    1: [ // 快速配送
      { name: '24小时发货', image: '@/thumbnail/24h-shipping.jpg' },
      { name: '48小时发货', image: '@/thumbnail/48h-shipping.jpg' },
      { name: '同城配送', image: '@/thumbnail/local-delivery.jpg' },
      { name: '现货商品', image: '@/thumbnail/in-stock.jpg' },
      { name: '快速物流', image: '@/thumbnail/fast-logistics.jpg' }
    ],
    2: [ // 编辑精选
      { name: '设计师推荐', image: '@/thumbnail/designer-pick.jpg' },
      { name: '编辑精选', image: '@/thumbnail/editor-choice.jpg' },
      { name: '精选系列', image: '@/thumbnail/curated-collection.jpg' },
      { name: '热门推荐', image: '@/thumbnail/hot-recommend.jpg' },
      { name: '新品推荐', image: '@/thumbnail/new-recommend.jpg' }
    ],
    3: [ // 筹款活动
      { name: '慈善筹款', image: '@/thumbnail/charity-fundraiser.jpg' },
      { name: '公益项目', image: '@/thumbnail/public-welfare.jpg' },
      { name: '社区支持', image: '@/thumbnail/community-support.jpg' },
      { name: '爱心捐赠', image: '@/thumbnail/donation.jpg' },
      { name: '公益行动', image: '@/thumbnail/action.jpg' }
    ],
    4: [ // LGBTQ+创作者
      { name: '彩虹系列', image: '@/thumbnail/rainbow-collection.jpg' },
      { name: '包容设计', image: '@/thumbnail/inclusive-design.jpg' },
      { name: '多元文化', image: '@/thumbnail/diverse-culture.jpg' },
      { name: '平等时尚', image: '@/thumbnail/equality-fashion.jpg' },
      { name: '自由表达', image: '@/thumbnail/freedom-expression.jpg' }
    ],
    5: [ // 女性创作者
      { name: '女性设计', image: '@/thumbnail/female-design.jpg' },
      { name: '女性品牌', image: '@/thumbnail/female-brand.jpg' },
      { name: '女性力量', image: '@/thumbnail/female-empowerment.jpg' },
      { name: '独立女性', image: '@/thumbnail/independent-woman.jpg' },
      { name: '女性时尚', image: '@/thumbnail/female-fashion.jpg' }
    ],
    6: [ // 更多
      { name: '所有分类', image: '@/thumbnail/all-categories.jpg' },
      { name: '品牌专区', image: '@/thumbnail/brand-zone.jpg' },
      { name: '设计师', image: '@/thumbnail/designers.jpg' },
      { name: '活动', image: '@/thumbnail/events.jpg' },
      { name: '定制设计', image: '@/thumbnail/custom-design.jpg' }
    ]
  };
  
  return trendingData[categoryIndex as keyof typeof trendingData] || trendingData[0];
};

// 根据activeCategory返回对应的特色商品
const getFeaturedItems = (categoryIndex: number) => {
  const featuredData = {
    0: [ // 全部商品 - 特色分类导航
      { 
        name: '按年龄段', 
        image: '/featured/age-group.jpg',
        subItems: ['青少年', '青年', '中年', '老年']
      },
      { 
        name: '按性别', 
        image: '/featured/gender.jpg',
        subItems: ['男士', '女士', '中性', '儿童']
      },
      { 
        name: '按风格', 
        image: '/featured/style.jpg',
        subItems: ['休闲', '商务', '运动', '时尚']
      },
      { 
        name: '按颜色', 
        image: '/featured/color.jpg',
        subItems: ['黑色', '白色', '红色', '蓝色']
      },
      { 
        name: '按季节', 
        image: '/featured/season.jpg',
        subItems: ['春季', '夏季', '秋季', '冬季']
      },
      { 
        name: '按场合', 
        image: '/featured/occasion.jpg',
        subItems: ['日常', '聚会', '工作', '旅行']
      }
    ],
    1: [ // 快速配送
      { name: '24小时发货', image: '/featured/24h-shipping.jpg' },
      { name: '同城配送', image: '/featured/local-delivery.jpg' },
      { name: '快速物流', image: '/featured/fast-logistics.jpg' }
    ],
    2: [ // 编辑精选
      { name: '设计师推荐', image: '/featured/designer-pick.jpg' },
      { name: '编辑精选', image: '/featured/editor-choice.jpg' },
      { name: '精选系列', image: '/featured/curated-collection.jpg' }
    ],
    3: [ // 筹款活动
      { name: '慈善筹款', image: '/featured/charity-fundraiser.jpg' },
      { name: '公益项目', image: '/featured/public-welfare.jpg' },
      { name: '社区支持', image: '/featured/community-support.jpg' }
    ],
    4: [ // LGBTQ+创作者
      { name: '彩虹系列', image: '/featured/rainbow-collection.jpg' },
      { name: '包容设计', image: '/featured/inclusive-design.jpg' },
      { name: '多元文化', image: '/featured/diverse-culture.jpg' }
    ],
    5: [ // 女性创作者
      { name: '女性设计', image: '/featured/female-design.jpg' },
      { name: '女性品牌', image: '/featured/female-brand.jpg' },
      { name: '女性力量', image: '/featured/female-empowerment.jpg' }
    ],
    6: [ // 更多
      { name: '所有分类', image: '/featured/all-categories.jpg' },
      { name: '品牌专区', image: '/featured/brand-zone.jpg' },
      { name: '设计师', image: '/featured/designers.jpg' }
    ]
  };
  
  return featuredData[categoryIndex as keyof typeof featuredData] || featuredData[0];
};
</script>

<template>
  <div class="navigation-menu">
    <!-- Tab 栏 -->
    <div class="tab-bar">
      <div class="mx-auto">
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
    </div>

    <!-- 描述Banner -->
    <!-- <div 
      v-if="isDropdownVisible && categories[activeCategory]?.description"
      class="description-banner"
    >
      <div class="container mx-auto">
        <div class="banner-content">
          <span class="banner-text">{{ categories[activeCategory].description }}</span>
        </div>
      </div>
    </div> -->

    <!-- 大菜单 -->
    <div 
      v-if="isDropdownVisible"
      class="dropdown-menu"
      @mouseenter="handleMouseEnter(activeCategory)"
      @mouseleave="handleMouseLeave"
    >
      <div class=" mx-auto">
        <div class="menu-content">
          <!-- 左侧热门搜索 -->
          <div class="menu-left">
            <div v-if="activeCategory === 0" class="asos-style-menu">
              <div 
                v-for="(section, index) in getTrendingItems(activeCategory)" 
                :key="index"
                class="menu-section"
              >
                <h3 class="section-title">{{ section.name }}</h3>
                <div class="section-items">
                  <div 
                    v-for="(item, itemIndex) in section.items" 
                    :key="itemIndex"
                    class="menu-item"
                    @click="handleItemClick(section.name, item.name)"
                  >
                    <div v-if="item.image" class="item-with-image">
                      <div class="item-image">
                        <img 
                          :src="item.image" 
                          :alt="item.name"
                          @error="(event) => { const target = event.target as HTMLImageElement; if (target) target.style.display = 'none'; }"
                        />
                      </div>
                      <span class="item-name">{{ item.name }}</span>
                    </div>
                    <span 
                      v-else 
                      :class="`item-name ${item.isBold ? 'bold' : ''}`"
                    >
                      {{ item.name }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div v-else>
              <h3 class="menu-title">热门搜索</h3>
              <div class="trending-items">
                <div 
                  v-for="(item, index) in getTrendingItems(activeCategory)" 
                  :key="index"
                  class="trending-item"
                  @click="handleItemClick('热门搜索', item.name)"
                >
                  <div class="trending-image">
                    <img 
                      :src="item.image" 
                      :alt="item.name"
                      @error="(event) => { const target = event.target as HTMLImageElement; if (target) target.style.display = 'none'; }"
                    />
                  </div>
                  <div class="trending-content">
                    <span class="trending-name">{{ item.name }}</span>
                    <span v-if="item.count" class="trending-count">{{ item.count }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 右侧特色商品 -->
          <div class="menu-right">
            <h3 v-if="activeCategory === 0" class="menu-title">筛选分类</h3>
            <div class="featured-cards">
              <div 
                v-for="(featured, index) in getFeaturedItems(activeCategory)" 
                :key="index"
                class="featured-card"
                @click="handleItemClick('特色商品', featured.name)"
              >
                <div class="featured-image">
                  <img 
                    :src="featured.image" 
                    :alt="featured.name"
                    @error="(event) => { const target = event.target as HTMLImageElement; if (target) target.style.display = 'none'; }"
                  />
                </div>
                <div class="featured-content">
                  <div class="featured-title">{{ featured.name }}</div>
                  <div v-if="activeCategory === 0 && featured.subItems" class="featured-sub-items">
                    <span 
                      v-for="(subItem, subIndex) in featured.subItems" 
                      :key="subIndex"
                      class="sub-item"
                    >
                      {{ subItem }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
/* 导航菜单样式 */
.navigation-menu {
  position: relative;
  z-index: 10;
}

.tab-bar {
  background: white;
  padding: 12px 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.tab-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  overflow-x: auto;
  
  @media (max-width: 768px) {
    gap: 6px;
  }
}

.tab-group {
  flex-shrink: 0;
}

.tab-button {
  padding: 6px 12px;
  background: white;
  color: #6b7280;
  font-size: 12px;
  font-weight: 500;
  border-radius: 0;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
  min-width: 70px;
  text-align: center;
  border: none;
  
  &:hover {
    background: #f9fafb;
    color: #374151;
  }
  
  &.active {
    background: #F0F0F0;
    color: #111;
    border-radius: 4px;
  }
  
  @media (max-width: 768px) {
    padding: 4px 8px;
    font-size: 11px;
    min-width: 60px;
  }
}

.description-banner {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: transparent;
  z-index: 1001;
  animation: slideDown 0.3s ease;
}

.banner-content {
  padding: 12px 20px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}

.banner-text {
  font-size: 15px;
  color: #374151;
  font-weight: 600;
  line-height: 1.6;
  text-align: center;
  font-style: italic;
  letter-spacing: 0.3px;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border-bottom: 1px solid #e5e7eb;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  z-index: 1001;
  animation: slideDown 0.3s ease;
  min-height: 280px;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.menu-content {
  display: flex;
  padding: 40px 20px;
  gap: 48px;
  min-height: 200px;
  // max-width: 1200px;
  margin: 0 auto;
  align-items: flex-start;
  
  @media (max-width: 768px) {
    padding: 32px 20px;
    gap: 24px;
    min-height: 180px;
    flex-direction: column;
  }
}

.menu-left {
  flex: 1;
  max-width: 800px;
  min-width: 600px;
}

.menu-title {
  font-size: 16px;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 16px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.trending-items {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.trending-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 0;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    .trending-name {
      text-decoration: underline;
      text-decoration-color: #374151;
      text-decoration-thickness: 1px;
    }
  }
}

.trending-image {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  overflow: hidden;
  background: #f3f4f6;
  display: flex;
  align-items: center;
  justify-content: center;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.trending-content {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.trending-name {
  font-size: 14px;
  color: #374151;
  font-weight: 500;
}

.trending-count {
  font-size: 11px;
  color: #6b7280;
  font-weight: 400;
}

/* ASOS 风格菜单样式 */
.asos-style-menu {
  display: flex;
  gap: 0;
  height: 100%;
  width: 100%;
}

.menu-section {
  flex: 1;
  padding: 0 32px;
  border-right: 1px solid #e5e7eb;
  min-width: 200px;
  
  &:last-child {
    border-right: none;
  }
}

.section-title {
  font-size: 14px;
  font-weight: 700;
  color: #1f2937;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin: 0 0 16px 0;
  padding-bottom: 8px;
  border-bottom: 1px solid #e5e7eb;
}

.section-items {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.menu-item {
  padding: 6px 0;
  cursor: pointer;
  transition: all 0.2s ease;
  margin: 0;
  
  &:hover {
    text-decoration: underline;
    text-decoration-color: #374151;
    text-decoration-thickness: 1px;
  }
}

.item-with-image {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 6px 0;
  border-bottom: 1px solid #f3f4f6;
  margin: 0;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:last-child {
    border-bottom: none;
  }
  
  &:hover {
    .item-name {
      text-decoration: underline;
      text-decoration-color: #374151;
      text-decoration-thickness: 1px;
    }
  }
}

.item-image {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  background: #f3f4f6;
  flex-shrink: 0;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.item-name {
  font-size: 11px;
  color: #6b7280;
  font-weight: 400;
  line-height: 1.4;
  
  &.bold {
    font-weight: 600;
    color: #374151;
  }
}

.menu-right {
  flex: 1;
  min-width: 350px;
}

.featured-cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.featured-card {
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  }
}

.featured-image {
  width: 100%;
  height: 120px;
  overflow: hidden;
  background: #f3f4f6;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }
  
  &:hover img {
    transform: scale(1.05);
  }
}

.featured-content {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 12px;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
  color: white;
}

.featured-title {
  font-size: 14px;
  font-weight: 600;
  text-align: center;
  margin-bottom: 4px;
}

.featured-sub-items {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  justify-content: center;
}

.sub-item {
  font-size: 10px;
  background: rgba(255, 255, 255, 0.2);
  padding: 2px 6px;
  border-radius: 10px;
  backdrop-filter: blur(4px);
}

/* 响应式导航菜单 */
@media (max-width: 768px) {
  .description-banner {
    .banner-content {
      padding: 8px 16px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    
    .banner-text {
      font-size: 14px;
      text-align: center;
      font-style: italic;
      letter-spacing: 0.2px;
      text-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
    }
  }
  

  .tab-container {
    overflow-x: auto;
    padding-bottom: 4px;
    
    &::-webkit-scrollbar {
      height: 4px;
    }
    
    &::-webkit-scrollbar-track {
      background: #f1f5f9;
      border-radius: 2px;
    }
    
    &::-webkit-scrollbar-thumb {
      background: #cbd5e1;
      border-radius: 2px;
      
      &:hover {
        background: #94a3b8;
      }
    }
  }
  
  .menu-content {
    flex-direction: column;
    padding: 32px 20px;
    gap: 24px;
  }
  
  .menu-left {
    max-width: none;
  }
  
  .asos-style-menu {
    flex-direction: column;
    gap: 0;
  }
  
  .menu-section {
    padding: 0 20px;
    border-right: none;
    border-bottom: 1px solid #e5e7eb;
    min-width: auto;
    
    &:last-child {
      border-bottom: none;
    }
  }
  
  .section-title {
    font-size: 13px;
    margin: 0 0 12px 0;
  }
  
  .menu-item {
    padding: 4px 0;
    margin: 0;
  }
  
  .item-with-image {
    gap: 6px;
    padding: 4px 0;
    margin: 0;
  }
  
  .item-image {
    width: 32px;
    height: 32px;
  }
  
  .item-name {
    font-size: 11px;
  }
  
  .featured-cards {
    grid-template-columns: 1fr;
  }
  
  .featured-image {
    height: 100px;
  }
}
</style> 