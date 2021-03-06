<template>
  <Modal :show-modal="showModal">
    <template v-slot:modal-content>
      <Form
        class="form"
        :validation-schema="projectSchema"
        @submit="submitProject"
      >
        <div class="modal-header border-0 justify-content-end py-4 py-sm-7 pb-0 px-4 px-sm-7">
          <bt-button
            btn-class="btn-icon btn-sm btn-active-icon-primary"
            @click:btn="close"
            icon-class="svg-icon-1"
            icon-url="/media/icons/duotone/Navigation/Close.svg"
          />
        </div>
        <div class="modal-body px-4 px-sm-17">
          <div class="text-center mb-13">
            <h1 class="mb-3">Добавить услугу</h1>
            <div class="text-muted fw-bold fs-5">Если вам необходимо больше информации, обратитесь
              <a target="_blank" href="https://t.me/botabookchat" class="link-primary fw-bolder">в наш чат поддержки</a>.
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
                value="0"
                type="number"
                name="price"
                class="form-control form-control-solid"
                placeholder="Например, 600"
              />
              <div class="fs-7 fw-bold text-muted d-flex justify-content-end">в рублях</div>
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
            <div class="align-items-center d-flex row">
              <div class="col-md-3">
                <label class="fs-5 fw-bold mb-5 mb-md-0 required">Цвет</label>
              </div>
              <div class="col-md-9">
                <div class="d-flex flex-row justify-content-start justify-content-md-end">
                  <template v-for="(color, i) in colors" :key="i">
                    <Field
                      type="radio"
                      name="color"
                      class="btn-check"
                      :value="color"
                      :id="getProjectColorInputId(color)"
                    />
                    <label
                      class="btn btn-outline me-3 h-40px w-40px symbol symbol-circle p-2"
                      :class="badgeColor(color)"
                      :for="getProjectColorInputId(color)"/>
                  </template>
                </div>
              </div>
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
            <button ref="submitBtn" type="submit" class="btn btn-primary">
              <span class="indicator-label">Создать</span>
              <span class="indicator-progress">Подождите...
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
import { ref } from 'vue'
import { Form, Field, ErrorMessage } from 'vee-validate'
import { useStore } from 'vuex'
import { object, string, number, boolean } from 'yup'
import Modal from '@/components/_core/Modal'
import BtButton from '@/components/_core/buttons/BtButton'

export default {
  name: 'ProjectCreateModal',
  emits: ['modal:close'],
  props: ['showModal'],
  components: { Modal, Form, BtButton, Field, ErrorMessage },
  setup(_, { emit }) {
    const store = useStore()
    const projectSchema = object().shape({
      title: string()
        .trim()
        .required()
        .label('Название услуги'),
      description: string()
        .label('Описание встречи'),
      price: number()
        .typeError('Укажите пожалуйста цену, либо же 0.')
        .required('Укажите пожалуйста цену.')
        .label('Цена'),
      timeRange: number()
        .required()
        .label('Продолжительность'),
      isActive: boolean()
        .required(),
      color: string()
        .required()
        .label('Цвет')
    })
    const isActiveProject = ref(true)
    const colors = ['primary', 'success', 'danger', 'info', 'warning', 'dark']
    const submitBtn = ref()
    const submitProject = (values, { resetForm }) => {
      submitBtn.value.setAttribute('data-bb-indicator', 'on')
      store.dispatch('project/createProject', values)
        .finally(() => {
          submitBtn.value.removeAttribute('data-bb-indicator')
          resetForm()
          close()
        })
    }
    const close = () => emit('modal:close')
    const getProjectColorInputId = (color) => `project_color_${color}`
    const badgeColor = (color) => `border-${color} btn-light-${color} btn-outline-${color}`
    return {
      projectSchema,
      isActiveProject,
      colors,
      submitBtn,
      submitProject,
      close,
      getProjectColorInputId,
      badgeColor
    }
  },
}
</script>
