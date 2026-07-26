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

    <main class="gucci-contact-container">
      <section class="contact-hero">
        <span class="sub-tag">BUSINESS CARD SERVICES</span>
        <h1 class="main-heading">BOOK AN APPOINTMENT & CONTACT US</h1>
        <p class="heading-lead">
          Connect with our master craftsmen for bespoke letterpress typesetting, 24K gold foil stamping, and specialty paper consultation.
        </p>
      </section>

      <div class="contact-grid">
        <!-- VIP Appointment Form -->
        <div class="form-card">
          <h2 class="card-title">VIP DESIGNER CONSULTATION</h2>
          <p class="form-sub font-serif">Fill out your details to schedule a 1-on-1 typography session.</p>

          <form @submit.prevent="submitForm" class="appointment-form">
            <div class="field-group">
              <label>FULL NAME</label>
              <input v-model="form.name" type="text" placeholder="e.g. Executive Alexander Smith" required />
            </div>

            <div class="field-group">
              <label>COMPANY / HOUSE TITLE</label>
              <input v-model="form.company" type="text" placeholder="e.g. Apex Luxury Holdings" required />
            </div>

            <div class="field-group">
              <label>EMAIL ADDRESS</label>
              <input v-model="form.email" type="email" placeholder="alexander@apexluxury.com" required />
            </div>

            <div class="field-group">
              <label>PREFERRED CRAFT</label>
              <select v-model="form.craft">
                <option value="letterpress">Executive Letterpress Printing</option>
                <option value="gold-foil">24K Gold / Silver Mirror Foil Stamping</option>
                <option value="metal-steel">Metal Steel & Laser Engraving</option>
                <option value="custom">Full Custom Specialty Paper Portfolio</option>
              </select>
            </div>

            <div class="field-group">
              <label>SPECIAL DESIGN REQUESTS</label>
              <textarea v-model="form.notes" rows="4" placeholder="Tell us about your brand vision, paper preferences, or logo vector specifications..."></textarea>
            </div>

            <button type="submit" class="submit-btn-black">
              SUBMIT APPOINTMENT REQUEST
            </button>
          </form>
        </div>

        <!-- Boutique Information -->
        <div class="info-card">
          <div class="info-block">
            <h3 class="info-title">FLAGSHIP CRAFT BOUTIQUE</h3>
            <p>Fifth Avenue Atelier, Suite 880<br />New York, NY 10022</p>
            <p class="contact-line">☎️ +1 (800) 888-CARD</p>
            <p class="contact-line">✉️ concierge@businesscard.1s.design</p>
          </div>

          <div class="info-block">
            <h3 class="info-title">ATELIER HOURS</h3>
            <p>Monday – Friday: 10:00 AM – 7:00 PM EST</p>
            <p>Saturday: 11:00 AM – 5:00 PM EST (By Appointment Only)</p>
          </div>

          <div class="info-block">
            <h3 class="info-title">EXPRESS PROOFING GUARANTEE</h3>
            <p>All digital vector proofs are provided within 24 hours of inquiry submission by our lead typography master.</p>
          </div>
        </div>
      </div>
    </main>

    <!-- Footer -->
    <footer class="gucci-mini-footer">
      <div class="footer-logo-small">B U S I N E S S  C A R D</div>
      <p>© 2026 Business Card Workshop S.p.A. All rights reserved.</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

definePageMeta({
  layout: 'default'
});

useSeoMeta({
  title: '预约高定服务 · 1对1设计师 | BUSINESS CARD',
  ogTitle: '预约高定服务 · BUSINESS CARD',
  description: '预约 1对1 名片设计师，探讨特种纸冲压与 24K 烫金工艺。',
  ogDescription: '预约 1对1 名片设计师服务。'
});

useHead({
  title: '预约高定服务 · 1对1设计师 | BUSINESS CARD',
  link: [
    { rel: 'icon', type: 'image/svg+xml', href: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>📇</text></svg>' }
  ]
});

const form = ref({
  name: '',
  company: '',
  email: '',
  craft: 'letterpress',
  notes: ''
});

const submitForm = () => {
  alert(`Thank you, ${form.value.name}! Your VIP consultation request for ${form.value.company} has been received.`);
  form.value = { name: '', company: '', email: '', craft: 'letterpress', notes: '' };
};
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

.gucci-contact-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 2rem;
}

.contact-hero {
  text-align: center;
  margin-bottom: 4rem;
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
  font-size: 2rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  margin: 0 0 1rem;
}

.heading-lead {
  max-width: 700px;
  margin: 0 auto;
  font-size: 0.95rem;
  color: #555555;
  line-height: 1.6;
}

.contact-grid {
  display: grid;
  grid-template-columns: 3fr 2fr;
  gap: 3.5rem;
}

@media (max-width: 860px) {
  .contact-grid {
    grid-template-columns: 1fr;
  }
}

.form-card {
  background: #ffffff;
  border: 1px solid #e5e5e5;
  padding: 2.5rem;
}

.card-title {
  font-size: 1.1rem;
  font-weight: 800;
  letter-spacing: 0.15em;
  margin: 0 0 0.35rem;
}

.form-sub {
  font-size: 0.85rem;
  color: #666666;
  margin-bottom: 2rem;
}

.appointment-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.field-group {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.field-group label {
  font-size: 0.7rem;
  font-weight: 800;
  letter-spacing: 0.15em;
  color: #000000;
}

.field-group input, .field-group select, .field-group textarea {
  border: none;
  border-bottom: 1px solid #cccccc;
  padding: 0.65rem 0;
  font-size: 0.88rem;
  outline: none;
  font-family: inherit;
  background: none;
}

.field-group input:focus, .field-group select:focus, .field-group textarea:focus {
  border-bottom-color: #000000;
}

.submit-btn-black {
  background: #000000;
  color: #ffffff;
  border: none;
  padding: 1.1rem;
  font-size: 0.8rem;
  font-weight: 800;
  letter-spacing: 0.15em;
  cursor: pointer;
  margin-top: 1rem;
  transition: background 0.2s ease;
}

.submit-btn-black:hover {
  background: #222222;
}

.info-card {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  background: #fafafa;
  padding: 2.5rem;
  border: 1px solid #eeeeee;
}

.info-title {
  font-size: 0.8rem;
  font-weight: 800;
  letter-spacing: 0.15em;
  margin: 0 0 0.75rem;
}

.info-block p {
  font-size: 0.85rem;
  color: #555555;
  line-height: 1.6;
  margin: 0 0 0.35rem;
}

.contact-line {
  color: #000000 !important;
  font-weight: 600;
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
