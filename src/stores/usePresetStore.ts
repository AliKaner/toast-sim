import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import type { Preset, NotificationConfig } from '../types/notification'
import { nanoid } from 'nanoid'
import { randomId } from '@/utils/random'

const STORAGE_KEY = 'toast-presets'

export const usePresetStore = defineStore('presets', () => {
  const presets = ref<Preset[]>([])

  function loadFromStorage() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        presets.value = JSON.parse(stored)
      }
    } catch (error) {
      console.error('Failed to load presets from localStorage:', error)
      presets.value = []
    }
  }

  function saveToStorage() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(presets.value))
    } catch (error) {
      console.error('Failed to save presets to localStorage:', error)
    }
  }

  watch(presets, saveToStorage, { deep: true })

  function addPreset(name: string, config: Omit<NotificationConfig, 'id'>) {
    const preset: Preset = {
      id: randomId(),
      name,
      config,
      createdAt: new Date().toISOString()
    }
    presets.value.push(preset)
    return preset
  }

  function deletePreset(id: string) {
    const index = presets.value.findIndex((p) => p.id === id)
    if (index !== -1) {
      presets.value.splice(index, 1)
    }
  }

  function getPreset(id: string): Preset | undefined {
    return presets.value.find((p) => p.id === id)
  }

  loadFromStorage()

  return {
    presets,
    addPreset,
    deletePreset,
    getPreset,
    loadFromStorage
  }
})
