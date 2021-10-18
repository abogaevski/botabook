<template>
  <div
    v-if="user"
    class="card bgi-no-repeat card-xl-stretch mb-xl-8"
    style="background-position: right top; background-size: 40% auto; background-image: url('/media/svg/shapes/abstract-2.svg')">
    <div class="card-body">
      <div class="card-title fw-bolder text-muted text-hover-primary fs-4">Здравствуйте, {{ fullName }}</div>
      <div class="fw-bolder text-primary my-3">Назначено встреч: {{ todayEvents }}</div>
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
