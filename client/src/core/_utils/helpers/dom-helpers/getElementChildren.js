import { getElementMatches } from './_getElementMatches';

export function getElementChildren(element = null, selector = '') {
  if (!element || !element.childNodes) {
    return null;
  }

  const result = [];
  for (let i = 0; i < element.childNodes.length; i++) {
    const child = element.childNodes[i];
    if (child.nodeType === 1 && getElementMatches(child, selector)) {
      result.push(child);
    }
  }

  return result;
}
