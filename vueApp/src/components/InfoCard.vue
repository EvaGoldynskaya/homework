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
