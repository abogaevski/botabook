<template>
  <div class="flex-lg-row-fluid ms-lg-15">
    <div class="card card-flush mb-6 mb-xl-9">
      <div class="card-header mt-6">
        <div class="card-title flex-column">
          <h2 class="mb-1">
            Записаться
          </h2>
        </div>
      </div>
      <div class="card-body p-9 pt-4">
        <div
          v-if="storageBookingInfo"
          class="notice d-flex bg-light-info rounded mb-9 p-6">
          <span class="svg-icon svg-icon-2tx svg-icon-info me-4">
            <inline-svg src="/media/icons/duotone/General/Notification2.svg" />
          </span>
          <div class="d-flex flex-stack flex-grow-1">
            <div class="fw-bold">
              <div class="fs-7 text-info">
                Вы уже бронировали запись на <strong>{{ storageBookingInfo.time }}</strong>
                <br>Если вы хотите записаться еще раз, пожалуйста, укажите данные ниже.
              </div>
            </div>
          </div>
        </div>
        <div
          class="stepper stepper-links d-flex flex-column"
          ref="addEventFormStepper"
        >
          <div class="stepper-nav py-5">
            <div class="stepper-item current" data-bb-stepper-element="nav">
              <h3 class="stepper-title">Выберите услугу</h3>
            </div>
            <div class="stepper-item" data-bb-stepper-element="nav">
              <h3 class="stepper-title">Выберите дату и время</h3>
            </div>
            <div class="stepper-item" data-bb-stepper-element="nav">
              <h3 class="stepper-title">Последний шаг</h3>
            </div>
          </div>
          <Form
            class="mx-auto mw-700px w-100 py-10 fv-plugins-bootstrap5 fv-plugins-framework"
            @submit="formSubmit"
            novalidate
          >
            <div class="current" data-bb-stepper-element="content">
              <div class="w-100">
                <div class="pb-10 pb-lg-15">
                  <h2 class="fw-bolder d-flex align-items-center text-dark">Выберите услугу</h2>
                </div>
                <div class="fv-row fv-plugins-icon-container fv-plugins-bootstrap5-row-valid">
                  <div class="row">
                    <div
                      v-for="(project, k) in projects"
                      :key="k"
                      class="col-lg-6">
                      <Field
                        type="radio"
                        class="btn-check"
                        name="projectId"
                        :value="project.id"
                        :id="getProjectInputId(project.id)"
                        v-model="formData.projectId"
                      />
                      <label
                        class="btn btn-outline btn-outline-default btn-outline-dashed p-7 d-flex align-items-center mb-10"
                        :for="getProjectInputId(project.id)">
                        <span class="svg-icon svg-icon-3x me-5">
                          <inline-svg src="/media/icons/duotone/Communication/Clipboard-list.svg"></inline-svg>
                        </span>
                        <span class="d-block fw-bold text-start">
                          <span class="text-dark fw-bolder d-block fs-4 mb-2">{{ project.title }}</span>
                          <span class="text-muted fw-bold fs-6">{{ project.description }}</span>
                          <div class="d-flex flex-wrap fw-bold fs-6 mt-4 pe-2">
                            <div class="d-flex align-items-center text-gray-400 text-hover-primary me-5 mb-2">
                              <span class="svg-icon svg-icon-4 me-1">
                                <inline-svg src="/media/icons/duotone/Code/Time-schedule.svg"/>
                                {{ project.timeRange }} мин.
                              </span>
                            </div>
                            <div class="d-flex align-items-center text-gray-400 text-hover-primary me-5 mb-2">
                              <span class="svg-icon svg-icon-4 me-1">
                                <inline-svg src="/media/icons/duotone/Shopping/Money.svg"/>
                                {{ project.price }} руб.
                              </span>
                            </div>
                          </div>
                        </span>
                      </label>
                      <div class="fv-plugins-message-container">
                        <div class="fv-help-block">
                          <ErrorMessage name="projectId"/>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div data-bb-stepper-element="content">
              <div class="w-100">
                <div class="pb-10 pb-lg-15">
                  <h2 class="fw-bolder d-flex align-items-center text-dark">Выберите дату и время</h2>
                </div>
                <div class="mb-10 fv-row fv-plugins-icon-container">
                  <div class="row">
                    <div class="col-lg-6">
                      <div class="fv-row mb-9 fv-plugins-icon-container">
                        <label class="form-label mb-3">Выберите нужную дату</label>
                        <el-date-picker
                          v-model="selectedDate"
                          @update:model-value="handleDateChange"
                          type="date"
                          placeholder="Выберите дату"
                          format="DD.MM.YYYY"
                          value-format="YYYY-MM-DD"
                        >
                        </el-date-picker>
                      </div>
                    </div>
                    <div class="col-lg-6" v-if="dates.length">
                      <label class="form-label mb-3">Выберите время</label>
                      <div
                        data-bb-scroll="true"
                        data-bb-scroll-activate="{default: true}"
                        data-bb-scroll-height="330px"
                        data-bb-scroll-wrappers="#bb_times"
                        data-bb-scroll-offset="0"
                        id="bb_times"
                        class="hover-scroll-overlay-y p-3 border-top border-bottom border-2 border-gray-300"
                      >
                        <template v-for="(date, i) in dates" :key="i">
                          <Field
                            type="radio"
                            name="selectedTime"
                            :value="date.time"
                            v-model="formData.time"
                            class="btn-check"
                            :id="getEventInputId(date.time)"
                            :disabled="date.status === 'busy'"
                          />
                          <label
                            class="d-block btn btn-outline btn-outline-dashed public-time-element"
                            :class="getAvailableTimeClass(date.status)"
                            :for="getEventInputId(date.time)">
                            {{ getTimeOnly(date.time) }}
                          </label>
                        </template>
                      </div>
                      <div class="fv-plugins-message-container">
                        <div class="fv-help-block">
                          <ErrorMessage name="selectedTime"/>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div data-bb-stepper-element="content">
              <div class="w-100">
                <div class="pb-10 pb-lg-15">
                  <h2 class="fw-bolder d-flex align-items-center text-dark">Выберите данные</h2>
                </div>
                <div class="mb-5 fv-row fv-plugins-icon-container">
                  <label class="form-label mb-3">Введите имя</label>
                  <Field
                    type="text"
                    class="form-control form-control-lg form-control-solid"
                    name="name"
                    v-model="formData.name"
                  />
                  <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                      <ErrorMessage name="name"/>
                    </div>
                  </div>
                </div>
                <div class="mb-5 fv-row fv-plugins-icon-container">
                  <label class="form-label mb-3">Введите телефон</label>
                  <Field
                    type="text"
                    class="form-control form-control-lg form-control-solid"
                    name="phone"
                    v-model="formData.phone"
                  />
                  <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                      <ErrorMessage name="phone"/>
                    </div>
                  </div>
                </div>
                <div class="mb-5 fv-row fv-plugins-icon-container">
                  <label class="form-label mb-3">Введите email</label>
                  <Field
                    type="text"
                    class="form-control form-control-lg form-control-solid"
                    name="email"
                    v-model="formData.email"
                  />
                  <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                      <ErrorMessage name="selectedTime"/>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="d-flex flex-stack pt-15">
              <div class="mr-2">
                <button
                  type="button"
                  class="btn btn-lg btn-light-primary me-3"
                  @click="previousStep"
                  data-bb-stepper-action="previous"
                >
                  <span class="svg-icon svg-icon-4 me-1">
                    <inline-svg src="/media/icons/duotone/Navigation/Arrow-left.svg"/>
                  </span>
                  Назад
                </button>
              </div>
              <div>
                <button
                  type="submit"
                  class="btn btn-lg btn-primary me-3"
                  v-if="currentStepIndex === totalSteps - 1"
                >
                  <span class="indicator-label">Отправить
                    <span class="svg-icon svg-icon-3 ms-2 me-0">
                      <inline-svg src="/media/icons/duotone/Navigation/Arrow-right.svg"/>
                    </span>
                  </span>
                  <span class="indicator-progress">Подождите...
                    <span class="spinner-border spinner-border-sm align-middle ms-2"></span></span>
                </button>
                <button
                  type="button"
                  class="btn btn-lg btn-primary"
                  v-else
                  @click="handleStep"
                >Продолжить
                  <span class="svg-icon svg-icon-4 ms-1 me-0">
                    <inline-svg src="/media/icons/duotone/Navigation/Arrow-right.svg"/>
                  </span>
                </button>
              </div>
            </div>
          </Form>

        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Field, Form, ErrorMessage } from 'vee-validate'
