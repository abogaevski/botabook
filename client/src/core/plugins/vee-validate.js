import { configure } from 'vee-validate'

export function initVeeValidate() {
  configure({
    validateOnBlur: true,
    validateOnChange: false,
    validateOnInput: true,
    validateOnModelUpdate: false
  });
}
