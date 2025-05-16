const runtimeConfig = useRuntimeConfig()

// 根据自己项目需求，自行改动
export default defineSitemapEventHandler(async () => {
  // 由于 public/sitemap routes参数配置无用
  //  将以下页面挪到这里配置

  const defList = [
    // 首页
    {
      loc: `/`,
      lastmod: new Date(),
      changefreq: 'daily',
      priority: 1
    },
    // 文章
    {
      loc: `/article.html`,
      lastmod: new Date(),
      changefreq: 'daily',
      priority: 0.9
    },
  ]
 
  return [].concat(
    defList,
  )
})