<template>
  <div v-if="project" class="card">
    <div class="card-header">
      <div class="card-title fs-3 fw-bolder">Настройки</div>
    </div>
    <Form
      class="form"
      :validation-schema="projectSchema"
      @submit="submitProject"
    >
      <div class="card-body p-9">
        <div class="row mb-8">
          <div class="col-xl-3">
            <div class="fs-6 fw-bold mt-2 mb-3">Название</div>
          </div>
          <div class="col-xl-9 fv-row fv-plugins-icon-container">
            <Field
              v-model.lazy="projectData.title"
              type="text"
              name="title"
              class="form-control form-control-solid"
              placeholder="Например, консультация"
            />
            <div class="fv-plugins-message-container invalid-feedback">
              <ErrorMessage name="title"/>
            </div>
          </div>
        </div>
        <div class="row mb-8">
          <div class="col-xl-3">
            <div class="fs-6 fw-bold mt-2 mb-3">Описание</div>
          </div>
          <div class="col-xl-9 fv-row fv-plugins-icon-container">
            <Field
              v-model.lazy="projectData.description"
              as="textarea"
              type="text"
              name="description"
              class="form-control form-control-solid"
            />
            <div class="fv-plugins-message-container invalid-feedback">
              <ErrorMessage name="description"/>
            </div>
          </div>
        </div>
        <div class="row mb-8">
          <div class="col-xl-3">
            <div class="fs-6 fw-bold mt-2">Цена</div>
            <div class="fs-7 fw-bold text-muted d-flex mb-3">в рублях</div>
          </div>
          <div class="col-xl-9 fv-row fv-plugins-icon-container">
            <Field
              v-model.lazy="projectData.price"
              type="number"
              name="price"
              class="form-control form-control-solid"
              placeholder="Например, 600"
            />
            <div class="fv-plugins-message-container invalid-feedback">
              <ErrorMessage name="price"/>
            </div>
          </div>
        </div>
        <div class="row mb-8">
          <div class="col-xl-3">
            <div class="fs-6 fw-bold mt-2">Продолжительность</div>
            <div class="fs-7 fw-bold text-muted d-flex mb-3">в минутах</div>
          </div>
          <div class="col-xl-9 fv-row fv-plugins-icon-container">
            <Field
              v-model.lazy="projectData.timeRange"
              type="number"
              name="timeRange"
              class="form-control form-control-lg form-control-solid"
              placeholder="Например, 60"
            />
            <div class="fv-plugins-message-container invalid-feedback">
              <ErrorMessage name="timeRange"/>
            </div>
          </div>
        </div>
        <div class="row mb-8">
          <div class="col-md-3">
            <div class="fs-6 fw-bold mt-2 mb-5 mb-md-0">Цвет</div>
          </div>
          <div class="col-md-9 fv-row fv-plugins-icon-container">
            <div class="d-flex flex-row justify-content-start justify-content-md-end">
              <template v-for="(color, i) in colors" :key="i">
                <Field
                  v-model.lazy="projectData.color"
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
            <div class="fv-plugins-message-container invalid-feedback">
              <ErrorMessage name="color"/>
            </div>
          </div>
        </div>
        <div class="row mb-15">
          <div class="col-xl-3">
            <label class="fs-6 fw-bold mt-2 mb-3">Услуга активна?</label>
          </div>
          <div class="col-xl-9 fv-row fv-plugins-icon-container">
            <label class="form-check form-check-custom form-check-solid mt-2 mb-3">
              <Field name="isActive" v-model="projectData.isActive" v-slot="{ value, field }">
                <el-switch
                  v-bind="field"
                  :model-value="value"
                />
              </Field>
              <span class="form-check-label fw-bold text-muted">Да</span>
            </label>
          </div>
        </div>
      </div>
      <div class="card-footer d-flex justify-content-end py-6 px-9">
        <button ref="submitBtn" type="submit" class="btn btn-primary">
          <span class="indicator-label">Изменить</span>
          <span class="indicator-progress">Подождите...
                <span class="spinner-border spinner-border-sm align-middle ms-2"></span>
              </span>
        </button>
      </div>
    </Form>
  </div>
</template>
<script>
import { ErrorMessage, Field, Form } from 'vee-validate'
import { object, string, number, boolean } from 'yup'
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'

export default {
  components: { Form, Field, ErrorMessage },
  setup() {
    const route = useRoute()
    const store = useStore()
    const { id } = route.params
    const project = computed(() => store.getters['project/projectById'](id))
    const projectSchema = object().shape({
      title: string()
        .trim()
        .required()
        .label('Название услуги'),
      description: string()
        .nullable()
        .label('Описание встречи'),
      price: number()
        .typeError('Укажите пожалуйста цену, либо же 0.')
        .required('Укажите пожалуйста цену.')
        .required()
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
    const colors = ['primary', 'success', 'danger', 'info', 'warning', 'dark']
    const getProjectColorInputId = (color) => `project_color_${color}`
    const badgeColor = (color) => `border-${color} btn-light-${color} btn-outline-${color}`
    const projectData = computed(() => ({ ...project.value }))
    const submitBtn = ref()

    const submitProject = (values) => {
      const projectValues = {
        id: projectData.value.id,
        ...values
      }
      store.dispatch('project/updateProject', projectValues)
        .finally(() => {
          submitBtn.value.removeAttribute('data-bb-indicator')
        })
    }

    return {
      colors,
      projectSchema,
      getProjectColorInputId,
      badgeColor,
      projectData,
      submitProject,
      submitBtn,
      project
    }
  }
}
</script>
