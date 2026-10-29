
<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter, RouterLink } from 'vue-router'
import { getJob, deleteJob } from '../services/jobsApi'

const route = useRoute()
const router = useRouter()

const job = ref(null)
const loading = ref(true)
const deleting = ref(false)
const error = ref('')

const formattedSalary = computed(() => {
  if (job.value?.salary == null || job.value.salary === '') {
    return 'Non précisé'
  }

  return new Intl.NumberFormat('fr-MA', {
    style: 'currency',
    currency: 'MAD',
    maximumFractionDigits: 0
  }).format(Number(job.value.salary))
})

const formattedDate = computed(() => {
  if (!job.value?.createdAt) return 'Non précisée'

  return new Intl.DateTimeFormat('fr-FR', {
    dateStyle: 'long'
  }).format(new Date(`${job.value.createdAt}T00:00:00`))
})

onMounted(async () => {
  try {
    job.value = await getJob(route.params.id)
  } catch (e) {
    error.value = 'Offre introuvable ou serveur indisponible.'
  } finally {
    loading.value = false
  }
})

async function removeJob() {
  const confirmed = window.confirm(
    `Voulez-vous vraiment supprimer l'offre "${job.value.title}" ?`
  )

  if (!confirmed) return

  deleting.value = true
  error.value = ''

  try {
    await deleteJob(job.value.id)
    router.push('/')
  } catch (e) {
    error.value = 'La suppression a échoué.'
  } finally {
    deleting.value = false
  }
}
</script>

<template>
  <section class="page">
    <RouterLink to="/">← Retour aux offres</RouterLink>

    <p v-if="loading">Chargement des détails...</p>

    <div v-else-if="!job">
      <h1>Offre introuvable</h1>
      <p class="error">{{ error }}</p>
    </div>

    <div v-else class="detail-card">
      <span class="badge">{{ job.type }}</span>

      <h1>{{ job.title }}</h1>
      <p class="muted">{{ job.company }} — {{ job.location }}</p>

      <hr>

      <h2>Description</h2>
      <p>{{ job.description }}</p>

      <h2>Compétences requises</h2>
      <p>{{ job.requirements || 'Non précisées.' }}</p>

      <div class="detail-info">
        <p><strong>Salaire :</strong> {{ formattedSalary }}</p>
        <p><strong>Expérience :</strong> {{ job.experience ?? 0 }} an(s)</p>
        <p><strong>Date de création :</strong> {{ formattedDate }}</p>
      </div>

      <p v-if="error" class="error">{{ error }}</p>

      <div class="form-actions">
        <RouterLink
          class="btn"
          :to="`/jobs/${job.id}/edit`"
        >
          Modifier
        </RouterLink>

        <button
          class="btn-danger"
          :disabled="deleting"
          @click="removeJob"
        >
          {{ deleting ? 'Suppression...' : 'Supprimer' }}
        </button>
      </div>
    </div>
  </section>
</template>
