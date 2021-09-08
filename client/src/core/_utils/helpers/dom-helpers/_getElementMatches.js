// https://developer.mozilla.org/en-US/docs/Web/API/Element/matches
export function getElementMatches(element = null, selector = '') {
  const p = Element.prototype;
  const f = p.matches || p.webkitMatchesSelector

  if (element && element.tagName) {
    return f.call(element, selector);
  }
  return false
}
