export class ElementStyleUtil {
  static set(element = null, property = '', value = null, important = false) {
    if (important) {
      element.style.setProperty(property, value, 'important')
    } else {
      element.style[property] = value
    }
  }

  static get(element = null, attributeName = '') {
    return element.style.getPropertyValue(attributeName)
  }

  static remove(element = null, attributeName = '') {
    element.style.removeProperty(attributeName)
  }
}
