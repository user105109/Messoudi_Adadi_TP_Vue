<script setup>
import { computed } from 'vue'
import { usePlayer } from '../composables/usePlayer'
import { useFavorites } from '../composables/useFavorites'

const props = defineProps({
  track: { type: Object, required: true },
  list: { type: Array, default: () => [] },
})

const { play, currentTrack, isPlaying } = usePlayer()
const { isFavorite, toggleFavorite } = useFavorites()
const active = computed(() => currentTrack.value?.id === props.track.id)
</script>

<template>
  <article class="card" :class="{ active }">
    <div class="cover">
      <img :src="track.artwork" :alt="track.album || track.title" loading="lazy" />
      <button v-if="track.previewUrl" class="play-btn" @click="play(track, list)"
        :aria-label="active && isPlaying ? 'Pause' : 'Play'">
        {{ active && isPlaying ? '❚❚' : '▶' }}
      </button>
      <span v-else class="badge">No preview</span>
    </div>
    <h3 class="card-title" :title="track.title">{{ track.title }}</h3>
    <p class="card-sub">{{ track.artist }}</p>
    <div class="card-actions">
      <button class="icon-btn" @click="toggleFavorite(track)"
        :aria-label="isFavorite(track) ? 'Remove favorite' : 'Add favorite'">
        {{ isFavorite(track) ? '💚' : '🤍' }}
      </button>
      <a v-if="track.trackUrl" :href="track.trackUrl" target="_blank" rel="noopener" class="apple-link">
        Listen on Apple Music
      </a>
    </div>
  </article>
</template>
