<template>
  <Form
    v-if="!isLoaderEnabled"
    class="form w-100 fv-plugins-bootstrap5 fv-plugins-framework"
    :validation-schema="resetPasswordSchema"
    @submit="submitResetPassword"
  >
    <div class="text-center mb-10">
      <h1 class="text-dark mb-3">Установите новый пароль</h1>
      <div class="text-gray-400 fw-bold fs-4">Уже сбросили пароль?
        <router-link :to="{name: 'signin'}" class="link-primary fw-bolder">Войдите</router-link>
      </div>
    </div>
    <div class="mb-10 fv-row fv-plugins-icon-container">
      <div class="mb-1">
        <label class="form-label fw-bolder text-dark fs-6">Новый пароль</label>
        <div class="position-relative mb-3">
          <Field class="form-control form-control-lg form-control-solid" type="password" name="password"
                 autocomplete="off"/>
        </div>
      </div>
      <div class="text-muted fs-8 mt-1">Пароль должен состоять минимум из 8 символов.
        <br/>Должна быть как минимум одна большая буква, а так же минимум одна цифра.
      </div>
      <div class="fv-plugins-message-container invalid-feedback">
        <ErrorMessage name="password"/>
      </div>
    </div>
    <div class="fv-row mb-10 fv-plugins-icon-container">
      <label class="form-label fw-bolder text-dark fs-6">Подтвердить пароль</label>
      <Field class="form-control form-control-lg form-control-solid" type="password" name="cpassword"
             autocomplete="off"/>
      <div class="fv-plugins-message-container invalid-feedback">
        <ErrorMessage name="cpassword"/>
      </div>
    </div>
    <div class="text-center">
      <button ref="submitButton" type="submit" class="btn btn-lg btn-primary fw-bolder">
        <span class="indicator-label">Изменить пароль</span>
        <span class="indicator-progress">Подождите...
          <span class="spinner-border spinner-border-sm align-middle ms-2"></span>
        </span>
      </button>
    </div>
  </Form>
  <bt-content-loader v-else />
</template>

<script>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Form, Field, ErrorMessage } from 'vee-validate'
import { string, object, ref as yref } from 'yup'
import alert from '@/core/_utils/swal'
import AuthService from '@/core/services/auth.service'
import BtContentLoader from '@/components/_core/BtContentLoader'

export default {
  name: 'ResetPasswordRequest',
  components: { Form, Field, ErrorMessage, BtContentLoader },
  setup() {
    const isLoaderEnabled = ref(true)
    const route = useRoute()
    const router = useRouter()
    const submitButton = ref()
    AuthService.confirmPasswordReset(route.params.uid64, route.params.token)
      .then(() => isLoaderEnabled.value = false)
      .catch((e) => {
        alert({
          title: `Ошибка: ${e.response.status}`,
          html: 'Ссылка недействительна',
          icon: 'error'
        }).then(() => router.push({ name: 'signin' }))
      })
    const resetPasswordSchema = object().shape({
      password: string()
        .min(8)
        .required()
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/, 'Пароль не соответствует требованиям')
        .label('Пароль'),
      cpassword: string()
        .min(8)
        .required()
        .oneOf([yref('password'), null], 'Пароли должны совпадать')
        .label('Подтверждение пароля')
    })
    const submitResetPassword = (values) => {
      submitButton.value.setAttribute('data-bb-indicator', 'on')
      const formData = {
        password: values.password,
        uid64: route.params.uid64,
        token: route.params.token
      }
      AuthService.completePasswordReset(formData)
        .then(() => {
          submitButton.value.removeAttribute('data-bb-indicator')
          alert({
            title: 'Пароль был изменен',
            html: 'Пожалуйста, нажмите на кнопку ниже, чтобы войти',
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
      isLoaderEnabled,
      resetPasswordSchema,
      submitResetPassword,
      submitButton
    }
  }
}
</script>
