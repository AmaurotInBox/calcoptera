import { ref } from 'vue'

export function useModal(_show: boolean = false) {
  const show = ref(_show)

  const showModal = () => {
    show.value = true
  }

  const closeModal = () => {
    show.value = false
  }

  return { show, showModal, closeModal }
}
