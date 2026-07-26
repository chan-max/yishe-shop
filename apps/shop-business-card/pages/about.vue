<template>
  <div class="gucci-page-wrapper">
    <!-- Header Navigation -->
    <header class="gucci-header">
      <div class="gucci-header-inner">
        <div class="header-left">
          <NuxtLink to="/" class="back-link">
            ‹ 返回名片工坊首页
          </NuxtLink>
        </div>
        <div class="header-center">
          <NuxtLink to="/" class="gucci-brand-logo">
            名 片 工 坊 · B U S I N E S S  C A R D
          </NuxtLink>
        </div>
        <div class="header-right">
          <NuxtLink to="/search" class="header-icon-link">搜索名片</NuxtLink>
        </div>
      </div>
    </header>

    <main class="gucci-about-container">
      <section class="about-hero">
        <span class="sub-tag">THE HOUSE OF BUSINESS CARD ATELIER</span>
        <h1 class="main-heading">工坊品牌故事与名片工艺</h1>
        <p class="heading-lead">
          将百年活字压印传统、24K 烫金工艺与现代极简商务美学完美融合。
        </p>
      </section>

      <section class="story-section">
        <div class="story-row">
          <div class="story-photo photo-1">
            <div class="art-badge">百年活字印迹</div>
          </div>
          <div class="story-text">
            <h2>01 / 凹版活字压印艺术 (LETTERPRESS)</h2>
            <p>
              每一张活字凹版名片，均采用德国古典海德堡机沉金压印。植物油墨浸润 100% 纯棉纸纤维，触感凹凸有致，透着沉稳自信的商务气场。
            </p>
          </div>
        </div>

        <div class="story-row reverse">
          <div class="story-photo photo-2">
            <div class="art-badge">24K 浮雕烫金</div>
          </div>
          <div class="story-text">
            <h2>02 / 24K 浮雕热压金 (HOT FOIL STAMPING)</h2>
            <p>
              资深烫金大师通过精准温控与高压冲压，将 24K 哑光金箔、镜面亮银与璀璨黑金精准附着于特种纸表面，在光线折射下熠熠生辉。
            </p>
          </div>
        </div>

        <div class="story-row">
          <div class="story-photo photo-3">
            <div class="art-badge">FSC 环保特种纸</div>
          </div>
          <div class="story-text">
            <h2>03 / 甄选环保特种纸艺 (SUSTAINABLE PAPERS)</h2>
            <p>
              名片工坊严格甄选符合 FSC 认证的无酸长纤维棉纸与绒面触感卡纸，不干裂、不褪色，让每一张名片都成为可以传世的艺术微型画卷。
            </p>
          </div>
        </div>
      </section>

      <section class="call-to-action">
        <h2>探索名片工坊全系作品</h2>
        <p>浏览商务高定名片作品集，或预约资深设计师为您提供 1对1 矢量排字打样服务。</p>
        <div class="cta-btn-row">
          <NuxtLink to="/search" class="btn-black">浏览名片作品集</NuxtLink>
          <NuxtLink to="/contact" class="btn-border">预约设计师打样</NuxtLink>
        </div>
      </section>
    </main>

    <!-- Footer -->
    <footer class="gucci-mini-footer">
      <div class="footer-logo-small">名 片 工 坊 · B U S I N E S S  C A R D</div>
      <p>© 2026 名片工坊 Business Card Atelier. 保留所有权利。</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'default'
});

useSeoMeta({
  title: '品牌工艺与传承 · BUSINESS CARD',
  ogTitle: '品牌工艺与传承 · BUSINESS CARD',
  description: '探索百年活字印刷、24K 烫金工艺与环保特种纸名片制作艺术。',
  ogDescription: '探索百年活字印刷与 24K 烫金工艺名片艺术。'
});

useHead({
  title: '品牌工艺与传承 · BUSINESS CARD',
  link: [
    { rel: 'icon', type: 'image/svg+xml', href: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>📇</text></svg>' }
  ]
});
</script>

<style scoped>
.gucci-page-wrapper {
  background: #ffffff;
  color: #000000;
  min-height: 100vh;
  font-family: -apple-system, BlinkMacSystemFont, "PingFang SC", "Hiragino Sans GB", Didot, "Times New Roman", serif;
}

.gucci-header {
  border-bottom: 1px solid #e5e5e5;
  background: #ffffff;
  position: sticky;
  top: 0;
  z-index: 100;
}

.gucci-header-inner {
  max-width: 1400px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.back-link, .header-icon-link {
  color: #000000;
  text-decoration: none;
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0.05em;
}

.gucci-brand-logo {
  font-size: 1.3rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  color: #000000;
  text-decoration: none;
}

.gucci-about-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 2rem;
}

.about-hero {
  text-align: center;
  margin-bottom: 5rem;
}

.sub-tag {
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.2em;
  color: #888888;
  display: block;
  margin-bottom: 0.5rem;
}

.main-heading {
  font-size: 2.2rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  margin: 0 0 1rem;
}

.heading-lead {
  max-width: 650px;
  margin: 0 auto;
  font-size: 1rem;
  color: #555555;
  line-height: 1.6;
}

.story-section {
  display: flex;
  flex-direction: column;
  gap: 5rem;
  margin-bottom: 5rem;
}

.story-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
}

.story-row.reverse {
  direction: rtl;
}

.story-row.reverse .story-text {
  direction: ltr;
}

@media (max-width: 860px) {
  .story-row, .story-row.reverse {
    grid-template-columns: 1fr;
    direction: ltr;
  }
}

.story-photo {
  height: 380px;
  background: #111111;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
}

.photo-1 { background: linear-gradient(135deg, #1a1a1a 0%, #332211 100%); }
.photo-2 { background: linear-gradient(135deg, #443311 0%, #d4a337 100%); }
.photo-3 { background: linear-gradient(135deg, #112211 0%, #335533 100%); }

.art-badge {
  border: 1px solid rgba(255,255,255,0.4);
  padding: 0.5rem 1rem;
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.15em;
}

.story-text h2 {
  font-size: 1.15rem;
  font-weight: 800;
  margin: 0 0 1rem;
}

.story-text p {
  font-size: 0.92rem;
  color: #555555;
  line-height: 1.7;
}

.call-to-action {
  text-align: center;
  background: #f9f9f9;
  padding: 4rem 2rem;
  border: 1px solid #eeeeee;

  h2 {
    font-size: 1.4rem;
    font-weight: 800;
    margin: 0 0 0.5rem;
  }

  p {
    font-size: 0.9rem;
    color: #666666;
    margin-bottom: 2rem;
  }
}

.cta-btn-row {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.btn-black {
  background: #000000;
  color: #ffffff;
  padding: 0.85rem 2rem;
  text-decoration: none;
  font-size: 0.78rem;
  font-weight: 800;
}

.btn-border {
  background: #ffffff;
  color: #000000;
  border: 1px solid #000000;
  padding: 0.85rem 2rem;
  text-decoration: none;
  font-size: 0.78rem;
  font-weight: 800;
}

.gucci-mini-footer {
  border-top: 1px solid #e5e5e5;
  padding: 2.5rem 1rem;
  text-align: center;
  font-size: 0.78rem;
  color: #888888;
}

.footer-logo-small {
  font-size: 1.1rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  color: #000000;
  margin-bottom: 0.5rem;
}
</style>
