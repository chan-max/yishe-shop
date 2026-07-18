# Yishe POD 社区架构与实施 TODO

> 目标：把独立站从商品展示站扩展为围绕 POD 商品、设计、工艺和使用场景进行交流的社区。
> 文档用于后续开发者继续实施，不代表所有功能需要一次完成。

## 1. 推荐结论

采用“模块化单体”方案，不新建独立微服务：

- `yishe-nuxt` 继续负责公开社区页面、SSR、SEO 和用户交互。
- `design-server` 新增独立 `CommunityModule`，负责帖子、回复、互动、通知和审核。
- MySQL 继续作为唯一事实数据源。
- Redis 用于限流、热点缓存、在线状态和实时事件，不作为帖子最终存储。
- 现有 Redis Streams/Queue 用于异步通知、计数修复、内容审核和搜索索引任务。
- 社区实时通信使用独立 Socket.IO namespace，例如 `/community`。
- 不复用当前 `/ws` 的业务事件。现有 `/ws` 主要服务设计客户端、发布任务和运行时调度，职责不同。
- 首期不拆微服务，不引入 Elasticsearch、Meilisearch 或向量库。

推荐内容模型是“板块 + 帖子 + 商品关联”的混合模式：

- 板块类似贴吧，例如「服饰印花」「宠物用品」「家居布艺」「工艺交流」「选品讨论」。
- 每个帖子可以关联一个 POD 商品，也可以是普通设计讨论。
- 商品详情页显示与该商品关联的讨论，但帖子仍拥有独立 URL，可被搜索引擎收录。
- 不建议把每个商品直接做成唯一聊天室。这样会限制讨论主题，也不利于 SEO 和内容沉淀。

## 2. 当前可复用能力

### yishe-nuxt

- 已有公开用户注册、登录、个人资料和 Pinia 用户状态。
- 已有商品列表、商品详情、收藏和收藏数量。
- 已有 SSR、商品 SEO、JSON-LD 和动态 sitemap 基础。
- 已有站点层 `sites/yishe`，社区入口和文案可通过站点配置控制。

### design-server

- NestJS + TypeORM + MySQL，可直接增加社区领域模块。
- `public_users` 已包含 `owner_user_id`，具备多站点/主账号隔离基础。
- 已有公开用户认证和商品收藏模块。
- 已有 Redis、Redis Streams、队列和 Socket.IO。
- 已有后台用户、数据权限和操作日志基础。
- 已有消息推送能力，但当前更偏系统任务通知，社区站内通知应建立独立数据表。

### 需要提前处理的风险

- [ ] 社区数据表必须包含 `owner_user_id`，所有查询按独立站所属主账号隔离。
- [ ] 新表使用正式 migration 管理，社区上线前不要继续依赖生产环境 `synchronize: true`。
- [ ] 将服务端配置中的数据库、Redis、COS、JWT 等密钥迁移到环境变量。
- [ ] 生产 CORS 改为明确域名白名单，不保留任意 Origin + credentials。
- [ ] 社区登录逐步迁移到 `HttpOnly + Secure + SameSite` Cookie，降低 localStorage Token 的 XSS 风险。

## 3. 核心数据模型

### community_board

板块/吧。

- `id`
- `owner_user_id`
- `slug`
- `name`
- `description`
- `cover_image`
- `sort`
- `status`: `active | hidden | archived`
- `topic_count`
- `reply_count`
- `create_time`
- `update_time`

索引：

- UNIQUE `(owner_user_id, slug)`
- INDEX `(owner_user_id, status, sort)`

### community_topic

主题帖。

- `id`: bigint 或 UUID，建议 bigint 便于排序，另提供公开 slug。
- `owner_user_id`
- `board_id`
- `public_user_id`
- `product_id`: nullable，关联一个主要商品。
- `title`
- `slug`
- `content`
- `content_format`: 首期固定 `plain` 或 `markdown`。
- `excerpt`
- `cover_image`
- `status`: `published | pending | hidden | deleted`
- `is_pinned`
- `is_featured`
- `is_locked`
- `view_count`
- `reply_count`
- `like_count`
- `favorite_count`
- `last_reply_user_id`
- `last_reply_time`
- `published_time`
- `create_time`
- `update_time`
- `deleted_time`

