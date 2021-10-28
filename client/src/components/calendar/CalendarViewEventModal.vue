<template>
  <Modal :show-modal="showModal">
    <template v-slot:modal-content>
      <div v-if="event" class="modal-header border-0 justify-content-end">
        <calendar-status-buttons :event-id="event.id" :current-status="event.status" />
        <bt-button
          btn-class="btn-icon btn-sm btn-active-icon-primary"
          @click:btn="$emit('modal:close')"
          icon-class="svg-icon-1"
          icon-url="/media/icons/duotone/Navigation/Close.svg"
        />
      </div>

      <div v-if="event" class="modal-body mx-5 mx-xl-18 pt-0 pb-15">

        <div class="d-flex">
          <span class="svg-icon svg-icon-1 me-5 mt-1" :class="eventIconColor">
            <inline-svg src="/media/icons/duotone/Design/Circle.svg"></inline-svg>
          </span>
          <div class="mb-9">
            <div class="d-flex align-items-center mb-2">
              <span class="fs-3 fw-bolder me-3">{{ event.title }}</span>
            </div>
            <div class="fs-6">{{ event.description }}</div>
          </div>
        </div>

        <div class="d-flex align-items-center mb-9">
          <span class="svg-icon svg-icon-1 svg-icon-muted me-5">
            <inline-svg src="/media/icons/duotone/Interface/Calendar.svg"></inline-svg>
          </span>
          <div class="fs-6">
            <span class="fw-bold">{{ eventDurationDate }}</span>
          </div>
        </div>

        <div v-if="project" class="d-flex align-items-center mb-9">
          <span class="svg-icon svg-icon-1 svg-icon-muted me-5">
            <inline-svg src="/media/icons/duotone/Shopping/Money.svg"></inline-svg>
          </span>
          <div class="fs-6">
            <span class="fw-bold">{{ projectPrice }}</span>
          </div>
        </div>

        <div v-if="event.link" class="d-flex align-items-center mb-9">
          <span class="svg-icon svg-icon-1 svg-icon-muted me-5">
            <inline-svg src="/media/icons/duotone/Interface/Map-Marker.svg"/>
          </span>
          <div class="fs-6">
            <a target="_blank" :href="event.link" class="fw-bold text-hover-primary">{{ event.link }}</a>
          </div>
        </div>

        <div v-if="project" class="d-flex flex-stack py-4 border-1 border-gray-300 border-top-dashed">
          <div class="d-flex align-items-center">
            <span class="svg-icon svg-icon-1 svg-icon-muted me-5">
              <inline-svg src="/media/icons/duotone/Communication/Clipboard-list.svg"></inline-svg>
            </span>
            <div class="fs-6">
              <router-link
                :to="`/project/${project.id}`"
                class="fw-bolder text-gray-900 text-hover-primary mb-2">
                {{ project.title }}
              </router-link>
              <div class="fw-bold text-muted">
                {{ project.description }}
              </div>
            </div>
          </div>
        </div>

        <div v-if="customer" class="d-flex flex-stack py-4 border-1 border-gray-300 border-top-dashed">
          <div class="d-flex align-items-center">
            <div class="symbol symbol-25px symbol-circle">
              <span class="symbol-label fw-bold fs-7" :class="customerSymbolColor">{{ customer.initials }}</span>
            </div>
            <div class="ms-5">
              <div class="fw-bolder text-gray-900 text-hover-primary mb-1">{{ customer.name }}</div>
              <div class="d-flex flex-column flex-md-row justify-content-md-between">
                <a :href="`mailto:${customer.email}`" class="fw-bold text-muted mb-1 mb-md-0 me-md-5 text-hover-primary">
                  <span class="svg-icon svg-icon-5 me-1">
                    <inline-svg src="/media/icons/duotone/Communication/Mail-at.svg"/>
                  </span>
                  {{ customer.email }}
                </a>
                <a :href="`tel:${customer.phone}`" class="fw-bold text-muted text-hover-primary">
                  <span class="svg-icon svg-icon-5 me-1">
                    <inline-svg src="/media/icons/duotone/Communication/Contact1.svg"/>
                  </span>
                  {{ customer.phone }}
                </a>
              </div>
            </div>
          </div>
        </div>
        <div v-if="customer" class="d-flex flex-stack pt-9 py-4 border-1 border-gray-300 border-top-dashed">
          <Form class="form" @submit="addEventLink" :validation-schema="eventLinkSchema">
            <div class="row d-flex flex-row fv-row fv-plugins-icon-container">
              <label class="fs-5 fw-bold">Ссылка на встречу</label>
              <div class="text-muted fs-7 mb-2">Добавьте ссылку, чтобы клиент мог подключится</div>
              <div class="input-group">
                <Field
                  type="url"
                  name="link"
                  class="form-control form-control-solid"
                  placeholder="https://botabook.com/meeting-1"
                  :model-value="event.link"
                />
                <button ref="submitLinkBtn" type="submit" class="border-secondary border-start btn btn-light">
                  <span class="indicator-label">Добавить</span>
                  <span class="indicator-progress">Подождите...
                    <span class="spinner-border spinner-border-sm align-middle ms-2"></span>
                  </span>
                </button>
              </div>
              <div class="text-muted fs-7 mt-2">После добавления или изменения ссылки на встречу клиент получит уведомление.
              </div>

              <div class="fv-plugins-message-container invalid-feedback">
                <ErrorMessage name="link"/>
              </div>
            </div>
          </Form>
        </div>

      </div>
    </template>
  </Modal>
