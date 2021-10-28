<template>
  <div class="row">
    <div class="col-xl-12">
      <dashboard-hello-card :user="user" :today-events="futureEvents.length" />
    </div>
  </div>
  <div class="row gy-lg-8 g-xl-8 gy-6">
    <div class="col-xl-6">
      <dashboard-events-stat-card v-if="events.length" :events="events" :user-created-at="user.profile.createdAt" />
    </div>
    <div class="col-xl-6">
      <dashboard-future-events-timeline-card :events="futureEvents"/>
    </div>
  </div>
</template>
<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import moment from 'moment'
import DashboardHelloCard from '@/components/dashboard/DashboardHelloCard'
import DashboardEventsStatCard from '@/components/dashboard/DashboardEventsStatCard'
import DashboardFutureEventsTimelineCard from '@/components/dashboard/DashboardFutureEventsTimelineCard'

export default {
  name: 'Dashboard',
  components: {
    DashboardHelloCard,
    DashboardEventsStatCard,
    DashboardFutureEventsTimelineCard
  },
  setup() {
    const store = useStore()
    store.dispatch('calendar/getEvents')
    store.dispatch('setTitle', 'Рабочий стол')
    const user = computed(() => store.getters['userProfile/user'])
    const events = computed(() => store.getters['calendar/events'])

    const futureEvents = computed(() => events.value
      .filter((e) => moment(e.start).day() >= moment().day() && e.status === 1)
      // eslint-disable-next-line no-nested-ternary
      .sort((a, b) => ((moment(a.start) > moment(b.start)) ? 1 : ((b.start > a.start) ? -1 : 0))))

    return {
      user,
      events,
      futureEvents
    }
  }
}
</script>
