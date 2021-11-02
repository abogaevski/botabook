<template>
  <div
    class="d-flex flex-column flex-column-fluid bgi-position-y-bottom position-x-center bgi-no-repeat bgi-size-contain bgi-attachment-fixed min-vh-100"
    style="background-image: url('/media/illustrations/progress-hd.png')"
  >
    <div class="d-flex flex-center flex-column flex-column-fluid p-10 pb-lg-20">

      <div class="mb-12">
        <img alt="Logo" src="/media/logos/botabook-dark.svg" class="h-50px"/>
      </div>

      <div class="w-lg-500px bg-white rounded shadow-sm p-10 p-lg-15 mx-auto">
        <div v-if="error" class="alert alert-danger d-flex align-items-center p-5 mb-10">
          <span class="svg-icon svg-icon-2hx svg-icon-danger me-4">
            <inline-svg src="/media/icons/duotone/General/Shield-protected.svg"/>
          </span>
          <div class="d-flex flex-column">
            <h5 class="mb-1 text-danger">{{ error }}</h5>
          </div>
        </div>
        <Form
          class="form w-100"
          :validation-schema="signinSchema"
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
              type="email"
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
                to="/reset-password"
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
              <span class="indicator-label">Войти</span>
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
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { computed, ref } from 'vue'
import { Form, Field, ErrorMessage } from 'vee-validate'
import { string, object } from 'yup'
import ContactModal from '@/components/common/ContactModal'

export default {
  name: 'SignIn',

  components: {
    Form, Field, ErrorMessage, ContactModal
  },
  emits: ['modal:show', 'modal:close'],
  setup() {
    const store = useStore()
    const router = useRouter()
    const signinSchema = object().shape({
      email: string()
        .required()
        .email()
        .label('Email'),
      password: string()
        .required()
        .label('Пароль')
    })
    const isActiveContactModal = ref(false)
    const submitButton = ref()
    const showModal = () => isActiveContactModal.value = true
    const closeModal = () => isActiveContactModal.value = false
    const error = computed(() => store.getters.error)
    const isAuthenticated = computed(() => store.state.auth.status.isAuthenticated)
    const submitSignin = (values) => {
      values.email = values.email.toLowerCase()
      submitButton.value.setAttribute('data-bb-indicator', 'on')
      store.dispatch('auth/signin', values)
        .catch(() => submitButton.value.removeAttribute('data-bb-indicator'))
    }
    isAuthenticated.value ? router.push({ name: 'dashboard' }) : false
    return {
      submitButton,
      signinSchema,
      showModal,
      closeModal,
      error,
      submitSignin,
      isActiveContactModal
    }
  }
}
</script>
