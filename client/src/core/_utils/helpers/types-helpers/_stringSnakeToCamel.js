/* eslint-disable no-useless-escape */
export function stringSnakeToCamel(str = '') {
  return str.replace(/(\-\w)/g, (m) => m[1].toUpperCase())
}
