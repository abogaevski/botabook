export default function truncate(value, size) {
  if (!value) return ''
  const v = value.toString()
  if (v.length <= size) {
    return v
  }
  return `${v.substr(0, size)}...`
}
