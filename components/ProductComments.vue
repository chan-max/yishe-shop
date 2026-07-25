<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import { api } from '~/utils/api';
import { usePublicUserStore } from '~/stores/public-user';

const props = withDefaults(
  defineProps<{
    targetId: string;
    targetType?: string;
    title?: string;
  }>(),
  {
    targetType: 'product',
    title: '评论',
  }
);

const publicUserStore = usePublicUserStore();
const toast = useToast();

const loading = ref(false);
const comments = ref<any[]>([]);
const total = ref(0);

const currentPage = ref(1);
const pageSize = ref(20);

// 社交纯文本发评输入框
const form = reactive({
  content: '',
});

// 回复二级评论弹窗状态
const replyModal = reactive({
  visible: false,
  targetComment: null as any | null,
  content: '',
  submitting: false,
});

// 检查是否为当前登录买家本人
const isCurrentUser = (item: any) => {
  if (!publicUserStore.isLoggedIn || !publicUserStore.userInfo) return false;
  const myAcc = String(publicUserStore.userInfo.account || '');
  const myId = String(publicUserStore.userInfo.id || '');
  const myName = publicUserStore.userInfo.name || '';

  const itemAcc = String(item.publicUserAccount || item.publicUserId || '');
  const itemUser = String(item.publicUserId || '');
  const itemName = String(item.publicUserName || '');

  return (
    (myAcc && (itemAcc === myAcc || itemUser === myAcc)) ||
    (myId && itemUser === myId) ||
    (myName && itemName === myName) ||
    item.id?.startsWith('temp-')
  );
};

const fetchComments = async () => {
  if (!props.targetId) return;
  loading.value = true;
  try {
    const res = await api.productComment.getList({
      targetId: props.targetId,
      targetType: props.targetType,
      currentPage: currentPage.value,
      pageSize: pageSize.value,
    });

    if (res.data) {
      comments.value = (res.data.list || []).map((item) => ({
        ...item,
        isExpanded: false, // 默认收起超出回复
      }));
      total.value = res.data.total || 0;
    }
  } catch (err) {
    console.error('获取评论失败:', err);
  } finally {
    loading.value = false;
  }
};

const submitComment = async () => {
  if (!publicUserStore.isLoggedIn) {
    toast.warning('提示', '请先登录后再发表评论');
    return;
  }

  if (!form.content.trim()) {
    toast.warning('提示', '请输入评论内容');
    return;
  }

  const contentText = form.content.trim();

  // 0ms 社交风乐观 UI 插入（无缝闪现，不卡顿）
  const optimisticComment = {
    id: `temp-${Date.now()}`,
    targetId: props.targetId,
    targetType: props.targetType,
    content: contentText,
    publicUserAccount: publicUserStore.userInfo?.account,
    publicUserId: publicUserStore.userInfo?.id,
    publicUserName: publicUserStore.userInfo?.name || publicUserStore.userInfo?.account || '我',
    publicUserAvatar: publicUserStore.userInfo?.avatar || null,
    createTime: new Date().toISOString(),
    likeCount: 0,
    isLiked: false,
    isExpanded: true,
    replies: [],
  };

  comments.value.unshift(optimisticComment);
  total.value += 1;
  toast.success('发送成功', '评论已发表');

  form.content = '';

  try {
    await api.productComment.create({
      targetId: props.targetId,
      targetType: props.targetType,
      content: contentText,
      publicUserId: publicUserStore.userInfo?.account || String(publicUserStore.userInfo?.id || ''),
      publicUserName: publicUserStore.userInfo?.name || publicUserStore.userInfo?.account || '',
    });
  } catch (err) {
    fetchComments();
  }
};

const openReplyModal = (comment: any) => {
  if (!publicUserStore.isLoggedIn) {
    toast.warning('提示', '请先登录后再回复评论');
    return;
  }
  replyModal.targetComment = comment;
  replyModal.content = '';
  replyModal.visible = true;
};

const submitReply = async () => {
  if (!replyModal.content.trim() || !replyModal.targetComment) return;

  const replyText = replyModal.content.trim();
  const targetObj = replyModal.targetComment;
  const rootId = targetObj.rootId || targetObj.id;

  // 0ms 盖楼回复乐观渲染
  const optimisticReply = {
    id: `temp-sub-${Date.now()}`,
    rootId,
    parentId: targetObj.id,
    publicUserAccount: publicUserStore.userInfo?.account,
    publicUserId: publicUserStore.userInfo?.id,
    publicUserName: publicUserStore.userInfo?.name || publicUserStore.userInfo?.account || '我',
    replyToUserName: targetObj.publicUserName,
    content: replyText,
    createTime: new Date().toISOString(),
  };

  const rootComment = comments.value.find((c) => c.id === rootId);
  if (rootComment) {
    if (!rootComment.replies) rootComment.replies = [];
    rootComment.replies.push(optimisticReply);
    rootComment.isExpanded = true; // 自动展开该回复链
  }

  replyModal.visible = false;
  replyModal.content = '';

  try {
    await api.productComment.create({
      targetId: props.targetId,
      targetType: props.targetType,
      rootId,
      parentId: targetObj.id,
      replyToUserId: targetObj.publicUserId,
      replyToUserName: targetObj.publicUserName,
      content: replyText,
      publicUserId: publicUserStore.userInfo?.account || String(publicUserStore.userInfo?.id || ''),
      publicUserName: publicUserStore.userInfo?.name || publicUserStore.userInfo?.account || '',
    });
  } catch (err) {
    fetchComments();
  }
};

