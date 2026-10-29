
<script setup>
import { ref, computed, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import JobCard from '../components/JobCard.vue'
import FilterNav from '../components/FilterNav.vue'
import { getJobs } from '../services/jobsApi'

const jobs = ref([])
const search = ref('')
const selectedFilter = ref('Toutes')
const loading = ref(true)
const error = ref('')

const filteredJobs = computed(() => {
  const query = search.value.toLowerCase().trim()

  return jobs.value.filter(job => {
    const matchesType =
      selectedFilter.value === 'Toutes' ||
      job.type === selectedFilter.value

    const text = [
      job.title,
      job.company,
      job.location,
      job.description
    ].join(' ').toLowerCase()

    return matchesType && text.includes(query)
  })
})

async function loadJobs() {
  loading.value = true
  error.value = ''

  try {
    jobs.value = await getJobs()
  } catch (e) {
    error.value = 'Impossible de charger les offres. Vérifiez JSON Server.'
  } finally {
    loading.value = false
  }
}

onMounted(loadJobs)
</script>

<template>
  <section class="hero">
    <p>VOTRE PROCHAINE OPPORTUNITÉ</p>
    <h1>Trouvez le poste qui vous correspond.</h1>
    <p>Explorez les offres d'emploi et faites avancer votre carrière.</p>

    <RouterLink to="/add" class="btn">
      + Publier une offre
    </RouterLink>
  </section>

  <section class="listing">
    <div class="section-heading">
      <div>
        <h2>Offres d'emploi</h2>
        <p>{{ filteredJobs.length }} offre(s) disponible(s)</p>
      </div>

      <RouterLink to="/add" class="btn">
        + Ajouter une offre
      </RouterLink>
    </div>

    <input
      v-model="search"
      class="search"
      type="search"
      placeholder="Rechercher un poste, une entreprise..."
    />

    <FilterNav v-model="selectedFilter" />

    <p v-if="loading">Chargement des offres...</p>
    <p v-else-if="error" class="error">{{ error }}</p>

    <div v-else-if="filteredJobs.length" class="job-grid">
      <JobCard
        v-for="job in filteredJobs"
        :key="job.id"
        :job="job"
      />
    </div>

    <p v-else>Aucune offre trouvée.</p>
  </section>
</template>
