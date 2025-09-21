# 商品列表接口 API 文档

## 接口信息
- **接口地址：** `/product/page`
- **请求方法：** `POST`
- **接口描述：** 获取个性化服装商品列表，支持多种筛选和排序条件

## 请求参数

### 基础参数
```json
{
  "currentPage": 1,        // 当前页码，从1开始
  "pageSize": 10,          // 每页数量
  "isPublish": true,       // 传入true，代表是公开的内容
  "keyword": "搜索关键词",  // 可选，搜索关键词
  "sort": "latest",        // 可选，排序方式
  "filters": {             // 可选，过滤条件对象
    // 各种过滤条件
  }
}
```

### 排序方式 (sort)
- `"latest"` - 最新上架
- `"popular"` - 最受欢迎（按销量/热度）
- `"rating"` - 好评如潮（按评分）
- `"price_asc"` - 价格从低到高
- `"price_desc"` - 价格从高到低

### 过滤条件 (filters)

#### 价格区间 (price)
- `"0-100"` - 0-100元
- `"100-300"` - 100-300元
- `"300-500"` - 300-500元
- `"500-1000"` - 500-1000元
- `"1000+"` - 1000元以上

#### 性别 (gender)
- `"male"` - 男装
- `"female"` - 女装
- `"unisex"` - 中性

#### 年龄段 (ageGroup)
- `"all"` - 全部年龄
- `"youth"` - 青年(18-25)
- `"adult"` - 成人(25-40)
- `"senior"` - 老年(40+)

#### 风格 (style)
- `"casual"` - 休闲
- `"formal"` - 正装
- `"sports"` - 运动
- `"vintage"` - 复古
- `"street"` - 街头
- `"business"` - 商务
- `"sweet"` - 甜美
- `"cool"` - 酷炫

#### 季节 (season)
- `"spring"` - 春季
- `"summer"` - 夏季
- `"autumn"` - 秋季
- `"winter"` - 冬季
- `"all_season"` - 四季

#### 材质 (material)
- `"cotton"` - 棉质
- `"wool"` - 羊毛
- `"silk"` - 丝绸
- `"linen"` - 亚麻
- `"denim"` - 牛仔
- `"knit"` - 针织
- `"leather"` - 皮革

#### 颜色 (color)
- `"black"` - 黑色
- `"white"` - 白色
- `"red"` - 红色
- `"blue"` - 蓝色
- `"green"` - 绿色
- `"yellow"` - 黄色
- `"pink"` - 粉色
- `"purple"` - 紫色
- `"gray"` - 灰色
- `"brown"` - 棕色

#### 尺码 (size)
- `"xs"` - XS
- `"s"` - S
- `"m"` - M
- `"l"` - L
- `"xl"` - XL
- `"xxl"` - XXL

#### 场合 (occasion)
- `"daily"` - 日常
- `"work"` - 工作
- `"party"` - 聚会
- `"sport"` - 运动
- `"formal"` - 正式场合
- `"date"` - 约会

#### 品牌 (brand)
- 根据实际品牌数据动态生成

#### 折扣 (discount)
- `"no_discount"` - 无折扣
- `"discount_90"` - 9折以上
- `"discount_70_90"` - 7-9折
- `"discount_50_70"` - 5-7折
- `"discount_50"` - 5折以下

## 请求示例

### 1. 获取最新上架的商品
```json
{
  "currentPage": 1,
  "pageSize": 10,
  "isPublish": true,
  "sort": "latest"
}
```

### 2. 搜索女装休闲风格的商品
```json
{
  "currentPage": 1,
  "pageSize": 10,
  "isPublish": true,
  "keyword": "连衣裙",
  "filters": {
    "gender": "female",
    "style": "casual"
  }
}
```

### 3. 按价格排序的青年男装
```json
{
  "currentPage": 1,
  "pageSize": 10,
  "isPublish": true,
  "sort": "price_asc",
  "filters": {
    "gender": "male",
    "ageGroup": "youth",
    "price": "100-300"
  }
}
```

### 4. 夏季运动服装
```json
{
  "currentPage": 1,
  "pageSize": 10,
  "isPublish": true,
  "filters": {
    "season": "summer",
    "style": "sports",
    "material": "cotton"
  }
}
```

## 响应格式

```json
{
  "list": [
    {
      "id": "商品ID",
      "name": "商品名称",
      "description": "商品描述",
      "price": 299.00,
      "originalPrice": 399.00,
      "discount": 0.75,
      "tag": "新品",
      "likes": 128,
      "rating": 4.8,
      "sales": 256,
      "gender": "female",
      "ageGroup": "youth",
      "style": "casual",
      "season": "summer",
      "material": "cotton",
      "color": "blue",
      "size": ["s", "m", "l"],
      "occasion": "daily",
      "brand": "品牌名称",
      "keywords": "休闲,夏季,棉质,蓝色",
      "customModel": {
        "thumbnail": "商品缩略图URL"
      },
      "createdAt": "2024-01-15T10:30:00Z",
      "updatedAt": "2024-01-15T10:30:00Z"
    }
  ],
  "total": 156,
  "currentPage": 1,
  "pageSize": 10,
  "totalPages": 16
}
```

## 错误响应

```json
{
  "error": "错误信息",
  "code": "ERROR_CODE",
  "timestamp": "2024-01-15T10:30:00Z"
}
```

## 注意事项

1. 所有过滤条件都是可选的，可以组合使用
2. 排序条件优先级高于过滤条件
3. 关键词搜索会匹配商品名称、描述和关键词字段
4. 价格区间使用字符串格式，便于前端处理
5. 返回的商品数据包含完整的商品信息和关联的模型数据
6. 分页信息包含总数和总页数，便于前端分页组件使用 