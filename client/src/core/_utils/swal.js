import Swal from 'sweetalert2'

export default function alert(values) {
  const configBtnText = values.icon === 'error' ? 'Попробовать еще раз' : 'OK'
  const btnClass = values.icon === 'error' ? 'btn-light-danger' : 'btn-light-success'
  const config = {
    title: values.title,
    html: values.html,
    icon: values.icon,
    buttonsStyling: false,
    confirmButtonText: configBtnText,
    customClass: {
      confirmButton: `btn fw-bold ${btnClass}`
    }
  }
  Swal.fire(config)
    .then(() => Promise.resolve())
    .catch(() => Promise.reject())
}
