<!--
 * @Author: chan-max jackieontheway666@gmail.com
 * @Date: 2025-01-27 11:00:00
 * @LastEditors: chan-max jackieontheway666@gmail.com
 * @LastEditTime: 2025-09-22 03:04:15
 * @FilePath: /yishe-nuxt/pages/search/components/headers/ClothingHeader.vue
 * @Description: 服装设计Header组件
-->
<script lang="ts" setup>
import BaseHeader from './BaseHeader.vue'
import { colorOptions } from '../../customConfig/filterOptions'

interface Props {
  searchQuery: string
  showFilterMenu: boolean
  showMobileSidebar: boolean
  filters: any
  filterOptions: any
  activeFilters: any
  activeFiltersCount: number
}

interface Emits {
  (e: 'update:searchQuery', value: string): void
  (e: 'toggle-filter-menu'): void
  (e: 'perform-search'): void
  (e: 'clear-search'): void
  (e: 'toggle-mobile-sidebar'): void
  (e: 'update:filters', filters: any): void
  (e: 'remove-filter', key: string): void
  (e: 'clear-filters'): void
  (e: 'apply-filters'): void
  (e: 'toggle-style', style: string): void
  (e: 'toggle-color', color: string): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

// Search suggestions removed

// Clothing design related filter options
const clothingFilterOptions = [
  { value: 'style', label: 'Style', options: ['Casual', 'Formal', 'Sport', 'Fashion', 'Vintage', 'Minimalist'] },
  { value: 'gender', label: 'Gender', options: ['Men', 'Women', 'Unisex', 'Kids'] },
  { value: 'season', label: 'Season', options: ['Spring', 'Summer', 'Autumn', 'Winter', 'All Season'] },
  { value: 'occasion', label: 'Occasion', options: ['Daily', 'Work', 'Sport', 'Party', 'Formal'] },
  { value: 'material', label: 'Material', options: ['Cotton', 'Denim', 'Knit', 'Silk', 'Leather', 'Synthetic'] }
]

// Color options imported from unified config

const handleSearchInput = (value: string) => {
  emit('update:searchQuery', value)
}

const toggleFilter = () => {
  emit('toggle-filter-menu')
}

const performSearch = () => {
  emit('perform-search')
}

const clearSearch = () => {
  emit('clear-search')
}

const toggleMobileSidebar = () => {
  emit('toggle-mobile-sidebar')
}

// Filter related methods
const updateFilters = (filters: any) => {
  emit('update:filters', filters)
}

const removeFilter = (key: string) => {
  emit('remove-filter', key)
}

const clearFilters = () => {
  emit('clear-filters')
}

const applyFilters = () => {
  emit('apply-filters')
}

const toggleStyle = (style: string) => {
  emit('toggle-style', style)
}

const toggleColor = (color: string) => {
  emit('toggle-color', color)
}
</script>

<template>
  <BaseHeader
    :show-mobile-sidebar="showMobileSidebar"
    :show-filter-menu="showFilterMenu"
    @toggle-mobile-sidebar="toggleMobileSidebar"
    @toggle-filter-menu="toggleFilter"
  >
    <template #search-filter>
      <!-- Filter button -->
      <v-btn
        variant="text"
        @click="toggleFilter"
        class="filter-toggle-btn"
        :class="{ 'active': showFilterMenu }"
        icon
        size="small"
      >
        <v-icon>{{ showFilterMenu ? 'mdi-tune' : 'mdi-tune-variant' }}</v-icon>
      </v-btn>
      
      <!-- Search box -->
      <div class="search-container">
        <div class="search-box">
          <v-icon class="search-icon">mdi-magnify</v-icon>
          <input
            :value="searchQuery"
            @input="handleSearchInput(($event.target as HTMLInputElement).value)"
            type="text"
            placeholder="Search fashion designs..."
            class="search-input"
            @keyup.enter="performSearch"
          />
          <v-btn
            v-if="searchQuery"
            variant="text"
            @click="clearSearch"
            class="clear-btn"
            icon
            size="small"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </div>
      </div>
    </template>
    
    <!-- Filter content -->
    <template #filter-content>
      <!-- Filter chips display -->
      <div class="filter-chips" v-if="activeFiltersCount > 0">
        <v-chip
          v-for="(filter, key) in activeFilters"
          :key="key"
          size="small"
          closable
          @click:close="removeFilter(key)"
          class="filter-chip"
        >
          {{ filter.label }}: {{ filter.value }}
        </v-chip>
      </div>
      
      <div class="filter-row-single">
        <!-- Sort options -->
        <div class="filter-group">
          <label class="filter-label">Sort</label>
          <v-select
            v-model="filters.sort"
            :items="filterOptions.sort"
            variant="outlined"
            density="compact"
            hide-details
            placeholder="Select sort option"
            class="filter-select"
            @update:model-value="updateFilters(filters)"
          />
        </div>
        
        <!-- Price range input -->
        <div class="filter-group filter-group-range">
          <label class="filter-label">Price Range</label>
          <div class="price-range-container">
            <v-text-field
              v-model.number="filters.priceMin"
              type="number"
              placeholder="Min Price"
              class="price-input"
              variant="outlined"
              density="compact"
              hide-details
              @update:model-value="updateFilters(filters)"
            />
            <span class="price-separator">-</span>
            <v-text-field
              v-model.number="filters.priceMax"
              type="number"
              placeholder="Max Price"
              class="price-input"
              variant="outlined"
              density="compact"
              hide-details
              @update:model-value="updateFilters(filters)"
            />
          </div>
        </div>
        
