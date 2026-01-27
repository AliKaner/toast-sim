<script setup lang="ts">
import { ref } from 'vue'
import BaseInput from '../components/ui/BaseInput.vue'
import FormItemWrapper from '../components/ui/FormItemWrapper.vue'
import Button from '../components/ui/Button.vue'
import TextArea from '../components/ui/TextArea.vue'
import Segment from '../components/ui/Segment.vue'


const username = ref('')
const email = ref('')
const password = ref('')
const phone = ref('')
const search = ref('')
const disabledValue = ref('Bu alan devre dışı')
const errorEmail = ref('test@')
const bio = ref('')
const disabledBio = ref('Bu alan devre dışı')
const errorBio = ref('Çok kısa metin')

const segmentValue = ref('list')
const segmentOptions = [
  { text: 'Liste', icon: '📋', value: 'list' },
  { text: 'Kart', icon: '🃏', value: 'card' },
  { text: 'Tablo', icon: '📊', value: 'table' }
]

const viewModeValue = ref('day')
const viewModeOptions = [
  { text: 'Gün', value: 'day' },
  { text: 'Hafta', value: 'week' },
  { text: 'Ay', value: 'month' }
]
</script>

<template>
  <div class="demo-page">
    <header class="demo-header">
      <h1>🎨 Component Demo</h1>
      <p>BaseInput ve FormItemWrapper bileşenlerinin farklı durumları</p>
    </header>

    <main class="demo-content">
      <section class="demo-section">
        <h2>Button Variants</h2>
        
        <div class="demo-grid">
          <div class="demo-card">
            <h3>Full Width</h3>
            <Button 
              id="btn-full-width" 
              name="fullWidthButton" 
              text="Tam Genişlik Button"
            />
          </div>

          <div class="demo-card">
            <h3>120px Container</h3>
            <div class="button-container-120">
              <Button 
                id="btn-120px" 
                name="smallContainerButton" 
                text="120px"
              />
            </div>
          </div>

          <div class="demo-card">
            <h3>Loading</h3>
            <Button 
              id="btn-loading" 
              name="loadingButton" 
              :loading="true"
            />
          </div>

          <div class="demo-card">
            <h3>Disabled</h3>
            <Button 
              id="btn-disabled" 
              name="disabledButton" 
              text="Devre Dışı"
              :disabled="true"
            />
          </div>
        </div>
      </section>

      <section class="demo-section">
        <h2>Segment Variants</h2>
        
        <div class="demo-grid">
          <div class="demo-card">
            <h3>With Icons</h3>
            <Segment 
              v-model="segmentValue" 
              :options="segmentOptions" 
            />
            <p class="demo-value">Seçili: {{ segmentValue }}</p>
          </div>

          <div class="demo-card">
            <h3>Without Icons</h3>
            <Segment 
              v-model="viewModeValue" 
              :options="viewModeOptions" 
            />
            <p class="demo-value">Seçili: {{ viewModeValue }}</p>
          </div>

          <div class="demo-card">
            <h3>Disabled</h3>
            <Segment 
              v-model="segmentValue" 
              :options="segmentOptions" 
              disabled
            />
          </div>
        </div>
      </section>

      <section class="demo-section">
        <h2>BaseInput Variants</h2>
        
        <div class="demo-grid">
          <div class="demo-card">
            <h3>Default</h3>
            <BaseInput 
              v-model="username" 
              placeholder="Metin giriniz..." 
            />
          </div>

          <div class="demo-card">
            <h3>Email</h3>
            <BaseInput 
              v-model="email" 
              type="email" 
              placeholder="ornek@email.com" 
              autocomplete="email"
            />
          </div>

          <div class="demo-card">
            <h3>Password</h3>
            <BaseInput 
              v-model="password" 
              type="password" 
              placeholder="Şifrenizi giriniz..." 
            />
          </div>

          <div class="demo-card">
            <h3>Search</h3>
            <BaseInput 
              v-model="search" 
              type="search" 
              placeholder="Ara..." 
            />
          </div>

          <div class="demo-card">
            <h3>Disabled</h3>
            <BaseInput 
              v-model="disabledValue" 
              disabled 
            />
          </div>

          <div class="demo-card">
            <h3>With Error</h3>
            <BaseInput 
              v-model="errorEmail" 
              type="email"
              error="Geçerli bir e-posta giriniz" 
            />
          </div>
        </div>
      </section>

      <section class="demo-section">
        <h2>TextArea Variants</h2>
        
        <div class="demo-grid">
          <div class="demo-card">
            <h3>Default</h3>
            <TextArea 
              v-model="bio" 
              placeholder="Mesajınızı yazınız..." 
            />
          </div>

          <div class="demo-card">
            <h3>Custom Rows</h3>
            <TextArea 
              v-model="bio" 
              placeholder="6 satır yüksekliğinde..." 
              :rows="6"
            />
          </div>

          <div class="demo-card">
            <h3>No Resize</h3>
            <TextArea 
              v-model="bio" 
              placeholder="Boyutu değiştirilemez..." 
              resize="none"
            />
          </div>

          <div class="demo-card">
            <h3>Disabled</h3>
            <TextArea 
              v-model="disabledBio" 
              disabled 
            />
          </div>

          <div class="demo-card">
            <h3>With Error</h3>
            <TextArea 
              v-model="errorBio" 
              error="En az 10 karakter girilmelidir" 
            />
          </div>

          <div class="demo-card">
            <h3>With Max Length</h3>
            <TextArea 
              v-model="bio" 
              placeholder="Maksimum 100 karakter..." 
              :maxlength="100"
            />
          </div>
        </div>
      </section>

      <section class="demo-section">
        <h2>FormItemWrapper Variants</h2>
        
        <div class="demo-grid">
          <div class="demo-card">
            <h3>Default</h3>
            <FormItemWrapper label="Kullanıcı Adı">
              <BaseInput v-model="username" placeholder="Kullanıcı adınızı giriniz..." />
            </FormItemWrapper>
          </div>

          <div class="demo-card">
            <h3>Required</h3>
            <FormItemWrapper label="E-posta" required>
              <BaseInput v-model="email" type="email" placeholder="ornek@email.com" />
            </FormItemWrapper>
          </div>

          <div class="demo-card">
            <h3>With Hint</h3>
            <FormItemWrapper label="Şifre" required hint="En az 8 karakter">
              <BaseInput v-model="password" type="password" placeholder="Şifrenizi giriniz..." />
            </FormItemWrapper>
          </div>

          <div class="demo-card">
            <h3>With Error</h3>
            <FormItemWrapper label="E-posta" required error="Geçerli bir e-posta adresi giriniz">
              <BaseInput v-model="errorEmail" type="email" error="Geçerli bir e-posta adresi giriniz" />
            </FormItemWrapper>
          </div>
        </div>
      </section>

      <section class="demo-section">
        <h2>Tam Form Örneği</h2>
        
        <div class="demo-form">
          <FormItemWrapper label="Ad Soyad" required>
            <BaseInput v-model="username" placeholder="Adınızı ve soyadınızı giriniz..." />
          </FormItemWrapper>

          <FormItemWrapper label="E-posta" required hint="İş e-postanızı kullanın">
            <BaseInput v-model="email" type="email" placeholder="ornek@sirket.com" />
          </FormItemWrapper>

          <FormItemWrapper label="Telefon">
            <BaseInput v-model="phone" type="tel" placeholder="+90 5XX XXX XX XX" />
          </FormItemWrapper>

          <FormItemWrapper label="Şifre" required hint="En az 8 karakter, 1 büyük harf">
            <BaseInput v-model="password" type="password" placeholder="Şifrenizi giriniz..." />
          </FormItemWrapper>

          <button class="demo-button">Kaydet</button>
        </div>
      </section>
    </main>
  </div>
