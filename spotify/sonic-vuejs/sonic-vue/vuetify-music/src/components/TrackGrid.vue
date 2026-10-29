<script setup>
import TrackCard from './TrackCard.vue'
defineProps({ tracks: { type: Array, required: true } })
</script>

<template>
  <div class="grid">
    <TrackCard v-for="t in tracks" :key="t.id" :track="t" :list="tracks" />
  </div>
</template>
