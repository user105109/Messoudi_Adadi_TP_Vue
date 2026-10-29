<script setup>
// Reusable loading / error / empty state.
defineProps({
  type: { type: String, default: 'info' }, // 'loading' | 'error' | 'info'
  message: { type: String, required: true },
})
</script>

<template>
  <div class="status" :class="type">
    <span v-if="type === 'loading'" class="spinner"></span>
    {{ message }}
  </div>
</template>
