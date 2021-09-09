import { DataUtil } from '../_utils/_DataUtil'
import { EventHandlerUtil } from '../_utils/EventHandlerUtil'
import { getUniqueIdWithPrefix } from '../_utils/helpers/types-helpers/_getUniqueIdWithPrefix'
import { ElementStyleUtil } from '../_utils/_ElementStyleUtil'

const defaultImageInputOptions = {
  editable: false
}

class ImageInputComponent {
  element = null

  inputElement = null

  wrapperElement = null

  cancelElement = null

  removeElement = null

  hiddenElement = null

  src = ''

  options = defaultImageInputOptions

  instanceUid = ''

  constructor(_element = null, options) {
    this.element = _element
    this.options = Object.assign(defaultImageInputOptions, options)
    this.instanceUid = getUniqueIdWithPrefix('imageinput')
    this.element = _element
    this.inputElement = _element.querySelector('input[type="file"]')
    this.wrapperElement = _element.querySelector('.image-input-wrapper')
    this.cancelElement = _element.querySelector('[data-bb-image-input-action="cancel"]')
    this.removeElement = _element.querySelector('[data-bb-image-input-action="remove"]')
    this.hiddenElement = _element.querySelector('input[type="hidden"]')
    // TODO: Check if it blank
    this.src = ElementStyleUtil.get(this.wrapperElement, 'background-image')

    // Event Handlers
    this._handlers()

    // Bind Instance
    DataUtil.set(this.element, 'imageinput', this)
  }

  _handlers = () => {
    this.inputElement.addEventListener('change', this.change)
    this.cancelElement.addEventListener('click', this.cancel)
    this.removeElement.addEventListener('click', this.remove)
  }

  // Event Handlers
  change = (e) => {
    e.preventDefault()

    if (
      this.inputElement !== null
      && this.inputElement.files
      && this.inputElement.files[0]
    ) {
      if (EventHandlerUtil.trigger(this.element, 'bb.imageinput.change', e) === false) {
        return
      }
      const reader = new FileReader()

      reader.onload = (_e) => {
        ElementStyleUtil.set(
          this.wrapperElement,
          'background-image',
          `url(${_e.target?.result})`
        )
      }

      reader.readAsDataURL(this.inputElement.files[0])

      this.element.classList.add('image-input-changed')
      this.element.classList.remove('image-input-empty')

      // Fire change event
      EventHandlerUtil.trigger(this.element, 'bb.imageinput.changed', e)
    }
  }

  cancel = (e) => {
    e.preventDefault()

    // Fire cancel event
    if (EventHandlerUtil.trigger(this.element, 'bb.imageinput.cancel', e) === false) {
      return
    }
    this.element.classList.remove('image-input-changed')
    this.element.classList.remove('image-input-empty')
    ElementStyleUtil.set(this.wrapperElement, 'background-image', this.src)
    this.inputElement.value = ''
    if (this.hiddenElement) {
      this.hiddenElement.value = '0'
    }

    EventHandlerUtil.trigger(this.element, 'bb.imageinput.canceled', e)
  }

  remove = (e) => {
    e.preventDefault()

    // Fire cancel event
    if (EventHandlerUtil.trigger(this.element, 'bb.imageinput.remove', e) === false) {
      return
    }

    this.element.classList.remove('image-input-changed')
    this.element.classList.add('image-input-empty')
    ElementStyleUtil.set(this.wrapperElement, 'background-image', 'none')
    this.inputElement.value = ''

    if (this.hiddenElement) {
      this.hiddenElement.value = '1'
    }

    EventHandlerUtil.trigger(this.element, 'bb.imageinput.removed', e)
  }

  getInputElement = () => this.inputElement

  goElement = () => this.element

  // Event API
  on = (name = '', handler = null) => EventHandlerUtil.on(this.element, name, handler)

  one = (name = '', handler = null) => EventHandlerUtil.one(this.element, name, handler)

  off = (name = '') => EventHandlerUtil.off(this.element, name)

  trigger = (name = '', event) => EventHandlerUtil.trigger(this.element, name, event)

  // Static methods
  static hasInstance = (element = null) => DataUtil.has(element, 'imageinput')

  static getInstance = (element = null) => {
    if (element !== null && ImageInputComponent.hasInstance(element)) {
      return DataUtil.get(element, 'imageinput')
    }
  }

  // Create Instances
  static createInstances = (selector = '') => {
    const elements = document.body.querySelectorAll(selector)
    elements.forEach((element) => {
      const item = element
      let imageInput = ImageInputComponent.getInstance(item)
      if (!imageInput) {
        imageInput = new ImageInputComponent(item, defaultImageInputOptions)
      }
    })
  }

  static bootstrap = (attr = '[data-bb-image-input]') => {
    ImageInputComponent.createInstances(attr)
  }

  static reinitialization = (attr = '[data-bb-image-input]') => {
    ImageInputComponent.createInstances(attr)
  }
}

export { ImageInputComponent, defaultImageInputOptions }
