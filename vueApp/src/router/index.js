import { createRouter, createWebHistory } from 'vue-router';

import TaskListPage from '../pages/TaskListPage.vue'
import TaskPage from '../pages/TaskPage.vue'
import TasksLayout from '../pages/TasksLayout.vue'
import AboutPage from '../pages/AboutPage.vue'

const routes = [
  { path: '/', redirect: '/tasks' },
  {
    path: '/tasks',
    component: TasksLayout,
    children: [
      { path: '', component: TaskListPage },
      { path: ':id', name: 'task', component: TaskPage }
    ]
  },
  { path: '/about', component: AboutPage },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})