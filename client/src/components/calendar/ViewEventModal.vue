<template>
  <Modal :show-modal="showModal">
    <template v-slot:modal-content>
        <div class="modal-header border-0 justify-content-end">
          <bt-button
            btn-class="btn-icon btn-sm btn-active-icon-primary"
            @click:btn="editEvent"
            icon-class="svg-icon-2"
            icon-url="/media/icons/duotone/General/Edit.svg"
          ></bt-button>
          <bt-button
            btn-class="btn-icon btn-sm btn-active-icon-primary"
            @click:btn="deleteEventHandler"
            icon-class="svg-icon-1"
            icon-url="/media/icons/duotone/General/Trash.svg"
          ></bt-button>
          <bt-button
            btn-class="btn-icon btn-sm btn-active-icon-primary"
            @click:btn="close"
            icon-class="svg-icon-1"
            icon-url="/media/icons/duotone/Navigation/Close.svg"
          ></bt-button>
        </div>

        <div class="modal-body pt-0 pb-20 px-lg-17">
            <div class="d-flex">
              <span class="svg-icon svg-icon-1 svg-icon-muted me-5">
                <inline-svg src="/media/icons/duotone/Interface/Calendar.svg"></inline-svg>
              </span>
              <div class="mb-9">
                <div class="d-flex align-items-center mb-2">
                  <span class="fs-3 fw-bolder me-3">{{ event.title }}</span>
                  <span
                    v-if="event.allDay"
                    class="badge badge-light-success">Весь день</span>
                </div>
              </div>
            </div>
            <div class="d-flex align-items-center mb-2">
              <span class="svg-icon svg-icon-1 svg-icon-success me-5">
                <inline-svg src="/media/icons/duotone/Design/Circle.svg"></inline-svg>
              </span>
              <div class="fs-6">
                <span class="fw-bolder">Начинается:</span>
                <span class="ms-2">{{ event.start }}</span>
              </div>
            </div>

            <div class="d-flex align-items-center mb-9">
              <span class="svg-icon svg-icon-1 svg-icon-danger me-5">
                <inline-svg src="/media/icons/duotone/Design/Circle.svg"></inline-svg>
              </span>
              <div class="fs-6">
                <span class="fw-bolder">Заканчивается:</span>
                <span class="ms-2">{{ event.end }}</span>
              </div>
            </div>
        </div>
    </template>
  </Modal>
</template>

<script>
import moment from 'moment'
import Swal from 'sweetalert2';
import { mapActions } from 'vuex';
import BtButton from '@/components/_core/buttons/BtButton.vue'
import Modal from '@/components/_core/Modal.vue'

export default {
  name: 'ViewEventModal',
  emits: ['modal:hide', 'modal:edit-event'],
  props: {
    showModal: Boolean,
    eventData: Object
  },
  data() {
    return {
      event: {
        id: '',
        title: '',
        startDate: '',
        endDate: '',
        startTime: '',
        endTime: '',
        allDay: false,
      },
    }
  },
  watch: {
    showModal(show) {
      if (show) {
        this.event = {
          ...this.eventData
        }
        if (this.eventData.allDay) {
          this.event.start = moment(this.eventData.start).format('DD.MM.YYYY')
          this.event.end = moment(this.eventData.end).format('DD.MM.YYYY')
        } else {
          this.event.start = moment(this.eventData.start).format('DD.MM.YYYY HH:mm')
          this.event.end = moment(this.eventData.end).format('DD.MM.YYYY HH:mm')
        }
      }
    }
  },
  methods: {
    ...mapActions('calendar', ['deleteEvent']),
    close() {
      this.$emit('modal:hide')
    },
    editEvent() {
      this.close()
      this.$emit('modal:edit-event')
    },
    deleteEventHandler() {
      Swal.fire({
        title: 'Вы уверены, что хотите удалить встречу?',
        icon: 'warning',
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
          this.deleteEvent(this.event.id)
          this.close()
        }
      });
    }
  },
  components: { Modal, BtButton }
}
</script>
