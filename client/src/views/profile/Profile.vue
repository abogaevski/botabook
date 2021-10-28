<template>
  <loader class="mb-xl-8 mb-lg-8 mb-6" v-if="loader"/>
  <div v-else-if="user && !loader" class="card mb-5 mb-xl-10">
    <div class="card-body pt-9 pb-0">
      <div class="d-flex flex-wrap flex-sm-nowrap mb-3">
        <div class="me-7 mb-4">
          <div class="symbol symbol-100px symbol-lg-160px symbol-fixed position-relative">
            <img :src="user.profile.avatar" :alt="fullName"/>
          </div>
        </div>
        <div class="flex-grow-1">
          <div
            class="d-flex justify-content-between align-items-start flex-wrap mb-2"
          >
            <div class="d-flex flex-column">
              <div class="d-flex align-items-center mb-2">
                <div
                  class="text-gray-800 fs-2 fw-bolder me-1"
                >{{ fullName }}
                </div
                >
                <span class="svg-icon svg-icon-1 svg-icon-primary">
                  <inline-svg src="/media/icons/duotone/Design/Verified.svg"/>
                </span>
              </div>
              <div class="d-flex flex-wrap fw-bold fs-6 mb-4 pe-2">
                <div
                  v-if="user.profile.title"
                  class="d-flex align-items-center text-gray-400 me-5 mb-2"
                >
                  <span class="svg-icon svg-icon-4 me-1">
                    <inline-svg src="/media/icons/duotone/General/User.svg"/>
                  </span>
                  {{ user.profile.title }}
                </div>
                <div
                  v-if="place"
                  class="d-flex align-items-center text-gray-400 me-5 mb-2"
                >
                  <span class="svg-icon svg-icon-4 me-1">
                    <inline-svg src="/media/icons/duotone/Map/Marker1.svg"/>
                  </span>
                  {{ place }}
                </div>
                <div
                  class="d-flex align-items-center text-gray-400 me-5 mb-2"
                >
                  <span class="svg-icon svg-icon-4 me-1">
                    <inline-svg
                      src="/media/icons/duotone/Communication/Mail-at.svg"
                    />
                  </span>
                  {{ user.email }}
                </div>
                <a
                  v-if="slug"
                  :href="slug"
                  target="_blank"
                  class="d-flex align-items-center text-gray-400 text-hover-primary mb-2"
                >
                  <span class="svg-icon svg-icon-4 me-1">
                    <inline-svg
                      src="/media/icons/duotone/Interface/Grid-Vetical.svg"
                    />
                  </span>
                  {{ slug }}
                </a>
              </div>
            </div>
          </div>
          <div class="d-flex flex-wrap flex-stack">
            <div class="d-flex flex-column flex-grow-1 pe-8">
              <div class="d-flex flex-wrap">

                <div class="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 me-lg-3 mb-3">
                  <div class="d-flex align-items-center">
                    <span
                      class="svg-icon svg-icon-3 me-2"
                      :class="getSvgIconColor(projects)"
                    >
                      <inline-svg src="/media/icons/duotone/General/Settings-2.svg"/>
                    </span>
                    <div
                      class="fs-2 fw-bolder counted">
                      {{ projects }}
                    </div>
                  </div>
                  <div class="fw-bold fs-6 text-gray-400">Услуг</div>
                </div>

                <div class="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 me-lg-3 mb-3">
                  <div class="d-flex align-items-center">
                    <span
                      class="svg-icon svg-icon-3 me-2"
                      :class="getSvgIconColor(events)"
                    >
                      <inline-svg src="/media/icons/duotone/Interface/Calendar.svg"/>
                    </span>
                    <div
                      class="fs-2 fw-bolder counted">
                      {{ events }}
                    </div>
                  </div>
                  <div class="fw-bold fs-6 text-gray-400">Встреч</div>
                </div>

                <div class="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 me-lg-3 mb-3">
                  <div class="d-flex align-items-center">
                    <span
                      class="svg-icon svg-icon-3 me-2"
                      :class="getSvgIconColor(customers)"
                    >
                      <inline-svg src="/media/icons/duotone/Communication/Group.svg"/>
                    </span>
                    <div
                      class="fs-2 fw-bolder counted">
                      {{ customers }}
                    </div>
                  </div>
                  <div class="fw-bold fs-6 text-gray-400">Клиентов</div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="d-flex overflow-auto h-55px">
        <ul class="nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent fs-5 fw-bolder flex-nowrap">
          <li class="nav-item">
            <router-link
              to="/profile/settings"
              class="nav-link text-active-primary me-6"
              active-class="active"
            >
              Основные
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
  <loader class="mb-xl-8 mb-lg-8 mb-6" v-if="loader"/>
  <router-view v-else :user="user"></router-view>
</template>
<script>
import { useStore } from 'vuex'
import { computed } from 'vue'
import Loader from '@/components/Loader'

export default {
  name: 'Profile',
  components: { Loader },
  setup() {
    const store = useStore()
    store.dispatch('calendar/getEvents')
    store.dispatch('userProfile/getUserProfile')
    store.dispatch('project/getProjects')
    store.dispatch('customerModule/getCustomers')
    store.dispatch('setTitle', 'Профиль')

    const loader = computed(() => store.getters.loader)
    const user = computed(() => store.getters['userProfile/user'])
    const projects = computed(() => store.getters['project/projectCount'])
    const events = computed(() => store.getters['calendar/eventCount'])
    const customers = computed(() => store.getters['customerModule/customerCount'])
    const fullName = computed(() => `${user.value.profile.firstName} ${user.value.profile.lastName}`)
    const place = computed(() => (user.value.profile.city && user.value.profile.country
      ? `${user.value.profile.city}, ${user.value.profile.country}`
      : ''))
    const slug = computed(() => `${window.location.origin}/${user.value.profile.slug}` || '')
    const getSvgIconColor = (counter) => (counter ? 'svg-icon-success' : 'svg-icon-danger')
    return {
      user,
      projects,
      events,
      customers,
      fullName,
      place,
      slug,
      getSvgIconColor,
      loader
    }
  }
}
</script>
