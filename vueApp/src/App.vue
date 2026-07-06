<template>
  <main>
    <TaskInput @onAddTask="addTask"></TaskInput>
    <InfoCard :completed-count="completedCount" :total-count="totalCount" v-model:searchQuery="searchQuery"/>
    <ul class="list task-list">
      <li v-for="item in filteredTasks" :key="item.id">
        <TaskCard @onRemove="removeTask(item.id)" @onDone="setDoneTask(item.id)" :model="item"></TaskCard>
      </li>
    </ul>
  </main>
</template>

<script>
import TaskInput from "./components/TaskInput.vue";
import TaskCard from "./components/TaskCard.vue";
import InfoCard from "./components/InfoCard.vue";
import { useTaskList } from './hooks/useTaskList'

export default {
  name: 'App',
  components: {
    TaskCard,
    TaskInput,
    InfoCard
  },
  setup() {
    const { filteredTasks, searchQuery, addTask, removeTask, completedCount, totalCount } = useTaskList()

    return {
      filteredTasks,
      searchQuery,
      completedCount,
      totalCount,
      addTask,
      removeTask
    }
  }
}
</script>

<style scoped>
  .task-list {
    list-style: none;
  }
</style>