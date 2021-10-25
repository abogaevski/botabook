<template>
  <Modal :show-modal="showModal">
    <template v-slot:modal-content>
      <Form
        class="form"
        :validation-schema="projectSchema"
        @submit="submitProject"
      >
        <div class="modal-header pb-0 border-0 justify-content-end">
          <bt-button
            btn-class="btn-icon btn-sm btn-active-icon-primary"
            @click:btn="close"
            icon-class="svg-icon-1"
            icon-url="/media/icons/duotone/Navigation/Close.svg"
          />
        </div>
        <div class="modal-body py-10 px-lg-17">
          <div class="text-center mb-13">
            <h1 class="mb-3">Добавить услугу</h1>
            <div class="text-muted fw-bold fs-5">Если вам необходимо больше информации, посмотрите
              <a href="#" class="link-primary fw-bolder">страницу вопросов и ответов</a>.
            </div>
          </div>

          <div class="d-flex flex-column mb-5 fv-row fv-plugins-icon-container">
            <label class="required fs-5 fw-bold mb-2">Название</label>
            <Field
              type="text"
              name="title"
              class="form-control form-control-solid"
              placeholder="Например, консультация"
            />
            <div class="fv-plugins-message-container invalid-feedback">
              <ErrorMessage name="title"/>
            </div>
          </div>

          <div class="d-flex flex-column mb-5 fv-row fv-plugins-icon-container">
            <label class="fs-5 fw-bold mb-2">Описание</label>
            <Field
              as="textarea"
              type="text"
              name="description"
              class="form-control form-control-solid"
            />
            <div class="fv-plugins-message-container invalid-feedback">
              <ErrorMessage name="description"/>
            </div>
          </div>

          <div class="row mb-5">
            <div class="col-md-6 fv-row fv-plugins-icon-container">
              <label class="required fs-5 fw-bold mb-2">Цена</label>
              <Field
                type="number"
                name="price"
                class="form-control form-control-solid"
                placeholder="Например, 600"
              />
              <div class="fv-plugins-message-container invalid-feedback">
                <ErrorMessage name="price"/>
              </div>
            </div>

            <div class="col-md-6 fv-row fv-plugins-icon-container">
              <label class="required fs-5 fw-bold mb-2">
                Продолжительность
              </label>
              <Field
                type="number"
                name="timeRange"
                class="form-control form-control-lg form-control-solid"
                placeholder="Например, 60"
              />
              <div class="fs-7 fw-bold text-muted d-flex justify-content-end">в минутах</div>
              <div class="fv-plugins-message-container invalid-feedback">
                <ErrorMessage name="timeRange"/>
              </div>
            </div>
          </div>

          <div class="d-flex flex-column mb-10 fv-row fv-plugins-icon-container">
            <label class="fs-5 fw-bold mb-2 required">Цвет</label>
            <div class="d-flex flex-row align-self-center">
              <template v-for="(color, i) in colors" :key="i">
                <Field
                  type="radio"
                  name="color"
                  class="btn-check"
                  :value="color"
                  :id="getProjectColorInputId(color)"
                />
                <label
                  class="btn btn-outline me-3 h-40px w-40px symbol symbol-circle"
                  :class="badgeColor(color)"
                  :for="getProjectColorInputId(color)"/>
              </template>
            </div>
            <div class="fv-plugins-message-container invalid-feedback">
              <ErrorMessage name="color"/>
            </div>
          </div>

          <div class="fv-row mb-15">
            <div class="d-flex flex-stack">
              <div class="me-5">
                <label class="fs-5 fw-bold">Активировать услугу после создания?</label>
                <div class="fs-7 fw-bold text-muted">
                  Вы можете отложить активацию услуги,
                  чтобы изменить позже.
                </div>
              </div>
              <label class="form-check form-check-custom form-check-solid">
                <Field name="isActive" v-model="isActiveProject" v-slot="{ value, field }">
                  <el-switch
                    v-bind="field"
                    :model-value="value"
                  />
                </Field>
                <span class="form-check-label fw-bold text-muted">Да</span>
              </label>
            </div>
          </div>
          <div class="text-center">
            <bt-button
              @click:btn="close"
              class="btn-light me-3"
            >
              Отменить
            </bt-button>
            <button type="submit" class="btn btn-primary">
              <span class="indicator-label">Создать</span>
              <span class="indicator-progress">Please wait...
                <span class="spinner-border spinner-border-sm align-middle ms-2"></span>
              </span>
            </button>
          </div>
        </div>
      </Form>
    </template>
  </Modal>
</template>
<script>
import { Form, Field, ErrorMessage } from 'vee-validate'
import { mapActions } from 'vuex'
import * as Yup from 'yup'
import Swal from 'sweetalert2'
import Modal from '@/components/_core/Modal'
import BtButton from '@/components/_core/buttons/BtButton'

export default {
  name: 'ProjectCreateModal',
  emits: ['modal:hide'],
  props: ['showModal'],
  data() {
    const projectSchema = Yup.object({
      title: Yup.string()
        .trim()
        .required()
        .label('Название услуги'),
      description: Yup.string()
        .label('Описание встречи'),
      price: Yup.number().test(
        'maxDigitsAfterDecimal',
        'number field must have 2 digits after decimal or less',
        (number) => /^\d+(\.\d{1,2})?$/.test(number)
      )
        .required()
        .label('Цена'),
      timeRange: Yup.number()
        .required()
        .label('Продолжительность'),
      isActive: Yup.boolean()
        .required(),
      color: Yup.string()
        .required()
        .label('Цвет')
    })
    return {
      isActiveProject: true,
      colors: [
        'primary',
        'success',
        'danger',
        'info',
        'warning',
        'dark',
      ],
      projectSchema
    }
  },
  components: { Modal, Form, BtButton, Field, ErrorMessage },
  methods: {
    ...mapActions('project', ['createProject']),

    submitProject(project, actions) {
      console.log(project)
      this.createProject(project)
        .then(() => {
          Swal.fire({
            title: 'Ваша услуга успешно добавлена!',
            icon: 'success',
            buttonsStyling: false,
            confirmButtonText: 'Отлично:)',
            customClass: {
              confirmButton: 'btn btn-primary'
            }
          }).then(() => {
            actions.resetForm()
            this.close()
          })
        })
        .catch((e) => {
          Swal.fire({
            title: 'Произошла ошибка!',
            html: e,
            icon: 'error',
            buttonsStyling: false,
            confirmButtonText: 'Попробовать еще раз',
            customClass: {
              confirmButton: 'btn btn-secondary'
            }
          })
        })
    },
    close() {
      this.$emit('modal:hide')
    },
    getProjectColorInputId(color) {
      return `project_color_${color}`
    },
    badgeColor(color) {
      return `border-${color} btn-light-${color} btn-outline-${color}`
    }
  }
}
</script>
