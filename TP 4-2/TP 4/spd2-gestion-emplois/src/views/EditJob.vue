
<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter, RouterLink } from 'vue-router'
import JobForm from '../components/JobForm.vue'
import { getJob, updateJob } from '../services/jobsApi'

const route = useRoute()
const router = useRouter()

const job = ref(null)
const loading = ref(true)
const saving = ref(false)
const error = ref('')

onMounted(async () => {
  try {
    job.value = await getJob(route.params.id)
  } catch (e) {
    error.value = 'Impossible de récupérer cette offre.'
  } finally {
    loading.value = false
  }
})

async function saveJob(updatedJob) {
  saving.value = true
  error.value = ''

  try {
    await updateJob(route.params.id, updatedJob)
    router.push(`/jobs/${route.params.id}`)
  } catch (e) {
    error.value = 'Erreur lors de la modification.'
  } finally {
    saving.value = false
  }
}
</script>

<template>
  <section class="page">
    <RouterLink :to="`/jobs/${route.params.id}`">
      ← Retour aux détails
    </RouterLink>

    <h1>Modifier l'offre</h1>

    <p v-if="loading">Chargement...</p>
    <p v-else-if="error" class="error">{{ error }}</p>

    <JobForm
      v-else-if="job"
      :initial-job="job"
      submit-label="Enregistrer les modifications"
      :loading="saving"
      @submit="saveJob"
      @cancel="router.push(`/jobs/${route.params.id}`)"
    />
  </section>
</template>
