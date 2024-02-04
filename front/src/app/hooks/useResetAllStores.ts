import { getActivePinia, type Pinia } from 'pinia'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/features/auth'
import { resetServeralStores, type StoreForReset } from '@/shared/libs/stores/resetServeralStores'
import { AppRoutes } from '@/shared/config/router'

interface ExtendedPinia extends Pinia {
  _s: Map<string, StoreForReset>
}

export const useResetAllStores = () => {
  const router = useRouter()
  const authStore = useAuthStore()

  const resetAllStores = () => {
    /**
     * сохраним была ли ошибка авторизации при обнулении токена,
     * после reset всех сторов и редиректа на auth поставим этот флаг
     * для отображения ошибки в форме авторизации
     */

    const isAuthError = authStore.isAuthError

    const pinia = getActivePinia() as ExtendedPinia

    if (!pinia) {
      throw new Error('There is no stores')
    }

    const storesDefinitionsForReset = Array.from(pinia._s.values()).map((store) => {
      return () => store
    })

    resetServeralStores(storesDefinitionsForReset)

    if (router.currentRoute.value.name !== AppRoutes.AUTH) {
      router
        .replace({
          name: AppRoutes.AUTH,
        })
        .then(() => {
          authStore.setAuthError(isAuthError)
        })
    }
  }

  return {
    resetAllStores,
  }
}