索引：

- INDEX `(owner_user_id, status, last_reply_time)`
- INDEX `(owner_user_id, board_id, status, is_pinned, last_reply_time)`
- INDEX `(owner_user_id, product_id, status, last_reply_time)`
- INDEX `(owner_user_id, public_user_id, status, create_time)`
- UNIQUE `(owner_user_id, slug)`

### community_reply

回复和楼中楼统一存储。

- `id`
- `owner_user_id`
- `topic_id`
- `public_user_id`
- `parent_reply_id`: nullable，楼中楼父回复。
- `reply_to_user_id`: nullable，被回复用户。
- `content`
- `status`: `published | pending | hidden | deleted`
- `like_count`
- `create_time`
- `update_time`
- `deleted_time`

索引：

- INDEX `(owner_user_id, topic_id, status, id)`
- INDEX `(owner_user_id, parent_reply_id, status, id)`
- INDEX `(owner_user_id, public_user_id, create_time)`

首期限制楼中楼深度为 1 层，避免无限嵌套和复杂查询。

### community_reaction

帖子和回复点赞。

- `id`
- `owner_user_id`
- `public_user_id`
- `target_type`: `topic | reply`
- `target_id`
- `reaction_type`: 首期只支持 `like`
- `create_time`

UNIQUE `(owner_user_id, public_user_id, target_type, target_id, reaction_type)`。

### community_topic_favorite

帖子收藏，不能和商品收藏表混用。

- `id`
- `owner_user_id`
- `public_user_id`
- `topic_id`
- `create_time`

UNIQUE `(owner_user_id, public_user_id, topic_id)`。

### community_follow

关注用户或板块。

- `id`
- `owner_user_id`
- `public_user_id`
- `target_type`: `user | board`
- `target_id`
- `create_time`

### community_notification

持久化站内通知。

- `id`
- `owner_user_id`
- `public_user_id`: 接收者。
- `actor_user_id`: 触发者。
- `type`: `topic_reply | reply_reply | topic_like | reply_like | follow | system`
- `topic_id`
- `reply_id`
- `payload`: JSON，只保存展示所需快照。
- `is_read`
- `read_time`
- `create_time`

索引 `(owner_user_id, public_user_id, is_read, create_time)`。

### community_report

举报记录。

- `id`
- `owner_user_id`
- `reporter_user_id`
- `target_type`: `topic | reply | user`
- `target_id`
- `reason`
- `description`
- `status`: `pending | processing | resolved | rejected`
- `handler_user_id`
- `handle_note`
- `create_time`
- `update_time`

### community_attachment

帖子图片附件。

- `id`
- `owner_user_id`
- `public_user_id`
- `topic_id` / `reply_id`
- `url`
- `mime_type`
- `width`
- `height`
- `size`
- `sort`
- `create_time`

首期只允许图片，限制数量、大小、格式，并使用 COS 上传和图片处理能力。

## 4. API 边界建议

公开读取接口允许匿名访问，写接口必须使用公开用户 Token。

### 板块与信息流

- `GET /api/community/boards`
- `GET /api/community/boards/:slug`
- `GET /api/community/feed?cursor=&sort=latest|hot|following`
- `GET /api/community/boards/:id/topics?cursor=`
- `GET /api/community/products/:productId/topics?cursor=`

### 帖子

- `POST /api/community/topics`
- `GET /api/community/topics/:id-or-slug`
- `PATCH /api/community/topics/:id`
- `DELETE /api/community/topics/:id`
- `POST /api/community/topics/:id/like`
- `DELETE /api/community/topics/:id/like`
- `POST /api/community/topics/:id/favorite`
- `DELETE /api/community/topics/:id/favorite`

### 回复

