<template>
  <div class="align-items-stretch min-h-70px pt-5">
    <div class="container">
      <div class="align-items-center row">
        <div class="col-xl-3 col-lg-4">
          <a target="_blank" href="/" class="d-flex justify-content-center">
            <img src="/media/logos/botabook-dark.svg" class="h-35px logo" alt="">
          </a>
        </div>
        <div class="col-xl-9 col-lg-8">
          <div class="d-flex flex-shrink-0 justify-content-lg-end justify-content-center">
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
