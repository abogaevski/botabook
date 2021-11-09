<template>
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

        <router-link :to="{name: 'signup'}" class="link-primary fw-bolder">
          Создайте аккаунт
        </router-link>
      </div>
    </div>

    <div class="fv-row mb-10">
      <label class="form-label fs-6 fw-bolder text-dark">E-mail</label>

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
        <label class="form-label fw-bolder text-dark fs-6 mb-0">Пароль</label>
        <router-link :to="{name: 'reset-password'}" class="link-primary fs-6 fw-bolder">Забыли пароль ?</router-link>
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
        .label('E-mail'),
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
    isAuthenticated.value ? router.push({ name: 'calendar' }) : false
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
