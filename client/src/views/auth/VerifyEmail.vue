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
            <router-link :to="{name: 'app'}" class="btn btn-lg btn-primary fw-bolder">Вернуться в BotaBook</router-link>
          </div>
        </div>
        <bt-content-loader v-else />
        <div
          class="d-flex flex-row-auto bgi-no-repeat bgi-position-x-center bgi-size-contain bgi-position-y-bottom min-h-100px min-h-lg-350px"
          style="background-image: url('/media/illustrations/17.png')"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import alert from '@/core/_utils/swal'
import AuthService from '@/core/services/auth.service'
import BtContentLoader from '@/components/_core/BtContentLoader'

export default {
  name: 'VerifyEmail',
  components: { BtContentLoader },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const isLoading = ref(true)
    AuthService.verifyEmail(route.params.token)
      .catch((e) => {
        alert({
          title: `Ошибка: ${e.response.status}`,
          html: 'Ссылка больше недействительна',
          icon: 'error'
        }).then(() => router.push({ name: 'app' }))
      })
      .finally(() => isLoading.value = false)
    return {
      isLoading
    }
  }
}
</script>
