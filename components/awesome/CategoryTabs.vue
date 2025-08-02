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

// 根据activeCategory返回对应的热门搜索项目
const getTrendingItems = (categoryIndex: number) => {
  const trendingData = {
    0: [ // 全部商品
      { name: '新品上市1', image: '/featured/new-arrivals.jpg' },
      { name: '热销商品', image: '/featured/popular.jpg' },
      { name: '限时特惠', image: '/featured/sale.jpg' },
      { name: '春季新品', image: '/featured/spring-new.jpg' },
      { name: '夏季必备', image: '/featured/summer-essential.jpg' }
    ],
    1: [ // 快速配送
      { name: '24小时发货', image: '/featured/24h-shipping.jpg' },
      { name: '48小时发货', image: '/featured/48h-shipping.jpg' },
      { name: '同城配送', image: '/featured/local-delivery.jpg' },
      { name: '现货商品', image: '/featured/in-stock.jpg' },
      { name: '快速物流', image: '/featured/fast-logistics.jpg' }
    ],
    2: [ // 编辑精选
      { name: '设计师推荐', image: '/featured/designer-pick.jpg' },
      { name: '编辑精选', image: '/featured/editor-choice.jpg' },
      { name: '精选系列', image: '/featured/curated-collection.jpg' },
      { name: '热门推荐', image: '/featured/hot-recommend.jpg' },
      { name: '新品推荐', image: '/featured/new-recommend.jpg' }
    ],
    3: [ // 筹款活动
      { name: '慈善筹款', image: '/featured/charity-fundraiser.jpg' },
      { name: '公益项目', image: '/featured/public-welfare.jpg' },
      { name: '社区支持', image: '/featured/community-support.jpg' },
      { name: '爱心捐赠', image: '/featured/donation.jpg' },
      { name: '公益行动', image: '/featured/action.jpg' }
    ],
    4: [ // LGBTQ+创作者
      { name: '彩虹系列', image: '/featured/rainbow-collection.jpg' },
      { name: '包容设计', image: '/featured/inclusive-design.jpg' },
      { name: '多元文化', image: '/featured/diverse-culture.jpg' },
      { name: '平等时尚', image: '/featured/equality-fashion.jpg' },
      { name: '自由表达', image: '/featured/freedom-expression.jpg' }
    ],
    5: [ // 女性创作者
      { name: '女性设计', image: '/featured/female-design.jpg' },
      { name: '女性品牌', image: '/featured/female-brand.jpg' },
      { name: '女性力量', image: '/featured/female-empowerment.jpg' },
      { name: '独立女性', image: '/featured/independent-woman.jpg' },
      { name: '女性时尚', image: '/featured/female-fashion.jpg' }
    ],
    6: [ // 更多
      { name: '所有分类', image: '/featured/all-categories.jpg' },
      { name: '品牌专区', image: '/featured/brand-zone.jpg' },
      { name: '设计师', image: '/featured/designers.jpg' },
      { name: '活动', image: '/featured/events.jpg' },
      { name: '定制设计', image: '/featured/custom-design.jpg' }
    ]
  };
  
  return trendingData[categoryIndex as keyof typeof trendingData] || trendingData[0];
};

// 根据activeCategory返回对应的特色商品
const getFeaturedItems = (categoryIndex: number) => {
  const featuredData = {
    0: [ // 全部商品
      { name: '春季新品', image: '/featured/spring-new.jpg' },
      { name: '夏季必备', image: '/featured/summer-essential.jpg' },
      { name: '秋季系列', image: '/featured/autumn-collection.jpg' }
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
      <div class="container mx-auto">
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
    <div 
      v-if="isDropdownVisible && categories[activeCategory]?.description"
      class="description-banner"
    >
      <div class="container mx-auto">
        <div class="banner-content">
          <span class="banner-text">{{ categories[activeCategory].description }}</span>
        </div>
      </div>
    </div>

    <!-- 大菜单 -->
    <div 
      v-if="isDropdownVisible"
      :class="`dropdown-menu ${categories[activeCategory]?.description ? 'with-banner' : ''}`"
      @mouseenter="handleMouseEnter(activeCategory)"
      @mouseleave="handleMouseLeave"
    >
      <div class="container mx-auto">
        <div class="menu-content">
          <!-- 左侧热门搜索 -->
          <div class="menu-left">
            <h3 class="menu-title">热门搜索</h3>
            <div class="trending-items">
              <div 
                v-for="(item, index) in getTrendingItems(activeCategory)" 
                :key="index"
                class="trending-item"
              >
                <div class="trending-image">
                  <img 
                    :src="item.image" 
                    :alt="item.name"
                    @error="(event) => { const target = event.target as HTMLImageElement; if (target) target.style.display = 'none'; }"
                  />
                </div>
                <span class="trending-name">{{ item.name }}</span>
              </div>
            </div>
          </div>

          <!-- 右侧特色商品 -->
          <div class="menu-right">
            <div class="featured-cards">
              <div 
                v-for="(featured, index) in getFeaturedItems(activeCategory)" 
                :key="index"
                class="featured-card"
              >
                <div class="featured-image">
                  <img 
                    :src="featured.image" 
                    :alt="featured.name"
                    @error="(event) => { const target = event.target as HTMLImageElement; if (target) target.style.display = 'none'; }"
                  />
                </div>
                <div class="featured-title">{{ featured.name }}</div>
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
  
  &.with-banner {
    top: calc(100% + 48px); /* 48px 是banner的高度 */
  }
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
  max-width: 1200px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    padding: 32px 20px;
    gap: 24px;
    min-height: 180px;
  }
}

.menu-left {
  flex: 1;
  max-width: 300px;
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
    background: #f9fafb;
    padding-left: 8px;
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

.trending-name {
  font-size: 14px;
  color: #374151;
  font-weight: 500;
}

.menu-right {
  flex: 2;
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

.featured-title {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 12px;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
  color: white;
  font-size: 14px;
  font-weight: 600;
  text-align: center;
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
  
  .dropdown-menu.with-banner {
    top: calc(100% + 40px); /* 移动端banner高度调整 */
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
  
  .featured-cards {
    grid-template-columns: 1fr;
  }
  
  .featured-image {
    height: 100px;
  }
}
</style> 