<script setup>
import { useFavorites } from '../composables/useFavorites'
import TrackGrid from '../components/TrackGrid.vue'
import StatusMessage from '../components/StatusMessage.vue'
const { favorites } = useFavorites()
</script>

<template>
  <section>
    <h1 class="page-title">Your favorites</h1>
    <TrackGrid v-if="favorites.length" :tracks="favorites" />
    <StatusMessage v-else message="No favorites yet. Tap 🤍 on any song to save it here." />
  </section>
</template>
