<template>
  <div class="d-flex flex-column flex-root">
    <div
      class="d-flex flex-column flex-column-fluid bgi-position-y-bottom position-x-center bgi-no-repeat bgi-size-contain bgi-attachment-fixed"
      style="background-image: url('/media/illustrations/sketchy-1/14.png')">
      <div class="d-flex flex-center flex-column flex-column-fluid p-10 pb-lg-20">
        <router-link to="/" class="mb-12">
          <img alt="Logo" src="/media/logos/botabook-dark.svg" class="h-40px">
        </router-link>
        <div class="w-lg-500px min-h-200px bg-white rounded shadow-sm p-10 p-lg-15 mx-auto">
          <Form
            v-if="!isLoaderEnabled"
            class="form w-100 fv-plugins-bootstrap5 fv-plugins-framework"
            :validation-schema="resetPasswordSchema"
            @submit="submitResetPassword"
          >
            <div class="text-center mb-10">
              <h1 class="text-dark mb-3">Установите новый пароль</h1>
              <div class="text-gray-400 fw-bold fs-4">Уже сбросили пароль?
                <router-link to="/signin" class="link-primary fw-bolder">Войдите</router-link>
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
              <div class="text-muted">Минимум 8 символов.</div>
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
            <!--begin::Action-->
            <div class="text-center">
              <button type="submit" class="btn btn-lg btn-primary fw-bolder">
                <span class="indicator-label">Изменить пароль</span>
              </button>
            </div>
          </Form>
          <bt-content-loader v-else />
        </div>
      </div>
      <div class="d-flex flex-center flex-column-auto p-10">
        <div class="d-flex align-items-center fw-bold fs-6">
          <router-link to="/" class="text-muted text-hover-primary px-2">О Bota</router-link>
          <a href="#" @click.prevent="showModal" class="text-muted text-hover-primary px-2">Связаться</a>
        </div>
      </div>
    </div>
  </div>
  <contact-modal
    :showModal="isActiveContactModal"
    @modal:close="closeModal"
  />
</template>

<script>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Form, Field, ErrorMessage } from 'vee-validate'
import Swal from 'sweetalert2'
import * as Yup from 'yup'
import AuthService from '@/core/services/auth.service'
import ContactModal from '@/components/common/ContactModal'
import BtContentLoader from '@/components/_core/BtContentLoader'

export default {
  name: 'ResetPasswordRequest',
  components: { Form, Field, ErrorMessage, ContactModal, BtContentLoader },
  setup() {
    const isLoaderEnabled = ref(true)
    const route = useRoute()
    const router = useRouter()
    const isActiveContactModal = ref(false)
    const showModal = () => isActiveContactModal.value = true
    const closeModal = () => isActiveContactModal.value = false
    AuthService.confirmPasswordReset(route.params.uid64, route.params.token)
      .then(() => isLoaderEnabled.value = false)
      .catch((e) => {
        Swal.fire({
          title: `Ошибка: ${e.response.status}`,
          html: 'Ссылка недействительна',
          icon: 'error',
          buttonsStyling: false,
          confirmButtonText: 'Войти',
          customClass: {
            confirmButton: 'btn fw-bold btn-light-primary'
          }
        }).then(() => router.push('/signin'))
      })
    const resetPasswordSchema = Yup.object({
      password: Yup.string()
        .min(8)
        .required()
        .label('Пароль'),
      cpassword: Yup.string()
        .min(8)
        .required()
        .oneOf([Yup.ref('password'), null], 'Пароли должны совпадать')
        .label('Подтверждение пароля'),
    })
    const submitResetPassword = (values) => {
      const formData = {
        password: values.password,
        uid64: route.params.uid64,
        token: route.params.token
      }
      AuthService.completePasswordReset(formData)
        .then(() => {
          Swal.fire({
            title: 'Пароль был изменен',
            html: 'Пожалуйста, нажмите на кнопку ниже, чтобы войти',
            icon: 'success',
            buttonsStyling: false,
            confirmButtonText: 'Войти',
            customClass: {
              confirmButton: 'btn fw-bold btn-light-primary'
            }
          }).then(() => router.push('/signin'))
        })
        .catch(() => {
          router.push('/500')
        })
    }
    return {
      isLoaderEnabled,
      isActiveContactModal,
      showModal,
      closeModal,
      resetPasswordSchema,
      submitResetPassword
    }
  }
}
</script>
