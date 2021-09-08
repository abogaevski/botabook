export function getObjectPropertyValueByKey(obj = {}, key = '') {
  const map = new Map(Object.entries(obj));
  if (Object.hasOwn(obj, key) && map) {
    return map.get(key);
  }
}
