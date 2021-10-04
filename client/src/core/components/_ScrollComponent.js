/* eslint-disable radix */
import { DataUtil } from '../_utils/_DataUtil'
import { getObjectPropertyValueByKey } from '../_utils/helpers/types-helpers/_getObjectPropertyValueByKey'
import { getAttributeValueByBreakpoint } from '../_utils/helpers/getAttributeValueByBreakpoint'
import { stringSnakeToCamel } from '../_utils/helpers/types-helpers/_stringSnakeToCamel'
import { getViewPort } from '../_utils/helpers/dom-helpers/_getViewPort'
import { isVisibleElement } from '../_utils/helpers/dom-helpers/_isVisibleElement'
import { ElementStyleUtil } from '../_utils/_ElementStyleUtil'
import { throttle } from '../_utils/helpers/dom-helpers/_throttle'
import { getCSS } from '../_utils/helpers/dom-helpers/_getCSS'

const defaultScrollOptions = {
  saveState: false
}

class ScrollComponent {
  element = null

  options = defaultScrollOptions

  id = ''

  constructor(_element = null, options = defaultScrollOptions) {
    this.element = _element
    this.options = Object.assign(defaultScrollOptions, options)
    this.id = this.element.getAttribute('id') || ''
    this.update()
    DataUtil.set(this.element, 'scroll', this)
  }

  getOption = (name = '') => {
    if (this.element.hasAttribute(`data-bb-scroll-${name}`) === true) {
      const attr = this.element.getAttribute(`data-bb-scroll-${name}`) || ''
      let value = getAttributeValueByBreakpoint(attr)
      if (value !== null && String(value) === 'true') {
        value = true
      } else if (value !== null && String(value) === 'false') {
        value = false
      }

      return value
    }
    const optionName = stringSnakeToCamel(name)
    const option = getObjectPropertyValueByKey(this.options, optionName)
    if (option) {
      return getAttributeValueByBreakpoint(option)
    }
    return null
  }

  getHeightType = () => {
    if (this.getOption('height')) {
      return 'height'
    }
    if (this.getOption('min-height')) {
      return 'min-height'
    }
    if (this.getOption('max-height')) {
      return 'max-height'
    }
  }

  getAutoHeight = () => {
    let { height } = getViewPort()
    const dependencies = this.getOption('dependencies')
    const wrappers = this.getOption('wrappers')
    const offset = this.getOption('offset')

    // Height dependencies
    if (dependencies !== null) {
      const elements = document.querySelectorAll(dependencies)
      if (elements && elements.length > 0) {
        for (let i = 0, len = elements.length; i < len; i++) {
          const element = elements[i]
          if (isVisibleElement(element) === false) {
            // eslint-disable-next-line no-continue
            continue
          }

          height -= parseInt(getCSS(element, 'height'))
          height -= parseInt(getCSS(element, 'margin-top'))
          height -= parseInt(getCSS(element, 'margin-bottom'))

          const borderTop = getCSS(element, 'border-top')
          if (borderTop) {
            height -= parseInt(borderTop)
          }

          const borderBottom = getCSS(element, 'border-bottom')
          if (borderBottom) {
            height -= parseInt(borderBottom)
          }
        }
      }
    }

    // Wrappers
    if (wrappers !== null) {
      const elements = document.querySelectorAll(wrappers)
      if (elements && elements.length > 0) {
        for (let i = 0, len = elements.length; i < len; i++) {
          const element = elements[i]

          if (!isVisibleElement(element)) {
            // eslint-disable-next-line no-continue
            continue
          }

          height -= parseInt(getCSS(element, 'margin-top'))
          height -= parseInt(getCSS(element, 'margin-bottom'))
          height -= parseInt(getCSS(element, 'padding-top'))
          height -= parseInt(getCSS(element, 'padding-bottom'))

          const borderTop = getCSS(element, 'border-top')
          if (borderTop) {
            height -= parseInt(borderTop)
          }

          const borderBottom = getCSS(element, 'border-bottom')
          if (borderBottom) {
            height -= parseInt(borderBottom)
          }
        }
      }
    }

    // Custom offset
    if (offset !== null) {
      height -= parseInt(offset)
    }

    height -= parseInt(getCSS(this.element, 'margin-top'))
    height -= parseInt(getCSS(this.element, 'margin-bottom'))

    const borderTop = getCSS(this.element, 'border-top')
    if (borderTop) {
      height -= parseInt(borderTop)
    }

    const borderBottom = getCSS(this.element, 'border-bottom')
    if (borderBottom) {
      height -= parseInt(borderBottom)
    }

    height = `${String(height)}px`

    return height
  }

