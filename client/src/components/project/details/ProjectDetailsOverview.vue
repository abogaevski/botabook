<template>
  <div v-if="(project && project.events.length) || (project && project.customers.length)" class="row g-6 g-xl-9">
    <div class="col-lg-6">
      <project-details-events-chart v-if="project.events.length" :events-id="project.events" />
      <no-data v-else header="Нет встреч" content="По услуге пока нет встреч, либо они были отменены!"/>
    </div>
    <div class="col-lg-6">
      <!-- <project-details-events-area-by-month v-if="project.events.length" :project-start="project.createdAt" :events-id="project.events" /> -->
      <no-data header="Скоро" content="Статистика по услугам скоро появится!"/>
    </div>
    <div class="col-xl-8">
      <project-details-events-nav v-if="project.events.length" :events-id="project.events" />
      <no-data v-else header="Нет встреч" content="По услуге пока нет встреч, либо они были отменены!"/>
    </div>
    <div class="col-xl-4">
      <project-details-customers-list v-if="project.customers.length" :customers-id="project.customers" />
      <no-data v-else header="Нет клиентов" content="По услуге пока нет клиентов, либо они были удалены!"/>
    </div>
  </div>
  <no-data
    v-else
    size="lg"
    header="Встреч или клиентов не найдено"
    content="По услуге пока нет встреч и клиентов!"
  />
</template>
<script>
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { computed } from 'vue'
import ProjectDetailsEventsChart from './ProjectDetailsEventsChart'
// import ProjectDetailsEventsAreaByMonth from './ProjectDetailsEventsAreaByMonth'
import ProjectDetailsEventsNav from './ProjectDetailsEventsNav'
import ProjectDetailsCustomersList from './ProjectDetailsCustomersList'
import NoData from '@/components/common/NoData'

export default {
  components: {
    ProjectDetailsEventsChart,
    // ProjectDetailsEventsAreaByMonth,
    ProjectDetailsEventsNav,
    ProjectDetailsCustomersList,
    NoData
  },
  setup() {
    const route = useRoute()
    const store = useStore()
    const project = computed(() => store.getters['project/projectById'](route.params.id))
    return { project }
  }
}
</script>
