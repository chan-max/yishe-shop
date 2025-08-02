<script lang="ts" setup>
interface Category {
  name: string;
  path: string;
  description?: string;
  subcategories: Array<{ name: string; path: string }>;
  brands: Array<{ name: string; image: string }>;
  styles: Array<{ name: string; path: string }>;
  featured: Array<{ name: string; image: string }>;
  trending?: Array<{ name: string; path: string }>;
}

interface Props {
  categories: Category[];
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

const handleMouseEnter = (index: number) => {
  emit('mouseenter', index);
};

const handleMouseLeave = () => {
  emit('mouseleave');
};

const handleTabChange = (index: number) => {
  emit('tabChange', index);
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
                v-for="(item, index) in categories[activeCategory]?.trending?.slice(0, 5)" 
                :key="index"
                class="trending-item"
              >
                <div class="trending-image">
                  <img 
                    :src="`/featured/${item.name.toLowerCase().replace(/\s+/g, '-')}.jpg`" 
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
                v-for="(featured, index) in categories[activeCategory]?.featured?.slice(0, 3)" 
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
  background: #f8f9fa;
  border-bottom: 1px solid #e9ecef;
  z-index: 1001;
  animation: slideDown 0.3s ease;
}

.banner-content {
  padding: 12px 20px;
  text-align: center;
}

.banner-text {
  font-size: 14px;
  color: #6b7280;
  font-weight: 500;
  line-height: 1.5;
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
    }
    
    .banner-text {
      font-size: 13px;
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