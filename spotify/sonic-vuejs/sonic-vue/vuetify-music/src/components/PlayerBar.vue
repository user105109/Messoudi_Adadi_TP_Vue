<script setup>
import { usePlayer } from '../composables/usePlayer'
import { useFavorites } from '../composables/useFavorites'
import { formatTime } from '../composables/format'

const { currentTrack, isPlaying, currentTime, duration, progress, volume, error,
  toggle, next, previous, seek, setVolume } = usePlayer()
const { isFavorite, toggleFavorite } = useFavorites()

function onSeek(e) {
  seek((e.target.value / 100) * duration.value)
}
</script>

<template>
  <footer class="player">
    <div class="player-track">
      <template v-if="currentTrack">
        <img :src="currentTrack.artwork" alt="" />
        <div class="player-info">
          <strong>{{ currentTrack.title }}</strong>
          <span>{{ currentTrack.artist }}</span>
        </div>
        <button class="icon-btn" @click="toggleFavorite(currentTrack)">
          {{ isFavorite(currentTrack) ? '💚' : '🤍' }}
        </button>
      </template>
      <span v-else class="muted">Pick a song to start listening</span>
    </div>

    <div class="player-controls">
      <div class="buttons">
        <button class="icon-btn" @click="previous" aria-label="Previous">⏮</button>
        <button class="main-btn" @click="toggle" :disabled="!currentTrack" aria-label="Play/Pause">
          {{ isPlaying ? '❚❚' : '▶' }}
        </button>
        <button class="icon-btn" @click="next" aria-label="Next">⏭</button>
      </div>
      <div class="progress">
        <span>{{ formatTime(currentTime) }}</span>
        <input type="range" min="0" max="100" step="0.1" :value="progress" @input="onSeek" />
        <span>{{ formatTime(duration) }}</span>
      </div>
      <p v-if="error" class="player-error">{{ error }}</p>
    </div>

    <div class="player-volume">
      🔊 <input type="range" min="0" max="1" step="0.01" :value="volume"
        @input="setVolume(+$event.target.value)" />
    </div>
  </footer>
</template>
