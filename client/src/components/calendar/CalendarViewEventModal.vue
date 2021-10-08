<template>
  <Modal :show-modal="showModal">
    <template v-slot:modal-content>
      <div class="modal-header border-0 justify-content-end">
        <bt-button
          v-if="!event.isApproved"
          @click:btn="approveEvent"
          btn-class="btn-sm btn-light-success btn-active-icon-white me-7"
          icon-class="svg-icon-2"
          icon-url="/media/icons/duotone/Navigation/Check.svg"
        >
          Подтвердить
        </bt-button>
        <bt-button
          v-if="!event.isApproved"
          btn-class="btn-icon btn-sm btn-active-icon-danger"
          @click:btn="deleteEvent"
          icon-class="svg-icon-1"
          icon-url="/media/icons/duotone/General/Trash.svg"
        />
        <bt-button
          btn-class="btn-icon btn-sm btn-active-icon-primary"
          @click:btn="$emit('modal:close')"
          icon-class="svg-icon-1"
          icon-url="/media/icons/duotone/Navigation/Close.svg"
        />
      </div>

      <div class="modal-body mx-5 mx-xl-18 pt-0 pb-15">

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
            <span class="fw-bold">{{ project.price }} руб.</span>
          </div>
        </div>

        <div v-if="event.link && event.isApproved" class="d-flex align-items-center mb-9">
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
              <a href="#" class="fw-bolder text-gray-900 text-hover-primary mb-2">{{ customer.name }}</a>
              <div class="fw-bold text-muted">{{ customer.email }}</div>
            </div>
          </div>
          <div class="ms-2 w-100px">
          </div>
        </div>

        <div v-if="!event.isApproved" class="d-flex flex-stack pt-9 py-4 border-1 border-gray-300 border-top-dashed">
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
                  v-model="event.link"
                />
                <button class="btn btn-secondary" type="submit">Добавить</button>
              </div>
              <div class="text-muted fs-7 mt-2">Пока вы не подтвердите встречу, вы можете менять ссылку, сколько хотите!
                После подтверждения ссылку изменить больше нельзя
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
import { computed, toRefs } from 'vue'
import { useStore } from 'vuex'
import moment from 'moment'
import { Form, Field, ErrorMessage } from 'vee-validate'
import Swal from 'sweetalert2'
import * as Yup from 'yup'
import Modal from '@/components/_core/Modal'
import BtButton from '@/components/_core/buttons/BtButton'

export default {
  props: {
    showModal: Boolean,
    eventData: Object
  },
  emits: ['modal:close'],
  components: { Modal, BtButton, Form, Field, ErrorMessage },
  setup(props, { emit }) {
    const { eventData } = toRefs(props)
    const store = useStore()

    const event = computed(() => eventData.value)
    const eventDurationDate = computed(() => {
      const start = moment(event.value.start).format('DD MMM HH:mm')
      const end = moment(event.value.end).format('HH:mm')
      return `${start} - ${end}`
    })
    const eventIconColor = computed(() => ` svg-icon-${event.value.eventColor}`)

    const project = computed(() => store.getters['project/projectById'](event.value.project))

    const customer = computed(() => store.getters['customerModule/customerById'](event.value.customer))
    const customerSymbolColor = computed(() => `bg-light-${customer.value.eventColor} text-${customer.value.eventColor}`)

    const approveEvent = () => {
      Swal.fire({
        title: 'Хотите подтвердить эту встречу?',
        icon: 'question',
        showCancelButton: true,
        buttonsStyling: false,
        confirmButtonText: 'Подтвердить!',
        cancelButtonText: 'Позже',
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-active-light'
        }
      }).then((result) => {
        if (result.value) {
          store.dispatch('calendar/approveEvent', event.value.id)
            .then(() => {
              event.value.isApproved = true
              Swal.fire({
                title: 'Встреча подтверждена!',
                icon: 'success',
                showCancelButton: false,
                buttonsStyling: false,
                confirmButtonText: 'Супер!',
                customClass: {
                  confirmButton: 'btn btn-success',
                }
              })
            })
        }
      })
    }
    const deleteEvent = () => {
      Swal.fire({
        title: 'Вы уверены, что хотите удалить встречу?',
        icon: 'question',
        showCancelButton: true,
        buttonsStyling: false,
        confirmButtonText: 'Удалить!',
        cancelButtonText: 'Отмена',
        customClass: {
          confirmButton: 'btn btn-primary',
          cancelButton: 'btn btn-active-light'
        }
      }).then((result) => {
        if (result.value) {
          this.deleteEvent(event.value.id)
          emit('modal:close')
        }
      })
    }
    const eventLinkSchema = Yup.object({
      link: Yup.string()
        .url()
        .nullable()
        .label('Ссылка')
    })
    const addEventLink = (values) => {
      const payload = {
        id: event.value.id,
        ...values
      }
      store.dispatch('calendar/addEventLink', { ...payload })
        .then(() => {
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
    }

    return {
      eventDurationDate,
      eventIconColor,
      project,
      customer,
      customerSymbolColor,
      approveEvent,
      deleteEvent,
      eventLinkSchema,
      addEventLink,
      event,
    }
  }
}
</script>
