export function getCSS(el, styleProp = '') {
  const { defaultView } = el.ownerDocument || document;

  if (!defaultView) {
    return '';
  }
  // eslint-disable-next-line no-param-reassign
  styleProp = styleProp.replace(/([A-Z])/g, '-$1').toLowerCase();

  return defaultView.getComputedStyle(el, null).getPropertyValue(styleProp);
}
