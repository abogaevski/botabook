export function insertAfterElement(el = null, referenceNode = null) {
  return referenceNode.parentNode?.insertBefore(el, referenceNode.nextSibling)
}
