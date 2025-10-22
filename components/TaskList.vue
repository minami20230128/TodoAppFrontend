<script setup>
import { useTasks } from '~/composables/useTasks'
import TaskItem from '~/components/TaskItem.vue'

const { tasks, loading, error } = useTasks()
</script>

<template>
  <div>
    <h2>Tasks</h2>

    <div v-if="loading">Loading...</div>
    <div v-else-if="error">Error: {{ error }}</div>

    <ul>
      <TaskItem v-for="task in tasks" :key="task.id" :task="task" />
    </ul>
  </div>
</template>
