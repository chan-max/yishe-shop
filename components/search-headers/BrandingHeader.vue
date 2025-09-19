<template>
  <header class="top-header">
    <div class="header-content">
      <!-- 移动端菜单按钮 -->
      <v-btn
        variant="text"
        @click="$emit('toggle-mobile-sidebar')"
        class="mobile-menu-btn"
        icon
      >
        <v-icon>mdi-menu</v-icon>
      </v-btn>
      
      <!-- 品牌Logo设计专用头部内容 -->
      <div class="header-main">
        <!-- 标题和描述 -->
        <div class="header-title-section">
          <h1 class="header-title">
            <v-icon left>mdi-account-star-outline</v-icon>
            品牌Logo设计
          </h1>
          <p class="header-subtitle">专业品牌标识设计，提升品牌形象</p>
        </div>
        
        <!-- 品牌Logo设计专用搜索和筛选 -->
        <div class="search-filter-container">
          <!-- 行业筛选 -->
          <div class="industry-filter">
            <v-select
              :model-value="selectedIndustry"
              @update:model-value="$emit('select-industry', $event)"
              :items="industries"
              placeholder="选择行业"
              variant="outlined"
              density="compact"
              hide-details
              class="industry-select"
            />
          </div>
          
          <!-- 筛选按钮 -->
          <v-btn
            variant="text"
            @click="$emit('toggle-filter')"
            class="filter-toggle-btn"
            :class="{ 'active': showFilter }"
            icon
            size="small"
          >
            <v-icon>{{ showFilter ? 'mdi-tune' : 'mdi-tune-variant' }}</v-icon>
          </v-btn>
          
          <!-- 品牌Logo设计专用搜索框 -->
          <div class="search-container">
            <div class="search-box">
              <v-icon class="search-icon">mdi-magnify</v-icon>
              <input
                :value="searchQuery"
                @input="$emit('update:search-query', $event.target.value)"
                type="text"
                placeholder="搜索品牌Logo设计..."
                class="search-input"
                @keyup.enter="$emit('search')"
                @focus="$emit('show-suggestions', true)"
                @blur="$emit('handle-blur')"
              />
              <v-btn
                v-if="searchQuery"
                variant="text"
                @click="$emit('clear-search')"
                class="clear-btn"
                icon
                size="small"
              >
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </div>
            
            <!-- 品牌Logo设计专用搜索建议 -->
            <div v-if="showSuggestions && filteredSuggestions.length > 0" class="search-suggestions">
              <div
                v-for="(suggestion, index) in filteredSuggestions"
                :key="index"
                class="suggestion-item"
                @click="$emit('select-suggestion', suggestion)"
              >
                <v-icon class="suggestion-icon">mdi-star</v-icon>
                <span class="suggestion-text">{{ suggestion }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script lang="ts" setup>
interface Props {
  searchQuery: string
  showFilter: boolean
  showSuggestions: boolean
  filteredSuggestions: string[]
  selectedIndustry: string
}

defineProps<Props>()

const industries = [
  { text: '科技', value: 'tech' },
  { text: '餐饮', value: 'food' },
  { text: '时尚', value: 'fashion' },
  { text: '金融', value: 'finance' },
  { text: '教育', value: 'education' },
  { text: '医疗', value: 'healthcare' }
]

defineEmits<{
  'update:search-query': [value: string]
  'toggle-mobile-sidebar': []
  'toggle-filter': []
  'search': []
  'show-suggestions': [show: boolean]
  'handle-blur': []
  'clear-search': []
  'select-suggestion': [suggestion: string]
  'select-industry': [industry: string]
}>()
</script>

<style lang="scss" scoped>
.top-header {
  background: #1a1a1a;
  position: fixed;
  top: 0;
  left: 240px;
  right: 0;
  height: 56px;
  z-index: 1001;
  border-bottom: 1px solid #404040;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  
  // 性能优化
  will-change: transform;
  transform: translateZ(0);
  -webkit-transform: translateZ(0);
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  -webkit-perspective: 1000;
  perspective: 1000;
  contain: layout style paint;
  
  .header-content {
    display: flex;
    align-items: center;
    height: 100%;
    padding: 0 1.5rem;
    gap: 1rem;
    
    .mobile-menu-btn {
      display: none;
      color: #e0e0e0;
      
      @media (max-width: 768px) {
        display: flex;
      }
    }
    
    .header-main {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex: 1;
      gap: 2rem;
      
      .header-title-section {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
        
        .header-title {
          display: flex;
          align-items: center;
          font-size: 1.25rem;
          font-weight: 600;
          color: #ffffff;
          margin: 0;
        }
        
        .header-subtitle {
          font-size: 0.85rem;
          color: #b0b0b0;
          margin: 0;
        }
      }
      
      .search-filter-container {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        flex: 1;
        max-width: 600px;
        
        .industry-filter {
          .industry-select {
            min-width: 120px;
            
            :deep(.v-field) {
              background: rgba(255, 255, 255, 0.05);
              border: 1px solid rgba(255, 255, 255, 0.1);
              color: #e0e0e0;
              
              &:hover {
                background: rgba(255, 255, 255, 0.08);
              }
              
              &.v-field--focused {
                background: rgba(255, 255, 255, 0.1);
                border-color: #e55a2b;
                box-shadow: 0 0 0 2px rgba(229, 90, 43, 0.3);
              }
            }
            
            :deep(.v-field__input) {
              color: #e0e0e0;
              font-size: 0.85rem;
            }
            
            :deep(.v-field__append-inner) {
              color: #b0b0b0;
            }
          }
        }
        
        .filter-toggle-btn {
          color: #b0b0b0;
          transition: all 0.3s ease;
          
          &:hover {
            color: #ffffff;
            background: rgba(255, 255, 255, 0.1);
          }
          
          &.active {
            color: #e55a2b;
            background: rgba(229, 90, 43, 0.1);
          }
        }
        
        .search-container {
          position: relative;
          flex: 1;
          
          .search-box {
            display: flex;
            align-items: center;
            background: rgba(255, 255, 255, 0.05);
            border-radius: 8px;
            padding: 0.5rem 0.75rem;
            height: 40px;
            transition: all 0.3s ease;
            
            &:hover {
              background: rgba(255, 255, 255, 0.08);
            }
            
            &:focus-within {
              background: rgba(255, 255, 255, 0.1);
              box-shadow: 0 0 0 2px rgba(229, 90, 43, 0.3);
            }
            
            .search-icon {
              color: #b0b0b0;
              margin-right: 0.625rem;
              font-size: 1rem;
            }
            
            .search-input {
              flex: 1;
              background: transparent;
              border: none;
              outline: none;
              color: #ffffff;
              font-size: 0.9rem;
              
              &::placeholder {
                color: #888;
              }
            }
            
            .clear-btn {
              color: #b0b0b0;
              padding: 0.125rem;
              min-width: 24px;
              height: 24px;
              margin-left: 0.375rem;
              
              &:hover {
                color: #ffffff;
                background: rgba(255, 255, 255, 0.1);
              }
            }
          }
          
          .search-suggestions {
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: #2a2a2a;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
            z-index: 1000;
            margin-top: 0.5rem;
            overflow: hidden;
            
            .suggestion-item {
              display: flex;
              align-items: center;
              padding: 0.75rem 1rem;
              cursor: pointer;
              transition: background 0.2s ease;
              
              &:hover {
                background: rgba(255, 255, 255, 0.05);
              }
              
              .suggestion-icon {
                color: #b0b0b0;
                margin-right: 0.75rem;
                font-size: 1rem;
              }
              
              .suggestion-text {
                color: #e0e0e0;
                font-size: 0.9rem;
              }
            }
          }
        }
      }
    }
  }
}

// 当侧边栏折叠时调整头部位置
.sidebar-collapsed .top-header {
  left: 80px;
}

// 移动端适配
@media (max-width: 768px) {
  .top-header {
    left: 0;
    height: 64px;
    
    .header-content {
      padding: 0 1rem;
      
      .header-main {
        flex-direction: column;
        align-items: stretch;
        gap: 1rem;
        
        .header-title-section {
          .header-title {
            font-size: 1.1rem;
          }
          
          .header-subtitle {
            font-size: 0.8rem;
          }
        }
        
        .search-filter-container {
          max-width: none;
          
          .industry-filter {
            display: none; // 移动端隐藏行业筛选
          }
        }
      }
    }
  }
}
</style>
