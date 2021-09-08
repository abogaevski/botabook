export function toJSON(value = '') {
  if (typeof value !== 'string') {
    return value
  }

  if (!value) {
    return undefined
  }

  // ("'" => "\"");
  const result = value.toString().split('').map((el) => (el !== '\'' ? el : '"')).join('')
  const jsonStr = result.replace(/(\w+:)|(\w+ :)/g, (matched) => `"${matched.substring(0, matched.length - 1)}":`)
  try {
    return JSON.parse(jsonStr)
  } catch {
    return undefined
  }
}
