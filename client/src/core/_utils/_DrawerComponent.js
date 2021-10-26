import { DataUtil } from './_DataUtil'
// Utils
import { EventHandlerUtil } from './EventHandlerUtil'
// Helpers
import { getUniqueIdWithPrefix } from './helpers/types-helpers/_getUniqueIdWithPrefix'
import { getObjectPropertyValueByKey } from './helpers/types-helpers/_getObjectPropertyValueByKey'
import { stringSnakeToCamel } from './helpers/types-helpers/_stringSnakeToCamel'
import { getAttributeValueByBreakpoint } from './helpers/getAttributeValueByBreakpoint'
import { throttle } from './helpers/dom-helpers/_throttle'
import { DOMEventHandlerUtil } from './_DOMEventHandlerUtil'
import { ElementStyleUtil } from './_ElementStyleUtil'
import { getCSS } from './helpers/dom-helpers/_getCSS'

const defaultDrawerOptions = {
  overlay: true,
  baseClass: 'drawer',
  overlayClass: 'drawer-overlay',
  direction: 'end'
}

class DrawerComponent {
  element = null

  overlayElement = null

  toggleElement = null

  options = defaultDrawerOptions

  instanceUid = ''

  name = ''

  shown = false

  lastWidth = 0

  closeElement = null

  constructor(_element = null, options = defaultDrawerOptions) {
    this.element = _element
    this.options = Object.assign(defaultDrawerOptions, options)
    this.instanceUid = getUniqueIdWithPrefix('drawer')
    this.overlayElement = null
    this.name = this.element.getAttribute('data-bb-drawer-name') || ''
    this.shown = false
    this.toggleElement = null
    // Event Handlers
    this._handlers()
    // Update Instance
    this._update()
    // Bind Instance
    DataUtil.set(this.element, 'drawer', this)
  }

  _handlers = () => {
    const togglers = this._getOption('toggle')
    const closers = this._getOption('close')

    if (togglers !== null && togglers.length > 0) {
      DOMEventHandlerUtil.on(document.body, togglers, 'click', (e) => {
        e.preventDefault()
        this.toggleElement = document.getElementById(togglers)
        this._toggle()
      })
    }

    if (closers !== null && closers.length > 0) {
      DOMEventHandlerUtil.on(document.body, closers, 'click', (e) => {
        e.preventDefault()
        this.closeElement = document.getElementById(closers)

        this._hide()
      })
    }
  }

  _update = () => {
    const width = String(this._getOption('width'))
    const direction = String(this._getOption('direction'))

    // Reset state
    const hasBaseClass = this.element.classList.contains(
      `${this.options.baseClass}-on`
    )
    const bodyCanvasAttr = String(
      document.body.getAttribute(`data-bb-drawer-${this.name}-`)
    )

    this.shown = hasBaseClass === true && bodyCanvasAttr === 'on'

    // Activate/deactivate
    if (this._getOption('activate') === true) {
      this.element.classList.add(this.options.baseClass)
      this.element.classList.add(
        `${this.options.baseClass}-${direction}`
      )
      ElementStyleUtil.set(this.element, 'width', width, true)

      // eslint-disable-next-line radix
      this.lastWidth = parseInt(width)
    } else {
      ElementStyleUtil.set(this.element, 'width', '')
      this.element.classList.remove(this.options.baseClass)
      this.element.classList.remove(
        `${this.options.baseClass}-${direction}`
      )
      this._hide()
    }
  }

