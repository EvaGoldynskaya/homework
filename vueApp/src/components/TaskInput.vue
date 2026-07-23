<template>
  <div class="list task-input info-card">
    <h1>Add Task</h1>
    <input v-model="form.title" placeholder="Title" type="text" />
    <input v-model="form.description" placeholder="Description" type="text" />
    <input v-model="form.dueDate" placeholder="Due Date" type="date" />
    <select v-model="form.priority" >
      <option value="" disabled selected>Priority</option>
      <option v-for="option in priorityOptions" :value="option.value">{{ option.text }}</option>
    </select>
    <button @click="onAddTask" :disabled="!isValid">Add task</button>
  </div>
</template>

<script>
import { useTaskInput } from '../hooks/useTaskInput'
import { ref } from 'vue'
export default {
  emits: ['onAddTask'],
  setup(props, { emit }) {
    const { form, isValid, resetForm, getFormData } = useTaskInput()

    const priorityOptions = ref([
      { text: 'High', value: 'High' },
      { text: 'Medium', value: 'Medium' },
      { text: 'Low', value: 'Low' }
    ])

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
      onAddTask,
      priorityOptions
    }
  }
}
</script>

<style scoped>
.task-input {
  margin: 16px 0;
}
</style>