<template>
  <Modal :show-modal="showModal">
    <template v-slot:modal-content>
      <div class="modal-header pb-0 border-0 justify-content-end">
        <bt-button
          btn-class="btn-icon btn-sm btn-active-icon-primary"
          @click:btn="close"
          icon-class="svg-icon-1"
          icon-url="/media/icons/duotone/Navigation/Close.svg"
        />
      </div>
      <div class="modal-body scroll-y px-10 px-lg-15 pt-0 pb-15">
        <Form :validation-schema="columnSchema" @submit="addColumn">
          <div class="mb-13 text-center">
            <h1 class="mb-3">Добавить новую колонку</h1>
            <div class="text-muted fw-bold fs-5">После создания колонки на вашей доске клиентов появится новая пустая колонка.</div>
          </div>
          <div class="d-flex flex-column mb-8 fv-row fv-plugins-icon-container">
            <label class="d-flex align-items-center fs-6 fw-bold mb-2">
              <span class="required">Название</span>
            </label>
            <Field
              type="text"
              class="form-control form-control-solid"
              placeholder="Например, на удержании"
              name="title" />
            <div class="fv-plugins-message-container invalid-feedback">
              <ErrorMessage name="title" />
            </div>
          </div>

          <div class="d-flex flex-column mb-15 fv-row fv-plugins-icon-container">
            <label class="d-flex align-items-center fs-6 fw-bold mb-2">
              <span>Цвет</span>
            </label>
            <div class="d-flex flex-row align-self-center">
              <template v-for="(color, i) in colors" :key="i">
                <Field
                  type="radio"
                  name="color"
                  class="btn-check"
                  :value="color"
                  :id="getColumnColorInputId(color)"
                />
                <label
                  class="btn btn-outline me-3 h-40px w-40px symbol symbol-circle"
                  :class="badgeColor(color)"
                  :for="getColumnColorInputId(color)"/>
              </template>
            </div>
          </div>

          <div class="text-center">
            <button type="reset" class="btn btn-light me-3">Отмена</button>
            <button type="submit" class="btn btn-primary">
              <span class="indicator-label">Создать</span>
            </button>
          </div>
        </Form>
      </div>
    </template>
  </Modal>
</template>
<script>
import { Form, Field, ErrorMessage } from 'vee-validate'
import Modal from '@/components/_core/Modal'
import BtButton from '@/components/_core/buttons/BtButton'

export default {
  name: 'CustomerBoardNewColumnModal',
  props: ['showModal'],
  components: { Modal, BtButton, Form, Field, ErrorMessage },
  setup() {
    const colors = [
      'primary',
      'success',
      'danger',
      'info',
      'warning',
      'dark',
    ]
    const getColumnColorInputId = (color) => `project_color_${color}`
    const badgeColor = (color) => `border-${color} btn-light-${color} btn-outline-${color}`
    return {
      colors,
      getColumnColorInputId,
      badgeColor
    }
  }
}
</script>
