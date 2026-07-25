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
              创建账号
            </div>
            <h2 class="mt-2 text-[24px] font-black leading-none text-stone-950">
              注册
            </h2>
            <p class="mt-1.5 text-[12px] leading-5 text-stone-500">
              创建账号后收藏 POD 灵感、定制商品方向和创意设计资源。
            </p>
          </div>

          <form class="mt-6 space-y-4" @submit.prevent="handleSubmit">
            <BaseInput
              id="account"
              v-model="form.account"
              label="账号"
              name="account"
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
            <BaseInput
              id="name"
              v-model="form.name"
              label="昵称"
              name="name"
              type="text"
              placeholder="请输入昵称"
            />
            <BaseInput
              id="email"
              v-model="form.email"
              label="邮箱"
              name="email"
              type="email"
              placeholder="请输入邮箱"
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
              {{ loading ? "注册中..." : "注册" }}
            </BaseButton>

            <div class="text-center text-[11px] text-stone-500">
              已经有账号？
              <NuxtLink
                to="/login"
                class="rounded px-1.5 py-0.5 text-stone-900 underline-offset-4 hover:underline"
                >登录</NuxtLink
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
  title: "注册 - 衣设 yishe",
  description: "创建衣设账号，收藏 POD 印花灵感、定制商品方向和创意设计资源。",
  robots: "noindex, nofollow",
});

const publicUserStore = usePublicUserStore();
const router = useRouter();
const loading = ref(false);
const errorMessage = ref("");
const toast = useToast();

const form = ref({
  account: "",
  password: "",
  name: "",
  email: "",
});

const handleSubmit = async () => {
  try {
    loading.value = true;
    errorMessage.value = "";

    const response = await api.publicUser.register({
      account: form.value.account,
      password: form.value.password,
      name: form.value.name || undefined,
      email: form.value.email || undefined,
    });

    if (response.code === 0) {
      toast.success("注册好了", "进去继续看看。", 2000);
      setTimeout(async () => {
        await router.push("/login");
      }, 2000);
    } else {
      let errorMsg = response.message || "这次没注册成功，再试一次。";
      if (
        response.code === 400 &&
        (errorMsg.includes("已存在") ||
          errorMsg.includes("已注册") ||
          errorMsg.includes("duplicate") ||
          errorMsg.includes("exists"))
      ) {
        errorMsg = "这个名字已经有人用了，换一个，或者直接登录看看。";
      }
      errorMessage.value = errorMsg;
      toast.error("注册失败", errorMsg);
    }
  } catch (error: any) {
    let errorMsg = error.message || "这次没注册成功，再试一次。";
    if (
      error?.response?.data?.code === 400 ||
      error?.response?.data?.message?.includes("已存在") ||
      error?.response?.data?.message?.includes("已注册") ||
      error?.message?.includes("已存在") ||
      error?.message?.includes("已注册") ||
      error?.message?.includes("duplicate") ||
      error?.message?.includes("exists") ||
      error?.statusCode === 400
    ) {
      errorMsg = "这个名字已经有人用了，换一个，或者直接登录看看。";
    }
    errorMessage.value = errorMsg;
    toast.error("注册失败", errorMsg);
  } finally {
    loading.value = false;
  }
};
</script>
