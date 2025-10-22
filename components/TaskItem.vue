<script setup>
defineProps({
  task: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <li>
    {{ task.title }}
  </li>
</template>
