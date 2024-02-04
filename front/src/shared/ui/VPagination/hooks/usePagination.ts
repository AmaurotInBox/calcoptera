import type { Ref } from 'vue'
import { computed } from 'vue'

const enum PageType {
  Page = 'page',
  Ellipsis = 'ellipsis',
  Current = 'current',
}

interface IPage {
  number: number
  type: PageType
}

export function usePagination(current: Ref<number>, total: Ref<number>, pagesToShow: Ref<number>) {
  const toShow = computed(() => pagesToShow.value)

  const currentPage = computed(() => {
    const page = current.value

    if (page < 1) {
      return 1
    }

    if (page > total.value) {
      return total.value
    }

    return page
  })

  const isFirstPage = computed(() => currentPage.value <= 1)
  const isLastPage = computed(() => currentPage.value >= total.value)
  const nextPage = computed(() => (isLastPage.value ? currentPage.value : currentPage.value + 1))

  const rightPadSize = computed(() => {
    const startMissingItems = 1 + toShow.value + 2 - currentPage.value

    if (startMissingItems <= 0) {
      return toShow.value
    }

    return toShow.value + startMissingItems
  })

  const leftPadSize = computed(() => {
    const endMissingItems = currentPage.value - (total.value - toShow.value - 2)

    if (endMissingItems <= 0) {
      return toShow.value
    }

    return toShow.value + endMissingItems
  })

  const pages = computed<IPage[]>(() => {
    const pagesColl: IPage[] = []

    for (let i = 1; i <= total.value; i++) {
      const page = createPage(i, getPageType(i))

      if (page.type === PageType.Ellipsis) {
        const next =
          i < currentPage.value ? currentPage.value - (leftPadSize.value + 1) : total.value - 1

        if (i < next) {
          i = next
        }
      }

      pagesColl.push(page)
    }

    return pagesColl
  })

  function createPage(number: number, type: PageType) {
    return {
      number: type === PageType.Ellipsis ? 0 : number,
      type,
    }
  }

  function getPageType(page: number): PageType {
    if (isCurrentPage(page)) {
      return PageType.Current
    }

    if (isEllipsis(page)) {
      return PageType.Ellipsis
    }

    return PageType.Page
  }

  function isCurrentPage(page: number) {
    return page === currentPage.value
  }

  function isEllipsis(page: number) {
    if (toShow.value < 0) {
      return false
    }

    if (page < currentPage.value) {
      const nextPage = currentPage.value - leftPadSize.value

      return page > 1 && page < nextPage - 1
    }

    const lastPage = currentPage.value + rightPadSize.value

    return page < total.value - 1 && page > lastPage
  }

  return {
    currentPage,
    isFirstPage,
    pages,
    isLastPage,
    nextPage,
  }
}
