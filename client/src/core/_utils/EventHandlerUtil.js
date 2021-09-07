import { DataUtil } from './_DataUtil';
import { getUniqueIdWithPrefix } from './helpers/types-helpers/_getUniqueIdWithPrefix';

export class EventHandlerUtil {
  static store = new Map();

  static setEventMetasByName(name = '', metas = '') {
    EventHandlerUtil.store.set(name, metas);
  }

  static getEventMetasByName(name = '') {
    return EventHandlerUtil.store.get(name);
  }

  static setEventMetaByNameAndHandlerId(name = '', handlerId = '', meta = null) {
    let metas = EventHandlerUtil.getEventMetasByName(name);
    if (!metas) {
      metas = new Map();
    }

    metas.set(handlerId, meta);
    EventHandlerUtil.setEventMetasByName(name, metas);
  }

  static getEventsMetaByHandlerId(name = '', handlerId = '') {
    const metas = EventHandlerUtil.store.get(name);
    if (!metas) {
      return;
    }

    metas.get(handlerId);
  }

  static setFiredByNameAndHandlerId(name = '', handlerId = '', fired = false) {
    const meta = EventHandlerUtil.getEventsMetaByHandlerId(name, handlerId);
    if (!meta) {
      return;
    }

    meta.fired = fired;
    EventHandlerUtil.setEventMetaByNameAndHandlerId(name, handlerId, meta);
  }

  static addEvent(element, name = '', callback = null, one = false) {
    const handlerId = getUniqueIdWithPrefix('event');
    DataUtil.set(element, name, handlerId);
    const meta = {
      name,
      callback,
      one,
      fired: false
    };

    EventHandlerUtil.setEventMetaByNameAndHandlerId(name, handlerId, meta);
  }

  static removeEvent(element, name = '') {
    const handlerId = DataUtil.get(element, name);
    if (!handlerId) {
      return;
    }

    const metas = EventHandlerUtil.getEventMetasByName(name);
    if (!metas) {
      return;
    }

    metas.delete(handlerId);
    EventHandlerUtil.setEventMetasByName(name, metas);
  }

  static trigger(element, name = '') {
    if (DataUtil.has(element, name)) {
      const handlerId = DataUtil.get(element, name);
      if (!handlerId) {
        return undefined;
      }

      const handler = EventHandlerUtil.getEventsMetaByHandlerId(name, handlerId)
      if (handler) {
        if (handler.name === name) {
          if (handler.one === true) {
            if (handler.fired === false) {
              EventHandlerUtil.setFiredByNameAndHandlerId(name, handlerId, true);
              return handler.callback.call(this);
            }
          } else {
            return handler.callback.call(this);
          }
        }
      }
    }

    return null;
  }

  static on = (element, name = '', callBack = null) => {
    EventHandlerUtil.addEvent(element, name, callBack, false);
  }

  static one(element, name = '', callBack = null) {
    EventHandlerUtil.addEvent(element, name, callBack, true);
  }

  static off(element, name = '') {
    EventHandlerUtil.removeEvent(element, name);
  }
}
