import { reactive, computed } from 'vue'

export function useTaskInput() {
  //Форма ввода задачи
  const form = reactive({ title: '', description: '', priority: '', dueDate: '' })

  //Проверка валидности формы ввода (не пустые title и description)
  const isValid = computed(() => {
    return form.title.trim() !== '' && form.description.trim() !== '' 
    && form.priority.trim() !== '' && form.dueDate !== ''
  })

  //Сброс формы
  const resetForm = () => {
    form.title = ''
    form.description = ''
    form.priority = ''
    form.dueDate = ''
  }

  //Получение данных из формы
  const getFormData = () => ({
    title: form.title.trim(),
    description: form.description.trim(),
    priority: form.priority.trim(),
    dueDate: form.dueDate
  })

  return {
    form,
    isValid,
    resetForm,
    getFormData
  }
}
