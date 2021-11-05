<template>
  <Form
    class="form w-100 fv-plugins-bootstrap5 fv-plugins-framework"
    @submit="submitRequest"
    :validation-schema="requestValidationSchema"
  >
    <div class="text-center mb-10">
      <h1 class="text-dark mb-3">Забыли пароль?</h1>
      <div class="text-gray-400 fw-bold fs-4">Укажите свой email для сброса пароля.</div>
    </div>
    <div class="fv-row mb-10 fv-plugins-icon-container">
      <label class="form-label fw-bolder text-gray-900 fs-6">Email</label>
      <Field class="form-control form-control-solid" type="email" name="email"
             autocomplete="off"/>
      <div class="fv-plugins-message-container invalid-feedback">
        <ErrorMessage name="email"/>
      </div>
    </div>
    <div class="d-flex flex-wrap justify-content-center pb-lg-0">
      <button ref="submitButton" type="submit" class="btn btn-lg btn-primary fw-bolder me-4">
        <span class="indicator-label">Отправить</span>
        <span class="indicator-progress">Подождите...
          <span class="spinner-border spinner-border-sm align-middle ms-2"></span>
        </span>
      </button>
      <router-link :to="{name: 'signin'}" class="btn btn-lg btn-light-primary fw-bolder">Отмена</router-link>
    </div>
    <div>
    </div>
  </Form>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Form, Field, ErrorMessage } from 'vee-validate'
import { string, object } from 'yup'
import alert from '@/core/_utils/swal'
import AuthService from '@/core/services/auth.service'

export default {
  name: 'ResetPasswordRequest',
  components: { Form, Field, ErrorMessage },
  setup() {
    const router = useRouter()
    const submitButton = ref()
    const requestValidationSchema = object().shape({
      email: string()
        .email()
        .required()
        .label('Email')
    })
    const submitRequest = (values) => {
      values.email = values.email.toLowerCase()
      submitButton.value.setAttribute('data-bb-indicator', 'on')
      AuthService.requestPasswordReset(values)
        .then(() => {
          submitButton.value.removeAttribute('data-bb-indicator')
          alert({
            title: 'Запрос отправлен',
            html: `Ваш запрос на сброс пароля отправлен на ${values.email}`,
            icon: 'success'
          }).then(() => router.push({ name: 'signin' }))
        })
        .catch((e) => {
          submitButton.value.removeAttribute('data-bb-indicator')
          alert({
            title: 'Произошла ошибка',
            html: e,
            icon: 'error'
          })
        })
    }
    return {
      requestValidationSchema,
      submitRequest,
      submitButton
    }
  }
}
</script>
