import { createRouter, createWebHistory } from 'vue-router'
import { routeList } from '@/shared/config/router'

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routeList,
})