        <!-- Style chip selection -->
        <div class="filter-group filter-group-chips">
          <label class="filter-label">Style</label>
          <div class="style-chips">
            <v-chip
              v-for="style in filterOptions.style"
              :key="style.value"
              :class="{ 'chip-selected': filters.styles.includes(style.value) }"
              @click="toggleStyle(style.value)"
              class="style-chip"
              size="small"
              variant="outlined"
            >
              {{ style.text }}
            </v-chip>
          </div>
        </div>
        
        <!-- Color picker -->
        <div class="filter-group filter-group-colors">
          <label class="filter-label">Color</label>
          <div class="color-picker">
            <div
              v-for="color in colorOptions"
              :key="color.value"
              :class="{ 'color-selected': filters.colors.includes(color.value) }"
              @click="toggleColor(color.value)"
              class="color-option"
              :style="{ backgroundColor: color.value }"
              :title="color.text"
            />
          </div>
        </div>
        
        <!-- Action buttons -->
        <div class="filter-actions-inline">
          <v-btn
            variant="outlined"
            @click="clearFilters"
            class="filter-clear-btn"
            size="small"
            icon
          >
            <v-icon>mdi-refresh</v-icon>
          </v-btn>
          <v-btn
            variant="flat"
            @click="applyFilters"
            class="filter-apply-btn"
            size="small"
            color="primary"
            icon
          >
            <v-icon>mdi-check</v-icon>
          </v-btn>
        </div>
      </div>
    </template>
  </BaseHeader>
</template>

<style scoped>
.filter-toggle-btn {
  color: var(--text-secondary) !important;
  
  &.active {
    color: var(--theme-primary) !important;
    background: var(--bg-hover) !important;
  }
  
  &:hover {
    color: var(--theme-primary) !important;
    background: var(--bg-hover) !important;
  }
}

.search-container {
  position: relative;
}

.search-box {
  display: flex;
  align-items: center;
  background: var(--input-bg);
  border: 1px solid var(--border-secondary);
  border-radius: 8px;
  padding: 0.5rem 0.75rem;
  min-width: 300px;

  &:hover {
    background: var(--input-bg-hover);
  }

  &:focus-within {
    background: var(--input-bg-focus);
    border-color: var(--theme-primary);
    box-shadow: 0 0 0 2px var(--border-hover);
  }
}

.search-icon {
  color: var(--text-tertiary);
  margin-right: 0.5rem;
  font-size: 1rem;
  
  .search-box:hover & {
    color: var(--text-secondary);
  }
  
  .search-box:focus-within & {
    color: var(--theme-primary);
  }
}

.search-input {
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  color: var(--text-primary);
  font-size: 0.9rem;
  
  &::placeholder {
    color: var(--text-muted);
  }
  
  &:focus {
    color: var(--text-primary);
    
    &::placeholder {
      color: var(--text-tertiary);
    }
  }
}

.clear-btn {
  color: var(--text-tertiary) !important;
  margin-left: 0.5rem;
  
  &:hover {
    color: var(--text-primary) !important;
    background: var(--bg-hover) !important;
  }
}

/* Search suggestion related styles removed */

/* Filter related styles */
.filter-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
}

.filter-chip {
  background: var(--theme-primary) !important;
  color: var(--text-primary) !important;
  
  &:hover {
    background: var(--theme-primary-hover) !important;
  }
}

.filter-row-single {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  align-items: end;
  padding-bottom: 1.5rem;
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  min-width: 150px;
}

.filter-label {
  font-size: 0.9rem;
  color: var(--text-secondary);
  font-weight: 500;
}

.filter-select {
  min-width: 150px;
}

.price-range-container {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.price-input {
  min-width: 80px;
}

.price-separator {
  color: #999;
  font-weight: 500;
}

.style-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.style-chip {
  cursor: pointer;
  
  &.chip-selected {
    background: var(--theme-primary) !important;
    color: var(--text-primary) !important;
  }
}

.color-picker {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.color-option {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  cursor: pointer;
  border: 2px solid transparent;
  
  &:hover {
    transform: scale(1.1);
  }
  
  &.color-selected {
    border-color: var(--theme-primary);
    box-shadow: 0 0 0 2px var(--border-hover);
  }
}

.filter-actions-inline {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.filter-clear-btn {
  color: var(--text-tertiary) !important;
  
  &:hover {
    color: var(--text-primary) !important;
    background: var(--bg-hover) !important;
  }
}

.filter-apply-btn {
  background: var(--theme-primary) !important;
  color: var(--text-primary) !important;
  
  &:hover {
    background: var(--theme-primary-hover) !important;
  }
}

/* Mobile adaptation */
@media (max-width: 768px) {
  .search-box {
    min-width: 200px;
  }
  
  .filter-row-single {
    flex-direction: column;
    align-items: stretch;
  }
  
  .filter-group {
    min-width: auto;
  }
}
</style>
