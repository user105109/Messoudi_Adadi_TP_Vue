
<script setup>
import { reactive, watch } from 'vue'

const props = defineProps({
  initialJob: {
    type: Object,
    default: null
  },
  submitLabel: {
    type: String,
    default: "Enregistrer l'offre"
  },
  loading: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['submit', 'cancel'])

function emptyForm() {
  return {
    title: '',
    company: '',
    location: '',
    type: 'CDI',
    salary: '',
    description: '',
    experience: 0,
    createdAt: new Date().toISOString().slice(0, 10),
    requirements: ''
  }
}

const form = reactive(emptyForm())

watch(
  () => props.initialJob,
  (job) => {
    Object.assign(form, emptyForm(), job || {})
    form.salary = job?.salary ?? ''
    form.experience = job?.experience ?? 0
  },
  { immediate: true }
)

function submitForm() {
  emit('submit', {
    ...form,
    salary: form.salary === '' ? null : Number(form.salary),
    experience: Number(form.experience)
  })
}
</script>

<template>
  <form class="job-form" @submit.prevent="submitForm">
    <label>
      Titre du poste *
      <input v-model.trim="form.title" required />
    </label>

    <label>
      Entreprise *
      <input v-model.trim="form.company" required />
    </label>

    <label>
      Lieu
      <input v-model.trim="form.location" />
    </label>

    <label>
      Type de contrat *
      <select v-model="form.type" required>
        <option>CDI</option>
        <option>CDD</option>
        <option>Stage</option>
        <option>Freelance</option>
      </select>
    </label>

    <label>
      Salaire mensuel (MAD)
      <input
        v-model="form.salary"
        type="number"
        min="0"
      />
    </label>

    <label>
      Années d'expérience
      <input
        v-model="form.experience"
        type="number"
        min="0"
      />
    </label>

    <label>
      Date de création *
      <input
        v-model="form.createdAt"
        type="date"
        required
      />
    </label>

    <label>
      Description *
      <textarea
        v-model.trim="form.description"
        rows="5"
        required
      ></textarea>
    </label>

    <label>
      Compétences et exigences
      <textarea
        v-model.trim="form.requirements"
        rows="3"
      ></textarea>
    </label>

    <div class="form-actions">
      <button
        type="button"
        class="btn-secondary"
        @click="emit('cancel')"
      >
        Annuler
      </button>

      <button type="submit" :disabled="loading" class="btn">
        {{ loading ? 'Enregistrement...' : submitLabel }}
      </button>
    </div>
  </form>
</template>
