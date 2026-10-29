<script setup>
import AppSidebar from './components/AppSidebar.vue'
import PlayerBar from './components/PlayerBar.vue'
import AppFooter from './components/AppFooter.vue'
</script>

<template>
  <div class="layout">
    <AppSidebar />
    <main class="content">
      <RouterView />
      <AppFooter />
    </main>
    <PlayerBar />
  </div>
</template>
