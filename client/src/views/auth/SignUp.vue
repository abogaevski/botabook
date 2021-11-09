<template>
  <Form
          class="form w-100 fv-plugins-bootstrap5 fv-plugins-framework"
          novalidate="novalidate"
          @submit="submitSignup"
          :validation-schema="signupSchema"
        >
          <div class="mb-10 text-center">
            <h1 class="text-dark mb-3">Создать аккаунт</h1>
            <div class="text-gray-400 fw-bold fs-4">
              Уже есть аккаунт?
              <router-link :to="{name:'signin'}" class="link-primary fw-bolder">Войдите</router-link>
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
            <label class="form-label fw-bolder text-dark fs-6">E-mail</label>
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
                <div class="text-muted fs-8 mt-1">Пароль должен состоять минимум из 8 символов.
                  <br/>Должна быть как минимум одна большая буква, а также минимум одна цифра.</div>
                <div class="fv-plugins-message-container">
                  <div class="fv-help-block">
                    <ErrorMessage name="password"/>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="fv-row mb-5">
            <label class="form-label fw-bolder text-dark fs-6">Подтвердите пароль</label>
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
</template>

<script>
import { useStore } from 'vuex'
import { computed, ref } from 'vue'
import { string, object, ref as yref } from 'yup'
import { Form, Field, ErrorMessage } from 'vee-validate'

export default {
  name: 'SignUp',
  components: { Form, Field, ErrorMessage },
  setup() {
    const store = useStore()
    const signupSchema = object().shape({
      firstName: string()
        .max(50)
        .trim()
        .required()
        .label('Имя'),
      lastName: string()
        .max(50)
        .trim()
        .required()
        .label('Фамилия'),
      email: string()
        .trim()
        .min(4)
        .required()
        .lowercase()
        .email()
        .label('E-mail'),
      password: string()
        .trim()
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)\S{8,}\S$/, 'Пароль не соответствует требованиям')
        .required()
        .label('Пароль'),
      cpassword: string()
        .trim()
        .min(8)
        .required()
        .oneOf([yref('password'), null], 'Пароли должны совпадать')
        .label('Подтверждение пароля'),
    })
    const submitButton = ref()
    const error = computed(() => store.getters.error)
    const submitSignup = (values) => {
      values.email = values.email.toLowerCase()
      submitButton.value.setAttribute('data-bb-indicator', 'on')
      const userData = {
        ...values,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
      }
      store.dispatch('auth/signup', userData)
        .catch(() => submitButton.value.removeAttribute('data-bb-indicator'))
    }
    return {
      signupSchema,
      submitButton,
      error,
      submitSignup
    }
  },
}
</script>
