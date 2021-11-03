<template>
  <div
    v-if="user"
    class="card bgi-no-repeat card-xl-stretch mb-xl-8 mb-lg-8 mb-6"
    style="background-position: right top; background-size: 40% auto; background-image: url('/media/svg/shapes/abstract-2.svg')">
    <div class="card-body">
      <div class="card-title fw-bolder text-muted fs-4">Здравствуйте, {{ fullName }}</div>
      <router-link to="/calendar" class="fw-bolder text-primary text-hover-primary my-3">
        Назначено встреч: {{ todayEvents }}
      </router-link>
    </div>
  </div>
</template>
<script>

import { computed, toRefs } from 'vue'

export default {
  name: 'DashboardHelloCard',
  props: ['user', 'todayEvents'],
  setup(props) {
    const { user } = toRefs(props)
    const fullName = computed(() => `${user.value.profile.firstName} ${user.value.profile.lastName}`)

    return {
      fullName
    }
  }
}
</script>