const formatTimeAgo = (dateStr?: string) => {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  const now = new Date();
  const diffSec = Math.floor((now.getTime() - d.getTime()) / 1000);

  if (diffSec < 60) return '刚刚';
  if (diffSec < 3600) return `${Math.floor(diffSec / 60)}分钟前`;
  if (diffSec < 86400) return `${Math.floor(diffSec / 3600)}小时前`;
  if (diffSec < 2592000) return `${Math.floor(diffSec / 86400)}天前`;
  return `${d.getMonth() + 1}-${d.getDate()}`;
};

onMounted(() => {
  fetchComments();
});
</script>

<template>
  <section class="dy-comment-section">
    <!-- 顶部评论计数标题 -->
    <div class="dy-comment-header">
      <h3 class="dy-title">
        {{ title }} <span class="dy-count">({{ total }})</span>
      </h3>
    </div>

    <!-- 抖音风行内输入框 (带防遮挡亮红光标 & “我”标识) -->
    <div class="dy-input-box">
      <div class="dy-avatar dy-avatar--sm">
        <img
          v-if="publicUserStore.userInfo?.avatar"
          :src="publicUserStore.userInfo.avatar"
          :alt="publicUserStore.userInfo.name"
        />
        <span v-else>{{ (publicUserStore.userInfo?.name || '我')[0] }}</span>
      </div>

      <div class="dy-input-wrapper">
        <input
          v-model="form.content"
          type="text"
          placeholder="爱发评论的人，运气都不差..."
          class="dy-input"
          @keyup.enter="submitComment"
        />

        <button
          type="button"
          class="dy-send-btn"
          :disabled="!form.content.trim()"
          @click="submitComment"
        >
          发送
        </button>
      </div>
    </div>

    <!-- 评论列表 -->
    <div v-if="loading" class="dy-loading">
      <div class="dy-skeleton-item" v-for="n in 3" :key="n"></div>
    </div>

    <div v-else-if="comments.length === 0" class="dy-empty">
      <p>还没有人评论，快发表第一条精彩想法吧~</p>
    </div>

    <div v-else class="dy-comment-list">
      <article v-for="item in comments" :key="item.id" class="dy-comment-item">
        <!-- 买家头像 -->
        <div class="dy-avatar">
          <img v-if="item.publicUserAvatar" :src="item.publicUserAvatar" :alt="item.publicUserName" />
          <span v-else>{{ (item.publicUserName || '买')[0] }}</span>
        </div>

        <!-- 评论主体 -->
        <div class="dy-comment-body">
          <div class="dy-comment-author">
            <span class="dy-username">
              {{ item.publicUserName || '匿名买家' }}
              <span v-if="isCurrentUser(item)" class="dy-me-tag">我</span>
            </span>
          </div>

          <p class="dy-content">{{ item.content }}</p>

          <!-- 商家官方回复 -->
          <div v-if="item.replyContent" class="dy-official-reply">
            <span class="dy-official-badge">作者回复</span>
            <p>{{ item.replyContent }}</p>
          </div>

          <!-- 底部社交元数据与交互按键 -->
          <div class="dy-comment-foot">
            <span class="dy-time">{{ formatTimeAgo(item.createTime) }}</span>
            <button type="button" class="dy-reply-link" @click="openReplyModal(item)">
              回复
            </button>
          </div>

          <!-- 2 级盖楼子回复列表 (小红书/抖音折叠与展开交互) -->
          <div v-if="item.replies && item.replies.length" class="dy-sub-thread">
            <!-- 默认只展示前 2 条，展开后展示全部 -->
            <div
              v-for="sub in (item.isExpanded ? item.replies : item.replies.slice(0, 1))"
              :key="sub.id"
              class="dy-sub-item"
            >
              <div class="dy-sub-avatar">
                <span>{{ (sub.publicUserName || '友')[0] }}</span>
              </div>
              <div class="dy-sub-content">
                <div class="dy-sub-author">
                  <span>{{ sub.publicUserName || '匿名用户' }}</span>
                  <span v-if="isCurrentUser(sub)" class="dy-me-tag dy-me-tag--sm">我</span>
                  <span v-if="sub.replyToUserName" class="dy-sub-reply-to">
                    ▶ {{ sub.replyToUserName }}
                  </span>
                </div>
                <p class="dy-sub-text">{{ sub.content }}</p>
                <div class="dy-sub-foot">
                  <span>{{ formatTimeAgo(sub.createTime) }}</span>
                  <button type="button" class="dy-reply-link" @click="openReplyModal(sub)">
                    回复
                  </button>
                </div>
              </div>
            </div>

            <!-- 抖音/小红书风 “展开 X 条回复” 按钮 -->
            <div v-if="item.replies.length > 1" class="dy-expand-wrapper">
              <button
                type="button"
                class="dy-expand-btn"
                @click="item.isExpanded = !item.isExpanded"
              >
                <span class="dy-expand-line"></span>
                <span>
                  {{ item.isExpanded ? '收起回复' : `展开 ${item.replies.length} 条回复` }}
                </span>
                <span class="dy-expand-arrow">{{ item.isExpanded ? '▲' : '▼' }}</span>
              </button>
            </div>
          </div>
        </div>
      </article>
    </div>

    <!-- 社交风回复弹窗 -->
    <div v-if="replyModal.visible" class="dy-modal-mask" @click="replyModal.visible = false">
      <div class="dy-modal-card" @click.stop>
        <div class="dy-modal-header">
          <span>回复 @{{ replyModal.targetComment?.publicUserName }}</span>
          <button type="button" class="dy-close-btn" @click="replyModal.visible = false">✕</button>
        </div>
        <textarea
          v-model="replyModal.content"
          rows="3"
          placeholder="爱发评论的人，运气都不差..."
          class="dy-modal-textarea"
          @keyup.enter.ctrl="submitReply"
        ></textarea>
        <div class="dy-modal-footer">
          <button
            type="button"
            class="dy-submit-btn"
            :disabled="!replyModal.content.trim()"
            @click="submitReply"
          >
            发送
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.dy-comment-section {
  margin-top: 2.5rem;
  padding-top: 2rem;
  border-top: 1px solid #f3f4f6;
  font-family: -apple-system, BlinkMacSystemFont, "PingFang SC", "Helvetica Neue", STHeiti, sans-serif;
}

