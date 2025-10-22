<script setup>
import { useTasks } from '~/composables/useTasks';
import TaskItem from './TaskItem.vue';

const { tasks, loading, error } = useTasks()
</script>

<template>
  <div>
    <h1>Tasks</h1>
    <div v-if="loading">Loading...</div>
    <div v-if="error">Error: {{ error }}</div>

    <ul>
      <TaskItem v-for="task in tasks" :key="task.id" :task="task" />
    </ul>
    <NuxtLink to="/tasks/task-detail">
      <button>TaskDetailに遷移する</button>
    </NuxtLink>
  </div>
</template>
