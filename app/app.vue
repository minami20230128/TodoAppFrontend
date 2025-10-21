<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'

const tasks = ref([])
const loading = ref(false)
const error = ref(null)

async function fetchTodos() {
  loading.value = true
  error.value = null

  try {
    const response = await axios.get('/api/tasks')
    tasks.value = response.data
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

onMounted(fetchTodos)
</script>

<template>
  <div>
    <h1>Tasks</h1>
    <div v-if="loading">Loading...</div>
    <div v-if="error">Error: {{ error }}</div>
    <ul>
      <li v-for="task in tasks" :key="task.id">
        {{ task.title }}
      </li>
    </ul>
  </div>
</template>
