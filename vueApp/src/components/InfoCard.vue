<template>
  <div class="info-card list">
    <h1>Completed tasks: {{ completedCount }} / {{ totalCount }}</h1>
    <input :value="searchQuery" @input="$emit('update:searchQuery', $event.target.value) "placeholder="Search tasks..." type="text"/>
  </div>
</template>

<script>
export default {
  props: {
    completedCount: {
      required: true
    },
    totalCount: {
      required: true
    },
    searchQuery: {
      default: ''
    }
  },
  emits: ['update:searchQuery']
}
</script>

<style scoped>
.info-card {
  margin: 16px 0;
  padding: 12px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  background: #f9fafb;
}

.info-card h1 {
  margin-bottom: 5px;
  font-size: 1rem;
  font-weight: 600;
  color: #111827;
}
</style>