.dy-comment-header {
  margin-bottom: 1.25rem;
}

.dy-title {
  font-size: 1.15rem;
  font-weight: 700;
  color: #111;
  margin: 0;

  .dy-count {
    font-size: 0.9rem;
    font-weight: 400;
    color: #6b7280;
    margin-left: 0.25rem;
  }
}

/* 防遮挡高颜值输入框 */
.dy-input-box {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  margin-bottom: 2rem;
  background: #fafafa;
  padding: 0.65rem 1rem;
  border-radius: 999px;
  border: 1.5px solid #e5e7eb;
  transition: all 0.2s ease;

  &:focus-within {
    border-color: #ff2442;
    background: #fff;
    box-shadow: 0 0 0 3px rgba(255, 36, 66, 0.08);
  }
}

.dy-input-wrapper {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.dy-input {
  flex: 1;
  border: none;
  background: transparent;
  font-size: 0.9rem;
  line-height: 1.5;
  outline: none;
  color: #111;
  caret-color: #ff2442;
  padding: 0.25rem 0.5rem;
  margin: 0;
  box-sizing: border-box;

  &::placeholder {
    color: #9ca3af;
  }
}

.dy-send-btn {
  border: none;
  background: #ff2442;
  color: #fff;
  font-size: 0.82rem;
  font-weight: 600;
  padding: 0.45rem 1.1rem;
  border-radius: 999px;
  cursor: pointer;
  transition: all 0.15s ease;
  flex-shrink: 0;

  &:hover:not(:disabled) {
    background: #e01e37;
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
}

.dy-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #f3f4f6;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 0.85rem;
  color: #6b7280;
  overflow: hidden;
  flex-shrink: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &.dy-avatar--sm {
    width: 30px;
    height: 30px;
    font-size: 0.75rem;
  }
}

.dy-loading,
.dy-empty {
  padding: 2.5rem 0;
  text-align: center;
  color: #9ca3af;
  font-size: 0.85rem;
}

.dy-skeleton-item {
  height: 48px;
  background: #f3f4f6;
  border-radius: 8px;
  margin-bottom: 1rem;
  animation: pulse 1.5s infinite ease-in-out;
}

@keyframes pulse {
  0%, 100% { opacity: 0.6; }
  50% { opacity: 1; }
}

.dy-comment-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.dy-comment-item {
  display: flex;
  gap: 0.85rem;
}

.dy-comment-body {
  flex: 1;
}

.dy-comment-author {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.dy-username {
  font-size: 0.85rem;
  font-weight: 600;
  color: #6b7280;
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
}

/* “我” 个人专属高亮 Tag */
.dy-me-tag {
  font-size: 0.68rem;
  font-weight: 700;
  color: #ff2442;
  background: #fff0f2;
  border: 1px solid #ffd8de;
  padding: 0.05rem 0.35rem;
  border-radius: 4px;

  &.dy-me-tag--sm {
    font-size: 0.62rem;
    padding: 0 0.25rem;
  }
}

.dy-content {
  font-size: 0.9rem;
  line-height: 1.55;
  color: #111;
  margin: 0.35rem 0 0.5rem;
}

.dy-official-reply {
  background: #f9fafb;
  border-radius: 6px;
  padding: 0.5rem 0.75rem;
  margin-bottom: 0.5rem;

  .dy-official-badge {
    font-size: 0.7rem;
    font-weight: 700;
    color: #ff2442;
    background: #fff0f2;
    padding: 0.1rem 0.4rem;
    border-radius: 4px;
  }

  p {
    margin: 0.25rem 0 0;
    font-size: 0.82rem;
    color: #374151;
  }
}

.dy-comment-foot {
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 0.78rem;
  color: #9ca3af;
}

.dy-reply-link {
  background: none;
  border: none;
  color: #6b7280;
  font-size: 0.78rem;
  font-weight: 600;
  cursor: pointer;
  padding: 0;

  &:hover {
    color: #111;
  }
}

/* 红心点赞 */
.dy-like-btn {
  margin-left: auto;
  background: none;
  border: none;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  color: #9ca3af;
  font-size: 0.78rem;
  cursor: pointer;
  transition: transform 0.15s ease;

  .dy-heart-icon {
    width: 16px;
    height: 16px;
  }

  &.is-liked {
    color: #ff2442;
    font-weight: 600;
    transform: scale(1.1);
  }
}

/* 2 级盖楼子回复 (抖音/小红书折叠与展开) */
.dy-sub-thread {
  margin-top: 0.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.dy-sub-item {
  display: flex;
  gap: 0.5rem;
}

.dy-sub-avatar {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: #e5e7eb;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.65rem;
  color: #4b5563;
  flex-shrink: 0;
}

.dy-sub-content {
  flex: 1;
}

.dy-sub-author {
  font-size: 0.78rem;
  color: #6b7280;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.35rem;

  .dy-sub-reply-to {
    font-weight: 400;
    color: #9ca3af;
  }
}

.dy-sub-text {
  font-size: 0.84rem;
  color: #111;
  margin: 0.15rem 0 0.35rem;
}

.dy-sub-foot {
  display: flex;
  gap: 0.75rem;
  font-size: 0.72rem;
  color: #9ca3af;
}

/* “展开 X 条回复” 折叠与展开按钮 */
.dy-expand-wrapper {
  margin-top: 0.25rem;
}

.dy-expand-btn {
  background: none;
  border: none;
  font-size: 0.76rem;
  font-weight: 600;
  color: #6b7280;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0;

  &:hover {
    color: #111;
  }
}

.dy-expand-line {
  display: inline-block;
  width: 16px;
  height: 1px;
  background: #d1d5db;
}

.dy-expand-arrow {
  font-size: 0.65rem;
}

.dy-modal-mask {
  position: fixed;
  inset: 0;
  z-index: 999;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.dy-modal-card {
  background: #fff;
  border-radius: 16px;
  width: min(90vw, 440px);
  padding: 1.25rem;

  .dy-modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.95rem;
    font-weight: 700;
    margin-bottom: 0.75rem;
  }

  .dy-close-btn {
    background: none;
    border: none;
    font-size: 1.1rem;
    color: #9ca3af;
    cursor: pointer;
  }
}

.dy-modal-textarea {
  width: 100%;
  border: 1.5px solid #e5e7eb;
  border-radius: 12px;
  padding: 0.75rem 0.85rem;
  font-size: 0.88rem;
  line-height: 1.5;
  outline: none;
  caret-color: #ff2442;
  box-sizing: border-box;
  resize: vertical;

  &:focus {
    border-color: #ff2442;
    box-shadow: 0 0 0 3px rgba(255, 36, 66, 0.08);
  }
}

.dy-modal-footer {
  display: flex;
  justify-content: flex-end;
  margin-top: 0.75rem;
}

.dy-submit-btn {
  background: #ff2442;
  color: #fff;
  border: none;
  border-radius: 999px;
  padding: 0.4rem 1.2rem;
  font-size: 0.82rem;
  font-weight: 600;
  cursor: pointer;

  &:disabled {
    opacity: 0.4;
  }
}
</style>
