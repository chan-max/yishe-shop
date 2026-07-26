<template>
  <div class="gucci-page-wrapper">
    <!-- Header Navigation -->
    <header class="gucci-header">
      <div class="gucci-header-inner">
        <div class="header-left">
          <NuxtLink to="/" class="back-link">
            ‹ Back to Collection
          </NuxtLink>
        </div>
        <div class="header-center">
          <NuxtLink to="/" class="gucci-brand-logo">
            B U S I N E S S  C A R D
          </NuxtLink>
        </div>
        <div class="header-right">
          <NuxtLink to="/search" class="header-icon-link">Search</NuxtLink>
        </div>
      </div>
    </header>

    <main class="gucci-about-container">
      <section class="about-hero">
        <span class="sub-tag">THE HOUSE OF BUSINESS CARD</span>
        <h1 class="main-heading">CRAFTSMANSHIP & HERITAGE</h1>
        <p class="heading-lead">
          Combining centuries-old Florentine letterpress traditions with contemporary luxury design.
        </p>
      </section>

      <section class="story-section">
        <div class="story-row">
          <div class="story-photo photo-1">
            <div class="art-badge">1895 FLORENCE TRADITION</div>
          </div>
          <div class="story-text">
            <h2>01 / THE ART OF LETTERPRESS</h2>
            <p>
              Each executive business card is impression-printed on antique Heidelberg machines using hand-mixed vegetable inks and 100% pure cotton paper stock. The deep tactile debossing creates an indelible impression of executive authority.
            </p>
          </div>
        </div>

        <div class="story-row reverse">
          <div class="story-photo photo-2">
            <div class="art-badge">24K GOLD LEAF</div>
          </div>
          <div class="story-text">
            <h2>02 / HOT FOIL STAMPING</h2>
            <p>
              Our master gilders apply heat and high pressure to stamp genuine 24-karat gold and silver leaf onto thick specialty stock, illuminating every letterform with brilliant metallic radiance.
            </p>
          </div>
        </div>

        <div class="story-row">
          <div class="story-photo photo-3">
            <div class="art-badge">ECO-SUSTAINABLE</div>
          </div>
          <div class="story-text">
            <h2>03 / SUSTAINABLE SPECIALTY PAPERS</h2>
            <p>
              We source exclusively FSC-certified, acid-free cotton fibers and recycled velvet papers, ensuring that every business card embodies environmental stewardship alongside timeless elegance.
            </p>
          </div>
        </div>
      </section>

      <section class="call-to-action">
        <h2>EXPERIENCE THE COLLECTION</h2>
        <p>Browse our executive collections or schedule a 1-on-1 consultation with our master typographers.</p>
        <div class="cta-btn-row">
          <NuxtLink to="/search" class="btn-black">EXPLORE COLLECTION</NuxtLink>
          <NuxtLink to="/contact" class="btn-border">BOOK APPOINTMENT</NuxtLink>
        </div>
      </section>
    </main>

    <!-- Footer -->
    <footer class="gucci-mini-footer">
      <div class="footer-logo-small">B U S I N E S S  C A R D</div>
      <p>© 2026 Business Card Workshop S.p.A. All rights reserved.</p>
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
  font-family: Didot, "Times New Roman", serif;
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
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.05em;
}

.gucci-brand-logo {
  font-size: 1.4rem;
  font-weight: 700;
  letter-spacing: 0.25em;
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
  letter-spacing: 0.15em;
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
  font-size: 0.7rem;
  font-weight: 800;
  letter-spacing: 0.2em;
}

.story-text h2 {
  font-size: 1.1rem;
  font-weight: 800;
  letter-spacing: 0.15em;
  margin: 0 0 1rem;
}

.story-text p {
  font-size: 0.9rem;
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
    letter-spacing: 0.15em;
    margin: 0 0 0.5rem;
  }

  p {
    font-size: 0.88rem;
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
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.15em;
}

.btn-border {
  background: #ffffff;
  color: #000000;
  border: 1px solid #000000;
  padding: 0.85rem 2rem;
  text-decoration: none;
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.15em;
}

.gucci-mini-footer {
  border-top: 1px solid #e5e5e5;
  padding: 2.5rem 1rem;
  text-align: center;
  font-size: 0.75rem;
  color: #888888;
}

.footer-logo-small {
  font-size: 1.1rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  color: #000000;
  margin-bottom: 0.5rem;
}
</style>
