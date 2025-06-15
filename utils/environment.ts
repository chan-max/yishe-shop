/*
 * @Author: chan-max jackieontheway666@gmail.com
 * @Date: 2025-06-15 12:14:50
 * @LastEditors: chan-max jackieontheway666@gmail.com
 * @LastEditTime: 2025-06-15 12:30:03
 * @FilePath: /yishe-nuxt/utils/environment.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import * as UAParser from 'ua-parser-js'

interface EnvironmentInfo {
  browser: {
    name: string
    version: string
  }
  os: {
    name: string
    version: string
  }
  device: {
    type: string
    model: string
    vendor: string
  }
  screen: {
    width: number
    height: number
  }
  language: string
  timezone: string
}

export const getEnvironmentInfo = (): EnvironmentInfo => {
  const parser = new UAParser.UAParser()
  const result = parser.getResult()
  
  // 默认值
  const defaultInfo: EnvironmentInfo = {
    browser: {
      name: 'unknown',
      version: 'unknown'
    },
    os: {
      name: 'unknown',
      version: 'unknown'
    },
    device: {
      type: 'desktop',
      model: 'unknown',
      vendor: 'unknown'
    },
    screen: {
      width: 0,
      height: 0
    },
    language: 'unknown',
    timezone: 'UTC'
  }

  // 检查是否在客户端环境
  if (process.client) {
    return {
      browser: {
        name: result.browser.name || 'unknown',
        version: result.browser.version || 'unknown'
      },
      os: {
        name: result.os.name || 'unknown',
        version: result.os.version || 'unknown'
      },
      device: {
        type: result.device.type || 'desktop',
        model: result.device.model || 'unknown',
        vendor: result.device.vendor || 'unknown'
      },
      screen: {
        width: window.screen.width,
        height: window.screen.height
      },
      language: navigator.language,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
    }
  }

  // 服务器端返回默认值
  return defaultInfo
} 