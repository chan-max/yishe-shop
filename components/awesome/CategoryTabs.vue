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
    name: '艺术字设计',
    description: '个性化文字设计服务，将您的想法转化为独特的艺术字体作品'
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
  // 跳转到 products 页面并携带参数
  const searchParams = {
    search: itemName
  };
  
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
        name: '设计风格',
        items: [
          { name: '动漫风', icon: 'uil:smile-dizzy' },
          { name: '简约风', icon: 'uil:minus-circle' },
          { name: '商务风', icon: 'uil:briefcase' },
          { name: '抽象风格', icon: 'uil:palette' },
          { name: '搞笑风', icon: 'uil:smile' },
          { name: '复古风', icon: 'uil:clock' },
          { name: '科技风', icon: 'uil:setting' },
          { name: '自然风', icon: 'uil:flower' },
          { name: '艺术风', icon: 'uil:brush-alt' },
          { name: '运动风', icon: 'uil:football' },
          { name: '可爱风', icon: 'uil:heart' },
          { name: '酷炫风', icon: 'uil:star' },
          { name: '工业风', icon: 'uil:cog' },
          { name: '未来风', icon: 'uil:rocket' },
          { name: '民族风', icon: 'uil:globe' },
          { name: '街头风', icon: 'uil:music' },
          { name: '优雅风', icon: 'uil:star' },
          { name: '朋克风', icon: 'uil:bolt' }
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
    2: [ // 艺术字设计 - 功能展示
      { 
        name: '设计服务',
        items: [
          { name: '个性化定制', isBold: false },
          { name: '艺术字体设计', isBold: false },
          { name: '创意文字设计', isBold: false },
          { name: '品牌标识设计', isBold: false },
          { name: '节日祝福设计', isBold: false },
          { name: '服装印花设计', isBold: false },
          { name: '家居装饰设计', isBold: true },
          { name: '数字媒体设计', isBold: true }
        ]
      },
      { 
        name: '设计风格',
        items: [
          { name: '现代简约', icon: 'uil:minus-circle' },
          { name: '艺术创意', icon: 'uil:palette' },
          { name: '商务专业', icon: 'uil:briefcase' },
          { name: '复古经典', icon: 'uil:clock' },
          { name: '浪漫温馨', icon: 'uil:heart' },
          { name: '科技未来', icon: 'uil:rocket' },
          { name: '自然清新', icon: 'uil:flower' },
          { name: '街头潮流', icon: 'uil:music' }
        ]
      },
      { 
        name: '应用场景',
        items: [
          { name: '品牌标识', image: '/thumbnail/brand-logo.png' },
          { name: '节日祝福', image: '/thumbnail/festival-greeting.png' },
          { name: '服装印花', image: '/thumbnail/clothing-print.png' },
          { name: '家居装饰', image: '/thumbnail/home-decoration.png' },
          { name: '贺卡设计', image: '/thumbnail/greeting-card.png' },
          { name: '数字媒体', image: '/thumbnail/digital-media.png' }
        ]
      }
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
        description: '根据不同年龄段的喜好和需求，为您推荐最适合的服装款式',
        subItems: ['青少年', '青年', '中年', '老年', '儿童', '学生', '职场新人', '成熟人士']
      },
      { 
        name: '按性别', 
        image: '/featured/gender.jpg',
        description: '专为不同性别设计的服装，展现独特的个人魅力',
        subItems: ['男士', '女士', '中性', '儿童', '情侣', '亲子', '闺蜜装', '兄弟装']
      },
      { 
        name: '按风格', 
        image: '/featured/style.jpg',
        description: '从休闲到正式，从简约到奢华，总有一款风格适合您',
        subItems: ['休闲', '商务', '运动', '时尚', '复古', '街头', '优雅', '可爱', '酷炫', '文艺']
      },
      { 
        name: '按颜色', 
        image: '/thumbnail/color_bg.jpg',
        description: '丰富的色彩选择，让您的穿搭更加生动有趣',
        subItems: ['黑色', '白色', '红色', '蓝色', '绿色', '黄色', '粉色', '紫色', '橙色', '灰色', '棕色', '彩虹色']
      },
      { 
        name: '按季节', 
        image: '/featured/season.jpg',
        description: '四季分明的服装搭配，让您在每个季节都能穿出精彩',
        subItems: ['春季', '夏季', '秋季', '冬季', '春秋', '夏秋', '四季通用', '换季必备']
      },
      { 
        name: '按场合', 
        image: '/featured/occasion.jpg',
        description: '不同场合的着装需求，从日常到特殊时刻的完美搭配',
        subItems: ['日常', '聚会', '工作', '旅行', '约会', '派对', '婚礼', '运动', '户外', '居家', '商务会议', '休闲娱乐']
      }
    ],
    1: [ // 快速配送
      { name: '24小时发货', image: '/featured/24h-shipping.jpg' },
      { name: '同城配送', image: '/featured/local-delivery.jpg' },
      { name: '快速物流', image: '/featured/fast-logistics.jpg' }
    ],
    2: [ // 艺术字设计
      { name: '个性化定制', image: '/featured/custom-text.jpg', subItems: ['品牌标识', '节日祝福', '服装印花'] },
      { name: '艺术字体', image: '/featured/artistic-font.jpg', subItems: ['现代简约', '艺术创意', '商务专业'] },
      { name: '创意文字', image: '/featured/creative-text.jpg', subItems: ['家居装饰', '贺卡设计', '数字媒体'] }
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
                :class="`menu-section ${section.name === '设计风格' ? 'style-section' : ''}`"
              >
                <h3 class="section-title">{{ section.name }}</h3>
                <div :class="`section-items ${section.name === '设计风格' ? 'style-items' : ''}`">
                  <div 
                    v-for="(item, itemIndex) in section.items" 
                    :key="itemIndex"
                    class="menu-item"
                    @click="handleItemClick(section.name, item.name)"
                  >
                    <div v-if="item.image || item.icon" class="item-with-image">
                      <div class="item-image">
                        <img 
                          v-if="item.image"
                          :src="item.image" 
                          :alt="item.name"
                          @error="(event) => { const target = event.target as HTMLImageElement; if (target) target.style.display = 'none'; }"
                        />
                        <Icon 
                          v-else-if="item.icon"
                          :name="item.icon" 
                          class="w-4 h-4 text-gray-600"
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
            
            <!-- 艺术字设计专用UI -->
            <div v-if="activeCategory === 2" class="artistic-text-design-menu">
              <!-- 功能介绍 -->
              <div class="design-intro">
                <h3 class="intro-title">艺术字设计</h3>
                <p class="intro-desc">将您的文字转化为独特的艺术作品</p>
              </div>
              
              <!-- 设计风格 -->
              <div class="design-styles">
                <h4 class="section-title">设计风格</h4>
                <div class="styles-list">
                  <div class="style-item" @click="handleItemClick('设计风格', '现代简约')">
                    <Icon name="uil:minus-circle" class="w-4 h-4" />
                    <span>现代简约</span>
                  </div>
                  <div class="style-item" @click="handleItemClick('设计风格', '艺术创意')">
                    <Icon name="uil:palette" class="w-4 h-4" />
                    <span>艺术创意</span>
                  </div>
                  <div class="style-item" @click="handleItemClick('设计风格', '商务专业')">
                    <Icon name="uil:briefcase" class="w-4 h-4" />
                    <span>商务专业</span>
                  </div>
                  <div class="style-item" @click="handleItemClick('设计风格', '复古经典')">
                    <Icon name="uil:clock" class="w-4 h-4" />
                    <span>复古经典</span>
                  </div>
                </div>
              </div>
              
              <!-- 应用场景 -->
              <div class="design-applications">
                <h4 class="section-title">应用场景</h4>
                <div class="applications-list">
                  <div class="app-item" @click="handleItemClick('应用场景', '品牌标识')">
                    <Icon name="uil:building" class="w-4 h-4" />
                    <span>品牌标识</span>
                  </div>
                  <div class="app-item" @click="handleItemClick('应用场景', '节日祝福')">
                    <Icon name="uil:gift" class="w-4 h-4" />
                    <span>节日祝福</span>
                  </div>
                  <div class="app-item" @click="handleItemClick('应用场景', '服装印花')">
                    <Icon name="uil:tshirt" class="w-4 h-4" />
                    <span>服装印花</span>
                  </div>
                  <div class="app-item" @click="handleItemClick('应用场景', '家居装饰')">
                    <Icon name="uil:home" class="w-4 h-4" />
                    <span>家居装饰</span>
                  </div>
                  <div class="app-item" @click="handleItemClick('应用场景', '贺卡设计')">
                    <Icon name="uil:envelope" class="w-4 h-4" />
                    <span>贺卡设计</span>
                  </div>
                  <div class="app-item" @click="handleItemClick('应用场景', '数字媒体')">
                    <Icon name="uil:mobile" class="w-4 h-4" />
                    <span>数字媒体</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 右侧特色商品 -->
          <div class="menu-right">
            <h3 v-if="activeCategory === 0" class="menu-title">筛选分类</h3>
            <div v-if="activeCategory === 0" class="featured-cards">
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
                <div class="featured-content">
                  <div class="featured-title">{{ featured.name }}</div>
                  <div v-if="featured.description" class="featured-description">
                    {{ featured.description }}
                  </div>
                  <div v-if="featured.subItems" class="featured-sub-items">
                    <span 
                      v-for="(subItem, subIndex) in featured.subItems" 
                      :key="subIndex"
                      class="sub-item clickable-label"
                      @click="handleItemClick('筛选分类', subItem)"
                    >
                      {{ subItem }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- 艺术字设计右侧展示区域 -->
            <div v-if="activeCategory === 2" class="artistic-design-showcase">
              <div class="showcase-header">
                <h3 class="showcase-title">设计服务</h3>
                <p class="showcase-subtitle">个性化文字设计</p>
              </div>
              
              <div class="service-list">
                <div class="service-item" @click="handleItemClick('设计服务', '个性化定制')">
                  <Icon name="uil:pen" class="w-5 h-5" />
                  <div class="service-info">
                    <h4>个性化定制</h4>
                    <p>根据您的需求定制独特字体</p>
                  </div>
                </div>
                
                <div class="service-item" @click="handleItemClick('设计服务', '创意设计')">
                  <Icon name="uil:palette" class="w-5 h-5" />
                  <div class="service-info">
                    <h4>创意设计</h4>
                    <p>专业设计师创意无限</p>
                  </div>
                </div>
                
                <div class="service-item" @click="handleItemClick('设计服务', '多格式输出')">
                  <Icon name="uil:download" class="w-5 h-5" />
                  <div class="service-info">
                    <h4>多格式输出</h4>
                    <p>支持多种文件格式</p>
                  </div>
                </div>
              </div>
              
              <div class="contact-section">
                <button class="contact-btn" @click="handleItemClick('联系咨询', '立即咨询')">
                  立即咨询
                </button>
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
  // position: absolute;
  // top: 100%;
  // left: 0;
  // right: 0;
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
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 0.5px solid #f0f0f0;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
  position: relative;
  padding: 2px;
  
  &::before {
    content: '';
    position: absolute;
    top: -1px;
    left: -1px;
    right: -1px;
    bottom: -1px;
    border: 0.5px solid #e8e8e8;
    border-radius: 50%;
    z-index: -1;
  }
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
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
  
  // 设计风格部分增加宽度
  &.style-section {
    min-width: 280px;
    flex: 1.5;
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
  
  // 设计风格部分使用两列布局
  &.style-items {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
  }
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
  
  // 设计风格部分的菜单项样式
  .style-items & {
    padding: 4px 0;
    margin: 0;
    
    .item-image {
      border: none;
      box-shadow: none;
      padding: 0;
      
      &::before {
        display: none;
      }
    }
    
    .item-with-image {
      gap: 6px;
    }
  }
}

.item-with-image {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 6px 0;
  border-bottom: 1px solid #fff;
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
  background: #fff;
  flex-shrink: 0;
  border: 0.5px solid #f0f0f0;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
  position: relative;
  padding: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &::before {
    content: '';
    position: absolute;
    top: -1px;
    left: -1px;
    right: -1px;
    bottom: -1px;
    border: 0.5px solid #e8e8e8;
    border-radius: 50%;
    z-index: -1;
  }
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
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
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.featured-card {
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.3s ease;
  
  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
}

.featured-image {
  width: 100%;
  height: 160px;
  overflow: hidden;
  background: #fff;
  
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
  padding: 16px;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.85));
  color: white;
}

.featured-title {
  font-size: 16px;
  font-weight: 600;
  text-align: center;
  margin-bottom: 6px;
}

.featured-description {
  font-size: 11px;
  line-height: 1.4;
  text-align: center;
  margin-bottom: 8px;
  opacity: 0.9;
  font-weight: 400;
}

.featured-sub-items {
  display: flex;
  flex-wrap: wrap;
  gap: 3px;
  justify-content: center;
  align-items: flex-start;
}

.sub-item {
  font-size: 9px;
  background: rgba(255, 255, 255, 0.2);
  padding: 2px 5px;
  border-radius: 8px;
  backdrop-filter: blur(4px);
  white-space: nowrap;
  
  &.clickable-label {
    cursor: pointer;
    transition: all 0.2s ease;
    
    &:hover {
      background: rgba(255, 255, 255, 0.4);
      transform: scale(1.05);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    }
    
    &:active {
      transform: scale(0.95);
    }
  }
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
    border: 0.5px solid #f0f0f0;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
    position: relative;
    padding: 2px;
    
    &::before {
      content: '';
      position: absolute;
      top: -1px;
      left: -1px;
      right: -1px;
      bottom: -1px;
      border: 0.5px solid #e8e8e8;
      border-radius: 50%;
      z-index: -1;
    }
  }
  
  .item-name {
    font-size: 11px;
  }
  
  .featured-cards {
    grid-template-columns: 1fr;
    gap: 16px;
  }
  
  .featured-image {
    height: 140px;
  }
  
  .featured-content {
    padding: 12px;
  }
  
  .featured-title {
    font-size: 14px;
    margin-bottom: 4px;
  }
  
  .featured-description {
    font-size: 10px;
    margin-bottom: 6px;
  }
  
  .featured-sub-items {
    gap: 2px;
  }
  
  .sub-item {
    font-size: 8px;
    padding: 1px 4px;
  }
}

