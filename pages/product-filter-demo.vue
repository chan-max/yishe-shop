<template>
  <div class="container mx-auto px-4 py-8">
    <div class="max-w-4xl mx-auto">
      <h1 class="text-3xl font-bold mb-8 text-center">商品筛选功能演示</h1>
      
      <!-- 功能说明 -->
      <div class="bg-blue-50 p-6 rounded-lg mb-8">
        <h2 class="text-xl font-semibold mb-4">功能特性</h2>
        <ul class="space-y-2 text-gray-700">
          <li>• <strong>排序功能：</strong>最新上架、最受欢迎、好评如潮、价格排序</li>
          <li>• <strong>性别筛选：</strong>男装、女装、中性</li>
          <li>• <strong>年龄段：</strong>青年、成人、老年</li>
          <li>• <strong>风格筛选：</strong>休闲、正装、运动、复古、街头、商务、甜美、酷炫</li>
          <li>• <strong>季节筛选：</strong>春季、夏季、秋季、冬季、四季</li>
          <li>• <strong>材质筛选：</strong>棉质、羊毛、丝绸、亚麻、牛仔、针织、皮革</li>
          <li>• <strong>颜色筛选：</strong>10种常见颜色</li>
          <li>• <strong>尺码筛选：</strong>XS到XXL</li>
          <li>• <strong>场合筛选：</strong>日常、工作、聚会、运动、正式场合、约会</li>
          <li>• <strong>价格区间：</strong>5个价格档位</li>
          <li>• <strong>折扣筛选：</strong>5个折扣档位</li>
        </ul>
      </div>

      <!-- API 请求示例 -->
      <div class="bg-gray-50 p-6 rounded-lg mb-8">
        <h2 class="text-xl font-semibold mb-4">API 请求示例</h2>
        
        <div class="space-y-4">
          <div>
            <h3 class="font-medium mb-2">1. 获取最新上架商品</h3>
            <pre class="bg-white p-3 rounded text-sm overflow-x-auto"><code>{
  "currentPage": 1,
  "pageSize": 10,
  "isPublish": true,
  "sort": "latest"
}</code></pre>
          </div>
          
          <div>
            <h3 class="font-medium mb-2">2. 搜索女装休闲风格</h3>
            <pre class="bg-white p-3 rounded text-sm overflow-x-auto"><code>{
  "currentPage": 1,
  "pageSize": 10,
  "isPublish": true,
  "keyword": "连衣裙",
  "filters": {
    "gender": "female",
    "style": "casual"
  }
}</code></pre>
          </div>
          
          <div>
            <h3 class="font-medium mb-2">3. 青年男装按价格排序</h3>
            <pre class="bg-white p-3 rounded text-sm overflow-x-auto"><code>{
  "currentPage": 1,
  "pageSize": 10,
  "isPublish": true,
  "sort": "price_asc",
  "filters": {
    "gender": "male",
    "ageGroup": "youth",
    "price": "100-300"
  }
}</code></pre>
          </div>
          
          <div>
            <h3 class="font-medium mb-2">4. 夏季运动服装</h3>
            <pre class="bg-white p-3 rounded text-sm overflow-x-auto"><code>{
  "currentPage": 1,
  "pageSize": 10,
  "isPublish": true,
  "filters": {
    "season": "summer",
    "style": "sports",
    "material": "cotton"
  }
}</code></pre>
          </div>
        </div>
      </div>

      <!-- 使用说明 -->
      <div class="bg-green-50 p-6 rounded-lg mb-8">
        <h2 class="text-xl font-semibold mb-4">使用说明</h2>
        <div class="space-y-3 text-gray-700">
          <p><strong>1. 快速筛选：</strong>点击快速筛选按钮可以快速应用常用的排序方式</p>
          <p><strong>2. 组合筛选：</strong>可以同时使用多个筛选条件，系统会自动组合查询</p>
          <p><strong>3. 清除筛选：</strong>点击"清除筛选"按钮可以重置所有筛选条件</p>
          <p><strong>4. 搜索功能：</strong>支持关键词搜索，会匹配商品名称、描述和关键词</p>
          <p><strong>5. 分页功能：</strong>支持分页查询，每页可自定义显示数量</p>
        </div>
      </div>

      <!-- 返回按钮 -->
      <div class="text-center">
        <NuxtLink 
          to="/products" 
          class="inline-block px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          查看实际商品页面
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({ layout: 'page' })
useHead({ titleTemplate: '', title: '商品筛选功能演示 - 衣设服装设计' })
</script> 