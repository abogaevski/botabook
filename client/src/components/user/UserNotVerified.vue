<template>
  <div class="alert alert-white d-flex align-items-center p-4 mb-7">
    <span class="svg-icon svg-icon-2hx svg-icon-danger me-4">
      <inline-svg src="/media/icons/duotone/General/Shield-protected.svg"/>
    </span>
    <div class="d-flex flex-column">
      <h4 class="mb-1 text-danger">Email адрес не подтвержден</h4>
      <span class="fw-bolder text-gray-500">Письмо со ссылкой на подтверждение адреса электронной почты было отправлено. Проверьте пожалуйста почту!
      <br> Если письмо не было доставлено, пожалуйста нажмите на кнопка справа, чтобы отправить сообщение еще раз.
      </span>
    </div>
    <button @click="submitRequestVerify" class="btn btn-light-danger ms-auto">Отправить еще раз</button>
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
