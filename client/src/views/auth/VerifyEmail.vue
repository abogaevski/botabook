<template>
  <div class="d-flex flex-column flex-root">
    <div class="d-flex flex-column flex-column-fluid">
      <div class="d-flex flex-column flex-column-fluid text-center p-10 py-lg-15">
        <router-link to="/" class="mb-10 pt-lg-10">
          <img alt="Logo" src="/media/logos/botabook-dark.svg" class="h-40px mb-5">
        </router-link>
        <div
          v-if="!isLoading"
          class="pt-lg-10 mb-10">
          <h1 class="fw-bolder fs-2qx text-gray-800 mb-7">Добро пожаловать в BotaBook</h1>
          <div class="fw-bold fs-3 text-muted mb-15">Ваша электронная почта была успешно подтверждена!
            <br>Можете нажать на кнопку ниже, чтобы продолжить работу.</div>
          <div class="text-center">
            <router-link to="/app" class="btn btn-lg btn-primary fw-bolder">Вернуться в BotaBook</router-link>
          </div>
        </div>
        <bt-content-loader v-else />
        <div
          class="d-flex flex-row-auto bgi-no-repeat bgi-position-x-center bgi-size-contain bgi-position-y-bottom min-h-100px min-h-lg-350px"
          style="background-image: url('/media/illustrations/sketchy-1/17.png')"></div>
      </div>
      <div class="d-flex flex-center flex-column-auto p-10">
        <div class="d-flex align-items-center fw-bold fs-6">
          <router-link to="/" class="text-muted text-hover-primary px-2">О Bota</router-link>
          <a href="#" @click.prevent="showModal" class="text-muted text-hover-primary px-2">Связаться</a>
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
import { useRoute, useRouter } from 'vue-router'
import alert from '@/core/_utils/swal'
import AuthService from '@/core/services/auth.service'
import ContactModal from '@/components/common/ContactModal'
import BtContentLoader from '@/components/_core/BtContentLoader'

export default {
  name: 'VerifyEmail',
  components: { ContactModal, BtContentLoader },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const isActiveContactModal = ref(false)
    const isLoading = ref(true)
    const showModal = () => isActiveContactModal.value = true
    const closeModal = () => isActiveContactModal.value = false
    AuthService.verifyEmail(route.params.token)
      .then(() => isLoading.value = false)
      .catch((e) => alert({
        title: `Ошибка: ${e.response.status}`,
        html: 'Ссылка больше недействительна',
        icon: 'error'
      }).then(() => router.push('/app')))
    return {
      isActiveContactModal,
      showModal,
      closeModal,
      isLoading
    }
  }
}
</script>
