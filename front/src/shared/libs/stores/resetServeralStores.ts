export interface StoreForReset {
  $reset: () => void
  reset?: () => void
}

type StoreDefinitionForReset = () => StoreForReset

export const resetServeralStores = (storeDefinitions: Array<StoreDefinitionForReset>) => {
  storeDefinitions.forEach((definition) => {
    const store = definition()
    if (store.reset && typeof store.reset === 'function') {
      store.reset()
    } else {
      store.$reset()
    }
  })
}
