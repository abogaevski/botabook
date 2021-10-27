<template>
  <div
    class="d-flex flex-column flex-column-fluid bgi-position-y-bottom position-x-center bgi-no-repeat bgi-size-contain bgi-attachment-fixed"
    style="background-image: url('/media/illustrations/progress-hd.png')"
  >
    <div class="d-flex flex-center flex-column flex-column-fluid p-10 pb-lg-20">
      <div class="mb-12">
        <img alt="Logo" src="/media/logos/botabook-dark.svg" class="h-50px"/>
      </div>
      <div class="bg-white rounded shadow-sm p-10 p-lg-15 mx-auto">
        <Form
          class="form w-100 fv-plugins-bootstrap5 fv-plugins-framework"
          novalidate="novalidate"
          @submit="submitSignup"
          :validation-schema="signupSchema"
        >
          <div class="mb-10 text-center">
            <h1 class="text-dark mb-3">
              Создать аккаунт
            </h1>
            <div class="text-gray-400 fw-bold fs-4">
              Уже есть аккаунт?

              <router-link to="/signin" class="link-primary fw-bolder">
                Войдите
              </router-link>
            </div>
          </div>

          <div class="d-flex align-items-center mb-10">
            <div class="border-bottom border-gray-300 mw-50 w-100"></div>
            <span class="fw-bold text-gray-400 fs-7 mx-2">ИЛИ</span>
            <div class="border-bottom border-gray-300 mw-50 w-100"></div>
          </div>

          <div class="row fv-row mb-7">
            <div class="col-xl-6 mb-7 mb-xl-0">
              <label class="form-label fw-bolder text-dark fs-6">
                Ваше имя
              </label>
              <Field
                class="form-control form-control-lg form-control-solid"
                type="text"
                name="firstName"
                autocomplete="off"
              />
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="firstName"/>
                </div>
              </div>
            </div>

            <div class="col-xl-6">
              <label class="form-label fw-bolder text-dark fs-6"
              >Фамилия</label
              >
              <Field
                class="form-control form-control-lg form-control-solid"
                type="text"
                placeholder=""
                name="lastName"
                autocomplete="off"
              />
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="lastName"/>
                </div>
              </div>
            </div>
          </div>

          <div class="fv-row mb-7">
            <label class="form-label fw-bolder text-dark fs-6">Email</label>
            <Field
              class="form-control form-control-lg form-control-solid"
              type="email"
              placeholder=""
              name="email"
              autocomplete="off"
            />
            <div class="fv-plugins-message-container">
              <div class="fv-help-block">
                <ErrorMessage name="email"/>
              </div>
            </div>
          </div>

          <div class="mb-10 fv-row">
            <div class="mb-1">
              <label class="form-label fw-bolder text-dark fs-6">
                Пароль
              </label>

              <div class="position-relative mb-3">
                <Field
                  class="form-control form-control-lg form-control-solid"
                  type="password"
                  name="password"
                  autocomplete="off"
                />
                <div class="fv-plugins-message-container">
                  <div class="fv-help-block">
                    <ErrorMessage name="password"/>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="fv-row mb-5">
            <label class="form-label fw-bolder text-dark fs-6"
            >Подтвердите пароль</label
            >
            <Field
              class="form-control form-control-lg form-control-solid"
              type="password"
              placeholder=""
              name="cpassword"
              autocomplete="off"
            />
            <div class="fv-plugins-message-container">
              <div class="fv-help-block">
                <ErrorMessage name="cpassword"/>
              </div>
            </div>
          </div>

          <div class="fv-row mb-10">
<!--            <label class="form-check form-check-custom form-check-solid">-->
<!--              <Field-->
<!--                class="form-check-input"-->
<!--                type="checkbox"-->
<!--                name="toc"-->
<!--                value="1"-->
<!--              />-->
<!--              <span class="form-check-label fw-bold text-gray-700 fs-6">-->
<!--                Я согласен с-->
<!--                <a href="#" class="ms-1 link-primary">условиями использования</a>.-->
<!--              </span>-->
<!--            </label>-->
<!--            <div class="fv-plugins-message-container">-->
<!--              <div class="fv-help-block">-->
<!--                <ErrorMessage name="toc"/>-->
<!--              </div>-->
<!--            </div>-->
          </div>

          <div class="text-center">
            <button
              type="submit"
              ref="submitButton"
              class="btn btn-lg btn-primary w-100 mb-5"
            >
              <span class="indicator-label">Зарегистрироваться</span>
              <span class="indicator-progress">Подождите...
                <span class="spinner-border spinner-border-sm align-middle ms-2"></span>
              </span>
            </button>
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
  <contact-modal
    :showModal="isActiveContactModal"
    @modal:close="closeModal"
  />
</template>

<script>
import * as Yup from 'yup'
import { Form, Field, ErrorMessage } from 'vee-validate'
import Swal from 'sweetalert2'
import ContactModal from '@/components/common/ContactModal'

export default {
  data() {
    const signupSchema = Yup.object().shape({
      firstName: Yup.string()
        .required()
        .label('Имя'),
      lastName: Yup.string()
        .required()
        .label('Фамилия'),
      email: Yup.string()
        .min(4)
        .required()
        .lowercase()
        .email()
        .label('Email'),
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
    return {
      signupSchema,
      isActiveContactModal: false

    }
  },
  components: {
    Form, Field, ErrorMessage, ContactModal
  },
  methods: {
    showModal() {
      this.isActiveContactModal = true
    },
    closeModal() {
      this.isActiveContactModal = false
    },
    submitSignup(values) {
      values.email = values.email.toLowerCase()
      this.$refs.submitButton.setAttribute('data-bb-indicator', 'on')
      const userData = {
        ...values,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
      }
      this.$store
        .dispatch('auth/signup', userData)
        .catch((e) => {
          this.$refs.submitButton.removeAttribute('data-bb-indicator')
          const title = e ? 'Не удалось зарегистрироваться в систему' : 'Что-то пошло не так'
          const html = e.response.data.email[0]
            ? e.response.data.email[0]
            : `Произошла неизвестная ошибка, пожалуйста обратитесь в поддержку
              <a href="mailto:antnbog@gmail.com">сюда</a>
            `
          Swal.fire({
            title,
            html,
            icon: 'error',
            buttonsStyling: false,
            confirmButtonText: 'Попробуйте еще раз!',
            customClass: {
              confirmButton: 'btn fw-bold btn-light-danger'
            }
          })
        })
    }
  },
  computed: {
    error() {
      return this.$store.getters.error
    },
  }
}
</script>

<style>

</style>
