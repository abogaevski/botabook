<template>
  <div class="d-flex flex-column flex-root">
    <div
      class="d-flex flex-column flex-column-fluid bgi-position-y-bottom position-x-center bgi-no-repeat bgi-size-contain bgi-attachment-fixed"
      style="background-image: url('/media/illustrations/sketchy-1/14.png')">
      <div class="d-flex flex-center flex-column flex-column-fluid p-10 pb-lg-20">
        <router-link to="/" class="mb-12">
          <img alt="Logo" src="/media/logos/botabook-dark.svg" class="h-40px">
        </router-link>
        <div class="w-lg-500px bg-white rounded shadow-sm p-10 p-lg-15 mx-auto">
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
              <router-link to="/signin" class="btn btn-lg btn-light-primary fw-bolder">Отмена</router-link>
            </div>
            <div>
            </div>
          </Form>
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
import { useRouter } from 'vue-router'
import { Form, Field, ErrorMessage } from 'vee-validate'
import * as Yup from 'yup'
import Swal from 'sweetalert2'
import AuthService from '@/core/services/auth.service'
import ContactModal from '@/components/common/ContactModal'

export default {
  name: 'ResetPasswordRequest',
  components: { Form, Field, ErrorMessage, ContactModal },
  setup() {
    const router = useRouter()
    const isActiveContactModal = ref(false)
    const showModal = () => isActiveContactModal.value = true
    const closeModal = () => isActiveContactModal.value = false
    const submitButton = ref()
    const requestValidationSchema = Yup.object({
      email: Yup.string()
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
          Swal.fire({
            title: 'Запрос отправлен',
            html: `Ваш запрос на сброс пароля отправлен на ${values.email}`,
            icon: 'success',
            buttonsStyling: false,
            confirmButtonText: 'Хорошо',
            customClass: {
              confirmButton: 'btn fw-bold btn-light-primary'
            }
          }).then(() => router.push('/signin'))
        })
        .catch((e) => {
          submitButton.value.removeAttribute('data-bb-indicator')
          Swal.fire({
            title: 'Произошла ошибка',
            html: e,
            icon: 'error',
            buttonsStyling: false,
            confirmButtonText: 'Попробовать еще раз',
            customClass: {
              confirmButton: 'btn fw-bold btn-light-secondary'
            }
          })
        })
    }
    return {
      isActiveContactModal,
      requestValidationSchema,
      showModal,
      closeModal,
      submitRequest,
      submitButton
    }
  }
}
</script>
