/* eslint no-template-curly-in-string:0 */
import * as Yup from 'yup';

export function initYup() {
  Yup.setLocale({
    mixed: {
      required: '${path} - обязательное поле',
    },
    string: {
      min: '${path} должно быть не менее ${min} символов',
      email: '${path} - неправильный формат',
      matches: '${path} - неправильный формат'
    },
  })
}
