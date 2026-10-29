<script setup>
defineProps({ album: { type: Object, required: true } })
</script>

<template>
  <a class="card" :href="album.url" target="_blank" rel="noopener">
    <div class="cover"><img :src="album.artwork" :alt="album.title" loading="lazy" /></div>
    <h3 class="card-title" :title="album.title">{{ album.title }}</h3>
    <p class="card-sub">{{ album.artist }}</p>
  </a>
</template>
