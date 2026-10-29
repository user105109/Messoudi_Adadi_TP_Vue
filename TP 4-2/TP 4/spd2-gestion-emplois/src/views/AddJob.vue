
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import JobForm from '../components/JobForm.vue'
import { createJob } from '../services/jobsApi'

const router = useRouter()
const loading = ref(false)
const error = ref('')

async function addJob(job) {
  loading.value = true
  error.value = ''

  try {
    const createdJob = await createJob(job)
    router.push(`/jobs/${createdJob.id}`)
  } catch (err) {
    error.value = "Impossible d'ajouter l'offre. Vérifiez que le serveur JSON est démarré."
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <main class="container page-content">
    <div class="page-heading">
      <p class="eyebrow">RECRUTEMENT</p>
      <h1>Ajouter une offre d'emploi</h1>
      <p>Remplissez les informations pour publier une nouvelle offre.</p>
    </div>

    <p v-if="error" class="error-message">{{ error }}</p>

    <JobForm
      :loading="loading"
      submit-label="Publier l'offre"
      @submit="addJob"
      @cancel="router.push('/')"
    />
  </main>
</template>
