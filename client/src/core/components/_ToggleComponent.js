import { DataUtil } from '../_utils/_DataUtil'
// Helpers
import { getUniqueIdWithPrefix } from '../_utils/helpers/types-helpers/_getUniqueIdWithPrefix'
import { EventHandlerUtil } from '../_utils/EventHandlerUtil'

const defaultToggleOptions = {
  saveState: false,
}

class ToggleComponent {
  element = null

  instanceUid = ''

  options = {}

  state = ''

  target = null

  attribute = ''

  constructor(_element = null, options = {}) {
    this.options = Object.assign(defaultToggleOptions, options)
    this.instanceUid = getUniqueIdWithPrefix('toggle')
    this.element = _element

    const elementTargetAttr = this.element.getAttribute(
      'data-bb-toggle-target'
    )
    if (elementTargetAttr) {
      this.target = document.querySelector(elementTargetAttr)
    }
    const elementToggleAttr = this.element.getAttribute('data-bb-toggle-state')
    this.state = elementToggleAttr || ''
    this.attribute = `data-bb-${this.element.getAttribute('data-bb-toggle-name')}`
    // Event Handlers
    this._handlers()

    // Update Instance
    // Bind Instance
    DataUtil.set(this.element, 'toggle', this)
  }

  _handlers = () => {
    this.element.addEventListener('click', (e) => {
      e.preventDefault()
      this._toggle()
    })
  }

  // Event handlers
  _toggle = () => {
    // Trigger "after.toggle" event
    EventHandlerUtil.trigger(this.element, 'bb.toggle.change')

    if (this._isEnabled()) {
      this._disable()
    } else {
      this._enable()
    }

    // Trigger "before.toggle" event
    EventHandlerUtil.trigger(this.element, 'bb.toggle.changed')
    return this
  }

  _enable = () => {
    if (this._isEnabled()) {
      return
    }

    EventHandlerUtil.trigger(this.element, 'bb.toggle.enable')
    this.target.setAttribute(this.attribute, 'on')
    if (this.state.length > 0) {
      this.element.classList.add(this.state)
    }

    EventHandlerUtil.trigger(this.element, 'bb.toggle.enabled')
    return this
  }

  _disable = () => {
    if (!this._isEnabled()) {
      return false
    }

    EventHandlerUtil.trigger(this.element, 'bb.toggle.disable')
    this.target.removeAttribute(this.attribute)

    if (this.state.length > 0) {
      this.element.classList.remove(this.state)
    }

    EventHandlerUtil.trigger(this.element, 'bb.toggle.disabled')
    return this
  }

  _isEnabled = () => {
    if (!this.target) {
      return false
    }

    return (
      String(this.target.getAttribute(this.attribute)).toLowerCase() === 'on'
    )
  }

  // Plugin API
  toggle = () => this._toggle()

  enable = () => this._enable()

  disable = () => this._disable()

  isEnabled = () => this._isEnabled()

  goElement = () => this.element

  // Event API
  on = (name = '', handler = null) => EventHandlerUtil.on(this.element, name, handler)

  one = (name = '', handler = null) => EventHandlerUtil.one(this.element, name, handler)

  off = (name = null) => EventHandlerUtil.off(this.element, name)

  trigger = (name = null, event) => EventHandlerUtil.trigger(this.element, name, event)

  static getInstance = (el = null) => {
    const toggleElement = DataUtil.get(el, 'toggle')
    if (toggleElement) {
      return toggleElement
    }

    return null
  }

  static createInstances = (selector = '') => {
    const elements = document.body.querySelectorAll(selector)
    elements.forEach((el) => {
      const item = el
      let toggleElement = ToggleComponent.getInstance(item)
      if (!toggleElement) {
        toggleElement = new ToggleComponent(item, defaultToggleOptions)
      }
    })
  }

  static createInstance = (
    selector = '',
    options = defaultToggleOptions
  ) => {
    const element = document.body.querySelector(selector)
    if (!element) {
      return
    }
    const item = element
    let toggle = ToggleComponent.getInstance(item)
    if (!toggle) {
      toggle = new ToggleComponent(item, options)
    }
    return toggle
  }

  static reinitialization = () => {
    ToggleComponent.createInstances('[data-bb-toggle]')
  }

  static bootstrap = () => {
    ToggleComponent.createInstances('[data-bb-toggle]')
  }
}

export { ToggleComponent, defaultToggleOptions }
