import { configure } from 'vee-validate'

export function initVeeValidate() {
  configure({
    validateOnBlur: true,
    validateOnChange: false,
    validateOnInput: false,
    validateOnModelUpdate: false
  });
}