</template>
<script>
import { computed, toRefs, ref } from 'vue'
import { useStore } from 'vuex'
import moment from 'moment'
import { Form, Field, ErrorMessage } from 'vee-validate'
import Swal from 'sweetalert2'
import * as Yup from 'yup'
import Modal from '@/components/_core/Modal'
import BtButton from '@/components/_core/buttons/BtButton'
import CalendarStatusButtons from '@/components/calendar/CalendarStatusButtons'

export default {
  props: {
    showModal: Boolean,
    eventId: String
  },
  emits: ['modal:close'],
  components: { Modal, BtButton, Form, Field, ErrorMessage, CalendarStatusButtons },
  setup(props) {
    const { eventId } = toRefs(props)
    const store = useStore()
    const event = computed(() => store.getters['calendar/eventById'](eventId.value))
    const eventDurationDate = computed(() => {
      const start = moment(event.value.start).format('DD MMM HH:mm')
      const end = moment(event.value.end).format('HH:mm')
      return `${start} - ${end}`
    })
    const eventIconColor = computed(() => ` svg-icon-${event.value.eventColor}`)

    const project = computed(() => store.getters['project/projectById'](event.value.project))
    const projectPrice = computed(() => (project.value.price > 0 ? `${project.value.price} руб` : 'Бесплатно'))

    const customer = computed(() => store.getters['customerModule/customerById'](event.value.customer))
    const customerSymbolColor = computed(() => `bg-light-${customer.value.eventColor} text-${customer.value.eventColor}`)

    const eventLinkSchema = Yup.object({
      link: Yup.string()
        .url()
        .nullable()
        .label('Ссылка')
    })
    const submitLinkBtn = ref()
    const addEventLink = (values) => {
      if (values.link) {
        submitLinkBtn.value.setAttribute('data-bb-indicator', 'on')
        const payload = {
          id: event.value.id,
          ...values
        }
        store.dispatch('calendar/updateEvent', { ...payload })
          .then(() => {
            submitLinkBtn.value.removeAttribute('data-bb-indicator')
            Swal.fire({
              title: 'Ссылка успешно добавлена!',
              html: 'Пользователь будет уведомлен о ссылке',
              icon: 'success',
              buttonsStyling: false,
              confirmButtonText: 'Отлично',
              customClass: {
                confirmButton: 'btn btn-primary'
              }
            })
          })
          .catch((e) => {
            submitLinkBtn.value.removeAttribute('data-bb-indicator')
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
      } else {
        Swal.fire({
          title: 'Укажите ссылку!',
          html: 'Вы не указали ссылку для встречи',
          icon: 'error',
          buttonsStyling: false,
          confirmButtonText: 'Попробовать еще раз',
          customClass: {
            confirmButton: 'btn btn-secondary'
          }
        })
      }
    }

    return {
      eventDurationDate,
      eventIconColor,
      project,
      customer,
      customerSymbolColor,
      eventLinkSchema,
      addEventLink,
      event,
      submitLinkBtn,
      projectPrice
    }
  }
}
</script>
