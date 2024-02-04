import type { RouteRecordRaw } from 'vue-router'
import { MainPage } from '@/pages/MainPage'
import { PageNotFound } from '@/pages/NotFoundPage'

export const enum AppRoutes {
  MAIN = 'main',
  // last
  NOT_FOUND = 'not_found',
}

export const RoutePaths: Record<AppRoutes, string> = {
  [AppRoutes.MAIN]: '/',
  [AppRoutes.NOT_FOUND]: '/:pathMatch(.*)*',
}

export type RouteRecordRawExtended = RouteRecordRaw & {
  name: AppRoutes
}

export const routeList: RouteRecordRawExtended[] = [
  {
    path: RoutePaths[AppRoutes.MAIN],
    name: AppRoutes.MAIN,
    component: MainPage,
  },
  {
    path: RoutePaths[AppRoutes.NOT_FOUND],
    name: AppRoutes.NOT_FOUND,
    component: PageNotFound,
  },
]
