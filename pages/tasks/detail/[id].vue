<!-- pages/task-detail/[id].vue -->
<template>
  <div>
    <h1>Task Detail Page</h1>
    <p>Task ID: {{ taskId }}</p>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';

const route = useRoute()
const taskId = route.params.id
</script>