- `GET /api/community/topics/:id/replies?cursor=`
- `POST /api/community/topics/:id/replies`
- `PATCH /api/community/replies/:id`
- `DELETE /api/community/replies/:id`
- `POST /api/community/replies/:id/like`
- `DELETE /api/community/replies/:id/like`

### 用户与通知

- `GET /api/community/users/:id/profile`
- `GET /api/community/users/:id/topics?cursor=`
- `POST /api/community/follows`
- `DELETE /api/community/follows/:targetType/:targetId`
- `GET /api/community/notifications?cursor=`
- `GET /api/community/notifications/unread-count`
- `POST /api/community/notifications/read`

### 举报和管理

- `POST /api/community/reports`
- `GET /api/community/admin/reports`
- `POST /api/community/admin/topics/:id/moderate`
- `POST /api/community/admin/replies/:id/moderate`
- `POST /api/community/admin/users/:id/restrict`

## 5. 前端页面结构

### yishe-nuxt 新页面

- `/community`: 社区首页，板块入口 + 最新/热门/关注信息流。
- `/community/board/:slug`: 板块主题列表。
- `/community/topic/:id/:slug?`: 帖子详情和回复列表。
- `/community/create`: 发帖页。
- `/community/product/:productId`: 某个商品的全部讨论。
- `/u/:id`: 社区用户主页。
- `/notifications`: 当前用户通知中心。

### 现有页面调整

- [ ] 主导航增加“社区”。
- [ ] 商品详情增加“讨论”区域，展示最新 3 至 5 个关联帖子。
- [ ] 商品详情增加“发起讨论”按钮，创建帖子时自动绑定商品。
- [ ] 用户菜单增加“我的帖子”“我的回复”“通知”。
- [ ] 首页可以增加少量热门讨论，但不要让社区内容压过商品主视觉。

### 推荐组件

- `CommunityFeed`
- `CommunityTopicCard`
- `CommunityComposer`
- `CommunityReplyList`
- `CommunityReplyComposer`
- `CommunityBoardNav`
- `CommunityProductBadge`
- `CommunityUserSummary`
- `CommunityNotificationMenu`
- `CommunityReportDialog`

社区组件属于核心功能，不应放入 `sites/yishe`。站点层只配置入口、板块文案、是否启用和样式覆盖。

## 6. 实时通信设计

新增独立 `CommunityGateway`：

- namespace: `/community`
- 使用公开用户 JWT 鉴权。
- 用户连接后加入 `user:{publicUserId}` 房间。
- 打开帖子详情时加入 `topic:{topicId}` 房间。
- 离开页面时退出帖子房间。

事件建议：

- `community.topic.reply.created`
- `community.reply.created`
- `community.reaction.changed`
- `community.notification.created`
- `community.topic.updated`
- `community.topic.moderated`

关键原则：

- 发帖、回复和点赞仍通过 REST 写入数据库。
- 数据库事务成功后再发布实时事件。
- WebSocket 只用于增量推送，不作为唯一写入通道。
- 客户端断线重连后重新请求 REST 数据，不依赖补齐所有 Socket 事件。
- 每个事件包含 `eventId`、`version`、`occurredAt`，客户端按 ID 去重。

## 7. 信息流与搜索

### MVP 信息流

- 最新：按 `last_reply_time DESC, id DESC`。
- 热门：使用可解释分数，不使用 AI：
  `reply_count * 3 + like_count * 2 + favorite_count * 4 + view_count * 0.05`，再做时间衰减。
- 关注：关注板块和用户的帖子合集。
- 置顶帖永远在当前板块顶部，不混入全站热门分数。

### 分页

- 社区信息流和回复使用游标分页，不使用深 offset。
- 游标至少包含排序字段和 ID，例如 `lastReplyTime + id`。
- 管理后台可继续使用普通页码分页。

### 搜索

第一阶段：

- 使用 MySQL FULLTEXT 或受控的 LIKE 查询搜索标题、摘要和正文。
- 搜索结果只包含 `published` 内容。
- 搜索接口限制关键词长度和频率。

