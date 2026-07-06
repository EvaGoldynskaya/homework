import { ref, computed, watch } from 'vue'

const STORAGE_KEY = 'taskList'

//Загрузка задач из localStorage
function loadTasks() {
  if (typeof localStorage === 'undefined') {
    return null
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) {
      return null
    }

    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : null
  } catch {
    return null
  }
}

export function useTaskList() {
  const savedTasks = loadTasks()
  const taskList = ref(savedTasks ?? [{
    id: 0,
    title: 'Полить цветы',
    description: 'Полить цветы в горшках на балконе и в комнате',
    status: false
  }])

  const searchQuery = ref('')

  //Сохранение задач в localStorage при изменении taskList
  watch(taskList, (value) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(value))
  }, { deep: true })

  //Добавление задачи в taskList
  const addTask = ({ form }) => {
    taskList.value = [
      ...taskList.value,
      {
        id: crypto.randomUUID(),
        title: form.title,
        description: form.description,
        status: false
      }
    ]
  }

  //Удаение задачи из taskList
  const removeTask = (id) => {
    taskList.value = taskList.value.filter(x => x.id !== id)
  }

  //Вычисление кол-ва задач и кол-ва выполненных задач
  const completedCount = computed(() => taskList.value.filter(item => item.status).length)
  const totalCount = computed(() => taskList.value.length)

  //Фильтрация задач по поисковому запросу
  const filteredTasks = computed(() => {
    const query = searchQuery.value.trim().toLowerCase()
    if (!query) {
      return taskList.value
    }

    return taskList.value.filter((item) => {
      return item.title.toLowerCase().includes(query) || item.description.toLowerCase().includes(query)
    })
  })

  return {
    taskList,
    filteredTasks,
    searchQuery,
    addTask,
    removeTask,
    completedCount,
    totalCount
  }
}