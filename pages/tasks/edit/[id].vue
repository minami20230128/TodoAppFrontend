<template>
  <div class="mt-8 p-6 max-w-4xl mx-auto bg-white shadow-xl rounded-xl border border-gray-200">
    <h1 class="text-3xl font-extrabold mb-8 text-indigo-700 border-b pb-3">
      タスク編集
    </h1>

    <!-- データを取得中の表示 -->
    <div v-if="pending || !editedTask" class="text-center py-12 text-gray-500 text-lg">
      <svg class="animate-spin h-6 w-6 mr-3 inline-block text-indigo-500" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      データを読み込み中...
    </div>

    <!-- エラー表示 -->
    <div v-else-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
      <strong class="font-bold">エラー:</strong>
      <span class="block sm:inline">タスクデータの読み込みに失敗しました。</span>
      <p class="text-sm mt-1">{{ error.message }}</p>
    </div>

    <!-- 編集フォーム -->
    <form v-else @submit.prevent="saveTask" class="space-y-6">
      
      <!-- ID (読み取り専用) -->
      <div class="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
        <label class="sm:w-32 font-semibold text-gray-700">ID:</label>
        <div class="p-3 border border-gray-200 rounded-lg bg-gray-50 flex-grow text-gray-600 font-mono">{{ editedTask.id }}</div>
      </div>
      
      <!-- Title -->
      <div class="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
        <label for="title" class="sm:w-32 font-semibold text-gray-700">タイトル:</label>
        <input id="title" v-model="editedTask.title" type="text" class="border border-gray-300 p-3 rounded-lg w-full focus:ring-indigo-500 focus:border-indigo-500 transition duration-150">
      </div>
      
      <!-- Start Date -->
      <div class="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
        <label for="startDate" class="sm:w-32 font-semibold text-gray-700">開始日:</label>
        <input id="startDate" v-model="editedTask.startDate" type="date" class="border border-gray-300 p-3 rounded-lg w-full focus:ring-indigo-500 focus:border-indigo-500 transition duration-150">
      </div>
      
      <!-- Due Date -->
      <div class="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
        <label for="dueDate" class="sm:w-32 font-semibold text-gray-700">期限日:</label>
        <input id="dueDate" v-model="editedTask.dueDate" type="date" class="border border-gray-300 p-3 rounded-lg w-full focus:ring-indigo-500 focus:border-indigo-500 transition duration-150">
      </div>
      
      <!-- Condition -->
      <div class="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
        <label for="condition" class="sm:w-32 font-semibold text-gray-700">条件:</label>
        <input id="condition" v-model="editedTask.taskCondition" type="text" class="border border-gray-300 p-3 rounded-lg w-full focus:ring-indigo-500 focus:border-indigo-500 transition duration-150">
      </div>
      
      <!-- Status (ドロップダウンリスト) -->
      <div class="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
        <label for="status" class="sm:w-32 font-semibold text-gray-700">ステータス:</label>
        <select id="status" v-model="editedTask.status" class="border border-gray-300 p-3 rounded-lg w-full focus:ring-indigo-500 focus:border-indigo-500 appearance-none bg-white transition duration-150">
          <option v-for="option in statusOptions" :key="option.value" :value="option.value">
            {{ option.label }}
          </option>
        </select>
      </div>
      
      <!-- Memo -->
      <div class="flex flex-col space-y-2">
        <label for="memo" class="font-semibold text-gray-700">メモ:</label>
        <textarea id="memo" v-model="editedTask.memo" rows="5" class="border border-gray-300 p-3 rounded-lg w-full focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"></textarea>
      </div>
      

      <!-- 保存ボタン -->
      <div class="pt-6 flex justify-end">
        <button type="submit" class="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105">
          変更を保存
        </button>
      </div>

    </form>
  </div>
</template>

<script setup>
import { useFetch } from '#app';
import { useRoute } from '#imports';
import { ref, watch } from 'vue';

// ステータスオプションの定義
const statusOptions = [
  { value: 0, label: '未着手' },
  { value: 1, label: '進行中' },
  { value: 2, label: '完了' },
];

const route = useRoute();
const id = route.params.id;

// 1. タスク詳細情報を取得
// 親コンポーネントで取得している可能性もありますが、edit.vue単体での動作を保証するためここでも取得します
const { data: task, pending, error } = await useFetch(`/api/tasks/${id}`);

// 2. 編集用のリアクティブな状態
const editedTask = ref(null);

// 3. 取得したデータを編集用状態にコピー
watch(task, (newTask) => {
  if (newTask) {
    // 取得した read-only なデータを、編集可能な ref にコピー
    editedTask.value = { ...newTask };
    
    // 日付フィールドがAPIから適切な形式 (YYYY-MM-DD) でない場合、ここで整形が必要になることがあります。
    // 例: new Date(newTask.startDate).toISOString().substring(0, 10)
  }
}, { immediate: true });

// 4. タスク保存処理 (ダミー)
function saveTask() {
  if (!editedTask.value) {
    console.error('編集データがありません。');
    return;
  }

  // 実際にはAPIエンドポイントにPUT/PATCHリクエストを送ってデータを更新します
  console.log('✅ [模擬] タスクの変更を保存しました。');
  console.log('保存されたデータ:', editedTask.value);

  // 例: 保存後に詳細ページに戻る router.push(`/tasks/${editedTask.value.id}`);
}
</script>
