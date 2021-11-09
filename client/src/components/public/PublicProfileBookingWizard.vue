<template>
    <div class="card card-flush overflow-hidden">
      <div class="card-body px-3 px-sm-5 p-5 pt-7">
        <div v-if="!bookingComplete" class="stepper stepper-links" ref="addEventFormStepper">
          <public-page-stepper-nav />
          <Form
            class="fv-plugins-bootstrap5 fv-plugins-framework"
            @submit="formSubmit"
            :validation-schema="eventRequestSchema"
          >
            <div class="current" data-bb-stepper-element="content">
              <div class="w-100 mb-4">
                <div class="py-7">
                  <h2 class="fw-bolder d-flex align-items-center text-dark">Выберите услугу</h2>
                </div>
                <div class="fv-row fv-plugins-icon-container fv-plugins-bootstrap5-row-valid">
                  <div class="row g-3 g-xl-5">
                    <div
                      v-for="(project, k) in projects"
                      :key="k"
                      class="col-xl-4 col-lg-6 col-md-6">
                      <Field
                        type="radio"
                        class="btn-check"
                        name="projectId"
                        :value="project.id"
                        :id="getProjectInputId(project.id)"
                        v-model="formData.projectId"
                      />
                      <public-page-project-button :project="project" :project-input-id="getProjectInputId(project.id)" />
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
              <div class="w-100 mb-4">
                <div class="py-7">
                  <h2 class="fw-bolder d-flex align-items-center text-dark">Выберите дату и время</h2>
                </div>
                <div class="fv-row fv-plugins-icon-container">
                  <div class="row">
                    <div class="col-xl-3">
                      <public-page-project-info :project-id="formData.projectId" />
                    </div>
                    <div class="col-xl-6">
                      <div class="fv-row fv-plugins-icon-container">
                        <public-page-wizard-calendar @calendar:change-date="handleDateChange" />
                      </div>
                    </div>
                    <div class="col-xl-3 mh-xl-300px">
                      <template v-if="dates.length">
                        <label class="form-label mb-3">{{ labelTime }}</label>
                        <div
                          data-bb-scroll="true"
                          data-bb-scroll-activate="{default: false, lg: true}"
                          data-bb-scroll-height="340px"
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
                              class="d-block btn public-time-element"
                              :class="getAvailableTimeClass(date.status)"
                              :for="getEventInputId(date.time)">
                              {{ getTimeOnly(date.time) }}
                            </label>
                          </template>
                        </div>
                      </template>
                      <bt-content-loader v-if="isWaitingForNewDates" />
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
              <div class="w-100 mb-4">
                <div class="py-7">
                  <h2 class="fw-bolder d-flex align-items-center text-dark">Укажите ваши данные для встречи</h2>
                </div>
                <div class="row">
                  <div class="col-xl-3">
                    <public-page-project-info :project-id="formData.projectId" :event="formData.time" />
                  </div>
                  <div class="col-xl-9">
                    <div class="mb-5 fv-row fv-plugins-icon-container">
                      <label class="form-label mb-3 required">Введите имя</label>
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
                      <label class="form-label mb-3 required">Введите телефон</label>
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
                      <label class="form-label mb-3 required">Введите email</label>
                      <Field
                        type="text"
                        class="form-control form-control-lg form-control-solid"
                        name="email"
                        v-model="formData.email"
                      />
                      <div class="fv-plugins-message-container">
                        <div class="fv-help-block">
                          <ErrorMessage name="email"/>
                        </div>
                      </div>
                    </div>
                    <div class="fv-row fv-plugins-icon-container">
                      <label class="form-label mb-3">Сообщение
                        <span class="fs-7 fw-bold text-muted d-flex">
                          Напишите что угодно, что могло бы помочь подготовиться к встрече
                        </span>
                      </label>
                      <Field
                        as="textarea"
                        type="text"
                        class="form-control form-control-lg form-control-solid"
                        name="description"
                        v-model="formData.description"
                      />
                      <div class="fv-plugins-message-container">
                        <div class="fv-help-block">
                          <ErrorMessage name="description"/>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="d-flex flex-stack">
              <div class="mr-2">
                <button
                  type="button"
                  class="btn btn-light-primary"
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
                  ref="submitBtn"
                  type="submit"
                  class="btn btn-primary"
                  v-if="currentStepIndex === totalSteps - 1"
                >
                  <span class="indicator-label">Отправить</span>
                  <span class="indicator-progress">Подождите...
                    <span class="spinner-border spinner-border-sm align-middle ms-2"></span>
                  </span>
                </button>
                <button
                  type="button"
                  class="btn btn-primary"
                  v-else
                  @click="handleStep"
                  :disabled="isDisabledContinueButton"
                >Далее
                  <span class="svg-icon svg-icon-4 ms-1 me-0">
                    <inline-svg src="/media/icons/duotone/Navigation/Arrow-right.svg"/>
                  </span>
                </button>
              </div>
            </div>
          </Form>

        </div>
        <public-page-booking-complete v-else :event-date="formData.time" :project-id="formData.projectId" />
      </div>
    </div>
