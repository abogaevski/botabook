import { getUniqueIdWithPrefix } from './helpers/types-helpers/_getUniqueIdWithPrefix'

export class DOMEventHandlerUtil {
  static store = new Map()

  static on(element = null, selector = '', eventName = '', callBack = null) {
    const eventId = getUniqueIdWithPrefix('DOMEvent')
    DOMEventHandlerUtil.store.set(eventId, (e) => {
      const targets = element.querySelectorAll(selector)
      let { target } = e
      while (target && target !== element) {
        for (let i = 0; i < targets.length; i++) {
          if (target === targets[i]) {
            callBack.call(target, e)
          }
        }

        if (target.parentElement) {
          target = target.parentElement
        } else {
          target = null
        }
      }
    })
    element.addEventListener(eventName, DOMEventHandlerUtil.store.get(eventId))
    return eventId
  }

  static off(element = null, eventName = '', eventId = '') {
    const funcFromStore = DOMEventHandlerUtil.store.get(eventId)
    if (!funcFromStore) {
      return
    }

    element.removeEventListener(eventName, funcFromStore)
    DOMEventHandlerUtil.store.delete(eventId)
  }

  static one(element = null, eventName = '', callBack = null) {
    element.addEventListener(eventName, function calee(e) {
      if (e.target && e.target.removeEventListener) {
        e.target.removeEventListener(e.type, calee)
      }

      if (element && element.removeEventListener && e && e.currentTarget) {
        e.currentTarget.removeEventListener(e.type, calee)
      }

      return callBack(e)
    })
  }
}
