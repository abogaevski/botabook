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
            <div class="fs-6 fw-bold mt-2 mb-3">Цена</div>
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
          <div class="col-xl-3">
            <div class="fs-6 fw-bold mt-2 mb-3">Цвет</div>
          </div>
          <div class="col-xl-9 fv-row fv-plugins-icon-container">
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
                class="btn btn-outline me-3 h-40px w-40px symbol symbol-circle"
                :class="badgeColor(color)"
                :for="getProjectColorInputId(color)"/>
            </template>
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
        <button type="reset" class="btn btn-light btn-active-light-primary me-2">Отменить изменения</button>
        <button type="submit" class="btn btn-primary">Сохранить</button>
      </div>
    </Form>
  </div>
</template>
<script>
import { ErrorMessage, Field, Form } from 'vee-validate'
import * as Yup from 'yup'
import Swal from 'sweetalert2'
import { computed, toRefs } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {
  props: {
    project: Object
  },
  components: { Form, Field, ErrorMessage },
  setup(props) {
    const router = useRouter()
    const store = useStore()
    const { project } = toRefs(props)
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
    const colors = [
      'primary',
      'success',
      'danger',
      'info',
      'warning',
      'dark'
    ]
    const getProjectColorInputId = (color) => `project_color_${color}`
    const badgeColor = (color) => `border-${color} btn-light-${color} btn-outline-${color}`
    const projectData = computed(() => ({ ...project.value }))

    const submitProject = (values) => {
      const projectValues = {
        id: projectData.value.id,
        ...values
      }
      store.dispatch('project/updateProject', projectValues)
        .then(() => {
          Swal.fire({
            title: 'Вы уверены, что хотите изменить проект?',
            icon: 'question',
            showCancelButton: true,
            buttonsStyling: false,
            confirmButtonText: 'Изменить!',
            cancelButtonText: 'Отмена',
            customClass: {
              confirmButton: 'btn btn-warning',
              cancelButton: 'btn btn-active-light'
            }
          })
            .then((result) => {
              if (result.value) {
                Swal.fire({
                  title: 'Услуга успешно изменена!',
                  icon: 'success',
                  showCancelButton: false,
                  buttonsStyling: false,
                  confirmButtonText: 'Супер!',
                  customClass: {
                    confirmButton: 'btn btn-success'
                  }
                })
                  .then(() => router.push(`/project/${project.value.id}/overview`))
              }
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
    }

    return {
      colors,
      projectSchema,
      getProjectColorInputId,
      badgeColor,
      projectData,
      submitProject
    }
  }
}
</script>
