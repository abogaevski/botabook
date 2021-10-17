<template>
  <div v-if="project" class="row g-6 g-xl-9">
    <div class="col-lg-6">
      <project-details-events-chart v-if="project.events.length" :events-id="project.events" />
      <project-details-events-no-data v-else />
    </div>
    <div class="col-lg-6">
      <project-details-events-area-by-month v-if="project.events.length" :project-start="project.createdAt" :events-id="project.events" />
      <project-details-events-no-data v-else />
    </div>
    <div class="col-lg-8">
      <project-details-events-nav v-if="project.events.length" :events-id="project.events" />
      <project-details-events-no-data v-else />
    </div>
    <div class="col-lg-4">
      <project-details-customers-list v-if="project.customers.length" :customers-id="project.customers" />
      <project-details-events-no-data v-else />
    </div>
  </div>
</template>
<script>
import ProjectDetailsEventsChart from './ProjectDetailsEventsChart'
import ProjectDetailsEventsAreaByMonth from './ProjectDetailsEventsAreaByMonth'
import ProjectDetailsEventsNav from './ProjectDetailsEventsNav'
import ProjectDetailsCustomersList from './ProjectDetailsCustomersList'
import ProjectDetailsEventsNoData from '@/components/project/details/ProjectDetailsEventsNoData'

export default {
  props: {
    project: Object
  },
  components: {
    ProjectDetailsEventsChart,
    ProjectDetailsEventsAreaByMonth,
    ProjectDetailsEventsNav,
    ProjectDetailsCustomersList,
    ProjectDetailsEventsNoData
  }
}
</script>
