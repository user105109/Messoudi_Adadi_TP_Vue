<script setup>
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { searchSongs } from '../services/itunes'
import TrackGrid from '../components/TrackGrid.vue'
import StatusMessage from '../components/StatusMessage.vue'

const route = useRoute()
const router = useRouter()
const query = ref(route.query.q || '')
const results = ref([])
const loading = ref(false)
const error = ref('')
const searched = ref(false)
let timer = null

async function runSearch(term) {
  if (!term.trim()) {
    results.value = []
    searched.value = false
    return
  }
  loading.value = true
  error.value = ''
  try {
    results.value = await searchSongs(term, 30)
  } catch {
    error.value = 'Search failed. Please try again.'
  } finally {
    loading.value = false
    searched.value = true
  }
}

// Debounce: wait 400 ms after the user stops typing, keep query in the URL.
watch(query, (term) => {
  clearTimeout(timer)
  timer = setTimeout(() => {
    router.replace({ query: term ? { q: term } : {} })
    runSearch(term)
  }, 400)
}, { immediate: true })
</script>

<template>
  <section>
    <input v-model="query" class="search-input" type="search"
      placeholder="Search songs or artists…" autofocus />
    <StatusMessage v-if="loading" type="loading" message="Searching…" />
    <StatusMessage v-else-if="error" type="error" :message="error" />
    <StatusMessage v-else-if="searched && !results.length" :message="`No results for “${query}”.`" />
    <template v-else-if="results.length">
      <h2 class="section-title">Songs</h2>
      <TrackGrid :tracks="results" />
    </template>
    <StatusMessage v-else message="Type an artist or song name to start." />
  </section>
</template>
