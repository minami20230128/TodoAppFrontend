<script setup>
import { useRouter } from '#imports'
import { useTasks } from '~/composables/useTasks'

const { tasks, loading, error } = useTasks()
const router = useRouter()

function goToDetail(taskId) {
    router.push(`/tasks/${taskId}`)
}
</script>

<template>
    <div>
        <h1>Tasks</h1>
        <div v-if="loading">Loading...</div>
        <div v-if="error">Error: {{ error }}</div>

        <li v-for="task in tasks" :key="task.id">
            <button @click="goToDetail(task.id)" class="text-blue-500 underline">
            {{ task.title }}
            </button>
        </li>
    </div>
</template>
