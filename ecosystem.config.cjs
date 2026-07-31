/**
 * PM2 Ecosystem Configuration for Yishe Shop Applications
 * 
 * 默认配置只激活主站 (yishe-shop / 1s.design)，以极大地节省服务器内存和 CPU 资源。
 * 
 * 使用方式：
 * 1. 仅启动主站（默认推荐）:
 *    pm2 start ecosystem.config.cjs
 * 
 * 2. 启动特定子站点（例如需要开发测试名片或马克杯应用时）:
 *    pm2 start ecosystem.config.cjs --only yishe-shop-business-card
 *    pm2 start ecosystem.config.cjs --only yishe-shop-mug
 * 
 * 3. 通过环境变量批量开启指定子站点（逗号分隔）：
 *    ENABLE_SUB_SITES=card,mug,kitchen pm2 start ecosystem.config.cjs
 * 
 * 4. 开启全部站点（注意占用约 500M+ 内存）：
 *    ENABLE_SUB_SITES=all pm2 start ecosystem.config.cjs
 */

const SUB_APP_DEFINITIONS = [
  { key: 'card', name: 'yishe-shop-business-card', path: '/www/wwwroot/shop-business-card.1s.design', port: 15202 },
  { key: 'couplet', name: 'yishe-shop-couplet', path: '/www/wwwroot/shop-couplet.1s.design', port: 15204 },
  { key: 'mug', name: 'yishe-shop-mug', path: '/www/wwwroot/mug.1s.design', port: 15206 },
  { key: 'kitchen', name: 'yishe-shop-kitchen', path: '/www/wwwroot/kitchen.1s.design', port: 15208 },
  { key: 'painting', name: 'yishe-shop-painting', path: '/www/wwwroot/painting.1s.design', port: 15210 },
  { key: 'wallart', name: 'yishe-shop-wallart', path: '/www/wwwroot/wallart.1s.design', port: 15212 },
  { key: 'keychain', name: 'yishe-shop-keychain', path: '/www/wwwroot/keychain.1s.design', port: 15214 },
  { key: 'mousepad', name: 'yishe-shop-mousepad', path: '/www/wwwroot/mousepad.1s.design', port: 15216 }
];

const enabledEnv = (process.env.ENABLE_SUB_SITES || '').toLowerCase().split(',').map(s => s.trim()).filter(Boolean);

const apps = [
  // 1. 主站应用 (永远保留)
  {
    name: 'yishe-shop',
    script: './.output/server/index.mjs',
    cwd: '/www/wwwroot/1s.design',
    instances: 1,
    exec_mode: 'fork',
    max_memory_restart: '300M',
    env: {
      PORT: 15201,
      NODE_ENV: 'production'
    }
  }
];

// 2. 根据配置挂载允许启用的子站点
SUB_APP_DEFINITIONS.forEach(sub => {
  const isEnabled = enabledEnv.includes('all') || enabledEnv.some(e => sub.key.includes(e) || sub.name.includes(e));
  
  if (isEnabled) {
    apps.push({
      name: sub.name,
      script: './.output/server/index.mjs',
      cwd: sub.path,
      instances: 1,
      exec_mode: 'fork',
      max_memory_restart: '250M',
      env: {
        PORT: sub.port,
        NODE_ENV: 'production'
      }
    });
  }
});

module.exports = {
  apps
};
