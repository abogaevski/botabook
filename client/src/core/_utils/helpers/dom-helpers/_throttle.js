/* eslint no-param-reassign: 0 */
export function throttle(timer = null, func = null, delay = 0) {
  if (timer) {
    return
  }

  timer = setTimeout(() => {
    func()
    timer = undefined
  }, delay)
}
