export function isVisibleElement(element = null) {
  return !(element.offsetWidth === 0 && element.offsetHeight === 0);
}