第二阶段仅在数据量和搜索需求明确后评估专用搜索服务。

社区搜索首期不接入向量库。向量检索不是发帖、回复和商品讨论的必要依赖。

## 8. SEO 设计

- 帖子详情必须 SSR 输出标题、摘要、作者、发布时间和首屏正文。
- URL 使用稳定 ID，slug 只负责可读性，修改标题不改变帖子身份。
- 帖子 canonical 指向标准详情 URL。
- `published` 帖子允许索引；`pending/hidden/deleted` 返回 noindex 或 404/410。
- 通知、个人设置、发帖编辑页全部 noindex。
- 为帖子增加 `DiscussionForumPosting` JSON-LD。
- 只有真正问答型板块才使用 `QAPage`，普通讨论不要错误标记为 Q&A。
- 新增动态社区 sitemap，并像商品 sitemap 一样按数量拆分。
- sitemap 只包含公开帖子和公开板块。
- 帖子删除后从 sitemap 移除，永久删除可返回 410。

## 9. 通知与异步任务

同步事务只完成核心写入：帖子、回复、点赞关系和必要计数。

通过现有队列异步处理：

- 写入或聚合通知。
- @提及解析。
- 热度分数更新。
- 计数对账和修复。
- 搜索索引更新。
- 图片安全检查。
- AI 内容审核，可选且不得阻塞正常商品业务。
- sitemap 缓存失效。

高频点赞通知应聚合，例如“3 人赞了你的帖子”，避免每次点赞生成一条永久通知。

## 10. 审核与反滥用

MVP 上线前必须具备：

- [ ] 发帖、回复、点赞、举报接口限流。
- [ ] 新账号发帖频率和图片数量限制。
- [ ] 文本长度、空内容、重复内容校验。
- [ ] HTML 清洗，禁止用户直接提交可执行 HTML。
- [ ] 图片 MIME、扩展名、文件大小和数量校验。
- [ ] 举报入口和管理员隐藏能力。
- [ ] 软删除和完整审核日志。
- [ ] 被锁定帖子不能继续回复。
- [ ] 被禁言用户不能发帖或回复，但仍可读取公开内容。

后续可增加：

- 用户信誉等级。
- 敏感词规则。
- AI 审核建议。
- 重复图片和广告识别。
- 管理员封禁、禁言和申诉流程。

AI 只给审核建议，最终状态变更必须有明确规则或人工操作记录。

## 11. 性能原则

- 帖子和回复正文只在详情接口返回，信息流返回摘要。
- 计数采用实体冗余字段，定时任务负责对账。
- 热门板块和热门帖子缓存 30 至 120 秒。
- 商品详情的讨论摘要可缓存 30 至 60 秒。
- 严禁逐条查询作者、商品和互动状态，使用批量查询或明确 join。
- 点赞和收藏写入使用唯一索引保证幂等。
- 浏览量使用 Redis 增量聚合后批量落库，不要每次访问直接 UPDATE MySQL。
- 回复列表按 `topic_id + id` 游标查询。
- 上传文件直传 COS，应用服务器只签名和记录元数据。

## 12. 目录建议

### design-server

```text
src/community/
  community.module.ts
  controllers/
  dto/
  entities/
  services/
  repositories/
  policies/
  moderation/
  notifications/
  realtime/
  jobs/
```

不要把社区事件继续堆入现有超大的 `websocket.gateway.ts`。

### yishe-nuxt

```text
pages/community/
components/community/
composables/community/
stores/community.ts
utils/community/
```

API 契约继续放在核心 API 层，不放入 `sites/yishe`。

### yishe-admin

```text
views/community/boards/
views/community/topics/
views/community/replies/
views/community/reports/
views/community/users/
```

## 13. 分阶段实施

### Phase 0：架构和安全准备

- [ ] 确认板块、帖子、回复和商品关联模型。
- [ ] 建立 migration 机制并关闭生产自动建表风险。
- [ ] 清理服务端硬编码密钥。
- [ ] 收紧生产 CORS。
- [ ] 设计公开用户 Cookie 登录迁移方案。
- [ ] 为站点配置增加 `features.community`。

