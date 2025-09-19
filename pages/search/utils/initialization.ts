/**
 * @Author: chan-max jackieontheway666@gmail.com
 * @Date: 2025-01-27 11:00:00
 * @LastEditors: chan-max jackieontheway666@gmail.com
 * @LastEditTime: 2025-09-18 21:32:42
 * @FilePath: /yishe-nuxt/pages/search/utils/initialization.ts
 * @Description: 初始化工具函数，防止"Cannot access before initialization"错误
 */

import { ref, computed, type Ref, type ComputedRef } from 'vue'

/**
 * 安全地执行函数，防止初始化错误
 * @param fn 要执行的函数
 * @param fallback 失败时的回退值
 * @param errorMessage 错误信息
 * @returns 函数执行结果或回退值
 */
export function safeExecute<T>(
  fn: () => T,
  fallback: T,
  errorMessage: string = '执行失败'
): T {
  try {
    return fn()
  } catch (error) {
    console.error(`${errorMessage}:`, error)
    return fallback
  }
}

/**
 * 安全地初始化响应式状态
 * @param initialValue 初始值
 * @param errorMessage 错误信息
 * @returns 响应式引用
 */
export function safeRef<T>(initialValue: T, errorMessage: string = '初始化ref失败'): Ref<T> {
  return safeExecute(
    () => ref(initialValue),
    { value: initialValue } as Ref<T>,
    errorMessage
  )
}

/**
 * 安全地初始化计算属性
 * @param getter 计算函数
 * @param fallback 回退值
 * @param errorMessage 错误信息
 * @returns 计算属性
 */
export function safeComputed<T>(
  getter: () => T,
  fallback: T,
  errorMessage: string = '初始化computed失败'
): ComputedRef<T> {
  return safeExecute(
    () => computed(getter),
    { value: fallback } as ComputedRef<T>,
    errorMessage
  )
}

/**
 * 检查变量是否已正确初始化
 * @param variable 要检查的变量
 * @param variableName 变量名
 * @returns 是否已初始化
 */
export function isInitialized(variable: any, variableName: string = '变量'): boolean {
  try {
    // 检查变量是否存在且不是undefined
    if (variable === undefined || variable === null) {
      console.warn(`${variableName} 未正确初始化`)
      return false
    }
    return true
  } catch (error) {
    console.error(`检查 ${variableName} 初始化状态时出错:`, error)
    return false
  }
}

/**
 * 延迟初始化，确保在正确的时机执行
 * @param fn 初始化函数
 * @param delay 延迟时间（毫秒）
 * @returns Promise
 */
export function delayedInit<T>(fn: () => T, delay: number = 0): Promise<T> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        const result = fn()
        resolve(result)
      } catch (error) {
        console.error('延迟初始化失败:', error)
        reject(error)
      }
    }, delay)
  })
}

/**
 * 重试机制，用于处理初始化失败的情况
 * @param fn 要执行的函数
 * @param maxRetries 最大重试次数
 * @param delay 重试间隔（毫秒）
 * @returns Promise
 */
export async function retryInit<T>(
  fn: () => T,
  maxRetries: number = 3,
  delay: number = 100
): Promise<T> {
  let lastError: Error | null = null
  
  for (let i = 0; i < maxRetries; i++) {
    try {
      return fn()
    } catch (error) {
      lastError = error as Error
      console.warn(`初始化失败，第 ${i + 1} 次重试...`, error)
      
      if (i < maxRetries - 1) {
        await new Promise(resolve => setTimeout(resolve, delay))
      }
    }
  }
  
  throw lastError || new Error('初始化失败')
}
