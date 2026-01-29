<script setup lang="ts">
import { reactive, computed, watch } from 'vue'
import Header from '@/components/layout/Header.vue'
import Body from '@/components/layout/Body.vue'
import Footer from '@/components/layout/Footer.vue'
import ToastList from '@/components/ui/ToastList.vue'
import ToastFormCard from '@/components/ui/ToastFormCard.vue'
import ToastPreviewCard from '@/components/ui/ToastPreviewCard.vue'
import { useToastStore } from '@/stores/useToastStore'
import { usePresetStore } from '@/stores/usePresetStore'
import type {
  NotificationConfig,
  Preset,
  ActiveNotification,
  FormState,
  NotificationType
} from '@/types/notification'
import { randomId } from '@/utils/random'
import { highlightCode, generateNotificationCode } from '@/utils/codeHighlight'
import { TYPE_DEFAULTS, TYPE_TITLES, DEFAULT_CONFIG, MS_PER_SECOND } from '@/constants/notification'
import { useI18n } from 'vue-i18n'
import { onMounted } from 'vue'
import { useTour } from '@/composables/useTour'

const { t, locale } = useI18n()
const { startTour } = useTour()

onMounted(() => {
  startTour()
})

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

function handleTypeChange(newType: NotificationType) {
  const defaults = TYPE_DEFAULTS[newType]
  form.backgroundColor = defaults.bg
  form.textColor = defaults.text
}

watch(locale, () => {
  if (
    !form.message ||
    form.message === 'Your changes have been saved successfully.' ||
    form.message === 'Değişiklikleriniz başarıyla kaydedildi.'
  ) {
    form.message = t(DEFAULT_CONFIG.message)
  }

  const typeTitleKey = TYPE_TITLES[form.type]
  if (typeTitleKey) {
    form.title = t(typeTitleKey)
  }
})

const durationMs = computed(() => (form.isPersistent ? 0 : form.duration * MS_PER_SECOND))

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
    id: randomId()
  })
}

function handleSavePreset() {
  if (!form.presetName.trim()) return
  const { ...configWithoutId } = currentConfig.value
  presetStore.addPreset(form.presetName.trim(), configWithoutId)

  toastStore.addNotification({
    id: randomId(),
    type: 'success',
    title: t('defaults.success_title'),
    message: t('preview.saved_toast', 'Preset saved successfully!'),
    duration: 3000,
    position: 'top-right',
    backgroundColor: 'var(--color-success)',
    textColor: 'var(--color-text)',
    showIcon: true,
    showCloseButton: true,
    animation: 'slide'
  })

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
    form.duration = preset.config.duration / MS_PER_SECOND
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

async function handleCopyCode() {
  try {
    await navigator.clipboard.writeText(codeExport.value)
    toastStore.addNotification({
      id: randomId(),
      type: 'success',
      title: t('defaults.success_title'),
      message: t('preview.copied_toast', 'Code copied to clipboard!'),
      duration: 3000,
      position: 'bottom-center',
      backgroundColor: 'var(--color-surface)',
      textColor: 'var(--color-text)',
      showIcon: true,
      showCloseButton: false,
      animation: 'fade'
    })
  } catch {
    toastStore.addNotification({
      id: randomId(),
      type: 'error',
      title: t('defaults.error_title'),
      message: t('preview.copy_error', 'Failed to copy code'),
      duration: 3000,
      position: 'bottom-center',
      backgroundColor: 'var(--color-error)',
      textColor: 'var(--color-text)',
      showIcon: true,
      showCloseButton: false,
      animation: 'fade'
    })
  }
}
</script>

<template>
  <div class="home-page">
    <ToastList />

    <Header @start-tour="startTour(true)">
      <h1 class="logo">{{ t('home.title') }}</h1>
    </Header>

    <Body>
      <div class="builder-layout">
        <ToastFormCard v-model:form="form" @type-change="handleTypeChange" />
        <ToastPreviewCard
          :preview-notification="previewNotification"
          :highlighted-code="highlightedCode"
          v-model:form="form"
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
  width: 100%;
  box-sizing: border-box;
}

@media (max-width: 56.25rem) {
  .builder-layout {
    grid-template-columns: minmax(0, 1fr);
  }
}

@media (max-width: 30rem) {
  .builder-layout {
    gap: 1rem;
    width: 100%;
    margin: 0;
  }
}
</style>
