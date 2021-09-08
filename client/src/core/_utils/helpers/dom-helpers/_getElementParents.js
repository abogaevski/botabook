export function getElementParents(element = null, selector = '') {
  // Element.matches() polyfill
  if (!Element.prototype.matches) {
    Element.prototype.matches = (s) => {
      const matches = (document || this.ownerDocument).querySelectorAll(s)
      let i = matches.length
      while (--i >= 0 && matches.item(i) !== this) {
      }
      return i > -1
    }
  }

  // Set up a parent array
  const parents = []

  let el = element || null

  // Push each parent element to the array
  for (; el && el !== document.body; el = el.parentElement) {
    if (selector) {
      if (el.matches(selector)) {
        parents.push(el)
      }
    }
    parents.push(el)
  }

  // Return our parent array
  return parents
}
