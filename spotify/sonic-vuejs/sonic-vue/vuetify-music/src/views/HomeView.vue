<script setup>
import { ref, onMounted } from 'vue'
import { searchSongs, searchAlbums } from '../services/itunes'
import TrackGrid from '../components/TrackGrid.vue'
import AlbumCard from '../components/AlbumCard.vue'
import StatusMessage from '../components/StatusMessage.vue'

const songs = ref([])
const albums = ref([])
const loading = ref(true)
const error = ref('')

const hour = new Date().getHours()
const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening'

onMounted(async () => {
  try {
    // Run both requests in parallel.
    const [s, a] = await Promise.all([searchSongs('top hits', 12), searchAlbums('daft punk', 6)])
    songs.value = s
    albums.value = a
  } catch (e) {
    error.value = 'Could not load music. Check your internet connection.'
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <section>
    <h1 class="page-title">{{ greeting }}</h1>
    <StatusMessage v-if="loading" type="loading" message="Loading music…" />
    <StatusMessage v-else-if="error" type="error" :message="error" />
    <template v-else>
      <h2 class="section-title">Popular music</h2>
      <TrackGrid :tracks="songs" />
      <h2 class="section-title">Suggested albums</h2>
      <div class="grid">
        <AlbumCard v-for="a in albums" :key="a.id" :album="a" />
      </div>
    </template>
  </section>
</template>
