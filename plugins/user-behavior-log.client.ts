import { defineNuxtPlugin } from '#app';
import { useUserBehaviorLog } from '~/composables/use-user-behavior-log';

export default defineNuxtPlugin((nuxtApp) => {
  const { reportBehaviorLog } = useUserBehaviorLog();
  const router = useRouter();

  // 当客户端路由导航完成时，自动无感知记录页面浏览 (page_view)
  router.afterEach((to, from) => {
    setTimeout(() => {
      reportBehaviorLog({
        action: 'page_view',
        targetId: to.path,
        targetName: String(to.meta?.title || document.title || to.path),
        referrer: from?.fullPath && from.fullPath !== '/' ? from.fullPath : undefined,
        metadata: {
          path: to.path,
          query: to.query,
          params: to.params,
        },
      });
    }, 300);
  });
});
