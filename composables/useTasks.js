import { ref, onMounted } from 'vue'
import axios from 'axios'

export function useTasks() {
    const tasks = ref([])
    const loading = ref(false)
    const error = ref(null)

    async function fetchTasks() {
        loading.value = true
        error.value = null

        try {
            const res = await axios.get('/api/tasks')
            tasks.value = res.data
        } catch (err) {
            error.value = err.message
        } finally {
            loading.value = false
        }
    }

    onMounted(fetchTasks)

    return { tasks, loading, error, fetchTasks }
}
