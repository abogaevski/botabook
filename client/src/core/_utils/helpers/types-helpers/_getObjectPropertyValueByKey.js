export function getObjectPropertyValueByKey(obj = {}, key = '') {
  const map = new Map(Object.entries(obj));
  // eslint-disable-next-line no-prototype-builtins
  if (obj.hasOwnProperty(key) && map) {
    return map.get(key);
  }
}
