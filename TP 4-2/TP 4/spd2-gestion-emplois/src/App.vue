
<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="app">
    <header class="header">
      <RouterLink class="logo" to="/">JobBoard.</RouterLink>

      <nav>
        <RouterLink to="/">Offres d'emploi</RouterLink>
        <RouterLink to="/add" class="btn">+ Ajouter une offre</RouterLink>
      </nav>
    </header>

    <main class="container">
      <RouterView />
    </main>

    <footer>
      JobBoard — TP SPD 2 · Vue 3 et JSON Server
    </footer>
  </div>
</template>
