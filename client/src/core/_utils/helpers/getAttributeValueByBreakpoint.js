import { getViewPort } from './dom-helpers/_getViewPort'
import { getObjectPropertyValueByKey } from './types-helpers/_getObjectPropertyValueByKey'
import { toJSON } from './types-helpers/_toJSON'

export function getAttributeValueByBreakpoint(incomingAttr) {
  const value = toJSON(incomingAttr)
  if (typeof value !== 'object') {
    return incomingAttr
  }

  const { width } = getViewPort()
  let resultKey
  let resultBreakpoint = -1
  let breakpoint

  // eslint-disable-next-line no-restricted-syntax,guard-for-in
  for (const key in value) {
    if (key === 'default') {
      breakpoint = 0
    }

    if (breakpoint <= width && breakpoint > resultBreakpoint) {
      resultKey = key
      resultBreakpoint = breakpoint
    }
  }

  return resultKey ? getObjectPropertyValueByKey(value, resultKey) : value
}
