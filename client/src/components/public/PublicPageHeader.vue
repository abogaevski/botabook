<template>
  <div class="header align-items-stretch">
    <div class="container d-flex align-items-center justify-content-between">
      <a target="_blank" href="/" class="align-items-center d-flex">
        <img src="/media/logos/botabook-dark.svg" class="h-35px logo" alt="">
      </a>
      <div class="d-flex flex-shrink-0">
        <div
          class="menu-title-gray-700 menu fw-bold my-5 my-lg-0">
          <div class="menu-item me-lg-1">
            <a @click.prevent="showModal" class="menu-link py-3" href="#">
              <span class="menu-title">Помощь</span>
            </a>
          </div>
          <div class="menu-item me-lg-1">
            <a target="_blank" class="menu-link py-3" href="/">
              <span class="menu-title">О BotaBook</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
  <contact-modal
    :showModal="isActiveContactModal"
    @modal:close="closeModal"
  />
</template>
<script>
import { ref } from 'vue'
import ContactModal from '@/components/common/ContactModal'

export default {
  name: 'PublicPageHeader',
  components: { ContactModal },
  setup() {
    const isActiveContactModal = ref(false)
    const showModal = () => isActiveContactModal.value = true
    const closeModal = () => isActiveContactModal.value = false
    return {
      isActiveContactModal,
      showModal,
      closeModal
    }
  }
}
</script>