</template>

<style scoped>
.demo-page {
  min-height: 100vh;
  padding: 2rem;
}

.demo-header {
  text-align: center;
  margin-bottom: 3rem;
}

.demo-header h1 {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  background: linear-gradient(135deg, var(--color-primary) 0%, #34d399 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.demo-header p {
  color: var(--color-text-muted);
  font-size: 1.1rem;
}

.demo-content {
  max-width: 1200px;
  margin: 0 auto;
}

.demo-section {
  margin-bottom: 3rem;
}

.demo-section h2 {
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid var(--color-border);
  color: var(--color-text);
}

.demo-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.demo-card {
  background: rgba(30, 41, 59, 0.5);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  padding: 1.5rem;
}

.demo-card h3 {
  font-size: 0.9rem;
  color: var(--color-text-muted);
  margin-bottom: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.demo-form {
  max-width: 500px;
  background: rgba(30, 41, 59, 0.5);
  border: 1px solid var(--color-border);
  border-radius: 16px;
  padding: 2rem;
}

.demo-button {
  width: 100%;
  padding: 1rem;
  margin-top: 1rem;
  font-size: 1rem;
  font-weight: 600;
  color: white;
  background: linear-gradient(135deg, var(--color-primary) 0%, #34d399 100%);
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.demo-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 20px rgba(66, 184, 131, 0.4);
}

.demo-button:active {
  transform: translateY(0);
}

.button-container-120 {
  width: 120px;
}

.demo-value {
  margin-top: 0.75rem;
  font-size: 0.875rem;
  color: var(--color-text-muted);
}
</style>
