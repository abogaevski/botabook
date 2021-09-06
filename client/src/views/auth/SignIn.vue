<template>
  <div
    class="d-flex flex-column flex-column-fluid bgi-position-y-bottom position-x-center bgi-no-repeat bgi-size-contain bgi-attachment-fixed min-vh-100"
    style="background-image: url('media/illustrations/progress-hd.png')"
  >
    <div class="d-flex flex-center flex-column flex-column-fluid p-10 pb-lg-20">

      <div class="mb-12">
        <img alt="Logo" src="media/logos/logo-full.svg" class="h-75px"/>
      </div>

      <div class="w-lg-500px bg-white rounded shadow-sm p-10 p-lg-15 mx-auto">
        <Form
          class="form w-100"
          :validation-schema="signInSchema"
          @submit="submitSignin"
        >
          <div class="text-center mb-10">
            <h1 class="text-dark mb-3">
              Войдите в BotaBook
            </h1>
            <div class="text-gray-400 fw-bold fs-4 mb-10">
              В первый раз?

              <router-link to="/signup" class="link-primary fw-bolder">
                Создайте аккаунт
              </router-link>
            </div>
          </div>

          <div class="fv-row mb-10">
            <label class="form-label fs-6 fw-bolder text-dark">Email</label>

            <Field
              class="form-control form-control-lg form-control-solid"
              type="text"
              name="email"
              autocomplete="off"
            />
            <div class="fv-plugins-message-container">
              <div class="fv-help-block">
                <ErrorMessage name="email"/>
              </div>
            </div>

          </div>

          <div class="fv-row mb-10">
            <div class="d-flex flex-stack mb-2">
              <label class="form-label fw-bolder text-dark fs-6 mb-0"
              >Пароль</label>
              <router-link
                to="/password-reset"
                class="link-primary fs-6 fw-bolder"
              >
                Забыли пароль ?
              </router-link>
            </div>
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

          <div class="text-center">
            <button
              type="submit"
              ref="submitButton"
              class="btn btn-lg btn-primary w-100 mb-5"
            >
              <span class="indicator-label">
                Войти
              </span>
            </button>
          </div>
        </Form>
      </div>
    </div>
    <div class="d-flex flex-center flex-column-auto p-10">
      <div class="d-flex align-items-center fw-bold fs-6">
        <a href="#" class="text-muted text-hover-primary px-2">О Bota</a>
        <a href="#" class="text-muted text-hover-primary px-2">Связаться</a>
        <a href="#" class="text-muted text-hover-primary px-2">Условия использования</a>
      </div>
    </div>
  </div>
</template>
<script>
import { Form, Field, ErrorMessage } from 'vee-validate'
import * as Yup from 'yup'
import Swal from 'sweetalert2/dist/sweetalert2.min'

export default {
  name: 'SignIn',

  components: {
    Form, Field, ErrorMessage
  },

  data() {
    const signInSchema = Yup.object({
      email: Yup.string()
        .required()
        .email()
        .label('Email'),
      password: Yup.string()
        .required()
        .min(8)
        .label('Пароль'),
    });
    return {
      signInSchema,
    };
  },

  methods: {
    submitSignin(values) {
      this.$store
        .dispatch('auth/signin', values)
        .catch(() => {
          const title = this.error ? 'Не удалось войти в систему' : 'Что-то пошло не так'
          const html = this.error
            ? this.error
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
    isAuthenticated() {
      return this.$store.state.auth.status.isAuthenticated;
    }
  },
  created() {
    if (this.isAuthenticated) {
      this.$router.push('/');
    }
  }
}
</script>
