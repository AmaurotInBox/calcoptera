import { defineStore } from 'pinia'

export const useGlobalLoaderStore = defineStore('globalLoader', {
  state: () => ({
    globalLoading: false,
  }),
  actions: {
    setGlobalLoading(globalLoading: boolean) {
      this.globalLoading = globalLoading
    },
  },
})