  setupHeight = () => {
    const height = this.getHeight()
    const heightType = this.getHeightType()

    // Set height
    if (height !== null && height.length > 0) {
      ElementStyleUtil.set(this.element, heightType, height)
    } else {
      ElementStyleUtil.set(this.element, heightType, '')
    }
  }

  // setupState = () => {
  //   if (this.getOption("save-state") === true && this.id) {
  //     const cookie = CookieComponent.get(this.id + "st");
  //     if (cookie) {
  //       var pos = parseInt(cookie);
  //
  //       if (pos > 0) {
  //         this.element.scrollTop = pos;
  //       }
  //     }
  //   }
  // };
  //
  // setupScrollHandler = () => {
  //   if (this.getOption('save-state') === true && this.id) {
  //     this.element.addEventListener('scroll', this.scrollHandler);
  //   } else {
  //     this.element.removeEventListener('scroll', this.scrollHandler);
  //   }
  // };

  // scrollHandler = () => {
  //   const cookieId = this.id + "st";
  //   CookieComponent.set(cookieId, this.element.scrollTop, {});
  // };

  // private destroyScrollHandler = () => {
  //   this.element.removeEventListener("scroll", this.scrollHandler);
  // };

  resetHeight = () => {
    ElementStyleUtil.set(this.element, 'height', '')
    ElementStyleUtil.set(this.element, 'max-height', '')
    ElementStyleUtil.set(this.element, 'min-height', '')
  }

  update = () => {
    // Activate/deactivate
    if (
      this.getOption('activate') === true
      || !this.element.hasAttribute('data-bb-scroll-activate')
    ) {
      this.setupHeight()
      // this.setupScrollHandler();
      // this.setupState();
    } else {
      this.resetHeight()
      // this.destroyScrollHandler();
    }
  }

  getHeight = () => {
    const height = this.getOption('height')
    if (height instanceof Function) {
      return height.call(height)
    } if (
      height !== null
      && typeof height === 'string'
      && height.toLowerCase() === 'auto'
    ) {
      return this.getAutoHeight()
    }
    return height
  }

  getElement = () => this.element

  // Static methods
  static hasInstance(element) {
    return DataUtil.has(element, 'scroll')
  }

  static getInstance(element) {
    if (element !== null && ScrollComponent.hasInstance(element)) {
      return DataUtil.get(element, 'scroll')
    }
  }

  // Create Instances
  static createInstances(selector = '') {
    const elements = document.body.querySelectorAll(selector)
    elements.forEach((element) => {
      const item = element
      let scroll = ScrollComponent.getInstance(item)
      if (!scroll) {
        scroll = new ScrollComponent(item, defaultScrollOptions)
      }
    })
  }

  // static destroyAll(attr = '[data-bb-scroll="true"]') {
  //
  // }

  static bootstrap(attr = '[data-bb-scroll="true"]') {
    ScrollComponent.createInstances(attr)
    ScrollComponent.resize()
  }

  static createInstance(selector = '', options = defaultScrollOptions) {
    const element = document.body.querySelector(selector)
    if (!element) {
      return
    }
    const item = element
    let scroll = ScrollComponent.getInstance(item)
    if (!scroll) {
      scroll = new ScrollComponent(item, options)
    }
    return scroll
  }

  static reinitialization(attr = '[data-bb-scroll="true"]') {
    ScrollComponent.createInstances(attr)
  }

  static resize() {
    // Window Resize Handling
    window.addEventListener('resize', () => {
      let timer
      throttle(
        timer,
        () => {
          // Locate and update Drawer instances on window resize
          const elements = document.body.querySelectorAll('[data-scroll]')
          elements.forEach((element) => {
            ScrollComponent.getInstance(element).update()
          })
        },
        200
      )
    })
  }
}

export { ScrollComponent, defaultScrollOptions }
