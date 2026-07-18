/*
 * @Author: chan-max jackieontheway666@gmail.com
 * @Date: 2025-05-16 07:16:24
 * @LastEditors: chan-max jackieontheway666@gmail.com
 * @LastEditTime: 2025-06-05 06:45:17
 * @FilePath: /design-server/Users/jackie/workspace/yishe-nuxt/utils/request.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { ofetch } from "ofetch";
import { resolveOpenApiKey } from "./open-api-key";
import { SITE_API_BASE } from "./seo";

type AuthMode = "token" | "openApiKey" | "none";

interface RequestOptions {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  params?: Record<string, any>;
  body?: any;
  headers?: Record<string, string>;
  authMode?: AuthMode;
}

interface Response<T = any> {
  code: number;
  data: T;
  message: string;
  status?: boolean;
}

export const request = async <T = any>(
  url: string,
  options: RequestOptions = {},
): Promise<Response<T>> => {
  const { method = "GET", params, body, headers = {}, authMode = "token" } = options;
  const runtimeConfig = (() => {
    try {
      return useRuntimeConfig();
    } catch {
      return undefined;
    }
  })();

  const resolveBaseUrl = () => {
    if (process.client) {
      const nuxtPayload = (window as typeof window & { __NUXT__?: any })
        .__NUXT__;
      return (
        runtimeConfig?.public?.apiBase ||
        nuxtPayload?.config?.public?.apiBase ||
        import.meta.env.NUXT_PUBLIC_API_BASE ||
        "http://localhost:1520/api"
      );
    }

    return (
      runtimeConfig?.public?.apiBase ||
      process.env.NUXT_PUBLIC_API_BASE ||
      (process.env.NODE_ENV === "production"
        ? SITE_API_BASE
        : "http://localhost:1520/api")
    );
  };

  const BASE_URL = resolveBaseUrl();
  const openApiKey = resolveOpenApiKey(runtimeConfig);

  // 仅在客户端读取本地存储，避免 SSR 时访问导致报错
  // 优先使用 public-user-token（开放用户），如果没有则使用普通 token（管理员）
  let publicUserToken: string | null = null;
  let token: string | null = null;

  if (process.client) {
    publicUserToken = window.localStorage.getItem("public-user-token");
    token = window.localStorage.getItem("token");
  }

  const finalToken = publicUserToken || token;

  const requestHeaders: Record<string, string> = {
    "Content-Type": "application/json",
    ...headers,
  };

  // 独立站所有请求都尽量携带 openApiKey，用于绑定所属主账号上下文。
  if (openApiKey) {
    requestHeaders["x-open-api-key"] = openApiKey;
  }

  if (authMode === "token" && finalToken) {
    requestHeaders.Authorization = `Bearer ${finalToken}`;
  }

  if (authMode === "openApiKey") {
    if (!openApiKey) {
      return Promise.reject({
        code: 401,
        message: "Open API Key 未配置，请先设置 NUXT_PUBLIC_OPEN_API_KEY 或本地 open-api-key",
        data: null,
        statusCode: 401,
      });
    }
    requestHeaders["x-open-api-key"] = openApiKey;
  }

  try {
    const response = await ofetch<Response<T>>(`${BASE_URL}${url}`, {
      method,
      params,
      body,
      headers: requestHeaders,
    });

    // 检查响应状态码，即使请求成功但返回了错误码，也应该视为失败
    // 注意：code === 0 或 code === 200 或 status === true 表示成功
    if (
      response.code !== 0 &&
      response.code !== 200 &&
      response.status !== true
    ) {
      // 统一错误处理：显示错误消息
      const errorMessage = response.message || "请求失败";

      // 在客户端记录错误（不在这里显示 alert，让调用方决定如何处理）
      if (process.client) {
        console.error("API Error:", {
          url,
          code: response.code,
          message: errorMessage,
          data: response.data,
        });
      }

      // 返回错误响应，让调用方可以处理
      return Promise.reject({
        code: response.code,
        message: errorMessage,
        data: response.data,
        statusCode: response.code, // 兼容 statusCode
      });
    }

    return response;
  } catch (error: any) {
    // 统一错误处理
    let errorMessage = error.message || "请求失败";

    // 对于登录相关的错误，提供更友好的提示
    if (url.includes("login") || url.includes("auth")) {
      if (error.statusCode === 401 || error.statusCode === 400) {
        errorMessage = "用户名或密码不正确";
      } else if (
        error.message?.includes("token") ||
        error.message?.includes("null")
      ) {
        errorMessage = "用户名或密码不正确";
      }
    }

    // 对于注册相关的错误，优化账号重复的提示
    if (url.includes("register")) {
      const responseMessage = error.data?.message || error.message || "";
      if (
        error.statusCode === 400 ||
        responseMessage.includes("已存在") ||
        responseMessage.includes("已注册") ||
        responseMessage.includes("duplicate") ||
        responseMessage.includes("exists")
      ) {
        errorMessage = "该账号已被注册，请使用其他账号或直接登录";
      }
    }

    const errorResponse: Response = {
      code: error.statusCode || 500,
      data: null as any,
      message: errorMessage,
    };
    return errorResponse;
  }
};

// 导出便捷方法
export const get = <T = any>(
  url: string,
  params?: Record<string, any>,
  headers?: Record<string, string>,
) => {
  return request<T>(url, { method: "GET", params, headers });
};

export const post = <T = any>(
  url: string,
  body?: any,
  headers?: Record<string, string>,
) => {
  return request<T>(url, { method: "POST", body, headers });
};

export const put = <T = any>(
  url: string,
  body?: any,
  headers?: Record<string, string>,
) => {
  return request<T>(url, { method: "PUT", body, headers });
};

export const del = <T = any>(
  url: string,
  params?: Record<string, any>,
  headers?: Record<string, string>,
) => {
  return request<T>(url, { method: "DELETE", params, headers });
};
