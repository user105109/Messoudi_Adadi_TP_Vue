
<script setup>
import { RouterLink } from 'vue-router'

defineProps({
  job: {
    type: Object,
    required: true
  }
})

function formatSalary(salary) {
  if (salary == null || salary === '') return 'Non précisé'

  return new Intl.NumberFormat('fr-MA', {
    style: 'currency',
    currency: 'MAD',
    maximumFractionDigits: 0
  }).format(Number(salary))
}

function formatDate(date) {
  if (!date) return 'Non précisée'

  return new Intl.DateTimeFormat('fr-FR', {
    dateStyle: 'medium'
  }).format(new Date(`${date}T00:00:00`))
}
</script>

<template>
  <article class="job-card">
    <div class="card-top">
      <span class="company-icon">
        {{ (job.company || job.title).charAt(0).toUpperCase() }}
      </span>

      <span class="badge">{{ job.type }}</span>
    </div>

    <p class="muted">{{ job.company }}</p>

    <h2>
      <RouterLink :to="`/jobs/${job.id}`">
        {{ job.title }}
      </RouterLink>
    </h2>

    <p class="muted">{{ job.location }}</p>
    <p class="description">{{ job.description }}</p>

    <div class="card-bottom">
      <strong>{{ formatSalary(job.salary) }}</strong>
      <RouterLink :to="`/jobs/${job.id}`">
        Détails →
      </RouterLink>
    </div>

    <p class="date">Publié le {{ formatDate(job.createdAt) }}</p>
  </article>
</template>
