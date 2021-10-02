<template>
  <div class="d-flex flex-column flex-xl-row">
    <div class="flex-column flex-lg-row-auto w-100 w-xl-350px mb-10">
      <div class="card mb-5 mb-xl-8">
        <div class="card-body">
          <div class="d-flex flex-center flex-column py-5">
            <div class="symbol symbol-100px symbol-circle mb-7">
              <img :src="profile.avatar" alt="image">
            </div>
            <a href="#" class="fs-3 text-gray-800 text-hover-primary fw-bolder mb-3">{{ fullName }}</a>
            <div class="mb-9">
              <div class="badge badge-lg badge-light-primary d-inline">{{ profile.title }}</div>
            </div>
            <div class="d-flex flex-wrap flex-center">
              <div class="border text-center border-gray-300 border-dashed rounded py-3 px-3 mb-3">
                <div class="fw-bold text-muted">
                  {{ profile.welcomeText }}
                </div>
              </div>
            </div>
          </div>
          <div class="d-flex flex-stack fs-4 py-3">
            <div class="fw-bolder rotate collapsible">Детали</div>
          </div>
          <div class="separator"></div>
          <div id="kt_user_view_details" class="collapse show">
            <div class="pb-5 fs-6">
              <div class="fw-bolder mt-5">График работы</div>
              <div class="text-gray-600">{{ profile.workingHours }}</div>
              <div class="fw-bolder mt-5">Часовой пояс</div>
              <div class="text-gray-600">{{ profile.timezone }}</div>
              <div class="fw-bolder mt-5">Рабочий телефон</div>
              <div class="text-gray-600">
                <a :href="phoneLink" class="text-gray-600 text-hover-primary">{{ profile.phone }}</a>

              </div>
              <div class="fw-bolder mt-5">Название компании</div>
              <div class="text-gray-600">{{ profile.company }}</div>
              <div class="fw-bolder mt-5">Сайт</div>
              <div class="text-gray-600">
                <a :href="profile.website" class="text-gray-600 text-hover-primary">{{ profile.website }}</a>
              </div>
              <div class="fw-bolder mt-5">Адрес</div>
              <div class="text-gray-600">
                {{ profile.city }}, {{ profile.country }}
              </div>
            </div>
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
