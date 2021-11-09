/* eslint no-template-curly-in-string:0 */
import { setLocale } from 'yup';

export function initYup() {
  setLocale({
    mixed: {
      required: '${path} - обязательное поле',
      min: 'Поле ${path} должно быть не менее ${min} символов',
      max: 'Поле ${path} должно быть не более ${max} символов',
    },
    string: {
      email: '${path} - неправильный формат',
      matches: '${path} - неправильный формат',
      min: 'Поле ${path} должно быть не менее ${min} символов',
      max: 'Поле ${path} должно быть не более ${max} символов',
    },
  })
}
