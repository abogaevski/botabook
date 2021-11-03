<template>
  <div class="alert alert-danger d-flex align-items-center p-5 mb-10">
    <span class="svg-icon svg-icon-2hx svg-icon-danger me-4">
      <inline-svg src="/media/icons/duotone/General/Shield-protected.svg"/>
    </span>
    <div class="d-flex flex-column">
      <h4 class="mb-1 text-danger">Email адрес не подтвержден</h4>
      <span>Письмо со ссылкой на подтверждение адреса электронной почты было отправлено. Проверьте пожалуйста почту!</span>
    </div>
    <button @click="submitRequestVerify" class="btn btn-outline btn-outline-danger btn-active-danger ms-auto">Отправить еще раз</button>
  </div>
</template>

<script>
import AuthService from '@/core/services/auth.service'
import alert from '@/core/_utils/swal'

export default {
  name: 'UserNotVerified',
  setup() {
    const submitRequestVerify = () => {
      AuthService.requestEmailVerification()
        .then(() => {
          alert({
            title: 'Письмо отправлено',
            html: 'Письмо с подтверждением отправлено. Пожалуйста, проверьте почту.',
            icon: 'success',
          })
        })
        .catch(() => {
          alert({
            title: 'Произошла ошибка!',
            html: 'Попробуйте пожалуйста еще раз!',
            icon: 'error',
          })
        })
    }
    return {
      submitRequestVerify
    }
  }
}
</script>
