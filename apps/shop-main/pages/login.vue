<template>
  <div
    class="box-border min-h-[100dvh] overflow-y-hidden bg-white px-4 py-4 sm:px-6 lg:px-8"
  >
    <div class="flex min-h-[calc(100dvh-2rem)] items-center justify-center">
      <div class="w-full max-w-md">
        <NuxtLink
          to="/"
          class="mb-6 inline-block rounded-lg border border-stone-200 px-3 py-2 text-[12px] font-bold text-stone-500 transition-colors hover:border-black hover:text-stone-950"
        >
          返回首页
        </NuxtLink>

        <div
          class="rounded-xl border border-stone-200 bg-white px-6 py-7 sm:px-8"
        >
          <div>
            <div class="text-[10px] font-bold tracking-[0.12em] text-stone-400">
              登录账号
            </div>
            <h2 class="mt-2 text-[24px] font-black leading-none text-stone-950">
              登录
            </h2>
            <p class="mt-1.5 text-[12px] leading-5 text-stone-500">
              登录后管理收藏的 POD 商品、定制需求和创意设计资料。
            </p>
          </div>

          <form class="mt-6 space-y-4" @submit.prevent="handleSubmit">
            <BaseInput
              id="username"
              v-model="form.username"
              label="账号"
              name="username"
              type="text"
              required
              placeholder="请输入账号"
            />
            <BaseInput
              id="password"
              v-model="form.password"
              label="密码"
              name="password"
              type="password"
              required
              placeholder="请输入密码"
            />

            <div
              v-if="errorMessage"
              class="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-[11px] text-red-600"
            >
              {{ errorMessage }}
            </div>

            <BaseButton
              type="submit"
              :loading="loading"
              class="w-full !py-2.5 !text-[11px]"
              size="lg"
            >
              登录
            </BaseButton>

            <div class="text-center text-[11px] text-stone-500">
              还没有账号？
              <NuxtLink
                to="/register"
                class="rounded px-1.5 py-0.5 text-stone-900 underline-offset-4 hover:underline"
                >注册</NuxtLink
              >
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { api } from "~/utils/api";
import { usePublicUserStore } from "~/stores/public-user";
import { useToast } from "~/composables/use-toast";

definePageMeta({
  layout: false,
  pageTransition: false,
  layoutTransition: false,
});

useSeoMeta({
  title: "登录 - 衣设 yishe",
  description: "登录衣设账号，管理收藏的 POD 灵感、定制项目和个人设计资料。",
  robots: "noindex, nofollow",
});

const publicUserStore = usePublicUserStore();
const router = useRouter();
const loading = ref(false);
const errorMessage = ref("");
const toast = useToast();

const form = ref({
  username: "",
  password: "",
});

const handleSubmit = async () => {
  try {
    loading.value = true;
    errorMessage.value = "";

    const response = await api.publicUser.login(form.value);

    if (
      response.code === 0 ||
      response.status === true ||
      response.code === 200
    ) {
      if (!response.data || !response.data.token) {
        errorMessage.value = "这组账号密码没对上，再试一次。";
        toast.error("没进去", "这组账号密码没对上。");
        return;
      }

      publicUserStore.setToken(response.data.token);
      toast.success("进来了", "欢迎回来。", 2000);

      try {
        const userInfoResponse = await api.publicUser.getUserInfo();
        if (userInfoResponse.code === 0 || userInfoResponse.code === 200) {
          if (userInfoResponse.data) {
            publicUserStore.setUserInfo(userInfoResponse.data);
          }
        }
      } catch (error) {
        console.error("获取用户信息失败:", error);
      }

      setTimeout(async () => {
        await router.push("/");
      }, 2000);
    } else {
      const errorMsg = response.message || "这组账号密码没对上，再试一次。";
      errorMessage.value = errorMsg;
      toast.error("登录失败", errorMsg);
    }
  } catch (error: any) {
    const errorMsg =
      error?.message?.includes("token") || error?.message?.includes("null")
        ? "这组账号密码没对上，再试一次。"
        : error?.message || "这组账号密码没对上，再试一次。";
    errorMessage.value = errorMsg;
    toast.error("登录失败", errorMsg);
  } finally {
    loading.value = false;
  }
};
</script>