</template>
<script>
import { toRefs, ref, onMounted, computed } from 'vue'
import { Field, Form, ErrorMessage } from 'vee-validate'
import { useRoute } from 'vue-router'
import { string, object } from 'yup'
import moment from 'moment'
import alert from '@/core/_utils/swal'
import { StepperComponent } from '@/core/components/_StepperComponent'
import EventService from '@/core/services/calendar.service'
import { ScrollComponent } from '@/core/components/_ScrollComponent'
import PublicPageStepperNav from '@/components/public/wizard/PublicPageStepperNav'
import PublicPageProjectButton from '@/components/public/wizard/PublicPageProjectButton'
import PublicPageWizardCalendar from '@/components/public/wizard/PublicPageWizardCalendar'
import PublicPageProjectInfo from '@/components/public/wizard/PublicPageProjectInfo'
import BtContentLoader from '@/components/_core/BtContentLoader'
import PublicPageBookingComplete from '@/components/public/PublicPageBookingComplete'

export default {
  components: {
    Form,
    Field,
    ErrorMessage,
    PublicPageStepperNav,
    PublicPageProjectButton,
    PublicPageWizardCalendar,
    PublicPageProjectInfo,
    PublicPageBookingComplete,
    BtContentLoader
  },
  props: ['projects'],
  emits: ['calendar:change-date'],
  setup(props) {
    const route = useRoute()
    const { projects } = toRefs(props)
    const addEventFormStepper = ref()
    const dates = ref([])
    const stepperObj = ref()
    const currentStepIndex = ref(0)
    const labelTime = ref('')
    const submitBtn = ref()
    const bookingComplete = ref(false)
    const eventRequestSchema = object().shape({
      name: string()
        .required()
        .label('Имя'),
      email: string()
        .email()
        .required()
        .label('Email'),
      phone: string()
        .required()
        .label('Телефон'),
    })
    const formData = ref({
      projectId: '',
      time: '',
      name: '',
      phone: '',
      email: '',
      description: ''
    })
    const totalSteps = computed(() => {
      if (!stepperObj.value) {
        return
      }
      return stepperObj.value.totalStepsNumber
    })
    const slug = computed(() => route.params.slug)
    const isDisabledContinueButton = ref(false)
    const isWaitingForNewDates = ref(false)
    const getProjectInputId = (id) => `project_type_${id}`
    const getEventInputId = (date) => {
      const id = getTimeOnly(date).replace(':', '_')
      return `event_time_${id}`
    }
    const getTimeOnly = (date) => moment(date).format('HH:mm')
    const getAvailableTimeClass = (status) => (status === 'available'
      ? 'btn-light-primary btn-active-primary'
      : 'btn-light')

    const previousStep = () => {
      if (!stepperObj.value) {
        return
      }
      if (currentStepIndex.value === 1) {
        if (formData.value.time) {
          formData.value.time = ''
          dates.value = []
        }
      }
      currentStepIndex.value--
      stepperObj.value.goPrev()
    }

    const handleStep = () => {
      if (!stepperObj.value) {
        return
      }
      if (currentStepIndex.value === 1) {
        if (!formData.value.time) {
          alert({ title: 'Пожалуйста, укажите дату!', icon: 'warning' })
          return
        }
      }
      currentStepIndex.value++
      stepperObj.value.goNext()
    }

    const handleDateChange = async (date) => {
      isWaitingForNewDates.value = true
      formData.value.time = ''
      labelTime.value = moment(date.date).format('DD MMM YYYY')
      dates.value = []
      dates.value = await EventService.getAvailableDates(slug.value, date.id, formData.value.projectId)
        .then((d) => {
          setTimeout(() => {
            ScrollComponent.reinitialization()
            isWaitingForNewDates.value = false
          }, 0)
          return d
        })
        .catch((e) => {
          alert({ title: 'Произошла ошибка!', html: e, icon: 'error' })
        })
    }

    const formSubmit = () => {
      submitBtn.value.setAttribute('data-bb-indicator', 'on')
      EventService.addEventRequest(formData.value)
        .then((response) => {
          submitBtn.value.removeAttribute('data-bb-indicator')
          if (response.status === 'ok') {
            alert({ title: 'Ваш запрос успешно отправлен!', icon: 'success', })
              .then(() => {
                bookingComplete.value = true
              })
          }
        })
        .catch((e) => {
          submitBtn.value.removeAttribute('data-bb-indicator')
          alert({ title: 'Произошла ошибка!', html: e, icon: 'error' })
        })
    }

    onMounted(() => {
      stepperObj.value = StepperComponent.createInstance(addEventFormStepper.value)
      formData.value.projectId = projects.value[0].id
    })

    return {
      addEventFormStepper,
      formSubmit,
      getProjectInputId,
      formData,
      handleDateChange,
      dates,
      getEventInputId,
      getAvailableTimeClass,
      getTimeOnly,
      previousStep,
      currentStepIndex,
      totalSteps,
      handleStep,
      eventRequestSchema,
      isDisabledContinueButton,
      isWaitingForNewDates,
      labelTime,
      submitBtn,
      bookingComplete
    }
  }
}
</script>
