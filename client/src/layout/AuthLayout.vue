<template>
  <div
    class="d-flex flex-column flex-column-fluid bgi-position-y-bottom position-x-center bgi-no-repeat bgi-size-contain bgi-attachment-fixed"
    style="background-image: url('/media/illustrations/14.png')"
  >
    <div class="d-flex flex-center flex-column flex-column-fluid p-10 pb-lg-20">
      <div class="mb-12">
        <router-link to="/">
          <img alt="BotaBook Logo" src="/media/logos/botabook-dark.svg" class="h-50px"/>
        </router-link>
      </div>
      <div class="bg-white mw-500px mw-xl-550px min-w-xl-450px  mx-auto p-10 p-lg-15 rounded shadow-sm">
        <router-view/>
      </div>
    </div>
    <div class="d-flex flex-center flex-column-auto p-10">
      <div class="d-flex align-items-center fw-bold fs-6">
        <router-link to="/" class="text-muted text-hover-primary px-2">О BotaBook</router-link>
        <a href="#" @click.prevent="showModal" class="text-muted text-hover-primary px-2">Связаться</a>
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
  name: 'AuthLayout',
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
