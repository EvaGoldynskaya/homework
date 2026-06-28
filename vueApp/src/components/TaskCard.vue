<template>
  <div :class="['task-card', 'my-style', { inactive: model.status }]">
    <div>
      <h4>{{ model.title }}</h4>
      <p>{{ model.description }}</p>
    </div>
    <TaskButtons @onRemove="emitOnRemove" :model="model"></TaskButtons>
  </div>
</template>

<script>
import TaskButtons from './TaskButtons.vue'

export default {
  components: {
    TaskButtons
  },
  emits: [ 'onRemove'],
  props: {
    model: {
      required: true
    }
  },
  setup(props, { emit }) {
    const emitOnRemove = () => {emit('onRemove')}
    return {
      emitOnRemove
    }
  }
}
</script>