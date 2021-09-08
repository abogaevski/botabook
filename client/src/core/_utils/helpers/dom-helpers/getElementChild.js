import { getElementChildren } from './getElementChildren'

export function getElementChild(element = null, selector = '') {
  const children = getElementChildren(element, selector)
  return children ? children[0] : null
}