### Phase 1：社区 MVP

- [ ] 建立 `community_board`、`community_topic`、`community_reply`。
- [ ] 实现板块列表、帖子列表、帖子详情、发帖和回复 API。
- [ ] 实现社区首页、板块页、详情页和发帖页。
- [ ] 商品详情显示关联讨论并支持发起讨论。
- [ ] 实现 SSR、canonical 和基础 JSON-LD。
- [ ] yishe-admin 增加帖子和回复隐藏/恢复能力。

MVP 完成标准：登录用户能围绕商品发帖、回复；匿名用户能浏览；管理员能处理违规内容。

### Phase 2：互动能力

- [ ] 帖子和回复点赞。
- [ ] 帖子收藏。
- [ ] 关注用户和板块。
- [ ] 用户社区主页。
- [ ] 最新、热门、关注信息流。
- [ ] 商品卡片展示讨论数量。

### Phase 3：通知和实时更新

- [ ] 建立持久化站内通知表。
- [ ] 接入现有 Redis Streams/Queue。
- [ ] 新增 `/community` WebSocket namespace。
- [ ] 帖子详情实时追加回复。
- [ ] 导航显示未读通知数量。
- [ ] 实现通知聚合与已读状态。

### Phase 4：审核、搜索和 SEO 完善

- [ ] 举报流程。
- [ ] 禁言、封禁、锁帖、置顶、加精。
- [ ] 限流和反垃圾策略。
- [ ] MySQL 全文搜索。
- [ ] 社区 sitemap 分片。
- [ ] 删除内容的 404/410 和 sitemap 清理。
- [ ] AI 审核作为可关闭的异步辅助能力。

### Phase 5：数据规模增长后再评估

- [ ] 根据慢查询决定是否增加只读副本。
- [ ] 根据搜索质量决定是否引入专用搜索服务。
- [ ] 根据 WebSocket 连接量决定是否增加 Socket.IO Redis adapter。
- [ ] 根据队列压力拆分独立 worker。
- [ ] 根据业务边界决定是否拆社区服务，不能为了“架构先进”提前拆分。

## 14. 不建议首期实现

- 不做私信和群聊。
- 不做无限层级评论。
- 不做复杂积分商城。
- 不做直播或语音房。
- 不做向量搜索和 AI 推荐流。
- 不做微服务拆分。
- 不做多个独立帖子系统和商品评论系统；商品讨论统一使用社区帖子模型。

## 15. 关键验收清单

- [ ] 所有社区查询严格按 `owner_user_id` 隔离。
- [ ] 匿名读取和登录写入权限正确。
- [ ] 重复点赞、收藏不会产生重复数据。
- [ ] 帖子锁定、删除、隐藏后权限和 SEO 状态正确。
- [ ] 商品下架后，历史讨论保留但不继续暴露不可访问商品链接。
- [ ] 回复数、点赞数和通知数可通过对账任务修复。
- [ ] 深分页不会使用高 offset。
- [ ] 社区页面移动端可完成浏览、发帖、回复和举报。
- [ ] 管理后台可搜索、隐藏、恢复、锁帖和处理举报。
- [ ] 社区故障不会影响商品展示、商品生成和发布任务。

## 16. 官方参考

- Nuxt Rendering: https://nuxt.com/docs/3.x/guide/concepts/rendering
- NestJS WebSocket Gateways: https://docs.nestjs.com/websockets/gateways
- NestJS Rate Limiting: https://docs.nestjs.com/security/rate-limiting
- Socket.IO Rooms: https://socket.io/docs/v4/rooms/
- Redis Pub/Sub: https://redis.io/docs/latest/develop/interact/pubsub/
- Redis Streams: https://redis.io/docs/latest/develop/data-types/streams/
- MySQL Full-Text Search: https://dev.mysql.com/doc/refman/8.4/en/fulltext-search.html
- Schema.org DiscussionForumPosting: https://schema.org/DiscussionForumPosting

