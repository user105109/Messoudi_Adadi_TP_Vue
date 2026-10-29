// Favorites saved in the browser's localStorage.
import { ref, watch } from 'vue'

const STORAGE_KEY = 'sonic-favorites'

function load() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []
  } catch {
    return []
  }
}

const favorites = ref(load())
watch(favorites, (list) => localStorage.setItem(STORAGE_KEY, JSON.stringify(list)), { deep: true })

export function useFavorites() {
  const isFavorite = (track) => favorites.value.some((t) => t.id === track.id)
  const toggleFavorite = (track) => {
    favorites.value = isFavorite(track)
      ? favorites.value.filter((t) => t.id !== track.id)
      : [track, ...favorites.value]
  }
  return { favorites, isFavorite, toggleFavorite }
}
