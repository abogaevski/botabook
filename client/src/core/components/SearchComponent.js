import { DataUtil } from '../_utils/_DataUtil'
// Helpers
import { getUniqueIdWithPrefix } from '../_utils/helpers/types-helpers/_getUniqueIdWithPrefix'
import { getAttributeValueByBreakpoint } from '../_utils/helpers/getAttributeValueByBreakpoint'
import { stringSnakeToCamel } from '../_utils/helpers/types-helpers/_stringSnakeToCamel'
import { getObjectPropertyValueByKey } from '../_utils/helpers/types-helpers/_getObjectPropertyValueByKey'
import { defaultMenuOptions, MenuComponent } from './MenuComponent'

const dNone = 'd-none'

const defaultSearchOptions = {
  minLength: 3,
  keypress: true,
  enter: true,
  mode: 'inline',
  remember: true,
  inputFocus: true,
  process: ''
}

class SearchComponent {
  element = null

  options = defaultMenuOptions

  instanceUid = ''

  processing = false

  mode = null

  triggerElement = null

  inputElement = null

  spinnerElement = null

  clearElement = null

  resultsElement = null

  suggestionsElement = null

  emptyElement = null

  menu = null

  menuObject = null

  constructor(_element = null, options) {
    this.element = _element
    this.options = Object.assign(defaultSearchOptions, options)
    this.instanceUid = getUniqueIdWithPrefix('search')
    this.processing = false

    // Elements
    this.mode = this._getOption('mode')
    this.triggerElement = document.querySelector(this._getSelector('trigger'))
    this.inputElement = document.querySelector(this._getSelector('input'))
    this.spinnerElement = document.querySelector(this._getSelector('spinner'))
    this.clearElement = document.querySelector(this._getSelector('clear'))
    this.resultsElement = document.querySelector(this._getSelector('results'))
    this.suggestionsElement = document.querySelector(this._getSelector('suggestions'))
    this.emptyElement = document.querySelector(this._getSelector('empty'))
    if (this.mode === 'menu') {
      const attr = this.element.getAttribute('data-bb-menu-target')
      if (attr) {
        this.menu = document.querySelector(attr)
        if (this.menu) {
          this.menuObject = new MenuComponent(this.menu, defaultMenuOptions)
        }
      }
    } else if (this.mode === 'inline') {
      this.menu = this.element.closest('[data-bb-menu]')
      if (this.menu) {
        this.menuObject = MenuComponent.getInstance(this.menu)
        if (this.menuObject && this._getOption('input-focus') === true) {
          this.menuObject.on('bb.menu.dropdown.shown', () => {
            this.inputElement?.focus()
          })
        }
      }
    }

    // Event Handlers
    this._handlers()

    // Bind Instance
    DataUtil.set(this.element, 'search', this)
  }

  _clear = () => {
    if (this.inputElement) {
      this.inputElement.value = ''
      this.inputElement.focus()
    }

    this.clearElement?.classList.add(dNone)
    if (this.emptyElement) {
      this.emptyElement.innerHTML = ''
      this.emptyElement.classList.add(dNone)
    }

    if (this.resultsElement) {
      this.resultsElement.innerHTML = ''
      this.resultsElement.classList.add(dNone)
    }

    if (this.suggestionsElement) {
      this.suggestionsElement.classList.remove(dNone)
    } else if (this.mode === 'menu') {
      this.menuObject?.show(this.element)
    }
  }

  // eslint-disable-next-line no-unused-vars
  _getSelector = (name = '') => {
    const emptySelector = '#empty-selector'
    const trigger = this._getOption('trigger')
    return typeof trigger === 'string' ? trigger : emptySelector
  }

  _handlers = () => {
    // Focus
    this.inputElement?.addEventListener('focus', this._focus)
    // Blur
    this.inputElement?.addEventListener('blur', this._blur)
    // Trigger
    this.triggerElement?.addEventListener('click', this._search)
    // Keypress
    if (this._getOption('keypress') === true) {
      this.inputElement?.addEventListener('keyup', this._keypress)
    }
    // Enter
    if (this._getOption('enter') === true) {
      this.inputElement?.addEventListener('keypress', (e) => {
        const key = e.code || ''
        if (key === 'Enter') {
          e.preventDefault()
          this._search()
        }
      })
    }
    // Clear
    this.clearElement?.addEventListener('click', this._clear)
  }

  _search = () => {
    if (!this.processing && this.options.process) {
      this._start()
      this.processing = true
      this.options.process.call(this)
    }
  }

  _focus = () => {
    this.element.classList.add('focus')
    if (this.mode === 'menu') {
      if (this.suggestionsElement || (this.resultsElement && !this.resultsElement.classList.contains(dNone))) {
        this.menuObject?.show(this.element)
      }
    }
  }

  _blur = () => {
    this.element.classList.remove('focus')
  }

  _keypress = () => {
    const option = this._getOption('min-length')
    if (!option) {
      return
    }

    // eslint-disable-next-line radix
    const minLength = parseInt(typeof option === 'boolean' ? (+option).toString() : option.toString())
    if (this.inputElement && this.inputElement.value.length >= minLength) {
      this._search()
    } else if (this.inputElement && this.inputElement.value.length === 0) {
      this._clear()
    }
  }

  _start = () => {
    this.spinnerElement?.classList.remove(dNone)
    this.clearElement?.classList.add(dNone)
  }

  _complete = () => {
    this.spinnerElement?.classList.add(dNone)
    this.clearElement?.classList.add(dNone)
    if (this.mode === 'menu') {
      this.menuObject?.show(this.element)
    }

    if (this.inputElement && this.inputElement.value.length === 0) {
      this._clear()
    }

    this.processing = false
  }

  _showResults = (content = '') => {
    this.suggestionsElement?.classList.add(dNone)
    this.emptyElement?.classList.add(dNone)
    this.resultsElement?.classList.add(dNone)
    if (this.resultsElement) {
      this.resultsElement.innerHTML = content
    }
  }

  _showSuggestions = () => {
    this.resultsElement?.classList.add(dNone)
    this.emptyElement?.classList.add(dNone)
    this.suggestionsElement?.classList.remove(dNone)
  }

  _showEmpty = () => {
    this.resultsElement?.classList.add(dNone)
    this.suggestionsElement?.classList.add(dNone)
    this.emptyElement?.classList.remove(dNone)
  }

  _getOption = (name = '') => {
    const attr = this.element.getAttribute(`data-bb-search-${name}`)
    if (attr) {
      const value = getAttributeValueByBreakpoint(attr)
      if (value != null && String(value) === 'true') {
        return true
      }
      if (value !== null && String(value) === 'false') {
        return false
      }

      return value
    }

    const optionName = stringSnakeToCamel(name)
    const option = getObjectPropertyValueByKey(this.element, optionName)
    if (option) {
      return getAttributeValueByBreakpoint(option)
    }

    return null
  }

  // Public api
  search = () => this._search()

  showResults = (content = '') => this._showResults(content)

  showSuggestions = () => this._showSuggestions()

  showEmpty = () => this._showEmpty()

  complete = () => this._complete()

  clear = () => this._clear()

  isProcessing = () => this.processing

  getQuery = () => this.inputElement?.value || ''

  goElement = () => this.element

  static createInstances() {
    throw new Error('not implemented')
  }

  static hasInstance() {
    throw new Error('not implemented')
  }

  static getInstance(element = null) {
    const search = DataUtil.get(element, 'search')
    if (search) {
      return search
    }

    return null
  }

  static bootstrap() {
    throw new Error('not implemented')
  }
}

export { SearchComponent, defaultSearchOptions }
