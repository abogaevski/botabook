<template>
  <Modal :show-modal="showModal">
    <template v-slot:modal-content>
      <Form
        class="form"
        @submit="submitEvent"
        :validation-schema="eventSchema"
      >
        <div class="modal-header">
          <h2 class="fw-bolder">
            Добавить встречу
          </h2>
          <bt-button
            btn-class="btn-icon btn-sm btn-active-icon-primary"
            @click:btn="close"
            icon-class="svg-icon-1"
            icon-url="/media/icons/duotone/Navigation/Close.svg"
          ></bt-button>
        </div>

        <div class="modal-body py-10 px-lg-17">

          <Field
            type="text"
            name="title"
            v-model.trim="event.title"
            v-slot="{ value, field, errorMessage }"
          >
            <div class="fv-row mb-9 fv-plugins-icon-container">
              <label class="fs-6 fw-bold required mb-2">Тема встречи</label>
              <el-input
                v-bind="field"
                :model-value="value"
                placeholder="Название встречи"
              />
              <div class="fv-plugins-message-container invalid-feedback">
                {{ errorMessage }}
              </div>
            </div>
          </Field>

          <Field
            name="allDay"
            v-model="event.allDay"
            v-slot="{ value, field }"
          >
            <div class="fv-row mb-9">
              <label class="form-check form-check-custom form-check-solid">
                <el-switch
                  v-bind="field"
                  :model-value="value"
                />
                <span class="form-check-label fw-bold">Весь день?</span>
              </label>
            </div>
          </Field>

          <div class="row row-cols-lg-2 g-10">
            <div class="col">

              <Field
                name="startDate"
                v-model="event.startDate"
                v-slot="{ value, errorMessage, handleChange }"
              >
                <div class="fv-row mb-9 fv-plugins-icon-container">
                  <label class="fs-6 fw-bold required mb-2">Дата начала</label>
                  <el-date-picker
                    class="form-control form-control-solid"
                    :model-value="value"
                    @update:model-value="handleChange"
                    type="date"
                    placeholder="Select date and time"
                    format="DD.MM.YYYY"
                    value-format="YYYY-MM-DD"
                  >
                  </el-date-picker>
                  <div class="fv-plugins-message-container invalid-feedback">
                    {{ errorMessage }}
                  </div>
                </div>
              </Field>

            </div>
            <div
              class="col"
              v-if="!event.allDay"
            >

              <Field
                name="startTime"
                v-model="event.startTime"
                v-slot="{ value, field, errorMessage }"
              >
                <div
                  class="fv-row mb-9 fv-plugins-icon-container">
                  <label class="fs-6 fw-bold required mb-2">Время начала</label>
                  <el-time-select
                    v-bind="field"
                    :model-value="value"
                    start='08:30'
                    step='00:15'
                    end='18:30'
                    placeholder="Select date and time"
                  >
                  </el-time-select>
                  <div class="fv-plugins-message-container invalid-feedback">
                    {{ errorMessage }}
                  </div>
                </div>
              </Field>

            </div>
          </div>

          <div class="row row-cols-lg-2 g-10">
            <div class="col">

              <Field
                name="endDate"
                v-model="event.endDate"
                v-slot="{ value, errorMessage, handleChange }"
              >
                <div class="fv-row mb-9 fv-plugins-icon-container">
                  <label class="fs-6 fw-bold required mb-2">Дата конца</label>
                  <el-date-picker
                    :model-value="value"
                    @update:model-value="handleChange"
                    type="date"
                    placeholder="Выберите дату"
                    format="DD.MM.YYYY"
                    value-format="YYYY-MM-DD"
                  >
                  </el-date-picker>
                  <div class="fv-plugins-message-container invalid-feedback">
                    {{ errorMessage }}
                  </div>
                </div>
              </Field>

            </div>
            <div
              class="col"
              v-if="!event.allDay"
            >
              <Field
                name="endTime"
                v-model="event.endTime"
                v-slot="{ value, field, errorMessage }"
              >
                <div
                  class="fv-row mb-9 fv-plugins-icon-container">
                  <label class="fs-6 fw-bold required mb-2">Время конца</label>
                  <el-time-select
                    v-bind="field"
                    :model-value="value"
                    start='08:30'
                    step='00:15'
                    end='18:30'
                    placeholder="Выберите время"
                  >
                  </el-time-select>
                  <div class="fv-plugins-message-container invalid-feedback">
                    {{ errorMessage }}
                  </div>
                </div>
              </Field>
            </div>
          </div>
        </div>

        <div class="modal-footer">
          <bt-button
            btn-type="button"
            btn-class="btn-light me-3"
            @click:btn="close"
          >
            Отмена
          </bt-button>

          <bt-button
            btn-type="submit"
            btn-class="btn-primary"
          >
            Добавить встречу
          </bt-button>
        </div>
      </Form>
    </template>
  </Modal>
</template>

<script>
import { Form, Field } from 'vee-validate'
import { mapActions } from 'vuex'
import * as Yup from 'yup'
import moment from 'moment'
import Swal from 'sweetalert2'
import BtButton from '@/components/_core/buttons/BtButton.vue'
import Modal from '@/components/_core/Modal.vue'

export default {
  name: 'AddEventModal',
  emits: ['modal:hide'],
  props: {
    showModal: Boolean,
    eventData: Object
  },
  data() {
    const eventSchema = Yup.object({
      title: Yup.string()
        .trim()
        .required()
        .label('Тема встречи'),
      startDate: Yup.string()
        .required(),
      endDate: Yup.string()
        .required(),
      allDay: Yup.boolean()
        .required()
    })

    return {
      eventSchema,
      event: {
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
        this.event.allDay = this.eventData.allDay
        this.event.startDate = moment(this.eventData.start).format('YYYY-MM-DD')
        this.event.endDate = moment(this.eventData.end).format('YYYY-MM-DD')
        this.event.startTime = moment(this.eventData.start).format('HH:mm')
        this.event.endTime = moment(this.eventData.end).format('HH:mm')
      }
    }
  },
  methods: {
    ...mapActions('calendar', ['createEvent']),

    close() {
      this.$emit('modal:hide')
    },
    submitEvent(event, actions) {
      const formData = {
        title: this.event.title,
        start: moment(`${this.event.startDate} ${this.event.startTime}`).toISOString(),
        end: moment(`${this.event.endDate} ${this.event.endTime}`).toISOString(),
        allDay: this.event.allDay,
        customer: {
          email: 'a@bbo.com',
          name: 'Ivan',
          phone: '+375336098531'
        }
      }

      this
        .createEvent(formData)
        .then(() => {
          Swal.fire({
            title: 'Ваша встреча успешно добавлена в календарь!',
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
    }
  },
  components: { Modal, BtButton, Form, Field }
}
</script>