  _getOption = (name = '') => {
    const attr = this.element.getAttribute(`data-bb-drawer-${name}`)
    if (attr) {
      const value = getAttributeValueByBreakpoint(attr)
      if (value !== null && String(value) === 'true') {
        return true
      }
      if (value !== null && String(value) === 'false') {
        return false
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

  _toggle = () => {
    if (
      EventHandlerUtil.trigger(this.element, 'bb.drawer.toggle') === false
    ) {
      return
    }

    if (this.shown) {
      this._hide()
    } else {
      this._show()
    }

    EventHandlerUtil.trigger(this.element, 'bb.drawer.toggled')
  }

  _hide = () => {
    if (EventHandlerUtil.trigger(this.element, 'bb.drawer.hide') === false) {
      return
    }

    this.shown = false
    this._deleteOverlay()
    document.body.removeAttribute(`data-bb-drawer-${this.name}`)
    document.body.removeAttribute('data-bb-drawer')
    this.element.classList.remove(`${this.options.baseClass}-on`)
    if (this.toggleElement != null) {
      this.toggleElement.classList.remove('active')
    }

    EventHandlerUtil.trigger(this.element, 'bb.drawer.after.hidden')
  }

  _show = () => {
    if (EventHandlerUtil.trigger(this.element, 'bb.drawer.show') === false) {
      return
    }

    this.shown = true
    this._createOverlay()
    document.body.setAttribute(`data-bb-drawer-${this.name}`, 'on')
    document.body.setAttribute('data-bb-drawer', 'on')
    this.element.classList.add(`${this.options.baseClass}-on`)
    if (this.toggleElement !== null) {
      this.toggleElement.classList.add('active')
    }

    EventHandlerUtil.trigger(this.element, 'bb.drawer.shown')
  }

  _createOverlay = () => {
    if (this._getOption('overlay') === true) {
      this.overlayElement = document.createElement('DIV')
      const elementZIndex = getCSS(this.element, 'z-index')
      if (elementZIndex) {
        // eslint-disable-next-line radix
        const overlayZindex = parseInt(elementZIndex) - 1
        ElementStyleUtil.set(this.overlayElement, 'z-index', overlayZindex) // update
      }
      document.body.append(this.overlayElement)
      const overlayClassOption = this._getOption('overlay-class')
      if (overlayClassOption) {
        this.overlayElement.classList.add(overlayClassOption.toString())
      }
      this.overlayElement.addEventListener('click', (e) => {
        e.preventDefault()
        this._hide()
      })
    }
  }

  _deleteOverlay = () => {
    if (this.overlayElement !== null && this.overlayElement.parentNode) {
      this.overlayElement.parentNode.removeChild(this.overlayElement)
    }
  }

  _getDirection = () => (String(this._getOption('direction')) === 'left' ? 'left' : 'right')

  _getWidth = () => {
    let width = this._getOption('width')
    if (width && width === 'auto') {
      width = getCSS(this.element, 'width')
    }

    return width
  }

  /// ////////////////////
  // ** Public API  ** //
  /// ////////////////////
  toggle = () => {
    this._toggle()
  }

  show = () => {
    this._show()
  }

  hide = () => {
    this._hide()
  }

  isShown = () => this.shown

  update = () => {
    this._update()
  }

  goElement = () => this.element

  // Event API
  on = (name = '', handler) => EventHandlerUtil.on(this.element, name, handler)

  one = (name = '', handler) => EventHandlerUtil.one(this.element, name, handler)

  off = (name = '') => EventHandlerUtil.off(this.element, name)

  trigger = (name = '', event) => EventHandlerUtil.trigger(this.element, name, event)

  // Static methods
  static hasInstance = (element) => DataUtil.has(element, 'drawer')

  static getInstance = (element) => DataUtil.get(element, 'drawer')

  static hideAll = () => {
    const oldInstances = DataUtil.getAllInstancesByKey('drawer')
    oldInstances.forEach((dr) => {
      dr.hide()
    })
  }

  static updateAll = () => {
    const oldInstances = DataUtil.getAllInstancesByKey('drawer')
    oldInstances.forEach((dr) => {
      dr.update()
    })
  }

  // Create Instances
  static createInstances(selector) {
    const elements = document.body.querySelectorAll(selector)
    elements.forEach((element) => {
      const item = element
      let drawer = DrawerComponent.getInstance(item)
      if (!drawer) {
        drawer = new DrawerComponent(item, defaultDrawerOptions)
      }
      drawer.element = item;
      drawer.hide()
    })
  }

  static handleDismiss = () => {
    // External drawer toggle handler
    DOMEventHandlerUtil.on(document.body, '[data-bb-drawer-dismiss="true"]', 'click', () => {
      const element = this.closest('[data-bb-drawer="true"]')
      if (element) {
        const drawer = DrawerComponent.getInstance(element)
        if (drawer && drawer.isShown()) {
          drawer.hide()
        }
      }
    })
  }

  // Global Initialization
  static initGlobalHandlers() {
    // Window Resize Handling
    window.addEventListener('resize', () => {
      let timer
      throttle(
        timer,
        () => {
          // Locate and update Drawer instances on window resize
          const elements = document.body.querySelectorAll(
            '[data-bb-drawer="true"]'
          )
          elements.forEach((el) => {
            const instance = DrawerComponent.getInstance(el)
            if (instance) {
              instance.element = el;
              instance.update()
            }
          })
        },
        200
      )
    })
  }

  static bootstrap = () => {
    DrawerComponent.createInstances('[data-bb-drawer="true"]')
    DrawerComponent.initGlobalHandlers()
    DrawerComponent.handleDismiss()
  }

  static reinitialization = () => {
    DrawerComponent.createInstances('[data-bb-drawer="true"]')
    DrawerComponent.hideAll()
    DrawerComponent.updateAll()
    DrawerComponent.handleDismiss()
  }
}

export { DrawerComponent, defaultDrawerOptions }
