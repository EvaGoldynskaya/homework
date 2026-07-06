import { reactive, computed } from 'vue'

export function useTaskInput() {
  //Форма ввода задачи
  const form = reactive({title: '', description: ''})

  //Проверка валидности формы ввода (не пустые title и description)
  const isValid = computed(() => {
    return form.title.trim() !== '' && form.description.trim() !== ''
  })

  //Сброс формы
  const resetForm = () => {
    form.title = ''
    form.description = ''
  }

  //Получение данных из формы
  const getFormData = () => ({
    title: form.title.trim(),
    description: form.description.trim()
  })

  return {
    form,
    isValid,
    resetForm,
    getFormData
  }
}
