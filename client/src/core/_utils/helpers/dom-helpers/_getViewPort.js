// https://developer.mozilla.org/en-US/docs/Web/API/Window/innerWidth
export function getViewPort() {
  return {
    width: window.innerWidth,
    height: window.innerHeight
  };
}
