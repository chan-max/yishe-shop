import { api } from '~/utils/api';

export interface BehaviorLogPayload {
  action: string;
  targetId?: string;
  targetName?: string;
  referrer?: string;
  metadata?: Record<string, any>;
}

export const useUserBehaviorLog = () => {
  const reportBehaviorLog = async (payload: BehaviorLogPayload) => {
    // 只有在客户端环境下执行上报，避免服务端 SSR 重复触发
    if (!process.client) return;

    try {
      // 尝试获取本地缓存的开放用户信息
      let publicUserId = '';
      let publicUserName = '';
      
      try {
        const cachedUser = localStorage.getItem('public_user_info');
        if (cachedUser) {
          const parsed = JSON.parse(cachedUser);
          publicUserId = parsed?.account || parsed?.id || '';
          publicUserName = parsed?.name || parsed?.account || '';
        }
      } catch {
        // 忽略存储解析异常
      }

      const referrer = payload.referrer || (document.referrer ? document.referrer : undefined);

      await api.userBehaviorLog.collect({
        publicUserId: publicUserId || undefined,
        publicUserName: publicUserName || undefined,
        action: payload.action,
        targetId: payload.targetId,
        targetName: payload.targetName,
        referrer,
        metadata: payload.metadata,
      });
    } catch (err) {
      // 行为追踪静默失败，绝对不阻塞主UI业务流程
      console.debug('[BehaviorLog] 上报静默提示:', err);
    }
  };

  return {
    reportBehaviorLog,
  };
};
