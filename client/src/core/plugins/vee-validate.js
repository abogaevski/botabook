import { configure } from 'vee-validate'

export function initVeeValidate() {
  configure({
    validateOnBlur: false,
    validateOnChange: false,
    validateOnInput: false,
    validateOnModelUpdate: false
  });
}
