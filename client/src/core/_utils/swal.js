import Swal from 'sweetalert2'

export default function alert(values) {
  const config = {
    title: values.title || '',
    html: values.html || '',
    icon: values.icon || 'danger',
    showCancelButton: false,
    buttonsStyling: false,
    confirmButtonText: 'OK',
    cancelButtonText: 'Отмена',
    customClass: {
      confirmButton: ['btn', 'fw-bold'],
      cancelButton: ['btn', 'btn-active-light']
    }
  }
  if (values.icon === 'error') {
    config.confirmButtonText = 'Попробовать еще раз'
    config.customClass.confirmButton.push('btn-light-danger')
  } else if (values.icon === 'question') {
    config.confirmButtonText = 'Подтвердить'
    config.customClass.confirmButton.push('btn-light-primary')
    config.showCancelButton = true
  } else if (values.icon === 'success') {
    config.confirmButtonText = 'OK'
    config.customClass.confirmButton.push('btn-light-success')
  }
  return Swal.fire(config)
    .then((result) => Promise.resolve(result))
    .catch(() => Promise.reject())
}
