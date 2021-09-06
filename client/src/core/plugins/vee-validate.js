import { configure } from 'vee-validate'

// eslint-disable-next-line import/prefer-default-export
export function initVeeValidate() {
  configure({
    validateOnBlur: true,
    validateOnChange: true,
    validateOnInput: true,
    validateOnModelUpdate: true
  });
}