import * as Yup from 'yup'
import Swal from 'sweetalert2'
import { StepperComponent } from '@/core/components/_StepperComponent'
import EventService from '@/core/services/calendar.service'
import { ScrollComponent } from '@/core/components/_ScrollComponent'

export default {
  components: { Form, Field, ErrorMessage },
  props: ['projects'],
  data() {
    const addEventValidationSchema = Yup.object({
      projectId: Yup.string()
        .required()
        .label('Проект'),
      selectedTime: Yup.string()
        .required(),
      name: Yup.string()
        .required(),
      phone: Yup.string()
        .required(),
      email: Yup.string()
        .required()
    })
    return {
      dates: [],
      stepperObj: null,
      currentStepIndex: 0,
      selectedDate: '',
      formData: {
        projectId: '',
        time: '',
        name: '',
        phone: '',
        email: ''
      },
      addEventValidationSchema
    }
  },
  methods: {
    getProjectInputId(id) {
      return `project_type_${id}`
    },
    getEventInputId(date) {
      const id = this.getTimeOnly(date).replace(':', '_')
      return `event_time_${id}`
    },
    getTimeOnly(date) {
      // TODO: Change it to moment
      return date.split(' ')[1].split('+')[0]
    },
    getAvailableTimeClass(status) {
      if (status === 'available') {
        return 'btn-outline-primary btn-active-light-primary'
      }
      return 'btn-outline-default'
    },
    previousStep() {
      if (!this.stepperObj) {
        return
      }
      this.currentStepIndex--
      this.stepperObj.goPrev()
    },

    handleStep() {
      if (!this.stepperObj) {
        return
      }
      this.currentStepIndex++
      this.stepperObj.goNext()
    },

    async handleDateChange() {
      if (this.selectedDate === null) {
        this.dates = []
        this.formData.time = ''
      } else {
        this.dates = await EventService.getAvailableDates(this.slug, this.selectedDate, this.formData.projectId)
          .then((d) => {
            setTimeout(() => {
              ScrollComponent.reinitialization()
            }, 100)
            return d
          })
      }
    },

    formSubmit() {
      EventService.addEventRequest(this.formData)
        .then((response) => {
          if (response.status === 'ok') {
            const storageItem = { ...this.formData, slug: this.slug }
            localStorage.setItem('public-booking-state', JSON.stringify(storageItem))
            Swal.fire({
              title: 'Ваш запрос успешно отправлен!',
              icon: 'success',
              buttonsStyling: false,
              confirmButtonText: 'Отлично',
              customClass: {
                confirmButton: 'btn btn-primary'
              }
            }).then(() => {
              window.location.reload()
            })
          }
        })
    }
  },
  mounted() {
    this.stepperObj = StepperComponent.createInstance(this.$refs.addEventFormStepper)
    this.formData.projectId = this.projects[0].id
  },
  computed: {
    totalSteps() {
      if (!this.stepperObj) {
        return
      }
      return this.stepperObj.totalStepsNumber
    },
    slug() {
      return this.$route.params.slug
    },
    storageBookingInfo() {
      const storageObj = JSON.parse(localStorage.getItem('public-booking-state'))
      if (storageObj) {
        if (this.slug === storageObj.slug) {
          storageObj.time = new Date(storageObj.time).toLocaleString('ru')
          return storageObj
        }
      }
      return ''
    }
  }
}
</script>
