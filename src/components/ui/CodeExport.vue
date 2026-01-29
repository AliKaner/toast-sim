<script setup lang="ts">
interface Props {
  highlightedCode: string
}

interface Emits {
  (e: 'copy'): void
}

defineProps<Props>()
defineEmits<Emits>()
</script>

<template>
  <div class="code-export">
    <pre class="code-block hljs"><code v-html="highlightedCode"></code></pre>
    <button class="copy-btn" @click="$emit('copy')">📋 Copy to Clipboard</button>
  </div>
</template>

<style scoped>
.code-export {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  height: 100%;
  margin-bottom: 0.5rem;
}

.code-block {
  background: var(--color-code-bg, #000000);
  border-radius: 0.5rem;
  padding: 1rem;
  overflow-x: auto;
  flex: 1;
  min-height: 6.25rem;
  overflow-y: auto;
  font-family: 'Fira Code', 'Monaco', monospace;
  font-size: 0.75rem;
  line-height: 1.6;
  color: var(--color-code-text, #e2e8f0);
}

.code-block::-webkit-scrollbar {
  width: 0.5rem;
  height: 0.5rem;
}

.code-block::-webkit-scrollbar-thumb {
  background-color: var(--color-scrollbar-thumb, #334155);
  border-radius: 0.25rem;
}

.code-block::-webkit-scrollbar-corner {
  background: transparent;
}

.code-block code {
  white-space: normal;
  word-wrap: break-word;
  word-break: break-all;
}

.copy-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 15rem;
  padding: 0.625rem 1rem;
  border: 0.0625rem solid var(--color-border);
  border-radius: 0.5rem;
  background: transparent;
  color: var(--color-text);
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.copy-btn:hover {
  background: var(--color-primary-soft);
  border-color: var(--color-primary);
  color: var(--color-primary);
}

@media (max-width: 30rem) {
  .copy-btn {
    width: 100%;
  }
}
</style>
