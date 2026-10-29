<script setup>
import { useFavorites } from '../composables/useFavorites'
const { favorites } = useFavorites()
</script>

<template>
  <aside class="sidebar">
    <div class="logo">● Sonic</div>
    <nav>
      <RouterLink to="/" class="nav-link">🏠 <span>Home</span></RouterLink>
      <RouterLink to="/search" class="nav-link">🔍 <span>Search</span></RouterLink>
      <RouterLink to="/favorites" class="nav-link">💚 <span>Favorites ({{ favorites.length }})</span></RouterLink>
    </nav>
  </aside>
</template>
