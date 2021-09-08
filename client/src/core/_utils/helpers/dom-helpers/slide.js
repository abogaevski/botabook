import { isVisibleElement } from './_isVisibleElement'
import { getElementActualHeight } from './_getElementActual'
import { ElementStyleUtil } from '../../_ElementStyleUtil'
import { DataUtil } from '../../_DataUtil'
import { ElementAnimateUtil } from '../../ElementAnimateUtil'

export function slide(el = null, dir = '', speed = 0, callback = null) {
  if (!el
    || (dir === 'up' && isVisibleElement(el) === false)
    || (dir === 'down' && isVisibleElement(el) === true)
  ) {
    return
  }

  // eslint-disable-next-line no-param-reassign
  speed = speed || 600
  const calcHeight = getElementActualHeight(el)
  let calcPaddingTop = 0
  let calcPaddingBottom = 0

  if (
    ElementStyleUtil.get(el, 'padding-top')
    && DataUtil.get(el, 'slide-padding-top') !== true
  ) {
    DataUtil.set(
      el,
      'slide-padding-top',
      ElementStyleUtil.get(el, 'padding-top')
    )
  }

  if (
    ElementStyleUtil.get(el, 'padding-bottom')
    && DataUtil.has(el, 'slide-padding-bottom') !== true
  ) {
    DataUtil.set(
      el,
      'slide-padding-bottom',
      ElementStyleUtil.get(el, 'padding-bottom')
    )
  }

  if (DataUtil.has(el, 'slide-padding-top')) {
    // eslint-disable-next-line radix
    calcPaddingTop = parseInt(DataUtil.get(el, 'slide-padding-top'))
  }

  if (DataUtil.has(el, 'slide-padding-bottom')) {
    // eslint-disable-next-line radix
    calcPaddingBottom = parseInt(DataUtil.get(el, 'slide-padding-bottom'))
  }

  if (dir === 'up') {
    el.style.cssText = 'display: block; overflow: hidden;'

    if (calcPaddingTop) {
      ElementAnimateUtil.animate(0, calcPaddingTop, speed, (value) => {
        el.style.paddingTop = `${calcPaddingTop - value}px`
      })
    }

    if (calcPaddingBottom) {
      ElementAnimateUtil.animate(0, calcPaddingBottom, speed, (value) => {
        el.style.paddingBottom = `${calcPaddingBottom - value}px`
      })
    }

    ElementAnimateUtil.animate(0, calcHeight || 0, speed, (value) => {
      el.style.height = `${(calcHeight || 0) - value}px`
    },
    () => {
      el.style.height = ''
      el.style.display = 'none'

      if (typeof callback === 'function') {
        callback()
      }
    })
  } else if (dir === 'down') {
    el.style.cssText = 'display: block; overflow: hidden;'

    if (calcPaddingTop) {
      ElementAnimateUtil.animate(0, calcPaddingTop, speed, (value) => {
        el.style.paddingTop = `${value}px`
      },
      () => {
        el.style.paddingTop = ''
      })
    }

    if (calcPaddingBottom) {
      ElementAnimateUtil.animate(0, calcPaddingBottom, speed, (value) => {
        el.style.paddingBottom = `${value}px`
      },
      () => {
        el.style.paddingBottom = ''
      })
    }

    ElementAnimateUtil.animate(0, (calcHeight || 0), speed, (value) => {
      el.style.height = `${value}px`
    },
    () => {
      el.style.height = ''
      el.style.display = ''
      el.style.overflow = ''

      if (typeof callback === 'function') {
        callback()
      }
    })
  }
}

export function slideUp(el = null, speed = 0, callback = null) {
  slide(el, 'up', speed, callback)
}

export function slideDown(el = null, speed = 0, callback = null) {
  slide(el, 'down', speed, callback)
}
