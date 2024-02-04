import { reactive } from 'vue'
import ResizeObserver from 'resize-observer-polyfill'
import throttle from 'lodash/throttle'

const limits = {
  mobile: 767,
  tablet: 1279,
  desktop: 1919,
}

type BreakpointsVariants = 'desktopLarge' | 'desktop' | 'tablet' | 'mobile'

const defaultBreakpoints = {
  current: 'desktop' as BreakpointsVariants,

  mobile: false,
  gtMobile: true,

  tablet: false,
  gtTablet: true,
  ltTablet: false,
  desktop: true,
  gtDesktop: false,
  ltDesktop: false,

  desktopLarge: false,
  ltDesktopLarge: true,

  width: 1280,
  height: 0,
}

export type Breakpoints = typeof defaultBreakpoints

const calculateBreakpoints = (breakpoints: Breakpoints, { width, height }: DOMRectReadOnly) => {
  const { mobile, tablet, desktop } = limits

  if (width <= mobile) {
    breakpoints.current = 'mobile'
  } else if (width > mobile && width <= tablet) {
    breakpoints.current = 'tablet'
  } else if (width > tablet && width <= desktop) {
    breakpoints.current = 'desktop'
  } else if (width > desktop) {
    breakpoints.current = 'desktopLarge'
  }

  breakpoints.mobile = width <= mobile
  breakpoints.gtMobile = width > mobile

  breakpoints.tablet = width <= tablet && width > mobile
  breakpoints.gtTablet = width > tablet
  breakpoints.ltTablet = width <= mobile

  breakpoints.desktop = width <= desktop && width > tablet
  breakpoints.gtDesktop = width > desktop
  breakpoints.ltDesktop = width <= tablet

  breakpoints.desktopLarge = width > desktop
  breakpoints.ltDesktopLarge = width <= desktop

  breakpoints.width = width
  breakpoints.height = height
}

export const useBreakpoints = (() => {
  const breakpoints: Breakpoints = reactive(defaultBreakpoints)

  const bodyElem = document.querySelector('body')

  const resizeObserver = new ResizeObserver(
    throttle(
      (entries: ResizeObserverEntry[]) => {
        const [{ contentRect }] = entries
        calculateBreakpoints(breakpoints, contentRect)
      },
      200,
      { trailing: true, leading: false },
    ),
  )

  resizeObserver.observe(bodyElem as Element)

  return () => breakpoints
})()
