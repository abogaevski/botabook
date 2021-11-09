<template>
  <div class="card mb-5 mb-xl-10">
    <div class="card-body pt-9" :class="{'pb-0': fullName}">
      <template v-if="fullName">
        <div class="d-flex flex-wrap flex-sm-nowrap mb-3 align-items-center">

          <div class="me-7">
            <div class="symbol symbol-75px symbol-lg-75px symbol-fixed position-relative">
              <img :src="user.profile.avatar" :alt="fullName"/>
            </div>
          </div>
          <div class="flex-grow-1">
            <div
              class="d-flex justify-content-between align-items-start flex-wrap"
            >
              <div class="d-flex flex-column">
                <div class="d-flex align-items-center mb-1">
                  <div class="text-gray-800 fs-2 fw-bolder me-1">{{ fullName }}</div>
                </div>
                <div class="d-flex flex-column flex-wrap fw-bold fs-6 pe-2">
                  <a
                    v-if="slug"
                    :href="slug"
                    target="_blank"
                    class="d-flex align-items-center text-gray-400 text-hover-primary mb-2"
                  >
                  <span class="svg-icon svg-icon-4 me-1">
                    <inline-svg src="/media/icons/duotone/Interface/Grid-Vetical.svg"/>
                  </span>
                    {{ slug }}
                  </a>
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
      </template>
      <el-skeleton v-else :rows="2" animated />
    </div>
  </div>
  <router-view />
</template>
<script>
import { useStore } from 'vuex'
import { computed } from 'vue'

export default {
  name: 'Profile',
  setup() {
    const store = useStore()
    store.dispatch('userProfile/getUserProfile')
    store.dispatch('setTitle', 'Профиль')

    const user = computed(() => store.getters['userProfile/user'])
    const fullName = computed(() => (user.value.profile.firstName
      ? `${user.value.profile.firstName} ${user.value.profile.lastName}`
      : ''
    ))
    const slug = computed(() => `${window.location.origin}/${user.value.profile.slug}` || '')
    return {
      user,
      fullName,
      slug,
    }
  }
}
</script>
