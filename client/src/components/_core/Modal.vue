<template>
  <teleport to="body">
    <div
      class="modal fade"
      tabindex="-1"
      aria-modal="true"
      role="dialog"
      ref="modal"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
    >
      <div class="modal-dialog modal-dialog-centered" :class="widthClass">
        <div class="modal-content">
          <slot name="modal-content"></slot>
        </div>
      </div>
    </div>
  </teleport>
</template>
<script>
import { Modal } from 'bootstrap'

export default {
  name: 'Modal',
  props: {
    showModal: Boolean,
    widthClass: {
      type: String,
      default: 'mw-650px'
    }
  },
  data() {
    return {
      modalEl: {},
      modalInstance: {}
    }
  },
  mounted() {
    this.modalEl = this.$refs.modal
    this.modalInstance = new Modal(this.modalEl)
  },
  watch: {
    showModal() {
      this.modalInstance.toggle()
    }
  },
  beforeUnmount() {
    this.modalInstance.hide()
    this.modalInstance = ''
  },
  methods: {
    close() {
      this.$emit('modal:close')
    }
  }
}
</script>
