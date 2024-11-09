<script setup>
import { ref, onMounted, watch } from 'vue'
import { defineProps } from 'vue'

const props = defineProps({
  storageKey: {
    type: String,
    default: 'vitepress-editor-content'
  }
})

const text = ref('')

// Load saved content on component mount
onMounted(() => {
  const savedContent = localStorage.getItem(props.storageKey)
  if (savedContent) {
    text.value = savedContent
  }
})

// Watch for changes and save to localStorage
watch(text, (newValue) => {
  localStorage.setItem(props.storageKey, newValue)
}, { deep: true })

const clearStorage = () => {
  localStorage.removeItem(props.storageKey)
  text.value = ''
}
</script>

<template>
  <div class="vp-editor">
      <textarea
        v-model="text"
        class="editor-textarea"
        placeholder="Start typing... Your content will be automatically saved"
        rows="10"
      ></textarea>
  </div>
</template>

<style scoped>
.vp-editor {
  margin: 1rem 0;
}

.editor-container {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 1rem;
  background: var(--vp-c-bg-soft);
}

.editor-textarea {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font-family: var(--vp-font-family-base);
  resize: vertical;
  min-height: 150px;
}

.clear-button {
  padding: 0.5rem 1rem;
  background-color: var(--vp-c-brand);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
}

.clear-button:hover {
  background-color: var(--vp-c-brand-dark);
}
</style>
