<template>
  <div class="d-flex flex-column flex-column-fluid">
    <div class="d-flex flex-column flex-column-fluid text-center p-10">
      <a href="#" class="mb-10">
        <img alt="Logo" src="media/logos/botabook-dark.svg" class="h-50px mb-5" />
      </a>
      <div class="pt-lg-5">
        <h1 class="fw-bolder fs-2qx text-gray-800 mb-10">Ой. Системная ошибка</h1>

        <div class="fw-bold fs-3 text-gray-400 mb-15">
          Что-то пошло не так! <br />
          Попробуйте позже. <br />
          <pre v-if="error">{{ error }}</pre>
        </div>
        <div class="text-center">
          <a href="#" @click.prevent="showModal" class="btn btn-lg btn-primary fw-bolder me-5">Написать нам</a>
          <router-link to="/app" class="btn btn-lg btn-light fw-bolder">Вернуться в BotaBook</router-link>
        </div>
        <div
          class="d-flex flex-row-auto bgi-no-repeat bgi-position-x-center bgi-size-contain bgi-position-y-bottom min-h-100px min-h-lg-350px"
          style="background-image: url('/media/illustrations/17.png')">
        </div>
      </div>
    </div>

    <div class="d-flex flex-center flex-column-auto p-10">
      <div class="d-flex align-items-center fw-bold fs-6">
        <router-link to="/app" class="text-muted text-hover-primary px-2">Главная</router-link>
        <router-link to="/" class="text-muted text-hover-primary px-2">О BotaBook</router-link>
        <a href="#" @click.prevent="showModal" class="text-muted text-hover-primary px-2">Связаться с нами</a>
      </div>
    </div>
  </div>
  <contact-modal
    :showModal="isActiveContactModal"
    @modal:close="closeModal"
  />
</template>

<script>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import ContactModal from '@/components/common/ContactModal'

export default {
  name: 'error-500',
  components: { ContactModal },
  setup() {
    const store = useStore()
    const isActiveContactModal = ref(false)
    const showModal = () => isActiveContactModal.value = true
    const closeModal = () => isActiveContactModal.value = false
    const error = computed(() => store.getters.error)
    return {
      isActiveContactModal,
      showModal,
      closeModal,
      error
    }
  }
}
</script>
