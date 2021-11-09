<template>
  <div class="d-flex flex-column flex-column-fluid">
    <div class="d-flex flex-column flex-column-fluid text-center p-10 py-lg-20">
      <a href="#" class="mb-10 pt-lg-20">
        <img alt="Logo" src="/media/logos/botabook-dark.svg" class="h-50px mb-5" />
      </a>

      <div class="pt-lg-10">
        <h1 class="fw-bolder fs-4x text-gray-700 mb-10">Упс... Ошибка 404</h1>

        <div class="fw-bold fs-3 text-gray-400 mb-15">
          Страница не найдена! <br />
          Пожалуйста, вернитесь на главную или укажите правильный URL
        </div>

        <div class="text-center">
          <router-link to="/app" class="btn btn-lg btn-primary fw-bolder">На главную</router-link>
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
import { ref } from 'vue'
import ContactModal from '@/components/common/ContactModal'

export default {
  name: 'error-404',
  components: { ContactModal },
  emits: ['modal:show', 'modal:close'],
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
