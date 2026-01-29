<script setup lang="ts">
import { reactive, computed, watch } from 'vue'
import Header from '../components/layout/Header.vue'
import Body from '../components/layout/Body.vue'
import Footer from '../components/layout/Footer.vue'
import ToastList from '../components/ui/ToastList.vue'
import ToastFormCard from '../components/ui/ToastFormCard.vue'
import ToastPreviewCard from '../components/ui/ToastPreviewCard.vue'
import { useToastStore } from '../composables/useToastStore'
import { usePresetStore } from '../composables/usePresetStore'
import type { NotificationConfig, Preset, ActiveNotification, FormState } from '../types/notification'
import { nanoid } from 'nanoid'
import { highlightCode, generateNotificationCode } from '../utils/codeHighlight'
import { TYPE_DEFAULTS, TYPE_TITLES, DEFAULT_CONFIG } from '../constants/notification'
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()

const toastStore = useToastStore()
const presetStore = usePresetStore()

const form = reactive<FormState>({
  type: DEFAULT_CONFIG.type,
  title: t(DEFAULT_CONFIG.title),
  message: t(DEFAULT_CONFIG.message),
  duration: DEFAULT_CONFIG.duration,
  isPersistent: false,
  position: DEFAULT_CONFIG.position,
  backgroundColor: DEFAULT_CONFIG.backgroundColor,
  textColor: DEFAULT_CONFIG.textColor,
  showIcon: DEFAULT_CONFIG.showIcon,
  showCloseButton: DEFAULT_CONFIG.showCloseButton,
  animation: DEFAULT_CONFIG.animation,
  presetName: '',
  customIcon: ''
})

watch(() => form.type, (newType) => {
  const defaults = TYPE_DEFAULTS[newType]
  form.backgroundColor = defaults.bg
  form.textColor = defaults.text
  form.title = t(TYPE_TITLES[newType])
})

// Watch for locale changes to update default values
// Watch for locale changes to update default values
watch(locale, () => {
  // Re-apply defaults based on current type
  if (!form.message || form.message === 'Your changes have been saved successfully.' || form.message === 'Değişiklikleriniz başarıyla kaydedildi.') {
      form.message = t(DEFAULT_CONFIG.message)
  }

  // Update title based on current type
  const typeTitleKey = TYPE_TITLES[form.type]
  if (typeTitleKey) {
     form.title = t(typeTitleKey)
  }
})

const durationMs = computed(() => form.isPersistent ? 0 : form.duration * 1000)

const currentConfig = computed<NotificationConfig>(() => ({
  id: 'preview',
  type: form.type,
  title: form.title,
  message: form.message,
  duration: durationMs.value,
  position: form.position,
  backgroundColor: form.backgroundColor,
  textColor: form.textColor,
  showIcon: form.showIcon,
  showCloseButton: form.showCloseButton,
  animation: form.animation,
  customIcon: form.customIcon
}))

const previewNotification = computed<ActiveNotification>(() => ({
  ...currentConfig.value,
  createdAt: Date.now()
}))

const codeExport = computed(() => generateNotificationCode(currentConfig.value))

const highlightedCode = computed(() => highlightCode(codeExport.value))

function handleShowNotification() {
  toastStore.addNotification({
    ...currentConfig.value,
    id: nanoid()
  })
}

function handleSavePreset() {
  if (!form.presetName.trim()) return
  const { id, ...configWithoutId } = currentConfig.value
  presetStore.addPreset(form.presetName.trim(), configWithoutId)
  form.presetName = ''
}

function handleLoadPreset(preset: Preset) {
  form.type = preset.config.type
  form.title = preset.config.title
  form.message = preset.config.message
  
  if (preset.config.duration === 0) {
    form.isPersistent = true
    form.duration = 3
  } else {
    form.isPersistent = false
    form.duration = preset.config.duration / 1000
  }
  
  form.position = preset.config.position
  form.backgroundColor = preset.config.backgroundColor
  form.textColor = preset.config.textColor
  form.showIcon = preset.config.showIcon
  form.showCloseButton = preset.config.showCloseButton
  form.animation = preset.config.animation || 'slide'
  form.customIcon = preset.config.customIcon || ''
}

function handleDeletePreset(preset: Preset) {
  presetStore.deletePreset(preset.id)
}

function handleCopyCode() {
  navigator.clipboard.writeText(codeExport.value)
}
</script>

<template>
  <div class="home-page">
    <ToastList />

    <Header>
      <h1 class="logo">{{ t('home.title') }}</h1>
    </Header>

    <Body>
      <div class="builder-layout">
        <ToastFormCard :form="form" />
        <ToastPreviewCard
          :preview-notification="previewNotification"
          :highlighted-code="highlightedCode"
          :form="form"
          @show-notification="handleShowNotification"
          @save-preset="handleSavePreset"
          @load-preset="handleLoadPreset"
          @delete-preset="handleDeletePreset"
          @copy-code="handleCopyCode"
        />
      </div>
    </Body>

    <Footer>
      <p>{{ t('home.copyright') }}</p>
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
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--color-text);
}

.builder-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  max-width: 75rem;
  margin: 0 auto;
}

@media (max-width: 56.25rem) {
  .builder-layout {
    grid-template-columns: 1fr;
  }
}
</style>
