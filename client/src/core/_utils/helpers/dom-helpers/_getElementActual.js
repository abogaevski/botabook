export function getElementActualCss(el = null, prop = '', cache = false) {
  let css = ''

  if (!el.getAttribute(`bb-hidden-${prop}`) || cache === false) {
    let value

    css = el.style.cssText
    el.style.cssText = 'position: absolute; visibility: hidden; display: block;'

    if (prop === 'width') {
      value = el.offsetWidth
    } else if (prop === 'height') {
      value = el.offsetHeight
    }

    el.style.cssText = css

    if (value !== undefined) {
      el.setAttribute(`bb-hidden-${prop}`, value.toString())
      return parseFloat(value.toString())
    }
    return 0
  }
  const attributeValue = el.getAttribute(`bb-hidden-${prop}`)
  if (attributeValue || attributeValue === '0') {
    return parseFloat(attributeValue)
  }
}

export function getElementActualHeight(el) {
  return getElementActualCss(el, 'height', false)
}

export function getElementActualWidth(el) {
  return getElementActualCss(el, 'width', false)
}
