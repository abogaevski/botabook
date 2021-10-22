export default class Theme {
  static = ''

  static init = (config = '') => {
    Theme.config = config || defaultThemeConfig
  }

  static getBreakpoint(key = '') {
    const map = new Map(Object.entries(Theme.config.breakpoints))
    return map.get(key)
  }
}

export const defaultThemeConfig = {
  breakpoints: {
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200,
    xxl: 1400
  }
}