/* 艺术字设计专用UI样式 */
.artistic-text-design-menu {
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 20px;
  background: #f8fafc;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
}

.design-intro {
  text-align: center;
  padding-bottom: 16px;
  border-bottom: 1px solid #e2e8f0;
}

.intro-title {
  font-size: 18px;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 4px;
}

.intro-desc {
  font-size: 14px;
  color: #6b7280;
}

.design-styles,
.design-applications {
  padding-bottom: 16px;
  border-bottom: 1px solid #e2e8f0;
}

.design-applications {
  border-bottom: none;
}

.section-title {
  font-size: 14px;
  font-weight: 600;
  color: #374151;
  margin-bottom: 12px;
}

.styles-list,
.applications-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
}

.style-item,
.app-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 13px;
  color: #374151;
}

.style-item:hover,
.app-item:hover {
  background: #f9fafb;
  border-color: #d1d5db;
}

.style-item svg,
.app-item svg {
  color: #6b7280;
  flex-shrink: 0;
}

/* 右侧展示区域样式 */
.artistic-design-showcase {
  background: white;
  border-radius: 8px;
  padding: 20px;
  border: 1px solid #e2e8f0;
}

.showcase-header {
  text-align: center;
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 1px solid #e2e8f0;
}

.showcase-title {
  font-size: 16px;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 4px;
}

.showcase-subtitle {
  font-size: 13px;
  color: #6b7280;
}

.service-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 20px;
}

.service-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: #f9fafb;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.service-item:hover {
  background: #f3f4f6;
}

.service-item svg {
  color: #6b7280;
  flex-shrink: 0;
}

.service-info h4 {
  font-size: 14px;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 2px;
}

.service-info p {
  font-size: 12px;
  color: #6b7280;
}

.contact-section {
  text-align: center;
}

.contact-btn {
  background: #3b82f6;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.contact-btn:hover {
  background: #2563eb;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .artistic-text-design-menu {
    padding: 16px;
    gap: 20px;
  }
  
  .styles-list,
  .applications-list {
    grid-template-columns: 1fr;
  }
  
  .artistic-design-showcase {
    padding: 16px;
  }
}
</style> 可以结合用户想要的文字内容，做出合理的设计，这部分主要是作这方面的功能介绍和展示，请提供一个合理的页面