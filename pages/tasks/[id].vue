<template>
  <div>
    <h1>Task Detail</h1>
    <NuxtPage :key="$route.fullPath" />
    <div v-if="pending">Loading...</div>
    <div v-else-if="error">Error: {{ error.message }}</div>
    <div v-else>
      <p>ID: {{ task.id }}</p>
      <p>Title: {{ task.title }}</p>
      <p>Start Date: {{ task.startDate }}</p>
      <p>Due Date: {{ task.dueDate }}</p>
      <p>Condition: {{ task.taskCondition }}</p>
      <p>Memo: {{ task.memo }}</p>
      <p>Status: {{ statusLabel }}</p>
      <button @click="goToEdit" class="bg-blue-500 text-white px-4 py-2 rounded">
          更新画面へ
      </button>
    </div>
  </div>
</template>

<script setup>
import { useFetch } from '#app'
import { useRoute, useRouter } from '#imports'

const route = useRoute()
const router = useRouter()
const id = route.params.id

// タスク詳細情報を取得
const { data: task, pending, error } = await useFetch(`/api/tasks/${id}`)

const statusLabel = computed(() => {
  switch (task.value?.status) {
    case 0:
      return '未着手'
    case 1:
      return '進行中'
    case 2:
      return '完了'
  }
})

function goToEdit() {
  router.push(`/tasks/edit/${task.value.id}`).catch(err => console.error(err))
}
</script>
