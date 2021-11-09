<template>
  <div
    class="card bgi-no-repeat card-xl-stretch mb-xl-8 mb-lg-8 mb-6"
    style="background-position: right top; background-size: 40% auto; background-image: url('/media/svg/shapes/abstract-2.svg')">
    <div class="card-body">
      <template v-if="fullName">
        <div class="card-title fw-bolder text-muted fs-4">Здравствуйте, {{ fullName }}</div>
      </template>
      <el-skeleton v-else :rows="1" animated />
    </div>
  </div>
</template>
<script>

import { computed } from 'vue'
import { useStore } from 'vuex'
import moment from 'moment'

export default {
  name: 'DashboardHelloCard',
  setup() {
    const store = useStore()
    const user = computed(() => store.getters['userProfile/user'])
    const events = computed(() => store.getters['calendar/events'])
    const loader = computed(() => store.state.loaderEnabled)
    const futureEvents = computed(() => events.value
      .filter((e) => moment(e.start).day() >= moment().day() && e.status === 1)
      // eslint-disable-next-line no-nested-ternary
      .sort((a, b) => ((moment(a.start) > moment(b.start)) ? 1 : ((b.start > a.start) ? -1 : 0))))

    const fullName = computed(() => (user.value.profile.firstName
      ? `${user.value.profile.firstName} ${user.value.profile.lastName}`
      : ''
    ))

    return {
      fullName,
      futureEvents,
      user,
      loader
    }
  }
}
</script>
