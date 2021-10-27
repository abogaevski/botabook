<template>
  <Modal :show-modal="showModal" width-class="mw-800px">
    <template v-slot:modal-content>
        <div class="modal-header pb-0 border-0 justify-content-end">
          <bt-button
            btn-class="btn-icon btn-sm btn-active-icon-primary"
            @click:btn="$emit('modal:close')"
            icon-class="svg-icon-1"
            icon-url="/media/icons/duotone/Navigation/Close.svg"
          />
        </div>
        <div class="modal-body m-5">
          <Form
            class="mx-auto mw-600px w-100 py-10 pt-0 fv-plugins-bootstrap5 fv-plugins-framework"
            :validation-schema="contactValidationSchema"
            @submit="submitContactForm"
          >
            <div class="pb-10 pb-lg-12">
              <h2 class="fw-bolder text-dark">Свяжитесь с нами</h2>
              <div class="text-muted fw-bold fs-6">Если вам эта форма кажется неудобной
                <a href="mailto:hello.botabook@gmail.com" class="link-primary fw-bolder">Напишите сюда:)</a>.
              </div>
            </div>
            <div class="fv-row mb-5 fv-plugins-icon-container">
              <label class="fs-6 fw-bold form-label required">Имя</label>
              <Field name="name" type="name" class="form-control form-control-lg form-control-solid" />
              <div class="fv-plugins-message-container invalid-feedback">
                <ErrorMessage name="name"/>
              </div>
            </div>
            <div class="fv-row mb-5 fv-plugins-icon-container">
              <label class="fs-6 fw-bold form-label required">Email</label>
              <Field name="email" class="form-control form-control-lg form-control-solid" />
              <div class="fv-plugins-message-container invalid-feedback">
                <ErrorMessage name="email"/>
              </div>
            </div>
            <label class="fs-6 fw-bold form-label required">Я...</label>
            <div class="mb-0">
              <label class="d-flex flex-stack mb-5 cursor-pointer">
                <span class="d-flex align-items-center me-2">
                  <span class="symbol symbol-50px me-6">
                    <span class="symbol-label">
                      <span class="svg-icon svg-icon-1 svg-icon-gray-600">
                        <inline-svg src="/media/icons/duotone/General/Bank.svg" />
                      </span>
                    </span>
                  </span>
                  <span class="d-flex flex-column">
                      <span class="fw-bolder text-gray-800 text-hover-primary fs-5">Инвестор</span>
                      <span class="fs-6 fw-bold text-muted">Хочу помочь с денежкой</span>
                  </span>
                </span>
                <span class="form-check form-check-custom form-check-solid is-valid">
                  <Field class="form-check-input" type="radio" name="account_type" value="1" />
                </span>
              </label>
            </div>
            <div class="mb-0">
              <label class="d-flex flex-stack mb-5 cursor-pointer">
                <span class="d-flex align-items-center me-2">
                  <span class="symbol symbol-50px me-6">
                    <span class="symbol-label">
                      <span class="svg-icon svg-icon-1 svg-icon-gray-600">
                        <inline-svg src="/media/icons/duotone/Code/Code.svg" />
                      </span>
                    </span>
                  </span>
                  <span class="d-flex flex-column">
                    <span class="fw-bolder text-gray-800 text-hover-primary fs-5">Разработчик</span>
                    <span class="fs-6 fw-bold text-muted">Хочу тоже делать BotaBook</span>
                  </span>
                </span>
                <span class="form-check form-check-custom form-check-solid is-valid">
                  <Field class="form-check-input" type="radio" name="account_type" value="2" />
                </span>
              </label>
            </div>
            <div class="mb-5">
              <label class="d-flex flex-stack mb-5 cursor-pointer">
                <span class="d-flex align-items-center me-2">
                  <span class="symbol symbol-50px me-6">
                    <span class="symbol-label">
                      <span class="svg-icon svg-icon-1 svg-icon-gray-600">
                        <inline-svg src="/media/icons/duotone/Communication/Chat5.svg"/>
                      </span>
                    </span>
                  </span>
                  <span class="d-flex flex-column">
                    <span class="fw-bolder text-gray-800 text-hover-primary fs-5">Есть вопросы</span>
                    <span class="fs-6 fw-bold text-muted">Хочу предложить идею или что-то не нравится</span>
                  </span>
                </span>
                <span class="form-check form-check-custom form-check-solid is-valid">
                  <Field class="form-check-input" type="radio" name="account_type" value="3" />
                </span>
              </label>
            </div>
            <div class="fv-plugins-message-container invalid-feedback mb-5">
              <ErrorMessage name="account_type"/>
            </div>
            <div class="mb-8">
              <label class="fs-6 fw-bold form-label required">Ваше сообщение</label>
              <Field name="message" as="textarea" class="form-control form-control-solid" rows="3" placeholder="Тут можно написать вопрос или просто Привет" />
              <div class="fv-plugins-message-container invalid-feedback">
                <ErrorMessage name="message"/>
              </div>
            </div>
            <div class="text-center">
              <button type="reset" class="btn btn-light me-3">Отменить</button>
              <button ref="submitBtn" type="submit" class="btn btn-primary">
                <span class="indicator-label">Отправить</span>
                <span class="indicator-progress">Подождите...
                  <span class="spinner-border spinner-border-sm align-middle ms-2"></span>
                </span>
              </button>
            </div>
          </Form>
        </div>
    </template>
  </Modal>
</template>
<script>
import { ref } from 'vue'
import { Form, Field, ErrorMessage } from 'vee-validate'
import Swal from 'sweetalert2'
import * as Yup from 'yup'
import PublicService from '@/core/services/public.service'
import Modal from '@/components/_core/Modal'
import BtButton from '@/components/_core/buttons/BtButton'

export default {
  name: 'ContactModal',
  props: ['showModal'],
  emits: ['modal:close'],
  components: { Modal, Form, Field, BtButton, ErrorMessage },
  setup(_, { emit }) {
    const submitBtn = ref()
    const contactValidationSchema = Yup.object({
      name: Yup.string()
        .required()
        .label('Имя'),
      email: Yup.string()
        .email()
        .required()
        .label('Email'),
      account_type: Yup.string()
        .required()
        .label('Тип обращения'),
      message: Yup.string()
        .required()
        .label('Сообщение')
    })
    const submitContactForm = (values, { resetForm }) => {
      submitBtn.value.setAttribute('data-bb-indicator', 'on')
      PublicService.sendNotificationRequest(values)
        .then((response) => {
          if (response.success) {
            submitBtn.value.removeAttribute('data-bb-indicator')
            Swal.fire({
              title: 'Запрос отправлен!',
              icon: 'success',
              showCancelButton: false,
              buttonsStyling: false,
              confirmButtonText: 'Супер!',
              customClass: {
                confirmButton: 'btn btn-primary',
                cancelButton: 'btn btn-active-light'
              }
            })
            resetForm()
            emit('modal:close')
          }
        })
        .catch((e) => {
          submitBtn.value.removeAttribute('data-bb-indicator')
          Swal.fire({
            title: 'Произошла ошибка!',
            html: e,
            icon: 'error',
            showCancelButton: false,
            buttonsStyling: false,
            confirmButtonText: 'Попробовать еще раз!',
            customClass: {
              confirmButton: 'btn btn-light',
            }
          })
        })
    }
    return {
      contactValidationSchema,
      submitContactForm,
      submitBtn
    }
  }
}
</script>
