import router from '@/router'
import { errors } from './error-types'
import alert from '@/core/_utils/swal'

export default function setError(error) {
  if (error.response) {
    // TODO: Check all errors
    if (errors[error.response.data.code]) {
      alert({ title: 'Произошла ошибка', html: errors[error.response.data.code], icon: 'error' })
      return errors[error.response.data.code]
    }
    if (error.response.status === 404) {
      router.push({ name: '404' })
      return
    }
  }
  alert({ title: 'Произошла ошибка', html: error, icon: 'error' })
  return error
}
