
<script setup>
defineProps({
  modelValue: {
    type: String,
    default: 'Toutes'
  }
})

const emit = defineEmits(['update:modelValue'])

const filters = ['Toutes', 'CDI', 'CDD', 'Stage']
</script>

<template>
  <div class="filters">
    <button
      v-for="filter in filters"
      :key="filter"
      :class="{ active: modelValue === filter }"
      @click="emit('update:modelValue', filter)"
    >
      {{ filter }}
    </button>
  </div>
</template>
