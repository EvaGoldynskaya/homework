<template>
  <main class="task-list-page">
    <div class="task-page-layout">
      <RouterLink class="back-link" to="/">← К списку задач</RouterLink>

      <article class="info-card">
        <div class="task-header">
          <h1>About App</h1>
        </div>

        <p class="task-description">
          This is a small application for managing a list of tasks. It demonstrates
          routing, adding new tasks, searching, and managing task states.
        </p>
      </article>
    </div>
  </main>
</template>

<script>
import { RouterLink } from 'vue-router'

export default {
  name: 'AboutPage',
  components: {
    RouterLink
  },
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

.task-description {
  margin: 0 0 20px;
  color: #4d5873;
  font-size: 16px;
  line-height: 1.6;
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
