<script setup lang="ts">
import Header from '../components/layout/Header.vue'
import Body from '../components/layout/Body.vue'
import Footer from '../components/layout/Footer.vue'
</script>

<template>
  <div class="home-page">
    <Header>
      <h1 class="logo">🚀 Insider JS Case</h1>
      <nav class="nav-links">
        <router-link to="/" class="nav-link">Anasayfa</router-link>
        <router-link to="/demo" class="nav-link">Demo</router-link>
      </nav>
    </Header>

    <Body>
      <div class="hero-section">
        <h2 class="hero-title">Hoş Geldiniz</h2>
        <p class="hero-description">
          Modern Vue 3 component kütüphanesi ile tanışın. 
          Şık ve kullanışlı arayüz bileşenleri ile projelerinizi hızlandırın.
        </p>
        <router-link to="/demo" class="cta-button">
          Demoyu Keşfet →
        </router-link>
      </div>

      <div class="features-grid">
        <div class="feature-card">
          <span class="feature-icon">🎨</span>
          <h3>Modern Tasarım</h3>
          <p>Şık ve minimal arayüz bileşenleri</p>
        </div>
        <div class="feature-card">
          <span class="feature-icon">⚡</span>
          <h3>Hızlı Performans</h3>
          <p>Optimize edilmiş Vue 3 componentler</p>
        </div>
        <div class="feature-card">
          <span class="feature-icon">🔧</span>
          <h3>Kolay Entegrasyon</h3>
          <p>Projenize hızlıca dahil edin</p>
        </div>
      </div>
    </Body>

    <Footer>
      <p>© 2026 Insider JS Case. Tüm hakları saklıdır.</p>
    </Footer>
  </div>
</template>

<style scoped>
.home-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.logo {
  font-size: 1.5rem;
  background: linear-gradient(135deg, var(--color-primary) 0%, #34d399 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.nav-links {
  display: flex;
  gap: 1.5rem;
}

.nav-link {
  color: var(--color-text-muted);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s ease;
}

.nav-link:hover,
.nav-link.router-link-active {
  color: var(--color-primary);
}

.hero-section {
  text-align: center;
  padding: 4rem 0;
}

.hero-title {
  font-size: 3rem;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, var(--color-primary) 0%, #34d399 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-description {
  font-size: 1.25rem;
  color: var(--color-text-muted);
  max-width: 600px;
  margin: 0 auto 2rem;
  line-height: 1.6;
}

.cta-button {
  display: inline-block;
  padding: 1rem 2rem;
  font-size: 1.1rem;
  font-weight: 600;
  color: white;
  background: linear-gradient(135deg, var(--color-primary) 0%, #34d399 100%);
  border-radius: 12px;
  text-decoration: none;
  transition: all 0.2s ease;
}

.cta-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 30px rgba(66, 184, 131, 0.4);
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
}

.feature-card {
  background: rgba(30, 41, 59, 0.6);
  border: 1px solid var(--color-border);
  border-radius: 16px;
  padding: 2rem;
  text-align: center;
  transition: all 0.2s ease;
}

.feature-card:hover {
  transform: translateY(-5px);
  border-color: var(--color-primary);
}

.feature-icon {
  font-size: 3rem;
  display: block;
  margin-bottom: 1rem;
}

.feature-card h3 {
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
  color: var(--color-text);
}

.feature-card p {
  color: var(--color-text-muted);
}
</style>
