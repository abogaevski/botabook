<template>
  <div class="row">
    <div class="col-xl-12">
      <dashboard-hello-card />
    </div>
  </div>
  <div class="row gy-lg-8 g-xl-8 gy-6">
    <div class="col-xl-6">
<!--      <dashboard-events-stat-card />-->
    </div>
    <div class="col-xl-6">
<!--      <dashboard-future-events-timeline-card />-->
    </div>
  </div>
</template>
<script>
import { useStore } from 'vuex'
import DashboardHelloCard from '@/components/dashboard/DashboardHelloCard'
// import DashboardEventsStatCard from '@/components/dashboard/DashboardEventsStatCard'
// import DashboardFutureEventsTimelineCard from '@/components/dashboard/DashboardFutureEventsTimelineCard'

export default {
  name: 'Dashboard',
  components: {
    DashboardHelloCard,
    // DashboardEventsStatCard,
    // DashboardFutureEventsTimelineCard,
  },
  setup() {
    const store = useStore()
    store.dispatch('calendar/getEvents')
    store.dispatch('setTitle', 'Рабочий стол')
  }
}
</script>
