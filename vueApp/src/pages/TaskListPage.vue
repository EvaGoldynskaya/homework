<template>
  <main class="task-list-page">
    <RouterLink :to="{ path: '/about' }" class="task-title">
      About App
    </RouterLink>
    <div class="task-page-layout">
      <div class="column">
        <TaskInput @onAddTask="addTask"></TaskInput>
      </div>

      <div class="column">
        <InfoCard :completed-count="completedCount" :total-count="totalCount" v-model:searchQuery="searchQuery"/>
        <ul class="list task-list">
          <li v-for="item in filteredTasks" :key="item.id">
            <TaskCard @onRemove="removeTask(item.id)" @onDone="setDoneTask(item.id)" :model="item"></TaskCard>
          </li>
        </ul>
      </div>
    </div>
  </main>
</template>

<script>
import TaskInput from "../components/TaskInput.vue";
import TaskCard from "../components/TaskCard.vue";
import InfoCard from "../components/InfoCard.vue";
import { useTaskList } from '../hooks/useTaskList'

export default {
  name: 'TaskListPage',
  components: {
    TaskCard,
    TaskInput,
    InfoCard
  },
  setup() {
    const { filteredTasks, searchQuery, addTask, removeTask, completedCount, totalCount, setDoneTask } = useTaskList()

    return {
      filteredTasks,
      searchQuery,
      completedCount,
      totalCount,
      addTask,
      removeTask,
      setDoneTask
    }
  }
}
</script>

<style scoped>
.task-list-page {
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
}

.task-page-layout {
  display: grid;
  grid-template-columns: minmax(240px, 320px) 1fr;
  gap: 20px;
  align-items: stretch;
}

.column {
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-height: 100%;
}

.task-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

@media (max-width: 760px) {
  .task-page-layout {
    grid-template-columns: 1fr;
  }
}
</style>