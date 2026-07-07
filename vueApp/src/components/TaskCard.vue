<template>
  <div :class="['task-card', 'my-style', { inactive: model.status }]">
    <div>
      <RouterLink :to="{ name: 'task', params: { id: model.id } }" class="task-title">
        {{ model.title }}
      </RouterLink>
      <p>{{ model.description }}</p>
    </div>
    <TaskButtons @onRemove="emitOnRemove" @onDone="emitOnDone" :model="model"></TaskButtons>
  </div>
</template>

<script>
import { RouterLink } from 'vue-router'
import TaskButtons from './TaskButtons.vue'

export default {
  components: {
    TaskButtons,
    RouterLink
  },
  emits: [ 'onRemove' , 'onDone'],
  props: {
    model: {
      required: true
    }
  },
  setup(props, { emit }) {
    const emitOnRemove = () => {emit('onRemove')}
    const emitOnDone = () => {emit('onDone')}
    return {
      emitOnRemove,
      emitOnDone
    }
  }
}
</script>

<style scoped>
.task-title {
  display: inline-block;
  margin-bottom: 6px;
  font-size: 18px;
  font-weight: 700;
  color: #172033;
  text-decoration: none;
}

.task-title:hover {
  color: #2f6fed;
  text-decoration: underline;
}
</style>