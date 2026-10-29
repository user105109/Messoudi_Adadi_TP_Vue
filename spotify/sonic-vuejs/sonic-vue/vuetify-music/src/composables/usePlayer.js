// Global audio player state (shared by every component that calls usePlayer).
import { ref, computed } from 'vue'

const audio = new Audio()
const currentTrack = ref(null)
const queue = ref([])
const isPlaying = ref(false)
const currentTime = ref(0)
const duration = ref(0)
const volume = ref(0.8)
const error = ref('')

audio.volume = volume.value
audio.addEventListener('timeupdate', () => (currentTime.value = audio.currentTime))
audio.addEventListener('loadedmetadata', () => (duration.value = audio.duration))
audio.addEventListener('play', () => (isPlaying.value = true))
audio.addEventListener('pause', () => (isPlaying.value = false))
audio.addEventListener('ended', () => next())
audio.addEventListener('error', () => {
  if (currentTrack.value) error.value = 'This preview could not be loaded.'
  isPlaying.value = false
})

function play(track, list = []) {
  error.value = ''
  if (list.length) queue.value = list
  if (!track.previewUrl) {
    error.value = `No preview available for "${track.title}".`
    return
  }
  if (currentTrack.value?.id === track.id) return toggle()
  currentTrack.value = track
  audio.src = track.previewUrl
  audio.play().catch(() => (error.value = 'Playback was blocked by the browser.'))
}

function toggle() {
  if (!currentTrack.value) return
  audio.paused ? audio.play() : audio.pause()
}

function step(dir) {
  const playable = queue.value.filter((t) => t.previewUrl)
  if (!playable.length) return
  const i = playable.findIndex((t) => t.id === currentTrack.value?.id)
  const nextTrack = playable[(i + dir + playable.length) % playable.length]
  play(nextTrack)
}
const next = () => step(1)
const previous = () => step(-1)

function seek(seconds) {
  audio.currentTime = seconds
}

function setVolume(v) {
  volume.value = v
  audio.volume = v
}

const progress = computed(() => (duration.value ? (currentTime.value / duration.value) * 100 : 0))

export function usePlayer() {
  return { currentTrack, isPlaying, currentTime, duration, progress, volume, error,
    play, toggle, next, previous, seek, setVolume }
}
