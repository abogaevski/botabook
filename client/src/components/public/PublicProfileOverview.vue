<template>
  <div class="card">
    <div class="card-body px-3 px-sm-5">
      <div class="d-flex flex-center flex-column">
        <div class="symbol symbol-100px symbol-circle mb-3">
          <img :src="profile.avatar || '/media/avatars/blank.png'" alt="image">
        </div>
        <div class="fs-3 text-gray-800 fw-bolder mb-3">{{ fullName }}</div>
        <div v-if="profile.title" class="badge badge-lg badge-light-primary d-flex mb-3">{{ profile.title }}</div>
        <div v-if="profile.welcomeText" class="d-flex flex-wrap flex-start w-100 mb-3">
            <div class="fw-bold text-muted">{{ profile.welcomeText }}</div>
        </div>
      </div>
      <div class="separator my-3"></div>
      <div class="fs-6 mt-3">
        <div v-if="profile.startWorkHour && profile.endWorkHour" class="d-flex justify-content-between mb-3 mb-lg-5">
          <div class="fw-bold text-gray-600">График работы</div>
          <div class="fw-bolder">{{ profile.startWorkHour }} - {{ profile.endWorkHour }}</div>
        </div>
        <div v-if="profile.timezone" class="d-flex justify-content-between mb-3 mb-lg-5">
          <div class="fw-bold text-gray-600">Часовой пояс</div>
          <div class="fw-bolder">{{ profile.timezone }}</div>
        </div>
        <div v-if="profile.phone" class="d-flex justify-content-between mb-3 mb-lg-5">
          <div class="fw-bold text-gray-600">Рабочий телефон</div>
          <div class="fw-bolder">
            <a :href="phoneLink" class="text-hover-primary">{{ profile.phone }}</a>
          </div>
        </div>
        <div v-if="profile.company" class="d-flex justify-content-between mb-3 mb-lg-5">
          <div class="fw-bold text-gray-600">Название компании</div>
          <div class="fw-bolder">{{ profile.company }}</div>
        </div>
        <div v-if="profile.website" class="d-flex justify-content-between mb-3 mb-lg-5">
          <div class="fw-bold text-gray-600">Сайт</div>
          <div class="fw-bolder">
            <a target="_blank" :href="profile.website" class="text-hover-primary">{{ website }}</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { computed } from 'vue'
import truncate from '@/core/filters'

export default {
  setup() {
    const route = useRoute()
    const store = useStore()

    store.dispatch('userProfile/getPublicProfile', route.params.slug)
    const profile = computed(() => store.getters['userProfile/user'])

    const fullName = computed(() => `${profile.value.firstName} ${profile.value.lastName}`)
    const phoneLink = computed(() => `tel:${profile.value.phone}`)
    const website = computed(() => truncate(profile.value.website, 20))

    return {
      profile,
      fullName,
      phoneLink,
      website
    }
  }
}
</script>
