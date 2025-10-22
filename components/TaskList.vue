<script setup>
import { useTasks } from '~/composables/useTasks';

const { tasks, loading, error } = useTasks()
</script>

<template>
    <div>
        <h1>Tasks</h1>
        <div v-if="loading">Loading...</div>
        <div v-if="error">Error: {{ error }}</div>

        <li v-for="task in tasks" :key="task.id">
            <NuxtLink :to="`/tasks/detail/${task.id}`">
                {{ task.title }}
            </NuxtLink>
        </li>
    </div>
</template>
