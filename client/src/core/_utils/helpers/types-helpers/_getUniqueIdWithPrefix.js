export function getUniqueIdWithPrefix(prefix = '') {
  const result = Math.floor(Math.random() * new Date().getTime()).toString()
  if (!prefix) {
    return result
  }

  return `${prefix}${result}`
}
