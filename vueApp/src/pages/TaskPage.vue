<template>
  <main class="task-list-page">
    <div class="task-page-layout">
      <RouterLink class="back-link" to="/">← К списку задач</RouterLink>

      <article v-if="task" class="info-card">
        <div class="task-header">
          <h1>{{ task.title }}</h1>
          <span class="status-badge">{{ task.status ? 'Выполнено' : 'В процессе' }}</span>
        </div>

        <p class="task-description">
          {{ task.description }}
        </p>

        <div class="task-meta">
          <TaskField
            fieldLabel="Приоритет"
            :fieldValue="priorityLabel"
          />
          <TaskField
            fieldLabel="Срок"
            :fieldValue="formatDate(task.dueDate)"
          />
        </div>

        <div class="task-meta">
          <TaskField
            fieldLabel="Создана"
            :fieldValue="formatDate(task.createdAt)"
          />
          <TaskField
            fieldLabel="Обновлена"
            :fieldValue="formatDate(task.updatedAt)"
          />
        </div>
      </article>

      <article v-else class="task-card empty-state">
        <h1>Задача не найдена</h1>
      </article>
    </div>
  </main>
</template>

<script>
import { computed } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { useTaskList } from '../hooks/useTaskList'
import TaskField from '../components/TaskField.vue'

export default {
  name: 'TaskPage',
  components: {
    RouterLink,
    TaskField
  },
  setup() {
    const route = useRoute()
    const { getTaskById } = useTaskList()

    const task = computed(() => {
      return getTaskById(route.params.id)
    })

    console.log('task', task.value)
    console.log('dueDate', task.value?.dueDate)

    const formatDate = (value) => {
      if (!value) return 'Не указано'

      const parsed = new Date(value)
      if (Number.isNaN(parsed.getTime())) return 'Не указано'

      return parsed.toLocaleDateString('ru-RU', {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    }

    const priorityLabel = computed(() => {
      if (!task.value?.priority) return 'Не указан'
      return task.value.priority
    })

    console.log('priorityLabel', priorityLabel.value)

    return {
      task,
      formatDate,
      priorityLabel
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
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.task-shell {
  width: min(760px, 100%);
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.back-link {
  align-self: flex-start;
  border: none;
  background: transparent;
  color: #2f6fed;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  padding: 0;
}

.task-card {
  background: #ffffff;
  border-radius: 24px;
  padding: 28px;
  box-shadow: 0 16px 40px rgba(47, 111, 237, 0.14);
}

.task-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 12px;
}

.task-header h1 {
  margin: 0;
  font-size: 28px;
  color: #172033;
}

.status-badge {
  display: inline-flex;
  align-items: center;
  padding: 6px 12px;
  border-radius: 999px;
  background: #e8f7ec;
  color: #2b8a3e;
  font-size: 13px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.task-description {
  margin: 0 0 20px;
  color: #4d5873;
  font-size: 16px;
  line-height: 1.6;
}

.task-meta {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
  margin-bottom: 20px;
}

.meta-item > div {
  background: #f7faff;
  border: 1px solid #e4ebf8;
  border-radius: 16px;
  padding: 14px 16px;
}

@media (max-width: 640px) {
  .task-card {
    padding: 20px;
  }

  .task-header {
    flex-direction: column;
    align-items: flex-start;
  }

}
</style>
