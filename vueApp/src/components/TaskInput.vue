<template>
  <div class="list task-input">
    <input v-model="form.title" placeholder="Title" type="text" />
    <input v-model="form.description" placeholder="Description" type="text" />
    <button @click="onAddTask" :disabled="!isValid">Add task</button>
  </div>
</template>

<script>
import { useTaskInput } from '../hooks/useTaskInput'

export default {
  emits: ['onAddTask'],
  setup(props, { emit }) {
    const { form, isValid, resetForm, getFormData } = useTaskInput()

    const onAddTask = () => {
      if (!isValid.value) {
        alert('Fill task info please!')
        return
      }
      emit('onAddTask', {form: getFormData()})
      resetForm()
    }

    return {
      form,
      isValid,
      onAddTask
    }
  }
}
</script>

<style scoped>
.task-input {
  margin: 10px 0;
}
</style>