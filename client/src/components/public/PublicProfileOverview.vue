<template>
  <div class="card h-lg-100">
    <div class="card-body px-5">
      <div class="d-flex flex-center flex-column">
        <div class="symbol symbol-70px symbol-circle mb-3">
          <img :src="profile.avatar || '/media/avatars/blank.png'" alt="image">
        </div>
        <div class="fs-3 text-gray-800 fw-bolder mb-3">{{ fullName }}</div>
        <div class="badge badge-lg badge-light-primary d-flex mb-3">{{ profile.title }}</div>
        <div class="d-flex flex-wrap flex-start w-100 my-5">
            <div class="fw-bold text-muted">
              {{ profile.welcomeText }}
            </div>
        </div>
      </div>
      <div class="d-flex flex-stack fs-4 mb-3">
        <div class="fw-bolder rotate collapsible">Детали</div>
      </div>
      <div class="separator"></div>
      <div class="fs-6 mt-3">
        <div class="d-flex justify-content-between mb-3 mb-lg-5">
          <div class="fw-bold text-gray-600">График работы</div>
          <div class="fw-bolder">{{ profile.startWorkHour }} - {{ profile.endWorkHour }}</div>
        </div>
        <div class="d-flex justify-content-between mb-3 mb-lg-5">
          <div class="fw-bold text-gray-600">Часовой пояс</div>
          <div class="fw-bolder">{{ profile.timezone }}</div>
        </div>
        <div class="d-flex justify-content-between mb-3 mb-lg-5">
          <div class="fw-bold text-gray-600">Рабочий телефон</div>
          <div class="fw-bolder">
            <a :href="phoneLink" class="text-hover-primary">{{ profile.phone }}</a>
          </div>
        </div>
        <div class="d-flex justify-content-between mb-3 mb-lg-5">
          <div class="fw-bold text-gray-600">Название компании</div>
          <div class="fw-bolder">{{ profile.company }}</div>
        </div>
        <div class="d-flex justify-content-between mb-3 mb-lg-5">
          <div class="fw-bold text-gray-600">Сайт</div>
          <div class="fw-bolder">
            <a :href="profile.website" class="text-hover-primary">{{ profile.website }}</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { useRoute } from 'vue-router'
import { onMounted, ref, computed } from 'vue'
import UserService from '@/core/services/user.service'

export default {
  setup() {
    const route = useRoute()
    const profile = ref([])

    const getProfileInfo = async () => {
      profile.value = await UserService.getPublicProfile(route.params.slug)
        .then((p) => p)
    }
    onMounted(getProfileInfo)

    const fullName = computed(() => `${profile.value.firstName} ${profile.value.lastName}`)
    const phoneLink = computed(() => `tel:${profile.value.phone}`)

    return {
      getProfileInfo,
      profile,
      fullName,
      phoneLink
    }
  }
}
</script>
